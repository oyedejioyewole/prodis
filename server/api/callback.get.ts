export const postCallbackActions = async (
  {
    verified,
    mfa_enabled,
    id,
    locale: profileLocale,
    public_flags,
    bot,
    premium_type,
    username,
    discriminator,
    avatar,
    ...profile
  }: DiscordUser,
  guilds: DiscordGuild[],
  connections: DiscordConnection[]
) => {
  const cdn = "https://cdn.discordapp.com";
  const badges = public_flags ? getBadges(public_flags) : "none";
  const createdAt = formatDate(converterUserIDOrSnowflakeIntoDate(BigInt(id)));
  const nitroStatus = premium_type
    ? premium_type === 2
      ? "nitro"
      : premium_type === 3
      ? "nitro-basic"
      : "none"
    : "none";
  const locale = profileLocale ? await getLocale(profileLocale) : undefined;
  const multiFactorAuthenticationStatus = mfa_enabled ? "enabled" : "disabled";
  const user = `${username}#${discriminator}`;
  const avatarURL = avatar
    ? `${cdn}/avatars/${id}/${avatar}.${
        avatar.startsWith("a_") ? "gif" : "webp"
      }`
    : `${cdn}/embed/avatars/${parseInt(discriminator) % 5}.png`;

  delete profile.flags;

  const sanitizedProfile = Object.fromEntries(
    Object.entries(profile).filter(([_, value]) => value)
  );

  const usableGuildsInformation = guilds.map(
    ({ name, icon, owner, id, features }) => ({
      icon: icon
        ? icon.startsWith("a_")
          ? `${cdn}/icons/${id}/${icon}.gif`
          : `${cdn}/icons/${id}/${icon}.webp`
        : undefined,
      name,
      owner,
      features:
        features.length > 0
          ? features.map(
              (feature) =>
                feature.toLowerCase().replace(/_/g, "-") as UsableGuildFeatures
            )
          : "Sorry, I couldn't find any features 🤷",
    })
  );

  const usableConnectionsInformation = connections.map(
    ({ name, type, ...rest }) => ({
      name,
      type,
      download: rest,
    })
  );

  return {
    profile: {
      badges: badges as Badges,
      bot,
      createdAt,
      download: {
        avatarURL,
        id,
        locale,
        multiFactorAuthenticationStatus,
        ...sanitizedProfile,
        user,
        verified,
      },
      locale,
      nitroStatus,
      multiFactorAuthenticationStatus,
      verified,
    },
    guilds: usableGuildsInformation,
    connections: usableConnectionsInformation,
  };
};

export default defineEventHandler(async (event) => {
  const query = getQuery(event);

  if (Object.entries(query).length === 0)
    throw createError({
      statusCode: 400,
      message: "Oops, query parameters not found",
    });

  const { code, state } = query as { code: string; state: string };

  if (!code || !state) {
    throw createError({
      statusCode: 400,
      message: "Oops, important query parameters not found",
    });
  }

  const {
    discord: { secret },
    public: {
      discord: { baseURL, id, redirectUrl },
    },
  } = useRuntimeConfig();

  const options: {
    baseURL: string;
    headers?: Partial<{
      Authorization: `${"Bearer" | "Basic"} ${string}`;
      "Content-Type": string;
    }>;
  } = {
    baseURL,
  };

  const { access_token } = await $fetch<{ access_token: string }>(
    "/oauth2/token",
    {
      ...options,
      method: "POST",
      body: new URLSearchParams({
        client_id: id,
        client_secret: secret,
        grant_type: "authorization_code",
        code: code,
        redirect_uri: redirectUrl,
      }),
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      onRequestError: ({ error }) => {
        throw createError({
          statusCode: 500,
          message: error.message,
        });
      },
    }
  );

  options.headers = {
    Authorization: `Bearer ${access_token}`,
  };

  const [profile, guilds, connections] = await Promise.all([
    $fetch<DiscordUser>("/users/@me", options),
    $fetch<DiscordGuild[]>("/users/@me/guilds", options),
    $fetch<DiscordConnection[]>("/users/@me/connections", options),
  ]);

  options.headers = {
    Authorization: `Basic ${Buffer.from(`${id}:${secret}`).toString("base64")}`,
    "Content-Type": "application/x-www-form-urlencoded",
  };

  await $fetch("/oauth2/token/revoke", {
    method: "POST",
    ...options,
    body: new URLSearchParams({ token: access_token }),
  });

  event.context.session.processed = await postCallbackActions(
    profile,
    guilds,
    connections
  );

  return sendRedirect(event, "/account");
});
