import { Loader } from "kaali-ui"
import { MdPlaylistAdd } from "react-icons/md";
import { Playlist } from "../../constants/playlists.types";
import { usePlaylists } from "../../hooks/usePlaylists"
import { default as common } from "../../common/common.module.css";


import { default as historyStyles } from "../History/History.module.css";

import { MdMenu, MdVerifiedUser } from "react-icons/md";

import { IoMdTrash } from "react-icons/io";
import { MobileSidebar } from "../../components/MobileSidebar/MobileSidebar"
import { useState } from "react";
import { Sidebar } from "../../components/Sidebar/Sidebar";
import { useVideos } from "../../hooks/useVideos";

import { Video } from "../../constants/videos.types";
import { PlaylistsCard } from "../../components/PlaylistsCard/PlaylistsCard";
import { Navbar } from "../../components/Navbar/Navbar";

export const Playlists = () => {
    const { playlistsState } = usePlaylists();


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


    return (
        <>
    <Navbar setSidebar={setSidebar} />
            <MobileSidebar status={{ sidebar, setSidebar }} />
            <div className={`${historyContainer}`}>
                <div
                    className={`${headerContainer} header header-secondary text-white`}
                >
                    Playlists
                </div>

                <Sidebar />
                <div className={`${mainContainer}`}>
                    <div className={`${cardContainer}`}>


                        {
                            playlistsState.customPlaylistsData.loading === `loading` ? <Loader /> :
                                playlistsState.customPlaylistsData.customPlaylists.map((customPlaylist: Playlist, index: number) => {
                                    return <PlaylistsCard playlist={customPlaylist} key={customPlaylist._id} />
                                })
                        }

                    </div>
                </div>
            </div>
        </>
    );

}