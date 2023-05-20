export const useModal = (state: boolean, payload?: Modal["payload"]) =>
  (useState<Modal>("modal").value = { isOpen: state, payload });
