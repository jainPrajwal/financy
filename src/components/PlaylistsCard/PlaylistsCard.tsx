import { default as common } from "../../common/common.module.css";
import { Avatar } from "kaali-ui";

import { default as playlistsStyles } from "./Playlists.module.css";

import { MdMenu, MdPlaylistPlay } from "react-icons/md";

import { MobileSidebar } from "../MobileSidebar/MobileSidebar";
import { useState } from "react";
import { Sidebar } from "../Sidebar/Sidebar";
import { useNavigate } from "react-router-dom";
import { Playlist } from "../../constants/playlists.types";
export const PlaylistsCard = ({ playlist }: { playlist: Playlist }) => {

    const {
        playlistsContainer,
        headerContainer,
        mainContainer,

        cardContainer,
        card,
        cardWrapper,
        cardImageWrapper,

        cardImage,
        cardTitle,

        cardOverlay
    } = playlistsStyles;
    const navigate = useNavigate();

    const videoInMostRecentPlaylist = playlist.videos[playlist.videos.length - 1];
    let mostRecentVideoThumbnail = `https://i.ytimg.com/img/no_thumbnail.jpg`;
    if (videoInMostRecentPlaylist) {
        mostRecentVideoThumbnail = videoInMostRecentPlaylist.thumbnails[0]?.standard?.url
    }

    return (
        <>
            <div
                className={`${cardWrapper}`}
                role="button"
                onClick={() => navigate(`/playlists/${playlist._id}`)}
            >
                <div className={`${card} w-100`}>
                    <div className={`${cardImageWrapper}`}>
                        <img
                            className={`${cardImage}`}
                            src={`${mostRecentVideoThumbnail}`}
                            alt={`${playlist.name}`}
                        />
                    </div>
                    <div className={`${cardOverlay} d-flex jc-center ai-center`}>
                        <div className={`${""} text-white`}>
                            <MdPlaylistPlay size={40} />
                        </div>
                        <div className={`${""} text-white`}>{playlist.videos.length}</div>
                    </div>
                    <div className={`${cardTitle}`}>
                        {playlist.name}
                    </div>
                </div>
            </div>

        </>
    );
};
