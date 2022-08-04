import { useContext } from "react";
import { TrendingVideosContext } from "../contexts/trending-videos-context";

export const useTrendingVideos = () => useContext(TrendingVideosContext);