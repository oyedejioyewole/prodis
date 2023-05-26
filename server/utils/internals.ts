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
  const discordCDN = "https://cdn.discordapp.com";
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
    ? `${discordCDN}/avatars/${id}/${avatar}.${
        avatar.startsWith("a_") ? "gif" : "webp"
      }`
    : `${discordCDN}/embed/avatars/${parseInt(discriminator) % 5}.png`;

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
      sanitized: guilds.map(
        ({
          name,
          icon,
          owner,
          id,
          mfa_level,
          verification_level,
          approximate_member_count,
          description,
          banner,
          premium_tier,
          premium_subscription_count,
          preferred_locale,
          approximate_presence_count,
          nsfw_level,
        }) => ({
          banner: banner
            ? banner.startsWith("a_")
              ? `${discordCDN}/banners/${id}/${banner}.gif`
              : `${discordCDN}/banners/${id}/${banner}.webp`
            : undefined,
          boostCount: premium_subscription_count,
          currentlyActive: approximate_presence_count,
          description,
          icon: icon
            ? icon.startsWith("a_")
              ? `${discordCDN}/icons/${id}/${icon}.gif`
              : `${discordCDN}/icons/${id}/${icon}.webp`
            : undefined,
          multiFactorAuthenticationStatus: (mfa_level
            ? "enabled"
            : "disabled") as "enabled" | "disabled",
          name,
          nsfwLevel: (nsfw_level
            ? nsfw_level === 1
              ? "explicit"
              : nsfw_level === 2
              ? "safe"
              : "age-restricted"
            : "default") as "explicit" | "safe" | "age-restricted" | "default",
          owner,
          preferredLanguage: preferred_locale,
          premiumTier: (premium_tier
            ? premium_tier === 1
              ? "tier-1"
              : premium_tier === 2
              ? "tier-2"
              : "tier-3"
            : "none") as `tier-${1 | 2 | 3}` | "none",
          totalMembers: approximate_member_count,
          verificationLevel: (verification_level
            ? verification_level === 1
              ? "low"
              : verification_level === 2
              ? "medium"
              : verification_level === 3
              ? "high"
              : "very-high"
            : "none") as "low" | "medium" | "high" | "very-high" | "none",
        })
      ),
    },
    connections: {
      download: connections,
      sanitized: connections.map(
        ({ name, type, verified, friend_sync, visibility, show_activity }) => ({
          name,
          type,
          verified,
          friendSync: friend_sync,
          visibility,
          showActivity: show_activity,
        })
      ),
    },
  };
};
