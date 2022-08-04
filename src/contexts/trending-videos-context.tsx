import { createContext, useState } from "react";
import { ProviderProps, Video } from "../constants/videos.types";

export const TrendingVideosContext = createContext<{
    trendingVideos: { videos: Video[] },
    setTrendingVideos: React.Dispatch<React.SetStateAction<{
        videos: Video[];
    }>>
}>({
    trendingVideos: { videos: [] },
    setTrendingVideos: () => { }
});

export const TrendingVideosProvider = ({ children }: ProviderProps) => {
    const [trendingVideos, setTrendingVideos] = useState<{ videos: Video[] }>({
        videos: [],
    })
    return <TrendingVideosContext.Provider value={{ trendingVideos, setTrendingVideos }}>{children}</TrendingVideosContext.Provider>
} 