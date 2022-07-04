import { ACTION, LOGIN_USER, LOGOUT } from "../constants/actions.types";
import { AuthState } from "../constants/auth.types";
import { initialAuthState } from "../contexts/auth-context";

export const actionMap = new Map<
  string,
  (state: AuthState, action: ACTION) => AuthState
>([
  [
    LOGIN_USER,
    (state: AuthState, action: ACTION) => {
      if (action.type === LOGIN_USER) {
        return {
          ...state,
          loggedInUser: action.payload.loggedInUser,
          token: action.payload.token,
        };
      }
      return state;
    },
  ],
  [
    LOGOUT,
    (state: AuthState, action: ACTION) => {
      return initialAuthState;
    },
  ],
]);

export const AuthReducer = (state: AuthState, action: ACTION) => {
  
  const mappedAction = actionMap.get(action.type);

  return mappedAction ? mappedAction(state, action) : state;
};
