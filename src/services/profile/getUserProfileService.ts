import axios, { AxiosResponse } from "axios";
import { BASE_API } from "../../constants/api";
import { getErrorMessage } from "../../utils/getErrorMessage";

export const getUserProfileService = async (): Promise<AxiosResponse> => {
  try {
    const response = await axios.get(`${BASE_API}/profile`);
    return response;
  } catch (error) {
    console.error(`somehting went wrong while getting the user profile`, error);
    throw new Error(getErrorMessage(error));
  }
};
