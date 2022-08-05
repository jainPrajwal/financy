import {
  ACTION,
  ADD_TO_PLAYLIST,
  CREATE_PLAYLIST,
  DELETE_PLAYLIST,
  REMOVE_FROM_PLAYLIST,
  SET_LOADING,
  RESET_PLAYLIST,
} from "../constants/actions.types";
import { PlaylistsState } from "../constants/playlists.types";
import { playlistsInitialState } from "../contexts/playlists-context";

const actionMap = new Map([
  [
    CREATE_PLAYLIST,
    (state: PlaylistsState, action: ACTION) => {
      if (action.type === CREATE_PLAYLIST) {
        switch (action.payload.playlist.type) {
          case `custom`:
            const updatedPlaylist = {
              ...state,
              customPlaylistsData: {
                ...state.customPlaylistsData,
                customPlaylists: state.customPlaylistsData.customPlaylists.some(
                  (playlist) => playlist._id === action.payload.playlist._id
                )
                  ? [action.payload.playlist]
                  : state.customPlaylistsData.customPlaylists.concat(
                      action.payload.playlist
                    ),
              },
            };

            return updatedPlaylist;

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
  [
    DELETE_PLAYLIST,
    (state: PlaylistsState, action: ACTION) => {
      if (action.type === DELETE_PLAYLIST) {
        return {
          ...state,
          customPlaylistsData: {
            ...state.customPlaylistsData,
            customPlaylists: state.customPlaylistsData.customPlaylists.filter(
              (playlist) => playlist._id !== action.payload.playlistId
            ),
          },
        };
      }
      return state;
    },
  ],
  [
    RESET_PLAYLIST,
    (state: PlaylistsState, action: ACTION) => {
      console.log(`resetting playlist.. `, action);
      if (action.type === `RESET_PLAYLIST`) {
        return { ...playlistsInitialState };
      }
      return state;
    },
  ],
]);

export const playlistsReducer = (state: PlaylistsState, action: ACTION) => {
  const mappedAction = actionMap.get(action.type);
  console.log(`resetting playlist mappedAction.. `, mappedAction);
  return mappedAction ? mappedAction(state, action) : state;
};
