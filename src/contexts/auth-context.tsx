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
import { v4 as uuid } from "uuid"
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
  loginStatus: loading;
  signupStatus: loading;
  logout: () => void
}>({
  authState: { loggedInUser: null, token: null },
  loginUserWithCredentials: (userLoginCredentials: UserLoginCredentials) => { },
  signUpUserWithCredentials: (userSignUpCredentials: signupUserCredentials) => { },
  logout: () => { },
  loginStatus: `idle`,
  signupStatus: `idle`
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

  const { execute, status: loginStatus, response } = useAsync(loginService, false, null);
  const { execute: executeSignup, response: signupResponse, status: signupStatus } = useAsync(signupService, false, null)



  const logout = () => {
    localStorage.removeItem(`token`)

    authDispatch({
      type: `LOGOUT`,
    });
    navigate(`/login`);
    showToast({
      toastDispatch,
      element: (
        <ToastMessage message={`Logged Out! See you soon..😿`} videoId={authState.token || `default`} />
      ),

      videoId: authState.token || `default`,

    })
  }


  useEffect(() => {
    try {
      const localItem = localStorage.getItem(`token`);
      const localStorageItem = localItem && JSON.parse(localItem);
      if (localStorageItem && localStorageItem?.token) {

        authDispatch({
          type: `LOGIN_USER`,
          payload: localStorageItem,
        });
        (state as { from: string })?.from && navigate(`${(state as { from: string }).from}`)
      } else {
        if (loginStatus === `success`) {
          const {
            status, data: { message, token, success },
          } = response;
          const authState = {
            loggedInUser: email,
            token,
          };
          if (status === 201 && success) {
            authDispatch({
              type: `LOGIN_USER`,
              payload: authState,
            });

            localStorage.setItem(`token`, JSON.stringify(authState))
            showToast({
              toastDispatch,
              element: (
                <ToastMessage message={message} videoId={token} />
              ),

              videoId: token,


            })
            setupAuthHeaderForServiceCalls(authState.token);

            

          } else {
            showToast({
              toastDispatch,
              element: (
                <ToastMessage message={message} videoId={token} />
              ),

              videoId: token,


            })
          }

          (state as { from: string })?.from ? navigate(`${(state as { from: string }).from}`) : navigate(`/`)
        }
      }
    } catch (error) {
      console.error(`error 138`, error)
      const id = uuid();
      showToast({
        toastDispatch,
        element: (
          <ToastMessage message={`${error}`} videoId={id} />
        ),

        videoId: id,


      });

    }



  }, [loginStatus]);

  useEffect(() => {
    try {
      const localItem = localStorage.getItem(`token`);
      const localStorageItem = localItem && JSON.parse(localItem);
      if (localStorageItem && localStorageItem.token) {
        authDispatch({
          type: `LOGIN_USER`,
          payload: localStorageItem,
        });
        (state as { from: string })?.from && navigate(`${(state as { from: string }).from}`)
      } else {
        if (signupStatus === `success`) {
          const {
            status, data: { message, token, user, success },
          } = signupResponse;
          const authState = {
            loggedInUser: user?.email,
            token,
          };


          if (status === 201 && success) {
            authDispatch({
              type: `LOGIN_USER`,
              payload: authState,
            });

            localStorage.setItem(`token`, JSON.stringify(authState))
            setupAuthHeaderForServiceCalls(authState.token);

          } else {
            

            showToast({
              toastDispatch,
              element: (
                <ToastMessage message={`${message}`} videoId={token} />
              ),

              videoId: token,


            });
          }


          (state as { from: string })?.from && navigate(`${(state as { from: string }).from}`)
        }
      }
    } catch (error) {
      console.error(`error 207`, error)
    

    }


  }, [signupStatus]);

  useEffect(() => {
    try {
      const localItem = localStorage.getItem(`token`);
      const localStorageItem = localItem && JSON.parse(localItem);
      if (localStorageItem && localStorageItem.token) {

        setupAuthHeaderForServiceCalls(localStorageItem.token);
      } else if (authState.token) {


        setupAuthHeaderForServiceCalls(authState.token);
      }
    } catch (error) {
      console.error(`error `, error)
    }

  }, [authState.token]);

  const loginUserWithCredentials =
    (userLoginCredentials: UserLoginCredentials) => {

      setEmail(userLoginCredentials.email);


      execute(userLoginCredentials);
    }


  const signUpUserWithCredentials = useCallback((userSignUpCredentials: signupUserCredentials) => {
    
    executeSignup({ userSignUpCredentials })
  }, [executeSignup])

 useEffect(() => {
  setupAuthExceptionHandler({ navigate, logout });
 },[])

  return (
    <AuthContext.Provider
      value={{ authState, loginUserWithCredentials, loginStatus, signUpUserWithCredentials, logout, signupStatus }}
    >
      {children}
    </AuthContext.Provider>
  );
};
