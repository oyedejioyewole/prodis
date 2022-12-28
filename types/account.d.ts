interface Modal {
  isOpen: boolean;
  type?: ModalTypes;
  payload: PayloadOptions | {};
}

interface User {
  username: string;
  discriminator: string;
  accent_color: string;
  locale: string;
  mfa_enabled: boolean;
  premium_type: number;
  verified: boolean;
  image_url: string;
  access_token: string;
  email: string;
  flags?: number;
  guilds: Guilds;
  connections: Connections;
}

interface Guild {
  name: string;
  icon: string | null;
  owner: boolean;
  username: string;
}

interface Setting {
  accountVerified: boolean;
  multiFactorAuthenitcationEnabled: boolean;
}

interface AccountInformation {
  premiumType: PremiumTypes;
  hypesquadHouse?: string;
  locale: string;
}

type PremiumTypes = "nitro-classic" | "basic" | "nitro" | "nitro-basic";
type HypeSquadHouses =
  | "hypesquad-house-bravery"
  | "hypesquad-house-balance"
  | "hypesquad-house-brilliance"
  | "not-a-member";
type PayloadOptions = Guild | Setting | AccountInformation;

type Guilds = Array<{
  name: string;
  icon: string | null;
  owner: boolean;
}> | null;

type Connections = Array<{
  name: string;
  type: string;
  verified: boolean;
}> | null;
