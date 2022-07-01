
import { MdMenu } from "react-icons/md";
import { useParams } from "react-router"

import { usePlaylists } from "../../hooks/usePlaylists";
import { MobileSidebar } from "../../components/MobileSidebar/MobileSidebar";
import { default as common } from "../../common/common.module.css";
import { default as historyStyles } from "../History/History.module.css"
import { useState } from "react";
import { Sidebar } from "../../components/Sidebar/Sidebar";
import { PlaylistsVideoCard } from "../../components/PlaylistsCard/PlaylistsVideoCard";
import { Navbar } from "../../components/Navbar/Navbar";

export const SinglePlaylistPage = () => {
    const { playlistId } = useParams();
    const { playlistsState } = usePlaylists();
    console.log(`playlistId`, playlistId)
    const playlist = playlistsState.customPlaylistsData.customPlaylists.find(playlist => playlist._id === playlistId);




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
    return <>
    <Navbar setSidebar={setSidebar}/>
        <MobileSidebar status={{ sidebar, setSidebar }} />
        <div className={`${historyContainer}`}>
            <div
                className={`${headerContainer} header header-secondary text-white`}
            >
                Videos in {playlist?.name}
            </div>

            <Sidebar />
            <div className={`${mainContainer}`}>
                <div className={`${cardContainer}`}>


                    {

                        playlist?.videos.map(video => {
                            return <PlaylistsVideoCard
                                playlistId={playlistId || null}
                                video={video} key={video._id} />
                        })
                    }

                </div>
            </div>
        </div>
    </>
}
