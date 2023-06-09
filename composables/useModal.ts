export const useModal = (state: boolean, payload?: Modal["payload"]) => {
  const element = document.querySelector(
    "dialog#faq-dialog"
  ) as HTMLDialogElement;
  const modal = useState<Modal>("modal");

  modal.value = { payload: payload, isOpen: state };

  if (state) element.showModal();
  else element.close();
};
