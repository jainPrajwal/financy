import { Loader } from "kaali-ui"
import { Playlist } from "../../constants/playlists.types";
import { usePlaylists } from "../../hooks/usePlaylists"
import { default as historyStyles } from "../History/History.module.css";
import { MobileSidebar } from "../../components/MobileSidebar/MobileSidebar"
import { useState } from "react";
import { Sidebar } from "../../components/Sidebar/Sidebar";
import { PlaylistsCard } from "../../components/PlaylistsCard/PlaylistsCard";
import { Navbar } from "../../components/Navbar/Navbar";
import { Fallback } from "../../components/Fallback/Fallback";
import { useScrollToTop } from "../../hooks/useScrollToTop";

export const Playlists = () => {
    const { playlistsState } = usePlaylists();

    const {
        historyContainer,
        headerContainer,
        mainContainer,

        cardContainer,

    } = historyStyles;

    const [sidebar, setSidebar] = useState(false);
    useScrollToTop();


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
                                playlistsState.customPlaylistsData.customPlaylists.length > 0 ? playlistsState.customPlaylistsData.customPlaylists.map((customPlaylist: Playlist, index: number) => {
                                    return <PlaylistsCard playlist={customPlaylist} key={customPlaylist._id} />
                                }) : <Fallback fallbackTitle="No Playlist Found..!" />
                        }

                    </div>
                </div>
            </div>
        </>
    );

}