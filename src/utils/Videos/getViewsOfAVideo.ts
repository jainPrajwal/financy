import { Video } from "../../constants/videos.types";

export const getViewsOfAVideo = (video: Video): number => {
  return video.views.male + video.views.female + video.views.others;
};
