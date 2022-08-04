import axios, { AxiosResponse } from "axios";
import { BASE_API } from "../../constants/api";

import { getErrorMessage } from "../../utils/getErrorMessage";

export const getUploadedVideosByUserService =
   (): Promise<AxiosResponse> => {
    try {
      const response =  axios.get(`${BASE_API}/videos/upload`);

    
      

      return response;
    } catch (error) {
      console.error(`error while fetching videos`, error);
      throw new Error(getErrorMessage(error));
    }
  };
