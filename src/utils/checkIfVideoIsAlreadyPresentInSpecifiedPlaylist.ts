import { Playlist } from "../constants/playlists.types";
import { Video } from "../constants/videos.types";

export const checkIfVideoIsAlreadyPresentInSpecifiedPlaylist = (
  video: Video | undefined,
  playlist: Playlist
): boolean => {
  const isVideoAlreadyPresent = playlist.videos.some(
    (videoInPlaylist) => videoInPlaylist._id === video?._id
  );
  return isVideoAlreadyPresent ? isVideoAlreadyPresent : false;
};
