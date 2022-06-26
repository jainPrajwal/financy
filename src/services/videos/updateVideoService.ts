import axios, { AxiosResponse } from "axios";
import { BASE_API } from "../../constants/api";
import { Video } from "../../constants/videos.types";
import { getErrorMessage } from "../../utils/getErrorMessage";

export const updateVideoService = async ({
  video,
  videoId,
}: {
  video: Video | null;
  videoId: string;
}): Promise<AxiosResponse> => {
  try {
    console.log(`recived video while updating`, video);
    const response = await axios.post(`${BASE_API}/videos/${videoId}`, {
      video,
    });
    return response;
  } catch (error) {
    console.error(`somehting went wrong while updaing video`, error);
    throw new Error(getErrorMessage(error));
  }
};
