export const setSessionAfterCallback = async (
  {
    verified,
    mfa_enabled,
    id,
    locale,
    public_flags,
    bot,
    premium_type,
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

  return {
    profile: {
      badges: badges as Badges,
      bot,
      createdAt,
      download: { profile, verified, mfa_enabled, id, locale },
      locale: locale ? await getLocale(locale) : undefined,
      nitroStatus,
      twoFactorAuthenticationStatus: mfa_enabled ? "enabled" : "disabled",
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
