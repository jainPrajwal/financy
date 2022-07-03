import { Video } from "../../constants/videos.types";

export const getTotallikesOnPublishedVideos = (
  acc: { male: number; female: number; others: number },
  current: Video
) => {
  return {
    ...acc,
    male: acc.male + current.likes.male,
    female: acc.female + current.likes.female,
    others: acc.others + current.likes.others,
  };
};
