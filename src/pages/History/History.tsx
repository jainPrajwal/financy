import { default as common } from "../../common/common.module.css";
import { Avatar } from "kaali-ui";

import { default as historyStyles } from "../History/History.module.css";

import { MdMenu, MdVerifiedUser } from "react-icons/md";

import { IoMdTrash } from "react-icons/io";
import { MobileSidebar } from "../../components/MobileSidebar/MobileSidebar"
import { useState } from "react";
import { Sidebar } from "../../components/Sidebar/Sidebar";
import { useVideos } from "../../hooks/useVideos";
import { usePlaylists } from "../../hooks/usePlaylists";
import { Loader } from "kaali-ui"
import { Video } from "../../constants/videos.types";
import { PlaylistsVideoCard } from "../../components/PlaylistsCard/PlaylistsVideoCard";
import { Navbar } from "../../components/Navbar/Navbar";
import { FlexContainer } from "../../components/FlexContainer/FlexContainer";
export const History = () => {
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
                    History
                </div>

                <Sidebar />
                <div className={`${mainContainer}`}>
                    <div className={`${cardContainer}`}>


                        {playlistsState.historyData.loading === `loading` ? <><FlexContainer><Loader /></FlexContainer></> :
                            playlistsState.historyData.history.videos.map((video: Video) => {
                                return <PlaylistsVideoCard key={video._id} video={video} playlistId={null} />
                            })
                        }

                    </div>
                </div>
            </div>
        </>
    );
};
