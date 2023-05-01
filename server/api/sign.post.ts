export default defineEventHandler(async (event) => {
  const body = await readBody<{ payload: {} }>(event);

  if (!body)
    throw createError({
      statusCode: 400,
      message: "Oops, body is empty",
    });

  if (!body.payload)
    throw createError({
      statusCode: 400,
      message: "Oops, body doesn't have the required parameters",
    });

  const { jwtSigningKey } = useRuntimeConfig();

  return await createJWT(body.payload, jwtSigningKey);
});
