import axios, { AxiosResponse } from "axios";
import { BASE_API } from "../../constants/api";
import { getErrorMessage } from "../../utils/getErrorMessage";

export const getNotesService = ({
  videoId,
}: {
  videoId: string;
}): Promise<AxiosResponse> => {
  try {
    const response = axios.get(`${BASE_API}/videos/${videoId}/notes`);
    return response; 
  } catch (error) {
    console.error(`something went wrong while saving notes`, error);
    throw new Error(getErrorMessage(error));
  }
};
