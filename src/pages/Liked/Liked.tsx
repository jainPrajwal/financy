import { Avatar, Loader } from "kaali-ui";

import { useState } from "react";
import { MdMenu } from "react-icons/md";
import { default as common } from "../../common/common.module.css";

import { Video } from "../../constants/videos.types";
import { usePlaylists } from "../../hooks/usePlaylists";
import { default as historyStyles } from "../History/History.module.css";
import { MobileSidebar } from "../../components/MobileSidebar/MobileSidebar";
import { Sidebar } from "../../components/Sidebar/Sidebar";
import { PlaylistsVideoCard } from "../../components/PlaylistsCard/PlaylistsVideoCard";
import { Navbar } from "../../components/Navbar/Navbar";
import { FlexContainer } from "../../components/FlexContainer/FlexContainer";
export const Liked = () => {
  const {
    navbar,
    publisherAvatar,
    wrapperLogo,
    hamburgerMenu,
    btnTrash
  } = common;
  const {
    historyContainer,
    headerContainer,
    mainContainer,
    publisherName,
    cardContainer,
    card,
    cardWrapper,
    cardImageWrapper,

    cardImage,
    cardTitle,
    iconDelete
  } = historyStyles;
  const [sidebar, setSidebar] = useState(false);
  const { playlistsState } = usePlaylists();
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
              playlistsState.likedVideosData.likedVideos.videos.map((video: Video) => {
                return <PlaylistsVideoCard key={video._id} video={video}
                  playlistId={null}
                />
              })
            }

          </div>
        </div>
      </div>
    </>
  );
};
