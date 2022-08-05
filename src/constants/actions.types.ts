import { AuthState, signupUserCredentials } from "./auth.types";
import { Note } from "./notes.types";
import { Payment } from "./payment.types";
import { Playlist } from "./playlists.types";
import { Video } from "./videos.types";

export const LOAD_VIDEOS = "LOAD_VIDEOS";
export const UPLOAD_VIDEO = "UPLOAD_VIDEO";
export const SET_PAGE_NUMBER = "SET_PAGE_NUMBER";
export const RESET_PAGE_NUMBER = "RESET_PAGE_NUMBER";
export const SET_LOADING = "SET_LOADING";

export const ADD_TO_PLAYLIST = "ADD_TO_PLAYLIST";

export const REMOVE_FROM_PLAYLIST = "REMOVE_FROM_PLAYLIST";

export const CREATE_PLAYLIST = "CREATE_PLAYLIST";
export const DELETE_PLAYLIST = "DELETE_PLAYLIST";
export const UPDATE_PLAYLIST = "UPDATE_PLAYLIST";
export const RESET_PLAYLIST = "RESET_PLAYLIST";

export const FILTER_BY_CATEGORY = `FILTER_BY_CATEGORY`;
export const CLEAR_ALL = `CLEAR_ALL`;
export const SORT_BY = `SORT_BY`;
export const SEARCH_BY = `SEARCH_BY`;

export const LOGIN_USER = "LOGIN_USER";
export const SIGNUP_USER = "SIGNUP_USER";
export const LOGOUT = "LOGOUT";

export const UPDATE_VIDEO = "UPDATE_VIDEO";

export const LOAD_NOTES = `LOAD_NOTES`;
export const ADD_NOTE = "ADD_NOTE";
export const DELETE_NOTE = "DELETE_NOTE";
export const UPDATE_NOTE = "UPDATE_NOTE";

export const SET_PAYMENT = `SET_PAYMENT`;

export type ACTION =
  | {
      type: typeof LOAD_VIDEOS;
      payload: { videos: Array<Video> };
    }
  | {
      type: typeof UPLOAD_VIDEO;
      payload: {
        video: Video;
      };
    }
  | {
      type: typeof SET_PAGE_NUMBER;
    }
  | {
      type: typeof RESET_PAGE_NUMBER;
    }
  | {
      type: typeof SET_LOADING;
      payload: {
        loading: `idle` | `loading` | `error` | `success`;
      };
    }
  | {
      type: typeof ADD_TO_PLAYLIST;
      payload: {
        video: Video;
        playlist: Playlist;
      };
    }
  | {
      type: typeof REMOVE_FROM_PLAYLIST;
      payload: {
        video: Video;
        playlist: Playlist;
      };
    }
  | {
      type: typeof LOGIN_USER;
      payload: AuthState;
    }
  | {
      type: typeof SIGNUP_USER;
      payload: {
        signupUserCredentials: signupUserCredentials;
      };
    }
  | {
      type: typeof LOGOUT;
    }
  | {
      type: typeof CREATE_PLAYLIST;
      payload: { playlist: Playlist };
    }
  | {
      type: typeof FILTER_BY_CATEGORY;
      payload: {
        selectedCategory: string;
      };
    }
  | {
      type: typeof SEARCH_BY;
      payload: {
        searchQuery: string;
      };
    }
  | {
      type: typeof CLEAR_ALL;
    }
  | {
      type: typeof SORT_BY;
      payload: {
        sortBy: string | null;
      };
    }
  | {
      type: typeof UPDATE_VIDEO;
      payload: {
        video: Video;
      };
    }
  | {
      type: typeof ADD_NOTE;
      payload: {
        note: Note;
      };
    }
  | {
      type: typeof DELETE_NOTE;
      payload: {
        noteId: string | null;
      };
    }
  | {
      type: typeof UPDATE_NOTE;
      payload: {
        note: Note;
      };
    }
  | {
      type: typeof LOAD_NOTES;
      payload: {
        notes: Array<Note>;
      };
    }
  | {
      type: typeof SET_PAYMENT;
      payload: {
        payment: Payment;
      };
    }
  | {
      type: typeof DELETE_PLAYLIST;
      payload: {
        playlistId: string;
      };
    }
  | {
      type: typeof RESET_PLAYLIST;
    };
