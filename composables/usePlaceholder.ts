/**
 * Get the 1st letter of each word in a string and limit the word count to only 2 letters.
 * @param sentence e.g. civilization realm
 * @returns e.g. cr
 */
export const usePlaceholder = (text: string) => {
  const regex = /\b(\w)/g;
  const matches = text.match(regex);
  return matches ? matches.slice(0, 2).join("") : "";
};
