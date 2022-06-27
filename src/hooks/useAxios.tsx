import { AxiosResponse } from "axios";
import { useCallback, useEffect, useState } from "react";
import { loading } from "../constants/videos.types";

const useAsync = (
  asyncFunction: (params: any) => Promise<AxiosResponse>,
  callImmediately: boolean,
  params: any
) => {

  const [status, setStatus] = useState<loading>(`idle`);
  const [response, setResponse] = useState<any>(null);
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
          console.log(
            `returning response from useAsync asyncFunction`,
            responseFromAsyncFunction
          );
          setResponse(responseFromAsyncFunction);
          setStatus(`success`);
        } catch (error) {
          console.error(
            `some error occured while performing the API call`,
            error
          );
          setErrorMessage(`${error}`);
          setStatus(`error`);
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
