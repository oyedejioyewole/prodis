export default defineEventHandler(async (event) => {
  // Validate route parameters
  const body = await readBody<{ payload: string }>(event);

  if (!body)
    throw createError({
      statusCode: 400,
      message: "Oops, body is empty",
    });
  else if (!body.payload)
    throw createError({
      statusCode: 400,
      message: "Oops, body doesn't have the required parameters",
    });

  // Validate session
  const sessionId = event.context.sessionId;
  const storage = useStorage("keys");
  const keysAlreadyExists = await storage.hasItem(sessionId);

  if (!keysAlreadyExists) {
    throw createError({
      statusCode: 400,
      message: "Oops, no keys were saved for this session",
    });
  }

  // Get the private key from session
  const { privateKey } = (await storage.getItem(sessionId)) as {
    privateKey: string;
    publicKey: string;
  };

  // Decode JWE token
  const { compactDecrypt, importPKCS8 } = await import("jose");

  const key = await importPKCS8(privateKey, "RSA-OAEP");
  const { plaintext } = await compactDecrypt(body.payload, key);

  const { secret } = useRuntimeConfig();

  // The moment of truth
  return await createJWT({ ...JSON.parse(plaintext.toString()) }, secret);
});
