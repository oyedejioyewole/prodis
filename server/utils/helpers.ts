import type { AccountBadgesKeys } from "~/project";

/**
 * Using the Discord ID (snowflake), it calculates
 * the number representation of the account creation date
 *
 * @param userId discord user ID (snowflake)
 * @returns e.g. 1682455746115
 */
export const converterUserIDOrSnowflakeIntoDate = (userId: bigint) =>
  Number((userId >> BigInt(22)) + BigInt(1_420_070_400_000));

/**
 * Signs and creates a JWT token
 *
 *  @param payload e.g. {token: 'a'}
 * @param signingKey key used to sign the JWT token
 * @returns e.g. `eyJhbGciOiJIUzI1NiJ9.eyJ0b2tlbiI6ImEifQ._9qtavZvs4h1gtcP_3SP30FCvRd10w8RXo5EQcbruAg`
 */
export const createJWT = async (payload: {}, signingKey: string) => {
  const { SignJWT } = await import("jose");
  const secret = new TextEncoder().encode(signingKey);

  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .sign(secret);
};

/**
 * Verify and get payload from a JWT token
 *
 * @param jwt JWT token
 * @param signingKey key used to sign the JWT token
 * @returns e.g. {name: "Oyedeji Oyewole"}
 */
export const verifyJWT = async <T>(jwt: string, signingKey: string) => {
  const { jwtVerify } = await import("jose");
  const secret = new TextEncoder().encode(signingKey);

  try {
    const { payload } = await jwtVerify(jwt, secret);
    return payload as T;
  } catch (error) {
    return {
      error: true,
      message: "Signature verification failed",
    };
  }
};

/**
 * Format the numerical representation of a date object in a much readable format
 *
 * @param date
 * @returns e.g. 19th December, 2020
 */
export const formatDate = (date: number) => {
  const _getMonthName = (month: number) => {
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    return monthNames[month];
  };

  const _getSuffix = (dayOfMonth: number) => {
    if (dayOfMonth >= 11 && dayOfMonth <= 13) {
      return "th";
    }
    switch (dayOfMonth % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  };

  const dateObject = new Date(date);

  const year = dateObject.getFullYear();
  const month = _getMonthName(dateObject.getMonth());
  const day = {
    body: dateObject.getDate(),
    suffix: _getSuffix(dateObject.getDate()),
  };

  return `${day.body}${day.suffix} ${month}, ${year}`;
};

/**
 * Takes a badge number and performs bitwise operations to get the badges
 * @param badgeNumber e.g. 128, 130
 * @returns ['house-of-briliance'], ['house-of-brilliance', 'partnered-server-owner']
 */
export const getBadges = (badgeNumber: number) => {
  const availableBadges = {
    staff: 1 << 0,
    "partnered-server-owner": 1 << 1,
    "hypesquad-events": 1 << 2,
    "bug-hunter-1": 1 << 3,
    "house-of-bravery": 1 << 6,
    "house-of-brilliance": 1 << 7,
    "house-of-balance": 1 << 8,
    "early-supporter": 1 << 9,
    "bug-hunter-2": 1 << 14,
    "verified-bot": 1 << 16,
    "early-verified-bot-developer": 1 << 17,
    "moderator-programs-alumni": 1 << 18,
    "active-developer": 1 << 22,
  };

  const badges = Object.keys(availableBadges).filter((key) => {
    return (
      (badgeNumber & availableBadges[key as keyof typeof availableBadges]) !== 0
    );
  });

  return badges.length > 0 ? (badges as AccountBadgesKeys[]) : "none";
};

/**
 * Takes a locale string and returns the language name and flag
 * @param locale e.g. en-UK
 * @returns English 🇬🇧
 */
export const getLocale = async (locale: string) => {
  const [
    {
      default: { getLanguageName, getCountryCode },
    },
    { countryCodeEmoji },
  ] = await Promise.all([import("locale-code"), import("country-code-emoji")]);

  return `${getLanguageName(locale)} ${countryCodeEmoji(
    getCountryCode(locale)
  )}`;
};
