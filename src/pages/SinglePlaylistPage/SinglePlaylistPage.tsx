
import { useToast, Loader } from "kaali-ui"
import { useNavigate, useParams } from "react-router"
import { usePlaylists } from "../../hooks/usePlaylists";
import { MobileSidebar } from "../../components/MobileSidebar/MobileSidebar";
import { default as historyStyles } from "../History/History.module.css"
import { useEffect, useState } from "react";
import { Sidebar } from "../../components/Sidebar/Sidebar";
import { PlaylistsVideoCard } from "../../components/PlaylistsCard/PlaylistsVideoCard";
import { Navbar } from "../../components/Navbar/Navbar";
import { IoMdTrash } from "react-icons/io";
import { useAsync } from "../../hooks/useAxios";
import { deletePlaylistService } from "../../services/playlists/deletePlaylistService";
import { showToast } from "../../utils/showToast";
import { ToastMessage } from "../../components/ToastMessage/ToastMessage";
import { FlexContainer } from "../../components/FlexContainer/FlexContainer";
import { Fallback } from "../../components/Fallback/Fallback";
import { NO_VIDEOS_FOUND } from "../../constants/videos.types";
import { useScrollToTop } from "../../hooks/useScrollToTop";

export const SinglePlaylistPage = () => {
    const { playlistId } = useParams();
    const { playlistsState } = usePlaylists();

    const playlist = playlistsState.customPlaylistsData.customPlaylists.find(playlist => playlist._id === playlistId);





    const {
        historyContainer,
        headerContainer,
        mainContainer,

        cardContainer,

    } = historyStyles;
    const [sidebar, setSidebar] = useState(false);
    const { playlistsDispatch } = usePlaylists();
    const { toastDispatch } = useToast();
    useScrollToTop();


    const { execute: executeDeletePlaylistService, response: deletePlaylistResponse, status: deletePlaylistStatus } = useAsync(deletePlaylistService, false, null);
    const navigate = useNavigate();

    useEffect(() => {
        if (deletePlaylistStatus === `success`) {
            const { data: { playlist, success, message }, status } = deletePlaylistResponse;

            if (status === 200 && success) {
                playlistsDispatch({
                    type: `DELETE_PLAYLIST`,
                    payload: {
                        playlistId: playlist._id
                    }
                });
                navigate(`/`)
                showToast({
                    toastDispatch,
                    element: <ToastMessage videoId={`${playlistId}`} message={`${message}`} key={`${playlistId}`} />,
                    videoId: `${playlistId}`,
                    type: `success`

                })


            } else {
                showToast({
                    toastDispatch,
                    element: <ToastMessage videoId={`${playlistId}`} message={`${message}`} key={`${playlistId}`} />,
                    videoId: `${playlistId}`,
                    type: `danger`

                })
            }
        }
    })



    return <>
        <Navbar setSidebar={setSidebar} />
        <MobileSidebar status={{ sidebar, setSidebar }} />
        <div className={`${historyContainer}`}>
            <div
                className={`${headerContainer} header header-secondary text-white d-flex jc-space-between`}
            >
                Videos in {playlist?.name}
                <div className="d-flex gap-10">
                    <div>
                        <button className={`btn text-white`}

                            style={{ backgroundColor: `var(--tube-theme-error)` }}
                            onClick={() => {
                                executeDeletePlaylistService({
                                    playlistId
                                });
                            }}
                        >
                            <span className="d-flex ai-center">
                                <span><IoMdTrash size={22} /></span>
                                <span className="ml-md"> Delete  Playlist</span>

                            </span>
                        </button>

                    </div>

                </div>
            </div>

            <Sidebar />
            <div className={`${mainContainer}`}>
                {deletePlaylistStatus === `loading` ?
                    <FlexContainer>
                        <Loader />
                    </FlexContainer>
                    : <div className={`${cardContainer}`}>


                        {

                            playlist?.videos && playlist.videos.length > 0 ? playlist?.videos.map(video => {
                                return <PlaylistsVideoCard
                                    playlistId={playlistId || null}
                                    video={video} key={video._id} />
                            }) : <Fallback fallbackTitle={`${NO_VIDEOS_FOUND}`} />
                        }

                    </div>}
            </div>
        </div>
    </>
}
