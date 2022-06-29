import { Video } from "../constants/videos.types";

export const getSearchedData = (videos: Array<Video>, searchQuery: string) => {
  return videos.filter(
    (video) =>
      video.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      video.title.toLowerCase().includes(searchQuery.toLowerCase())
  );
};
