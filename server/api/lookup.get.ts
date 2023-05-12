import type { DiscordUser, Badges } from "~/project";

export default defineEventHandler(async (event) => {
  // Prepartion
  const headers = getHeaders(event);
  const jwtPayload = headers["x-token"];

  // Validation of API route parameters
  if (!jwtPayload)
    throw createError({
      statusCode: 400,
      message: "Oops, couldn't find any JWT attached to the request",
    });

  const { secret } = useRuntimeConfig();

  const processedJWT = await verifyJWT<{ snowflake: string }>(
    jwtPayload,
    secret
  );

  if ("error" in processedJWT)
    throw createError({
      statusCode: 403,
      message: processedJWT.message,
    });
  else if (!("snowflake" in processedJWT))
    throw createError({
      statusCode: 403,
      message: "Oops, JWT didn't include a snowflake",
    });

  const { snowflake } = processedJWT;

  if (!/^[0-9]{17,19}$/.test(snowflake)) {
    throw createError({
      statusCode: 406,
      message: "Oops, provided snowflake is invalid",
    });
  }

  const {
    public: {
      discord: { baseURL },
    },
    discord: { botToken },
  } = useRuntimeConfig();

  // Fetch the snowflakes profile
  const profile = await $fetch<DiscordUser>(`/users/${snowflake}`, {
    headers: { Authorization: `Bot ${botToken}` },
    baseURL,
    onResponseError: ({ response: { statusText, status } }) => {
      throw createError({
        statusCode: status,
        message: statusText,
      });
    },
  });

  // Get the account creation date from user id
  const timestamp = converterUserIDOrSnowflakeIntoDate(BigInt(snowflake));
  const createdAt = formatDate(timestamp);

  // Make an avatar URL
  const avatarURL = profile.avatar
    ? `https://cdn.discordapp.com/avatars/${profile.id}/${profile.avatar}.${
        profile.avatar.startsWith("a_") ? "gif" : "webp"
      }`
    : `https://cdn.discordapp.com/embed/avatars/${
        parseInt(profile.discriminator) % 5
      }.png`;

  // Select only the needed fields
  const { username, discriminator, public_flags, bot } = {
    ...profile,
  };

  const badges = public_flags ? getBadges(public_flags) : "none";
  const user = `${profile.username}#${profile.discriminator}`;

  for (const property of [
    "public_flags",
    "flags",
    "avatar",
    "username",
    "discriminator",
  ])
    delete profile[property as keyof typeof profile];

  const sanitizedProfile = Object.fromEntries(
    Object.entries(profile).filter(([_, value]) => value)
  );

  return {
    avatarURL,
    badges: badges as Badges,
    bot,
    createdAt,
    discriminator,
    download: {
      badges: badges as Badges,
      bot: bot
        ? "This account is a bot account"
        : "This account is not a bot account",
      createdAt,
      avatarURL,
      ...sanitizedProfile,
      user,
    },
    username,
  };
});
