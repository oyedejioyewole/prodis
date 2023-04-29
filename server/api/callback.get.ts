import type {
  DiscordUser,
  DiscordGuild,
  DiscordConnection,
  Badges,
  NitroStatus,
} from "~/project";

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

  const [{ getBadges, getLocale }] = await Promise.all([
    import("../utils/helpers"),
    $fetch("/oauth2/token/revoke", {
      method: "POST",
      ...options,
      body: new URLSearchParams({ token: access_token }),
    }),
  ]);

  const badges = profile.public_flags
    ? getBadges(profile.public_flags)
    : "none";
  const nitroStatus = profile.premium_type
    ? profile.premium_type === 2
      ? "nitro"
      : profile.premium_type === 3
      ? "nitro-basic"
      : "none"
    : "none";

  const processed = {
    profile: {
      badges: badges as Badges,
      verified: profile.verified,
      twoFactorAuthenticationStatus: profile.mfa_enabled
        ? "enabled"
        : "disabled",
      createdAt: (() => {
        const timestamp = converterUserIDOrSnowflakeIntoDate(
          BigInt(profile.id)
        );
        return formatDate(timestamp);
      })(),
      locale: profile.locale ? await getLocale(profile.locale) : undefined,
      nitroStatus: nitroStatus as NitroStatus,
      download: profile,
    },
    guilds: {
      sanitized: guilds.map(({ name, icon, owner, id }) => ({
        name,
        icon: icon
          ? icon.startsWith("a_")
            ? `https://cdn.discordapp.com/icons/${id}/${icon}.gif`
            : `https://cdn.discordapp.com/icons/${id}/${icon}.webp`
          : undefined,
        owner,
      })),
      download: guilds,
    },
    connections: {
      sanitized: connections.map(
        ({ name, type, verified, friend_sync, visibility, revoked }) => ({
          name,
          type,
          verified,
          friend_sync,
          visibility,
          revoked,
        })
      ),

      download: connections,
    },
  };

  event.context.session.processed = processed;

  return sendRedirect(event, "/account");
});
