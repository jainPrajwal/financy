import { AxiosResponse } from "axios";
import { useCallback, useEffect, useState } from "react";
import { loading } from "../constants/videos.types";
import { useToast } from "kaali-ui"
import { showToast } from "../utils/showToast";
import { ToastMessage } from "../components/ToastMessage/ToastMessage";

const useAsync = (
  asyncFunction: (params: any) => Promise<AxiosResponse>,
  callImmediately: boolean,
  params: any
) => {

  const [status, setStatus] = useState<loading>(`idle`);
  const [response, setResponse] = useState<any>(null);
  const { toastDispatch } = useToast();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  //   useCallback, so that execute is not created on each re-render
  const execute = useCallback(
    (params: any) => {
      (async () => {
        setStatus(`loading`);
        setResponse(null);
        setErrorMessage(null);

        try {
          const responseFromAsyncFunction = await asyncFunction(params);
          console.log(`return from async function `, responseFromAsyncFunction)
           
          setResponse(responseFromAsyncFunction);
          setStatus(`success`);
        } catch (error) {
          console.error(
            `some error occured while performing the API call`,
            (error as any)?.response
          );
          setErrorMessage(`${error}`);
          setStatus(`error`);

          showToast({
            toastDispatch,
            element: <ToastMessage message={`${error}`} videoId={Date.now().toString()} key={Date.now().toString()} />,
            videoId: Date.now().toString(),
            type: `danger`
          })
        }
      })();
    },
    [asyncFunction]
  );

  useEffect(() => {
    if (callImmediately) {
      execute(params);
    }
  }, []);

  return { execute, status, response, errorMessage };
};

export { useAsync };
