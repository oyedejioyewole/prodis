export default defineEventHandler(async (event) => {
  // Validate route parameters
  const jwtPayload = getHeaders(event)["x-token"];

  if (!jwtPayload)
    throw createError({
      statusCode: 400,
      message: "Oops, couldn't find any JWT attached to the request",
    });

  // Validate (and decrypt if valid) the JWT
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

  // Fetch the user's friends
  const relationships = await $fetch<DiscordRelationship[]>(
    "/users/@me/relationships",
    {
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
    }
  );

  // Check if the user has any friends (if true, return them)
  if (relationships.length > 0)
    return await Promise.all(
      relationships.map(
        async ({
          id,
          nickname,
          since,
          user: { avatar_decoration, display_name, global_name },
        }) => {
          const jwt = await createJWT({ snowflake: id }, secret);

          const { download, ...profile } = await $fetch<APILookupResponse>(
            "/api/lookup",
            {
              headers: {
                "x-token": jwt,
              },
            }
          );

          const sanitizedRelationship = Object.fromEntries(
            Object.entries({
              avatar_decoration,
              display_name,
              global_name,
            }).filter(([_, value]) => value)
          );

          return {
            ...profile,
            nickname: nickname ?? undefined,
            since,
            download: { ...sanitizedRelationship, ...download },
          };
        }
      )
    );
  else return "Oops, this account doesn't have friends";
});
