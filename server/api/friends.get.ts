export default defineEventHandler(async (event) => {
  const headers = getHeaders(event);

  const jwtPayload = headers["x-token"];

  if (!jwtPayload)
    throw createError({
      statusCode: 400,
      message: "Oops, couldn't find any JWT attached to the request",
    });

  const {
    public: {
      discord: { baseURL },
    },
    secret,
  } = useRuntimeConfig();

  const processedJWT = await verifyJWT<{ token: string }>(jwtPayload, secret);

  if ("error" in processedJWT)
    throw createError({ statusCode: 403, message: processedJWT.message });
  else if (!("token" in processedJWT))
    throw createError({
      statusCode: 403,
      message: "Oops, JWT didn't include a token",
    });

  const { token } = processedJWT;

  const [relationships] = await Promise.all([
    $fetch<DiscordRelationship[]>("/users/@me/relationships", {
      baseURL,
      headers: {
        authorization: token,
      },
      onResponseError: ({ response }) => {
        throw createError({
          statusCode: response.status,
          message: response.statusText,
        });
      },
    }),
  ]);

  if (relationships.length > 0) {
    return await Promise.all(
      relationships.map(async ({ id, nickname, since, user }) => {
        const jwt = await createJWT({ snowflake: id }, secret);

        const profile = await $fetch<APILookupResponse>("/api/lookup", {
          headers: {
            "x-token": jwt,
          },
        });

        const {
          createdAt,
          discriminator,
          avatarURL,
          username,
          badges,
          download,
          bot,
        } = profile;

        const lookedUpProfile = {
          avatarURL,
          badges: badges as Badges,
          bot,
          createdAt,
          discriminator,
          nickname: nickname || undefined,
          since,
          username,
        };

        for (const property of [
          "discriminator",
          "username",
          "avatar",
          "public_flags",
        ])
          delete user[property as keyof typeof user];

        const sanitizedRelationship = Object.fromEntries(
          Object.entries(user).filter(([_, value]) => value)
        );

        return {
          ...lookedUpProfile,
          download: { ...sanitizedRelationship, ...download },
        };
      })
    );
  }

  return "Oops, this account doesn't have friends";
});
