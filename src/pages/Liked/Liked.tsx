import { Loader } from "kaali-ui";

import { useState } from "react";


import { NO_VIDEOS_FOUND, Video } from "../../constants/videos.types";
import { usePlaylists } from "../../hooks/usePlaylists";
import { default as historyStyles } from "../History/History.module.css";
import { MobileSidebar } from "../../components/MobileSidebar/MobileSidebar";
import { Sidebar } from "../../components/Sidebar/Sidebar";
import { PlaylistsVideoCard } from "../../components/PlaylistsCard/PlaylistsVideoCard";
import { Navbar } from "../../components/Navbar/Navbar";
import { FlexContainer } from "../../components/FlexContainer/FlexContainer";
import { Fallback } from "../../components/Fallback/Fallback";
import { useScrollToTop } from "../../hooks/useScrollToTop";
export const Liked = () => {

  const {
    historyContainer,
    headerContainer,
    mainContainer,

    cardContainer,

  } = historyStyles;
  const [sidebar, setSidebar] = useState(false);
  const { playlistsState } = usePlaylists();
  useScrollToTop();
  return (
    <>
      <Navbar setSidebar={setSidebar} />
      <MobileSidebar status={{ sidebar, setSidebar }} />
      <div className={`${historyContainer}`}>
        <div
          className={`${headerContainer} header header-secondary text-white`}
        >
          Liked
        </div>

        <Sidebar />
        <div className={`${mainContainer}`}>
          <div className={`${cardContainer}`}>


            {playlistsState.likedVideosData.loading === `loading` ? <><FlexContainer><Loader /></FlexContainer></> :
              playlistsState.likedVideosData.likedVideos.videos.length > 0 ? playlistsState.likedVideosData.likedVideos.videos.map((video: Video) => {
                return <PlaylistsVideoCard key={video._id} video={video}
                  playlistId={null}
                />
              }) : <Fallback fallbackTitle={`${NO_VIDEOS_FOUND}`} />
            }

          </div>
        </div>
      </div>
    </>
  );
};
