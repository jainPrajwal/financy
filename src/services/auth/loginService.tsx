import axios, { AxiosResponse } from "axios";
import { NavigateFunction } from "react-router-dom";
import { ACTION } from "../../constants/actions.types";
import { BASE_API } from "../../constants/api";
import { UserLoginCredentials } from "../../constants/auth.types";
import { getErrorMessage } from "../../utils/getErrorMessage";
import { showToast } from "../../utils/showToast";

export const setupAuthHeaderForServiceCalls = (
  token: string
): string | undefined => {
  if (token) {
    const bearerToken = `Bearer ${token}`;
    return (axios.defaults.headers.common["Authorization"] = bearerToken);
  }
};

export const setupAuthExceptionHandler = ({
  logout,
  navigate,
}: {
  logout: () => void;
  navigate: NavigateFunction;
}) => {
  const AUTH_ERROR = [401, 403, 409];

  axios.interceptors.response.use(
    (response) => response,
    (error) => {
      console.error(`some error occured in auth exception handler`, error?.response?.data?.message);
      if (AUTH_ERROR.includes(error?.response?.status)) {
        return Promise.reject(error?.response?.data?.message);
      } 
    }
  );
};

export const loginService = async (
  userLoginCredentials: UserLoginCredentials
): Promise<AxiosResponse> => {
  try {
    const response = await axios.post(`${BASE_API}/login`, {
      user: userLoginCredentials,
    });


    return response;
  } catch (error) {
    console.error(`catch of login service `, error);
    throw new Error(getErrorMessage(error));
  }
};
