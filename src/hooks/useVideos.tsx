import { useContext } from "react";
import { VideosContext } from "../contexts/videos-context";

export const useVideos = () => {
  return useContext(VideosContext);
};
