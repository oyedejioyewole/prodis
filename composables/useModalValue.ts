// Utility to set type of modal and its payload
export const useModalValue = (
  type: ModalTypes,
  payload: { guildName: string } | Setting | AccountInformation | {}
) => {
  const session = useState<{ user: User }>("session");
  const modal = useState<Modal>("modal");

  if (type === "guild" && "guildName" in payload) {
    if (!session.value.user.guilds) return;

    const selectedGuild = session.value.user.guilds!.find(
      (guild) => guild.name === payload.guildName
    );

    if (!selectedGuild) return;

    modal.value.payload = {
      ...selectedGuild,
      username: session.value.user.username,
    };

    modal.value.type = type;
  } else if (
    (type === "security" && "accountVerified" in payload) ||
    (type === "account" && "premiumType" in payload) ||
    type === "information"
  ) {
    modal.value.payload = payload;
    modal.value.type = type;
  }
};
