import {
  ACTION,
  CLEAR_ALL,
  FILTER_BY_CATEGORY,
  LOAD_VIDEOS,
  SEARCH_BY,
  SET_LOADING,
  SET_PAGE_NUMBER,
  SORT_BY,
  UPDATE_VIDEO,
  UPLOAD_VIDEO,
} from "../constants/actions.types";
import { Video, VideosInitialState } from "../constants/videos.types";

const actionMap = new Map([
  [
    LOAD_VIDEOS,
    (state: VideosInitialState, action: ACTION) => {
      if (action.type === LOAD_VIDEOS) {
        //type narrowing
        const allVideos = [...state.videos, ...action.payload.videos].map(
          (video: Video) => [video._id, video] as [string, Video]
        );

        const videosMap = new Map(allVideos);

        return { ...state, videos: [...videosMap.values()] };
      }
      return state;
    },
  ],
  [
    UPLOAD_VIDEO,
    (state: VideosInitialState, action: ACTION) => {
      if (action.type === UPLOAD_VIDEO) {
        return { ...state, videos: state.videos.concat(action.payload.video) };
      }
      return state;
    },
  ],
  [
    SET_PAGE_NUMBER,
    (state: VideosInitialState, action: ACTION) => {
      if (action.type === SET_PAGE_NUMBER) {
        return { ...state, currentPageNumber: state.currentPageNumber + 1 };
      }
      return state;
    },
  ],
  [
    SET_LOADING,
    (state: VideosInitialState, action: ACTION) => {
      if (action.type === SET_LOADING) {
        return { ...state, loading: action.payload.loading };
      }
      return state;
    },
  ],
  [
    UPDATE_VIDEO,
    (state: VideosInitialState, action: ACTION) => {
      if (action.type === UPDATE_VIDEO) {
        return {
          ...state,
          videos: state.videos.map((video) => {
            if (video._id === action.payload.video._id) {
              return { ...action.payload.video };
            }
            return video;
          }),
        };
      }
      return state;
    },
  ],
  [
    FILTER_BY_CATEGORY,
    (state: VideosInitialState, action: ACTION) => {
      if (action.type === FILTER_BY_CATEGORY) {
        return { ...state, selectedCategory: action.payload.selectedCategory };
      }
      return state;
    },
  ],
  [
    SORT_BY,
    (state: VideosInitialState, action: ACTION) => {
      if (action.type === SORT_BY) {
        return { ...state, sortBy: action.payload.sortBy };
      }
      return state;
    },
  ],
  [
    SEARCH_BY,
    (state: VideosInitialState, action: ACTION) => {
      if (action.type === SEARCH_BY) {
        return { ...state, searchQuery: action.payload.searchQuery };
      }
      return state;
    },
  ],
  [
    CLEAR_ALL,
    (state: VideosInitialState, action: ACTION) => {
      if (action.type === CLEAR_ALL) {
        return { ...state, selectedCategory: `` };
      }
      return state;
    },
  ],
]);

export const videosReducer = (state: VideosInitialState, action: ACTION) => {
  const mappedAction = actionMap.get(action.type);

  return mappedAction ? mappedAction(state, action) : state;
};
