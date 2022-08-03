import axios, { AxiosResponse } from "axios";
import { BASE_API } from "../../constants/api";


import { getErrorMessage } from "../../utils/getErrorMessage";

export const getTrendingVideos = async (
): Promise<AxiosResponse> => {
  try {
    const response = await axios.get(`${BASE_API}/videos/trending`);

    const {
      data: { success, status, message },
    } = response;
    if (status !== 200 || success === false) {
      throw new Error(message);
    }

    return response;
  } catch (error) {
    console.error(`error while fetching videos`, error);
    throw new Error(getErrorMessage(error));
  }
};
