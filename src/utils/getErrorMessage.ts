// Doubt Should we throw Errors or Promise.reject also works?
export const getErrorMessage = (error: unknown) => {
    if (error instanceof Error) throw new Error(error.message);
    throw new Error(String(error));
  };
  