import { Loader } from "kaali-ui";


import { default as historyStyles } from "../History/History.module.css";




import { MobileSidebar } from "../../components/MobileSidebar/MobileSidebar"
import { useState } from "react";
import { Sidebar } from "../../components/Sidebar/Sidebar";

import { usePlaylists } from "../../hooks/usePlaylists";

import { NO_VIDEOS_FOUND, Video } from "../../constants/videos.types";
import { PlaylistsVideoCard } from "../../components/PlaylistsCard/PlaylistsVideoCard";
import { Navbar } from "../../components/Navbar/Navbar";
import { FlexContainer } from "../../components/FlexContainer/FlexContainer";
import { Fallback } from "../../components/Fallback/Fallback";
export const History = () => {

    const {
        historyContainer,
        headerContainer,
        mainContainer,

        cardContainer,

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
                            playlistsState.historyData.history.videos.length > 0 ? playlistsState.historyData.history.videos.map((video: Video) => {
                                return <PlaylistsVideoCard key={video._id} video={video} playlistId={null} />
                            }) : <Fallback fallbackTitle={`${NO_VIDEOS_FOUND}`} />
                        }

                    </div>
                </div>
            </div>
        </>
    );
};
