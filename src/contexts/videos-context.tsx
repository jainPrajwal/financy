import React, { createContext, useReducer } from "react";
import { videosReducer } from "../reducers/VideosReducer";
import {
 
  ProviderProps,
  VideosInitialState,
} from "../constants/videos.types";
import { ACTION } from "../constants/actions.types";

export const initialState: VideosInitialState = {
  videos: [],
  loading: `idle`,
  sortBy: `RECOMMENDED`,
  searchQuery: ``,
  categories: ["stockmarket", "scams"],
  selectedCategory: ``,
  currentPageNumber: 1,
};

export const VideosContext = createContext<{
  videosState: typeof initialState;
  videosDispatch: React.Dispatch<ACTION>;
}>({ videosState: initialState, videosDispatch: () => {} });

const VideosProvider = ({ children }: ProviderProps) => {
  const [videosState, videosDispatch] = useReducer(videosReducer, initialState);
  return (
    <VideosContext.Provider value={{ videosState, videosDispatch }}>
      {children}
    </VideosContext.Provider>
  );
};

export { VideosProvider };
