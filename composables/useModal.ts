export const useModal = (state: boolean, payload?: Modal["payload"]) => {
  const modal = useState<Modal>("modal");
  modal.value = { isOpen: state, payload };
};
