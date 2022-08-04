import { createContext, useState } from "react";
import { ProviderProps, Video } from "../constants/videos.types";

export const MostWatchedVideosContext = createContext<{
    mostWatchedVideos: { videos: Video[] },
    setMostWatchedVideos: React.Dispatch<React.SetStateAction<{
        videos: Video[];
    }>>
}>({
    mostWatchedVideos: { videos: [] },
    setMostWatchedVideos: () => { }
});

export const MostWatchedVideosProvider = ({ children }: ProviderProps) => {
    const [mostWatchedVideos, setMostWatchedVideos] = useState<{ videos: Video[] }>({
        videos: [],
    })
    return <MostWatchedVideosContext.Provider value={{ mostWatchedVideos, setMostWatchedVideos }}>{children}</MostWatchedVideosContext.Provider>
} 