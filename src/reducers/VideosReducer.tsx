import { ACTION, LOAD_VIDEOS, SET_LOADING, SET_PAGE_NUMBER, UPLOAD_VIDEO } from "../constants/actions.types";
import { VideosInitialState } from "../constants/videos.types";


const actionMap = new Map([
  [
    LOAD_VIDEOS,
    (state: VideosInitialState, action: ACTION) => {
      if (action.type === LOAD_VIDEOS) { //type narrowing
        const updatedState = {
          ...state,
          videos: state.videos.concat(action.payload.videos),
        };
     
        return updatedState;
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
]);

export const videosReducer = (state: VideosInitialState, action: ACTION) => {
  const mappedAction = actionMap.get(action.type);

  return mappedAction ? mappedAction(state, action) : state;
};
