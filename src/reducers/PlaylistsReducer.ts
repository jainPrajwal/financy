import {
  ACTION,
  ADD_TO_PLAYLIST,
  CREATE_PLAYLIST,
  REMOVE_FROM_PLAYLIST,
  SET_LOADING,
} from "../constants/actions.types";
import { PlaylistsState } from "../constants/playlists.types";

const actionMap = new Map([
  [
    CREATE_PLAYLIST,
    (state: PlaylistsState, action: ACTION) => {
      if (action.type === CREATE_PLAYLIST) {
        switch (action.payload.playlist.type) {
          case `custom`:
            return {
              ...state,
              customPlaylistsData: {
                ...state.customPlaylistsData,
                customPlaylists:
                  state.customPlaylistsData.customPlaylists.concat(
                    action.payload.playlist
                  ),
              },
            };

          case `liked`:
            return {
              ...state,
              likedVideosData: {
                ...state.likedVideosData,
                likedVideos: action.payload.playlist,
              },
            };

          case `history`:
            return {
              ...state,
              historyData: {
                ...state.historyData,
                history: action.payload.playlist,
              },
            };

          case `watchlater`:
            return {
              ...state,
              watchLaterVideosData: {
                ...state.watchLaterVideosData,
                watchLaterVideos: action.payload.playlist,
              },
            };

          default:
            return state;
        }
      }
      return state;
    },
  ],
  [
    ADD_TO_PLAYLIST,
    (state: PlaylistsState, action: ACTION) => {
      if (action.type === ADD_TO_PLAYLIST) {
        switch (action.payload.playlist.type) {
          case `liked`:
            return {
              ...state,
              likedVideosData: {
                ...state.likedVideosData,
                likedVideos: {
                  ...state.likedVideosData.likedVideos,
                  videos: state.likedVideosData.likedVideos.videos.concat(
                    action.payload.video
                  ),
                },
              },
            };

          case `watchlater`:
            return {
              ...state,
              watchLaterVideosData: {
                ...state.watchLaterVideosData,
                watchLaterVideos: {
                  ...state.watchLaterVideosData.watchLaterVideos,
                  videos:
                    state.watchLaterVideosData.watchLaterVideos.videos.concat(
                      action.payload.video
                    ),
                },
              },
            };

          case `history`:
            return {
              ...state,
              historyData: {
                ...state.historyData,
                history: {
                  ...state.historyData.history,
                  videos: [
                    action.payload.video,
                    ...state.historyData.history.videos,
                  ],
                },
              },
            };

          case `custom`:
            return {
              ...state,
              customPlaylistsData: {
                ...state.customPlaylistsData,
                customPlaylists: state.customPlaylistsData.customPlaylists.map(
                  (customPlaylist) => {
                    if (customPlaylist._id === action.payload.playlist._id) {
                      return {
                        ...customPlaylist,
                        videos: customPlaylist?.videos.concat(
                          action.payload.video
                        ),
                      };
                    }
                    return customPlaylist;
                  }
                ),
              },
            };
        }
      }
      return state;
    },
  ],
  [
    REMOVE_FROM_PLAYLIST,
    (state: PlaylistsState, action: ACTION) => {
      if (action.type === REMOVE_FROM_PLAYLIST) {
        switch (action.payload.playlist.type) {
          case `liked`:
            return {
              ...state,
              likedVideosData: {
                ...state.likedVideosData,
                likedVideos: {
                  ...state.likedVideosData.likedVideos,
                  videos: state.likedVideosData.likedVideos.videos.filter(
                    (video) => video._id !== action.payload.video._id
                  ),
                },
              },
            };

          case `watchlater`:
            return {
              ...state,
              watchLaterVideosData: {
                ...state.watchLaterVideosData,
                watchLaterVideos: {
                  ...state.watchLaterVideosData.watchLaterVideos,
                  videos:
                    state.watchLaterVideosData.watchLaterVideos.videos.filter(
                      (video) => video._id !== action.payload.video._id
                    ),
                },
              },
            };

          case `history`:
            return {
              ...state,
              historyData: {
                ...state.historyData,
                history: {
                  ...state.historyData.history,
                  videos: state.historyData.history.videos.filter(
                    (video) => video._id !== action.payload.video._id
                  ),
                },
              },
            };

          case `custom`:
            return {
              ...state,
              customPlaylistsData: {
                ...state.customPlaylistsData,
                customPlaylists: state.customPlaylistsData.customPlaylists.map(
                  (customPlaylist) => {
                    if (customPlaylist._id === action.payload.playlist._id) {
                      return {
                        ...customPlaylist,
                        videos: customPlaylist?.videos.filter(
                          (videoInCustomPlaylist) =>
                            videoInCustomPlaylist._id !==
                            action.payload.video._id
                        ),
                      };
                    }
                    return customPlaylist;
                  }
                ),
              },
            };
        }
      }
      return state;
    },
  ],
  [
    SET_LOADING,
    (state: PlaylistsState, action: ACTION) => {
      if (action.type === `SET_LOADING`) {
        return {
          ...state,
          customPlaylistsData: {
            ...state.customPlaylistsData,
            loading: action.payload.loading,
          },
          historyData: {
            ...state.historyData,
            loading: action.payload.loading,
          },
          watchLaterVideosData: {
            ...state.watchLaterVideosData,
            loading: action.payload.loading,
          },
          likedVideosData: {
            ...state.likedVideosData,
            loading: action.payload.loading,
          },
        };
      }
      return state;
    },
  ],
]);

export const playlistsReducer = (state: PlaylistsState, action: ACTION) => {
  const mappedAction = actionMap.get(action.type);
  return mappedAction ? mappedAction(state, action) : state;
};
