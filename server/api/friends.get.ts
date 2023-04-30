import type { APILookupResponse, DiscordRelationship, Badges } from "~/project";

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
    jwtSigningKey,
  } = useRuntimeConfig();

  const processedJWT = await verifyJWT<{ token: string }>(
    jwtPayload,
    jwtSigningKey
  );

  if ("error" in processedJWT)
    throw createError({ statusCode: 403, message: processedJWT.message });
  else if (!("token" in processedJWT))
    throw createError({
      statusCode: 403,
      message: "Oops, JWT didn't include a token",
    });

  const { token } = processedJWT;

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

  if (relationships.length > 0) {
    return await Promise.all(
      relationships.map(async (relationship) => {
        const jwt = await createJWT(
          { snowflake: relationship.id },
          jwtSigningKey
        );

        const profile = await $fetch<APILookupResponse>("/api/lookup", {
          headers: {
            "x-token": jwt,
          },
        });

        const {
          createdAt,
          discriminator,
          image,
          username,
          badges,
          download,
          bot,
        } = {
          ...profile,
        };

        const lookedUpProfile = {
          badges: badges as Badges,
          createdAt,
          discriminator,
          image,
          username,
          bot,
        };

        for (const property of [
          "discriminator",
          "username",
          "avatar",
          "public_flags",
        ])
          delete relationship.user[property as keyof typeof relationship.user];

        return {
          ...lookedUpProfile,
          nickname: relationship.nickname,
          download: { ...download, ...relationship.user, bot },
        };
      })
    );
  }

  return "Oops, this account doesn't have friends";
});
