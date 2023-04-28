import type { AccountBadges } from "~/project";

export const useBadge = (badge: number) => {
  const availableBadges = [
    { value: 1 << 0, name: "staff" },
    { value: 1 << 1, name: "partner" },
    { value: 1 << 2, name: "hypesquad" },
    { value: 1 << 3, name: "bug-hunter-1" },
    { value: 1 << 6, name: "hypesquad-online-house-1" },
    { value: 1 << 7, name: "hypesquad-online-house-2" },
    { value: 1 << 8, name: "hypesquad-online-house-3" },
    { value: 1 << 9, name: "premium-early-supporter" },
    { value: 1 << 10, name: "team-pseudo-user" },
    { value: 1 << 14, name: "bug-hunter-2" },
    { value: 1 << 16, name: "verified-bot" },
    { value: 1 << 17, name: "verified-developer" },
    { value: 1 << 18, name: "certified-moderator" },
    { value: 1 << 19, name: "bot-http-interactions" },
    { value: 1 << 22, name: "active-developer" },
  ];

  const result = availableBadges.find(
    ({ value: badgeValue }) => badge === badgeValue
  );

  return result ? (result.name as AccountBadges) : "none";
};
