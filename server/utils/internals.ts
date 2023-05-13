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
    ? `https://cdn.discordapp.com/avatars/${id}/${avatar}.${
        avatar.startsWith("a_") ? "gif" : "webp"
      }`
    : `https://cdn.discordapp.com/embed/avatars/${
        parseInt(discriminator) % 5
      }.png`;

  delete profile.flags;

  const sanitizedProfile = Object.fromEntries(
    Object.entries(profile).filter(([_, value]) => value)
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
    guilds: {
      download: guilds,
      sanitized: guilds.map(({ name, icon, owner, id }) => ({
        name,
        icon: icon
          ? icon.startsWith("a_")
            ? `https://cdn.discordapp.com/icons/${id}/${icon}.gif`
            : `https://cdn.discordapp.com/icons/${id}/${icon}.webp`
          : undefined,
        owner,
      })),
    },
    connections: {
      download: connections,
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
    },
  };
};
