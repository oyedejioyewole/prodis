type AccountBadges =
  | "staff"
  | "partner"
  | "hypesquad"
  | "bug-hunter-1"
  | "hypesquad-online-house-1"
  | "hypesquad-online-house-2"
  | "hypesquad-online-house-3"
  | "premium-early-supporter"
  | "team-pseudo-user"
  | "bug-hunter-2"
  | "verified-bot"
  | "verified-developer"
  | "certified-moderator"
  | "bot-http-interactions"
  | "active-developer"
  | "none";

type ConnectionTypes =
  | "battlenet"
  | "ebay"
  | "epicgames"
  | "facebook"
  | "github"
  | "instagram"
  | "leagueoflegends"
  | "paypal"
  | "playstation"
  | "reddit"
  | "riotgames"
  | "spotify"
  | "skype"
  | "steam"
  | "tiktok"
  | "twitch"
  | "twitter"
  | "xbox"
  | "youtube";

type LookedUpFriend = Omit<APILookupResponse, "original"> &
  DiscordRelationship["user"];

type APICallbackProcessedResponse = {
  profile: Pick<DiscordUser, "verified"> & {
    twoFactorAuthenticationStatus: "enabled" | "disabled";
    badges: number;
    createdAt: string;
    original: DiscordUser;
  };
  guilds: {
    sanitized: {
      [Property in "name" | "icon" | "owner" | "id"]: DiscordGuild[Property];
    }[];
    AccountConnectionValues;
    original: DiscordGuild[];
  };
  connections: {
    sanitized: {
      [Property in
        | "name"
        | "type"
        | "verified"
        | "friend_sync"
        | "visibility"
        | "revoked"]: DiscordConnection[Property];
    }[];
    original: DiscordConnection[];
  };
};

type APIFriendsResponse = Omit<APILookupResponse, "original"> &
  Pick<DiscordRelationship, "nickname"> & {
    original: LookedUpFriend;
  };

type APILookupResponse = {
  [Property in
    | "discriminator"
    | "public_flags"
    | "username"]: DiscordAPILookupResponse[Property];
} & {
  image: string;
  createdAt: string;
  original: DiscordUser;
};

type DiscordConnection = {
  id: string;
  name: string;
  type: ConnectionTypes;
  revoked?: boolean;
  integrations?: [];
  verified: boolean;
  friend_sync: boolean;
  show_activity: boolean;
  two_way_link: boolean;
  visibility: 0 | 1;
};

type DiscordGuild = {
  id: string;
  name: string;
  icon: string | null;
  icon_hash?: string | null;
  splash?: string | null;
  discovery_splash?: string | null;
  owner?: boolean;
  owner_id: string;
  permissions?: string;
  region?: string | null;
  afk_channel_id?: string | null;
  afk_timeout: number;
  widget_enabled?: boolean;
  widget_channel_id?: string | null;
  verification_level: number;
  default_message_notifications: number;
  explicit_content_filter: number;
  roles: [];
  emojis: [];
  features: string[];
  mfa_level: number;
  application_id?: string | null;
  system_channel_id?: string | null;
  system_channel_flags: number;
  rules_channel_id?: string | null;
  max_presences?: number | null;
  max_members: number;
  vanity_url_code: string | null;
  description?: string | null;
  banner?: string | null;
  premium_tier: number;
  premium_subscription_count?: number;
  preferred_locale: string;
  public_updates_channel_id?: string | null;
  max_video_channel_users?: number;
  max_stage_video_channel_users?: number;
  approximate_member_count?: number;
  approximate_presence_count?: number;
  welcome_screen?: {};
  nsfw_level: number;
  stickers?: [];
  premium_progress_bar_enabled: boolean;
};

type DiscordUser = {
  id: string;
  username: string;
  discriminator: string;
  avatar?: string;
  bot?: boolean;
  system?: boolean;
  mfa_enabled?: boolean;
  banner?: string;
  accent_color?: string;
  locale?: string;
  verified?: boolean;
  email?: string;
  flags?: number;
  premium_type?: number;
  public_flags?: number;
};

type DiscordRelationship = {
  id: string;
  type: number;
  nickname?: string;
  user: {
    [Property in
      | "discriminator"
      | "public_flags"
      | "username"
      | "id"
      | "avatar"]: DiscordUser[Property];
  } & Partial<{
    avatar_decoration: string;
    global_name: string;
    display_name: string;
  }>;
};

type RequestMetadata = {
  global: {
    pending: boolean;
    response?: APILookupResponse | APICallbackProcessedResponse;
  };
  friends: {
    pending: boolean;
    response?: APIFriendsResponse[] | string;
  };
};

type ValidationConfirmed = {
  isAllowed: boolean;
  data?: string;
};

type Modal = {
  isOpen: boolean;
};

export {
  DiscordUser,
  DiscordGuild,
  DiscordConnection,
  DiscordRelationship,
  RequestMetadata,
  ValidationConfirmed,
  APILookupResponse,
  APIFriendsResponse,
  APICallbackProcessedResponse,
  AccountBadges,
  Modal,
  LookedUpFriend,
};
