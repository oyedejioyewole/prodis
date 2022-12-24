export const useGeneratePlaceholder = (sentence: string) => {
  // Get the 1st letter of each word in a string and limit the word count to only 2 letters.
  const regex = /\b(\w)/g;
  const matches = sentence.match(regex);
  return matches ? matches.slice(0, 2).join("") : "";
};
