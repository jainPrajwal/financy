import { Video } from "../../constants/videos.types";

export const getLikesOfAVideo = (video: Video) => {
  return video.likes.male + video.likes.female + video.likes.others;
};
