import axios, { AxiosResponse } from "axios";
import { BASE_API } from "../../constants/api";
import { Video } from "../../constants/videos.types";
import { getErrorMessage } from "../../utils/getErrorMessage";

export const addToPlaylistService = async ({
  video,
  playlistId,
}: {
  video: Video;
  playlistId: string;
}): Promise<AxiosResponse> => {
  try {
    
    const response = await axios.post(
      `${BASE_API}/playlists/${playlistId}/videos`,
      {
        video,
      }
    );

    return response;
  } catch (error) {
    console.error(`some error occured while liking the video`, error);
    throw new Error(getErrorMessage(error));
  }
};
