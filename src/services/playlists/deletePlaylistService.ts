import axios, { AxiosResponse } from "axios";
import { BASE_API } from "../../constants/api";
import { getErrorMessage } from "../../utils/getErrorMessage";

export const deletePlaylistService = async ({
  playlistId,
}: {
  playlistId: string;
}): Promise<AxiosResponse> => {
  try {
    const response = await axios.delete(`${BASE_API}/playlists/${playlistId}`);
    return response;
  } catch (error) {
    console.error(`something went wrong while deleting playlist`);
    throw new Error(getErrorMessage(error));
  }
};
