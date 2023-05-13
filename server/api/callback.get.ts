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

  const [{ setSessionAfterCallback }] = await Promise.all([
    import("../utils/internals"),
    $fetch("/oauth2/token/revoke", {
      method: "POST",
      ...options,
      body: new URLSearchParams({ token: access_token }),
    }),
  ]);

  event.context.session.processed = await setSessionAfterCallback(
    profile,
    guilds,
    connections
  );

  return sendRedirect(event, "/account");
});
