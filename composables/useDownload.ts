export const useDownload = async <T>(
  payload: T,
  name: string,
  extension = ".json"
) => {
  const { saveAs } = await import("file-saver");
  saveAs(
    new Blob([JSON.stringify(payload)], { type: "application/json" }),
    `${name}${extension}`,
    { autoBom: true }
  );
};
