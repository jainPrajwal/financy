import { useEffect, useRef } from "react";
import { getAllVideos } from "../services/videos/getAllVideos";
import { useVideos } from "./useVideos";

export const useInfiniteScroll = ({
  lastElement,
}: {
  lastElement: HTMLDivElement | null;
  setLastElement: React.Dispatch<React.SetStateAction<HTMLDivElement | null>>;
}) => {
  const { videosState, videosDispatch } = useVideos();

  const observer = useRef(
    new IntersectionObserver((entries) => {
      const firstElement = entries[0];
      if (firstElement.isIntersecting) {
        videosDispatch({
          type: `SET_PAGE_NUMBER`,
        });
      }
    })
  );

  useEffect(() => {
    try {
      (async () => {
        try {
          videosDispatch({
            type: `SET_LOADING`,
            payload: {
              loading: `loading`,
            },
          });
          const response = await getAllVideos({
            currentPageNumber: videosState.currentPageNumber,
          });
          const {
            data: { videos },
          } = response;
          videosDispatch({
            type: `SET_LOADING`,
            payload: {
              loading: `success`,
            },
          });
          videosDispatch({
            type: `LOAD_VIDEOS`,
            payload: {
              videos: videos,
            },
          });
        } catch (error) {
          videosDispatch({
            type: `SET_LOADING`,
            payload: {
              loading: `error`,
            },
          });
        }
      })();
    } catch (error) {
      console.error(`error `, error)
    }

  }, [videosState.currentPageNumber, videosDispatch]);

  useEffect(() => {
    const currentElement = lastElement;
    const currentObserver = observer.current;

    if (currentElement) {
      currentObserver.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        currentObserver.unobserve(currentElement);
      }
    };
  }, [lastElement]);
};
