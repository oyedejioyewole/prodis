import type { InternalApi } from "nitropack";

declare global {
  type AccountBadgesKeys =
    | "staff"
    | "partnered-server-owner"
    | "hypesquad-events"
    | "bug-hunter-level-1"
    | "house-of-bravery"
    | "house-of-brilliance"
    | "house-of-balance"
    | "early-supporter"
    | "bug-hunter-level-2"
    | "verified-bot"
    | "early-verified-bot-developer"
    | "moderator-programs-alumni"
    | "active-developer";

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

  type NitroStatus = "none" | "nitro" | "nitro-basic";

  type Badges = ReturnType<
    typeof import("./server/utils/helpers")["getBadges"]
  >;

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
    since: string;
    user: Pick<
      DiscordUser,
      "discriminator" | "public_flags" | "username" | "id" | "avatar"
    > &
      Partial<{
        avatar_decoration: string;
        global_name: string;
        display_name: string;
      }>;
  };

  type ValidationConfirmed = {
    isAllowed: boolean;
    data?: string;
  };

  type Modal = {
    isOpen: boolean;
  };
}

declare module "locale-code" {
  function getLanguageCode(code: string): string;
  function getLanguageName(code: string): string;
  function getLanguageNativeName(code: string): string;
  function validateLanguageCode(code: string): boolean;
  function getLanguages(codes: string[]): string[];
  function getCountryCode(code: string): string;
  function getCountryName(code: string): string;
  function validateCountryName(code: string): boolean;
  function validate(code: string): boolean;
}

type Awaited<T> = T extends PromiseLike<infer U> ? Awaited<U> : T;
type APICallbackProcessedResponse = Awaited<
  ReturnType<typeof import("./server/utils/internals")["postCallbackActions"]>
>;
type APIFriendsResponse = InternalApi["/api/friends"]["get"];
type APILookupResponse = InternalApi["/api/lookup"]["get"];

type RequestMetadata = {
  global: {
    pending: boolean;
    response?: APILookupResponse | APICallbackProcessedResponse;
  };
  friends: {
    pending: boolean;
    response?: APIFriendsResponse;
  };
};

export {
  APILookupResponse,
  APIFriendsResponse,
  APICallbackProcessedResponse,
  RequestMetadata,
};
