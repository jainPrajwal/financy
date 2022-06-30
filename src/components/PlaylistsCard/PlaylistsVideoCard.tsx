import { useEffect } from "react";
import { IoMdTrash } from "react-icons/io";
import { MdVerifiedUser } from "react-icons/md";
import { default as common } from "../../common/common.module.css";
import { Video } from "../../constants/videos.types";
import { useAsync } from "../../hooks/useAxios";
import { usePlaylists } from "../../hooks/usePlaylists";
import { default as historyStyles } from "../../pages/History/History.module.css";
import { clearHistoryService } from "../../services/playlists/clearHistoryService";
import { removeFromPlaylistService } from "../../services/playlists/removeFromPlaylistService";
import { Loader } from "kaali-ui"
import { useLocation } from "react-router";
import { useVideos } from "../../hooks/useVideos";
import { useProfile } from "../../hooks/useProfile";
import { updateVideoService } from "../../services/videos/updateVideoService";
export const PlaylistsVideoCard = ({ video, playlistId }: { video: Video, playlistId: string | null }) => {

    const { playlistsDispatch, playlistsState } = usePlaylists();
    const { videosState, videosDispatch } = useVideos();
    const { userProfile } = useProfile();
    const { execute: executeRemoveFromHistory, status: removeFromHistoryStatus, response: removeFromHistoryResponse } = useAsync(removeFromPlaylistService, false, null);

    const { execute: executeClearHistory, status: clearHistoryStatus, response: clearHistoryResponse } = useAsync(clearHistoryService, false, null);

    const { execute: executeRemoveFromLiked, status: removeFromLikeStatus, response: removeFromLikedResponse } = useAsync(removeFromPlaylistService, false, null);

    const { execute: executeRemoveFromWatchLater, status: removeFromWatchLaterStatus, response: removeFromWatchLaterResponse } = useAsync(removeFromPlaylistService, false, null);



    const { execute: executeUpdateVideoService, status: updateVideoStatus, response: updateVideoResponse } = useAsync(updateVideoService, false, null);

    const { execute: executeRemoveFromPlaylist, status: removeFromPlaylistStatus, response: removeFromPlaylistResponse } = useAsync(removeFromPlaylistService, false, null);



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
    const {
        navbar,
        publisherAvatar,
        wrapperLogo,
        hamburgerMenu,
        btnTrash
    } = common;

    const location = useLocation();
    console.log(`location`, location)

    useEffect(() => {
        if (removeFromHistoryStatus === `success`) {
            const {
                data: { video },
            } = removeFromHistoryResponse;

            playlistsDispatch({
                type: `REMOVE_FROM_PLAYLIST`,
                payload: {
                    video,
                    playlist: playlistsState.historyData.history
                },
            });
        }
    }, [removeFromHistoryStatus, removeFromHistoryResponse, playlistsDispatch]);

    useEffect(() => {
        if (removeFromLikeStatus === `success`) {
            const {
                data: { video },
            } = removeFromLikedResponse;

            playlistsDispatch({
                type: `REMOVE_FROM_PLAYLIST`,
                payload: {
                    video,
                    playlist: playlistsState.likedVideosData.likedVideos
                },
            });

        }
    }, [removeFromLikeStatus, removeFromLikedResponse, playlistsDispatch]);

    useEffect(() => {
        try {
            if (updateVideoStatus === `success`) {
                const {
                    data: { video },
                } = updateVideoResponse;

                videosDispatch({
                    type: `UPDATE_VIDEO`,
                    payload: {
                        video
                    },
                });
            }
        } catch (error) {
            console.error(`error`, error);

        }
    }, [updateVideoStatus, updateVideoResponse, videosDispatch]);


    useEffect(() => {
        if (removeFromWatchLaterStatus === `success`) {
            const {
                data: { video },
            } = removeFromWatchLaterResponse;

            playlistsDispatch({
                type: `REMOVE_FROM_PLAYLIST`,
                payload: {
                    video,
                    playlist: playlistsState.watchLaterVideosData.watchLaterVideos
                },
            });
        }
    }, [removeFromWatchLaterStatus, removeFromWatchLaterResponse, playlistsDispatch]);


    useEffect(() => {
        if (removeFromPlaylistStatus === `success`) {
            const playlist = playlistsState.customPlaylistsData.customPlaylists.find(playlist => playlist._id === playlistId);
            const { data: { video } } = removeFromPlaylistResponse;
            if (playlist) {

                playlistsDispatch({
                    type: `REMOVE_FROM_PLAYLIST`,
                    payload: {
                        playlist: playlist,
                        video
                    }
                })
            }
        }
    }, [removeFromPlaylistStatus, playlistsDispatch, removeFromPlaylistResponse])


    return <div className={`${cardWrapper}`}>
        {

            <div className={`${card} w-100`}>
                {removeFromHistoryStatus === `loading` || removeFromLikeStatus === `loading` || removeFromWatchLaterStatus === `loading` || removeFromPlaylistStatus === `loading` ?
                    <div className="d-flex jc-center w-100 h-100">

                        <Loader />
                    </div> : <> <div className={`${cardImageWrapper}`}>
                        <img
                            className={`${cardImage}`}
                            src={video.thumbnails[0]?.standard?.url || video.thumbnails[0]?.high?.url}
                            alt={`noice`}
                        />
                    </div>
                        <div className="p-md">


                            <div className={`${cardTitle} text-white text-bold`}>
                                {video.title}
                            </div>
                            <div className={`${iconDelete}`}>
                                <button className={`btn ${btnTrash}`} onClick={() => {
                                    switch (location.pathname) {
                                        case `/history`:
                                        console.log(`removing`)    
                                        executeRemoveFromHistory({
                                            videoId: video._id,
                                            playlistId: playlistsState.historyData.history._id
                                        });
                                            break;

                                        case `/liked`: executeRemoveFromLiked({
                                            videoId: video._id,
                                            playlistId: playlistsState.likedVideosData.likedVideos._id
                                        })
                                            if (userProfile && userProfile.gender === `male`) {

                                                executeUpdateVideoService({

                                                    video: {
                                                        likes: {
                                                            male: video.likes.male - 1,
                                                            female: video.likes.female,
                                                            others: video.likes.others

                                                        }

                                                    },
                                                    videoId: video._id
                                                })
                                            } else {
                                                executeUpdateVideoService({

                                                    video: {
                                                        likes: {
                                                            male: video.likes.male,
                                                            female: video.likes.female - 1,
                                                            others: video.likes.others

                                                        }

                                                    },
                                                    videoId: video._id
                                                })
                                            }
                                            break;


                                        case `/watchlater`: executeRemoveFromWatchLater({
                                            videoId: video._id,
                                            playlistId: playlistsState.watchLaterVideosData.watchLaterVideos._id
                                        })
                                            break;
                                        case `/playlists/${playlistId}`:
                                            console.log(`playlistId`, playlistId)
                                            if (playlistId) {
                                                executeRemoveFromPlaylist({
                                                    videoId: video._id,
                                                    playlistId
                                                })
                                            }
                                            break;
                                        default: console.log(`location default`, location)
                                            break;
                                    }
                                }
                                }>
                                    {" "}
                                    <span>
                                        {" "}
                                        <IoMdTrash size={24} />{" "}
                                    </span>{" "}
                                </button>
                            </div>
                        </div>
                    </>}
            </div>}
    </div>

}