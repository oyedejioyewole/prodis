export default defineNuxtRouteMiddleware(async (to) => {
  const { status, getSession, signOut } = useSession();

  if (status.value === "authenticated") {
    // If the user goes to the index page, while logged in, we sign them out
    if (to.name === "index") {
      signOut({ redirect: false });
    }

    // If the user goes to the account page, we fetch the session
    if (to.name === "account") {
      const session = await getSession();
      useState("session", () => ({ ...session }));
    }
  }
});
