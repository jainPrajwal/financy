import { useContext } from "react";
import { PlaylistsContext } from "../contexts/playlists-context";

export const usePlaylists = () => {
  return useContext(PlaylistsContext);
};
