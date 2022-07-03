import { Video } from "../../constants/videos.types";

export const getTotalViewsOnPublishedVideos = (
  acc: { male: number; female: number; others: number },
  current: Video
) => {
  return {
    ...acc,
    male: acc.male + current.views.male,
    female: acc.female + current.views.female,
    others: acc.others + current.views.others,
  };
};
