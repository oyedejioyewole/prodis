export const useDownload = async (payload: unknown, name: string) => {
  const { saveAs } = await import("file-saver");
  saveAs(
    new Blob([JSON.stringify(payload)], { type: "application/json" }),
    `${name}.json`,
    { autoBom: true }
  );
};
