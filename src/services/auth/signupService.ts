import axios, { AxiosResponse } from "axios";
import { BASE_API } from "../../constants/api";
import { signupUserCredentials } from "../../constants/auth.types";
import { getErrorMessage } from "../../utils/getErrorMessage";
export const signupService = async ({
  userSignUpCredentials,
}: {
  userSignUpCredentials: signupUserCredentials;
}): Promise<AxiosResponse> => {
  try {
    const response = await axios.post(`${BASE_API}/signup`, {
      user: userSignUpCredentials,
    });
    
    return response;
  } catch (error) {
    console.error(`somehting went wrong while signing up the user `, error);
    throw new Error(getErrorMessage(error));
  }
};
