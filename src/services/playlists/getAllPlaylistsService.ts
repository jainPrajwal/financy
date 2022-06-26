import axios, { AxiosResponse } from "axios";
import { BASE_API } from "../../constants/api";
import { getErrorMessage } from "../../utils/getErrorMessage";

export const getAllPlaylistsService = async (): Promise<
  AxiosResponse<any, any>
> => {
  
    
  try {
    const response = await axios.get(`${BASE_API}/playlists`);
    return response;
  } catch (error) {
    console.error(
      `some error occured while getting playlists of a user`,
      error
    );

    throw new Error(getErrorMessage(error));
  }
};
