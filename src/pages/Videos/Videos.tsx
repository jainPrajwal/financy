import { Video } from "../../constants/videos.types";
import { useVideos } from "../../hooks/useVideos";
import { addToLikeService } from "../../services/playlists/addToLikeService";
import { Avatar, Loader } from "kaali-ui";
import { useInfiniteScroll } from "../../hooks/useInfiniteScroll";
import { useState } from "react";
export const Videos = () => {
  const { videosState } = useVideos();
  const [lastElement, setLastElement] = useState<HTMLDivElement | null>(null);
  useInfiniteScroll({ lastElement, setLastElement });
  return (
    <>
      {videosState.videos.map((video: Video, index) => {
        if (index === videosState.videos.length - 1) {
          return (
            <div
              ref={setLastElement}
              className={`p-1 m-1 d-flex ai-center jc-start`}
              key={`${video.url}`}
              style={{ border: `1px solid black` }}
            >
              <div>
                <span>{index}</span>
                <Avatar size={`md`} showStatus isVerified />
              </div>
              <div className={`header header-secondary`}>{video.title}</div>
            </div>
          );
        }
        return (
          <div
            className={`p-1 m-1 d-flex ai-center jc-start`}
            key={`${video.url}`}
            style={{ border: `1px solid black` }}
          >
            <div>
              <span>{index}</span>
              <Avatar size={`md`} showStatus isVerified />
            </div>

            <div className="d-flex jc-start f-wrap">
              <div className={`header header-secondary`}>{video.title}</div>
              <div className={`header header-secondary`}>
                <button
                  className="btn btn-primary m-lg"
                  onClick={() => addToLikeService(video)}
                >
                  Like
                </button>
              </div>
              <div className={`header header-secondary`}>
                <button className="btn btn-primary m-lg">
                  Add to Watch Later
                </button>
              </div>
              <div className={`header header-secondary`}>
                <button className="btn btn-primary m-lg">
                  Add To Playlists
                </button>
              </div>
            </div>
          </div>
        );
      })}
      {videosState.loading === `loading` && (
        <div className="d-flex jc-center p-lg">
          <Loader />
        </div>
      )}
    </>
  );
};
