export default defineEventHandler(async (event) => {
  // Prepare session
  const sessionId = event.context.sessionId;

  const storage = useStorage("keys");
  const keysAlreadyExists = await storage.hasItem(sessionId);

  // Check if the keys already exist (and return them if they do)
  if (keysAlreadyExists) {
    const { publicKey } = (await storage.getItem(sessionId)) as {
      publicKey: string;
      privateKey: string;
    };
    return {
      publicKey,
    };
  }

  // Generate a new key pair
  const { generateKeyPair } = await import("jose");
  const { privateKey: opaquePrivateKey, publicKey: opaquePublicKey } =
    await generateKeyPair("RSA-OAEP", { modulusLength: 4096 });

  // Export the keys
  const publicKey = opaquePublicKey.export({
    type: "spki",
    format: "pem",
  }) as string;
  const privateKey = opaquePrivateKey.export({
    type: "pkcs8",
    format: "pem",
  }) as string;

  // Save the keys (in the session)
  await storage.setItem(sessionId, {
    privateKey,
    publicKey,
  });

  // The moment of truth
  return {
    publicKey,
  };
});
