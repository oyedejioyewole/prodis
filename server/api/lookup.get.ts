export default defineEventHandler(async (event) => {
  // Validate route parameters
  const jwtPayload = getHeaders(event)["x-token"];

  if (!jwtPayload)
    throw createError({
      statusCode: 400,
      message: "Oops, couldn't find any JWT attached to the request",
    });

  const { secret } = useRuntimeConfig();

  // Validate (and decrypt if valid) the JWT
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

  // Test the snowflake
  const { snowflake } = processedJWT;

  if (!/^[0-9]{17,19}$/.test(snowflake)) {
    throw createError({
      statusCode: 406,
      message: "Oops, provided snowflake is invalid",
    });
  }

  // Prepare the request
  const {
    public: {
      discord: { baseURL },
    },
    discord: { botToken },
  } = useRuntimeConfig();

  // Fetch the snowflake's profile
  const {
    discriminator,
    username,
    public_flags,
    bot,
    avatar,
    id,
    banner,
    accent_color,
    ...remaining
  } = await $fetch<DiscordUser>(`/users/${snowflake}`, {
    headers: { Authorization: `Bot ${botToken}` },
    baseURL,
    onResponseError: ({ response: { statusText, status } }) => {
      throw createError({
        statusCode: status,
        message: statusText,
      });
    },
  });

  // Prepare the response
  const timestamp = converterUserIDOrSnowflakeIntoDate(BigInt(snowflake));
  const createdOn = formatDate(timestamp);

  const assets = {
    avatar: avatar
      ? `https://cdn.discordapp.com/avatars/${id}/${avatar}.${
          avatar.startsWith("a_") ? "gif" : "webp"
        }`
      : `https://cdn.discordapp.com/embed/avatars/${
          parseInt(discriminator) % 5
        }.png`,
    banner: banner
      ? `https://cdn.discordapp.com/banners/${id}/${banner}${
          banner.startsWith("a_") ? ".gif" : ".webp"
        }?size=2048`
      : "User doesn't have a banner",
  };

  const accentColor = `#${
    accent_color?.toString(16).padStart(6, "0") ?? undefined
  }`;
  const badges = public_flags ? getBadges(public_flags) : "none";
  const user = `${username}#${discriminator}`;

  delete remaining.flags;

  const sanitizedProfile = Object.fromEntries(
    Object.entries(remaining).filter(([_, value]) => value)
  );

  // The moment of truth
  return {
    avatar: assets.avatar,
    badges: badges as Badges,
    bot,
    createdOn,
    discriminator,
    download: {
      badges: badges as Badges,
      bot: bot
        ? "This account is a bot account"
        : "This account is not a bot account",
      createdOn,
      accentColor,
      ...assets,
      ...sanitizedProfile,
      user,
    },
    username,
  };
});
