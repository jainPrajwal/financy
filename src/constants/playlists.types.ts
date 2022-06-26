import { loading, Video } from "./videos.types";

export type PlaylistsState = {
  customPlaylistsData: {
    customPlaylists: Array<Playlist>;
    loading: loading;
  };
  historyData: {
    history: Playlist;
    loading: loading;
  };
  likedVideosData: {
    likedVideos: Playlist;
    loading: loading;
  };
  watchLaterVideosData: {
    watchLaterVideos: Playlist;
    loading: loading;
  };
};

export type Playlist = {
  _id: string | null;
  owner: string | null;
  thumbnail: string | null;
  type: string | null;
  videos: Array<Video>;
  _v: number;
  isDefault: Boolean;
  description: string | null;
  name: string | null;
};
export type UserDefinedPlaylist = {
  name: null | string;
  description: null | string;
  isDefault: false;
  thumbnail: string | null;
  type: `custom`;
};
/**0:
description: ""
isDefault: true
name: "history"
owner: "628cdca6496dc17e7ee51cc2"
thumbnail: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&q=80&raw_url=true&w=870"
type: "history"
videos: []
__v: 17
_id: "628cdca6496dc17e7ee51cc4" */
