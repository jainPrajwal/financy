import axios from "axios";
import { BASE_API } from "../../constants/api";
import { Video } from "../../constants/videos.types";

export const addToLikeService = async (video: Video): Promise<any> => {
 
  const response = await axios.post(`${BASE_API}/videos`, {
    video,
  });
};
