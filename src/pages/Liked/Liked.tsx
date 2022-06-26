

import { LikedVideoCard } from "../../components/LikedVideoCard";
import { usePlaylists } from "../../hooks/usePlaylists";

export const Liked = () => {
  const { playlistsState } = usePlaylists()
  const { likedVideosData } = playlistsState;

  if (likedVideosData.likedVideos.videos.length > 0) {
    return (
      <>
        <div className="header header-secondary p-1">
          {likedVideosData.likedVideos.videos.map((video, index) => {
            
            return <LikedVideoCard video={video} key={video._id} index={index} />
          })}
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className="header header-secondary">No Liked Videos :( </div>
      </>
    );
  }
};
