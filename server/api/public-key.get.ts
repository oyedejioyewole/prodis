export default defineEventHandler(async (event) => {
  const sessionId = event.context.sessionId;

  const storage = useStorage("keys");
  const keysAlreadyExists = await storage.hasItem(sessionId);

  if (keysAlreadyExists) {
    const keys = await storage.getItem(sessionId);
    if ("publicKey" in keys && typeof keys.publicKey === "string") {
      return {
        publicKey: keys.publicKey,
      };
    }
  }

  const { generateKeyPair } = await import("jose");
  const { privateKey: opaquePrivateKey, publicKey: opaquePublicKey } =
    await generateKeyPair("RSA-OAEP", { modulusLength: 4096 });

  const publicKey = opaquePublicKey.export({ type: "spki", format: "pem" });
  const privateKey = opaquePrivateKey.export({ type: "pkcs8", format: "pem" });

  await storage.setItem(sessionId, {
    privateKey,
    publicKey,
  });

  return {
    publicKey: publicKey as string,
  };
});
