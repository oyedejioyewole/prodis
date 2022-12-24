// Utility to convert a locale to a flag or country name
// Usage: useLocale("flag", "🇬🇧") or useLocale("convert", "en-US")
export const useLocale = async (type: "flag" | "convert", _locale: string) => {
  const locale = await import("locale-code");
  const emoji = await import("country-code-emoji");

  return type === "flag"
    ? emoji.countryCodeEmoji(locale.default.getCountryCode(_locale))
    : locale.default.getCountryName(_locale);
};
