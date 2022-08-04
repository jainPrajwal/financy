import { useContext } from "react";
import { MostWatchedVideosContext } from "../contexts/most-watched-videos-context";

export const useMostWatchedVideos = () => useContext(MostWatchedVideosContext);