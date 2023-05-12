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
        const jwt = await createJWT({ snowflake: relationship.id }, secret);

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
        } = {
          ...profile,
        };

        const lookedUpProfile = {
          badges: badges as Badges,
          createdAt,
          discriminator,
          avatarURL,
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

        const sanitizedRelationship = Object.fromEntries(
          Object.entries(relationship.user).filter(([_, value]) => value)
        );

        return {
          ...lookedUpProfile,
          download: { ...sanitizedRelationship, ...download },
          nickname: relationship.nickname ?? undefined,
        };
      })
    );
  }

  return "Oops, this account doesn't have friends";
});
