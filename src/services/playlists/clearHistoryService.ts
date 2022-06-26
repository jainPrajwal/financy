import axios, { AxiosResponse } from "axios";
import { BASE_API } from "../../constants/api";
import { getErrorMessage } from "../../utils/getErrorMessage";

export const clearHistoryService = async (): Promise<AxiosResponse> => {
  try {
    const response = await axios.post(`${BASE_API}/history/clear`);
    return response;
  } catch (error) {
    console.error(`something went wrong while clearing the history`, error);
    throw new Error(getErrorMessage(error));
  }
};
