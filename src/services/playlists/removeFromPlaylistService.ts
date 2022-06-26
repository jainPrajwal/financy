import axios, { AxiosResponse } from "axios";
import { BASE_API } from "../../constants/api";
import { getErrorMessage } from "../../utils/getErrorMessage";

export const removeFromPlaylistService = async ({
  videoId,
  playlistId,
}: {
  videoId: string;
  playlistId: string;
}): Promise<AxiosResponse> => {
  try {
    const response = await axios.delete(
      `${BASE_API}/playlists/${playlistId}/videos/${videoId}`
    );
    return response;
  } catch (error) {
    console.error(
      `something went wrong while removing video from liked playlist`
    );
    throw new Error(getErrorMessage(error));
  }
};
