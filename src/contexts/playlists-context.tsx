import { createContext, useEffect, useReducer } from "react";
import { ACTION } from "../constants/actions.types";
import { Playlist, PlaylistsState } from "../constants/playlists.types";
import { ProviderProps } from "../constants/videos.types";
import { useAuth } from "../hooks/useAuth";
import { useAsync } from "../hooks/useAxios";
import { playlistsReducer } from "../reducers/PlaylistsReducer";
import { getAllPlaylistsService } from "../services/playlists/getAllPlaylistsService";

const playlistsInitialState: PlaylistsState = {
  customPlaylistsData: {
    customPlaylists: [],
    loading: `idle`,
  },
  historyData: {
    history: {
      _id: null,
      _v: -1,
      description: null,
      isDefault: false,
      name: null,
      owner: null,
      thumbnail: null,
      type: null,
      videos: [],
    },
    loading: `idle`,
  },
  likedVideosData: {
    likedVideos: {
      _id: null,
      _v: -1,
      description: null,
      isDefault: false,
      name: null,
      owner: null,
      thumbnail: null,
      type: null,
      videos: [],
    },
    loading: `idle`,
  },
  watchLaterVideosData: {
    watchLaterVideos: {
      _id: null,
      _v: -1,
      description: null,
      isDefault: false,
      name: null,
      owner: null,
      thumbnail: null,
      type: null,
      videos: [],
    },
    loading: `idle`,
  },
};

export const PlaylistsContext = createContext<{
  playlistsState: PlaylistsState;
  playlistsDispatch: React.Dispatch<ACTION>;
}>({ playlistsState: playlistsInitialState, playlistsDispatch: () => { } });

export const PlaylistsProvider = ({ children }: ProviderProps) => {
  
  const [playlistsState, playlistsDispatch] = useReducer(
    playlistsReducer,
    playlistsInitialState
  );
  const { execute, response, status } = useAsync(
    getAllPlaylistsService,
    false,
    null
  );

  const {
    authState: { token },
  } = useAuth();
  

  useEffect(() => {
    const local = localStorage.getItem(`token`);
    const localtoken = local ? JSON.parse(local) : null;
    
    if (token || localtoken?.token) {
      execute(null);
    }
  }, [token, execute]);
  useEffect(() => {
    if (status === `success`) {
      
      try {
        const {
          data: { playlists },
        } = response;
        if (playlists?.length > 0) {
          
          playlists.forEach((playlist: Playlist) => {
            
            playlistsDispatch({
              type: `CREATE_PLAYLIST`,
              payload: {
                playlist,
              },
            });
          });
        }
      } catch (error) {
        console.error(`error occured`, error)
      }



    }
  }, [status, response]);
  return (
    <PlaylistsContext.Provider value={{ playlistsState, playlistsDispatch }}>
      {children}
    </PlaylistsContext.Provider>
  );
};

/**
 *   {
        _id: ``,
        _v: -1,
        description: ``,
        isDefault: false,
        name: ``,
        owner: ``,
        thumbnail: ``,
        type: ``,
        videos: [],
      },
 */
