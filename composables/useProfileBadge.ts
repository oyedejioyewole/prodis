export const useProfileBadge = (userFlag?: number) => {
  return userFlag
    ? [
        { value: 1 << 6, name: "hypesquad-house-bravery" },
        { value: 1 << 7, name: "hypesquad-house-brilliance" },
        { value: 1 << 8, name: "hypesquad-house-balance" },
      ].find((flag) => flag.value === userFlag)
    : null;
};
