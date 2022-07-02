import { useToast } from "kaali-ui"
import {
  createContext,
  useCallback,
  useEffect,
  useReducer,
  useState,
} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastMessage } from "../components/ToastMessage/ToastMessage";
import { AuthState, signupUserCredentials, UserLoginCredentials } from "../constants/auth.types";
import { loading, ProviderProps } from "../constants/videos.types";
import { useAsync } from "../hooks/useAxios";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { AuthReducer } from "../reducers/AuthReducer";
import {
  loginService,
  setupAuthExceptionHandler,
  setupAuthHeaderForServiceCalls,
} from "../services/auth/loginService";
import { signupService } from "../services/auth/signupService";
import { showToast } from "../utils/showToast";

export const AuthContext = createContext<{
  authState: AuthState;
  loginUserWithCredentials: (
    userLoginCredentials: UserLoginCredentials
  ) => void;
  signUpUserWithCredentials: (userSignUpCredentials: signupUserCredentials) => void;
  status: loading;
}>({
  authState: { loggedInUser: null, token: null },
  loginUserWithCredentials: (userLoginCredentials: UserLoginCredentials) => { },
  signUpUserWithCredentials: (userSignUpCredentials: signupUserCredentials) => { },
  status: `idle`,
});

export const initialAuthState: AuthState = {
  loggedInUser: null,
  token: null,
};


export const AuthProvider = ({ children }: ProviderProps) => {

  const [authState, authDispatch] = useReducer(AuthReducer, initialAuthState);
  const [email, setEmail] = useState<string | null>(null);
  const navigate = useNavigate();
  const { state } = useLocation();
  const { toastDispatch } = useToast();

  const { execute, status, response } = useAsync(loginService, false, null);
  const { execute: executeSignup, response: signupResponse, status: signupStatus } = useAsync(signupService, false, null)

  const [localStorageItem, setLocalStorageItem] = useLocalStorage<AuthState>(
    `token`,
    {
      loggedInUser: null,
      token: null,
    }
  );

  const logout = useCallback(() => {
    localStorage.clear();
    authDispatch({
      type: `LOGOUT`,
    });
  }, []);

  useEffect(() => {

    if (localStorageItem.token) {
      authDispatch({
        type: `LOGIN_USER`,
        payload: localStorageItem,
      });
      (state as { from: string })?.from && navigate(`${(state as { from: string }).from}`)
    } else {
      if (status === `success`) {
        const {
          data: { message, token },
        } = response;
        const authState = {
          loggedInUser: email,
          token,
        };

        authDispatch({
          type: `LOGIN_USER`,
          payload: authState,
        });
        showToast({
          toastDispatch,
          element: (
            <ToastMessage message={message} videoId={token} />
          ),
         
          videoId: token,

        })
        setupAuthHeaderForServiceCalls(authState.token);
        setLocalStorageItem(authState);
        console.log(`state`, state);
        (state as { from: string })?.from && navigate(`${(state as { from: string }).from}`)
      }
    }

  }, [status]);

  useEffect(() => {
    if (localStorageItem.token) {
      authDispatch({
        type: `LOGIN_USER`,
        payload: localStorageItem,
      });
      (state as { from: string })?.from && navigate(`${(state as { from: string }).from}`)
    } else {
      if (signupStatus === `success`) {
        const {
          data: { message, token, user },
        } = signupResponse;
        const authState = {
          loggedInUser: user?.email,
          token,
        };

        authDispatch({
          type: `LOGIN_USER`,
          payload: authState,
        });
        setupAuthHeaderForServiceCalls(authState.token);
        setLocalStorageItem(authState);

        (state as { from: string })?.from && navigate(`${(state as { from: string }).from}`)
      }
    }

  }, [signupStatus]);

  useEffect(() => {
    if (localStorageItem.token) {

      setupAuthHeaderForServiceCalls(localStorageItem.token);
    } else if (authState.token) {


      setupAuthHeaderForServiceCalls(authState.token);
    }
  }, [authState.token, localStorageItem]);

  const loginUserWithCredentials = useCallback(
    (userLoginCredentials: UserLoginCredentials) => {

      setEmail(userLoginCredentials.email);


      execute(userLoginCredentials);
    },
    [execute]
  );

  const signUpUserWithCredentials = useCallback((userSignUpCredentials: signupUserCredentials) => {
    console.log(`user`, userSignUpCredentials)
    executeSignup({ userSignUpCredentials })
  }, [executeSignup])

  setupAuthExceptionHandler({ navigate, logout });

  return (
    <AuthContext.Provider
      value={{ authState, loginUserWithCredentials, status, signUpUserWithCredentials }}
    >
      {children}
    </AuthContext.Provider>
  );
};
