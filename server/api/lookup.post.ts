export default defineEventHandler(async (event) => {
  const { decrypt } = await import("securejs");
  const {
    public: {
      project: { secret },
    },
  } = useRuntimeConfig();

  const { hashedSnowflake }: { hashedSnowflake: string } = await readBody(
    event
  );

  if (!hashedSnowflake) {
    return sendError(
      event,
      createError({
        statusCode: 400,
        statusMessage: "Oops, I can't find the snowflake",
      })
    );
  }

  let snowflake: string;
  try {
    snowflake = decrypt(hashedSnowflake, secret);
  } catch (error) {
    return sendError(
      event,
      createError({
        statusCode: 403,
        statusMessage: "Oops, the hash contains illegal characters",
      })
    );
  }

  const snowflakeRegex = /^[0-9]{17,19}$/;
  if (!snowflakeRegex.test(snowflake)) {
    return sendError(
      event,
      createError({
        statusCode: 406,
        statusMessage: "Oops, the hash of the snowflake is a bit messed up",
      })
    );
  }

  const {
    discord: { botToken, baseURL },
  } = useRuntimeConfig();

  // Fetch the user's profile
  const profile = await $fetch<FilteredResponse>(`/users/${snowflake}`, {
    headers: { Authorization: `Bot ${botToken}` },
    baseURL,
    onResponseError({ response }) {
      if (response.status === 404) {
        return sendError(
          event,
          createError({
            statusCode: 404,
            statusMessage: "Oops, I can't find the user using Discord's API",
          })
        );
      }
      return sendError(
        event,
        createError({
          statusCode: response.status,
          statusMessage: response.statusText,
        })
      );
    },
  }).catch((error) => null);

  if (!profile) {
    return sendError(
      event,
      createError({
        statusMessage: "Write the logic for this condition",
        statusCode: 400,
      })
    );
  }

  // Make an avatar URL
  let image;
  if (profile.avatar === null) {
    const defaultAvatarNumber = parseInt(profile.discriminator) % 5;
    image = `https://cdn.discordapp.com/embed/avatars/${defaultAvatarNumber}.png`;
  } else {
    const format = profile.avatar.startsWith("a_") ? "gif" : "webp";
    image = `https://cdn.discordapp.com/avatars/${profile.id}/${profile.avatar}.${format}`;
  }

  // Remove unnecessary properties from the profile
  [
    "avatar_decoration",
    "banner",
    "banner_color",
    "accent_color",
    "avatar",
  ].forEach((key) => {
    if (key in profile) delete profile[key];
  });

  return {
    ...profile,
    image,
  };
});
