import type { DiscordUser } from "~/project";

export default defineEventHandler(async (event) => {
  const headers = getHeaders(event);

  const jwtPayload = headers["x-token"];

  if (!jwtPayload)
    throw createError({
      statusCode: 400,
      message: "Oops, couldn't find any JWT attached to the request",
    });

  const { jwtSigningKey } = useRuntimeConfig();

  const processedJWT = await verifyJWT<{ snowflake: string }>(
    jwtPayload,
    jwtSigningKey
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

  const snowflakeRegex = /^[0-9]{17,19}$/;
  if (!snowflakeRegex.test(snowflake)) {
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

  // Fetch the user's profile
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
  const image = profile.avatar
    ? `https://cdn.discordapp.com/avatars/${profile.id}/${profile.avatar}.${
        profile.avatar.startsWith("a_") ? "gif" : "webp"
      }`
    : `https://cdn.discordapp.com/embed/avatars/${
        parseInt(profile.discriminator) % 5
      }.png`;

  // Select only the needed fields
  const { username, discriminator, public_flags } = { ...profile };

  return {
    username,
    discriminator,
    public_flags,
    image,
    createdAt,
    original: profile,
  };
});
