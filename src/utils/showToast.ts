export const showToast = ({
  toastDispatch,
  videoId,
  element,
  type = `success`,
}: {
  toastDispatch: any;
  videoId: string;
  element: JSX.Element;
  type?: string;
}) => {
  toastDispatch({
    type: `ADD_TOAST`,
    payload: {
      toast: {
        id: videoId,
        type,
        toastDelay: 2000,
        element,
      },
    },
  });
};
