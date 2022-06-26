import {
    createContext,
    useCallback,
    useEffect,
    useReducer,
    useState,
  } from "react";
  import { useLocation, useNavigate } from "react-router-dom";
  import { AuthState, UserLoginCredentials } from "../constants/auth.types";
  import { loading, ProviderProps } from "../constants/videos.types";
  import { useAsync } from "../hooks/useAxios";
  import { useLocalStorage } from "../hooks/useLocalStorage";
  import { AuthReducer } from "../reducers/AuthReducer";
  import {
    loginService,
    setupAuthExceptionHandler,
    setupAuthHeaderForServiceCalls,
  } from "../services/auth/loginService";
  
  export const AuthContext = createContext<{
    authState: AuthState;
    loginUserWithCredentials: (
      userLoginCredentials: UserLoginCredentials
    ) => void;
    status: loading;
  }>({
    authState: { loggedInUser: null, token: null },
    loginUserWithCredentials: (userLoginCredentials: UserLoginCredentials) => { },
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
  
    const { execute, status, response } = useAsync(loginService, false, null);
  
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
  
      if (status === `success`) {
        const {
          data: { token },
        } = response;
        const authState = {
          loggedInUser: email,
          token,
        };
  
        authDispatch({
          type: `LOGIN_USER`,
          payload: authState,
        });
        setupAuthHeaderForServiceCalls(authState.token);
        setLocalStorageItem(authState);
        
        (state as { from: string })?.from && navigate(`${(state as { from: string }).from}`) 
      } else {
        if (localStorageItem.token) {
          authDispatch({
            type: `LOGIN_USER`,
            payload: localStorageItem,
          });
          (state as { from: string })?.from && navigate(`${(state as { from: string }).from}`) 
        }
      }
    }, [status]);
  
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
  
    const signupUserWithCredentials = () => { };
  
    setupAuthExceptionHandler({ navigate, logout });
  
    return (
      <AuthContext.Provider
        value={{ authState, loginUserWithCredentials, status }}
      >
        {children}
      </AuthContext.Provider>
    );
  };
  