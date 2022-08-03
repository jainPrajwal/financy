import axios, { AxiosResponse } from "axios";
import { BASE_API } from "../../constants/api";
import { Video } from "../../constants/videos.types";
import { getErrorMessage } from "../../utils/getErrorMessage";

export const uploadVideoService = ({
  video,
}: {
  video: Video;
}): Promise<AxiosResponse> => {
 
  try {
    const response = axios.post(`${BASE_API}/videos`, {
      video,
    });
    if(!response) {
      console.error(
        `somehting went wrong while uploading video to the server`,
       
      );
      throw new Error();
    }
    return response;
  } catch (error) {
    console.error(
      `somehting went wrong while uploading video to the server`,
      error
    );
    throw new Error(getErrorMessage(error));
  }
};
