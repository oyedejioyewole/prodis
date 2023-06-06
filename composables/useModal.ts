export const useModal = (state: boolean, payload?: Modal["payload"]) => {
  const modal = document.querySelector("dialog#faq") as HTMLDialogElement;
  const modalPayload = useState<Modal>("modal");

  if (state) {
    modalPayload.value = { payload };
    modal.showModal();
  } else {
    modalPayload.value = { payload: undefined };
    modal.close();
  }
};
