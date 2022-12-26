type FilteredResponse = {
  id: string;
  username: string;
  discriminator: string;
  public_flags: number;
  image: string;
  avatar: string;
};

type LookupError = { statusCode: number; statusMessage: string; stack: [] };

type LookupRequest = {
  data?: FilteredResponse;
  error?: string | LookupError;
  loading: boolean;
};
