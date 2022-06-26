import { useEffect } from "react";
import { Video } from "../constants/videos.types";
import { useAsync } from "../hooks/useAxios";
import { usePlaylists } from "../hooks/usePlaylists";
import { addToPlaylistService } from "../services/playlists/addToPlaylistService";
import { removeFromPlaylistService } from "../services/playlists/removeFromPlaylistService";
import { checkIfVideoIsAlreadyPresentInSpecifiedPlaylist } from "../utils/checkIfVideoIsAlreadyPresentInSpecifiedPlaylist";
import { Avatar, Loader } from "kaali-ui"

export const LikedVideoCard = ({ video, index }: { video: Video, index: number }) => {

    const { execute: executeAddToLikeService, status: likeStatus, response: likeResponse } = useAsync(addToPlaylistService, false, null);

    const { execute: executeRemoveFromLiked, status: removeFromLikeStatus, response: removeFromLikedResponse } = useAsync(removeFromPlaylistService, false, null);



    const { execute: executeAddToWatchLaterService, status: watchLaterStatus, response: watchLaterResponse } = useAsync(addToPlaylistService, false, null);

    const { execute: executeRemoveFromWatchLater, status: removeFromWatchLaterStatus, response: removeFromWatchLaterResponse } = useAsync(removeFromPlaylistService, false, null)




    const { playlistsState, playlistsDispatch } = usePlaylists();

    useEffect(() => {
        try {
            if (likeStatus === `success`) {
                const {
                    data: { video },
                } = likeResponse;

                playlistsDispatch({
                    type: `ADD_TO_PLAYLIST`,
                    payload: {
                        video,
                        playlist: playlistsState.likedVideosData.likedVideos
                    },
                });
            }
        } catch (error) {
            console.error(`error`, error)
        }
    }, [likeStatus, likeResponse, playlistsDispatch]);

    useEffect(() => {
        try {
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
        } catch (error) {
            console.error(`error`, error);
        }
    }, [removeFromLikeStatus, removeFromLikedResponse, playlistsDispatch]);


    useEffect(() => {
        try {
            if (watchLaterStatus === `success`) {
                const {
                    data: { video },
                } = watchLaterResponse;

                playlistsDispatch({
                    type: `ADD_TO_PLAYLIST`,
                    payload: {
                        video,
                        playlist: playlistsState.watchLaterVideosData.watchLaterVideos
                    },
                });
            }
        } catch (error) {
            console.error(`error`, error);
        }
    }, [watchLaterStatus, watchLaterResponse, playlistsDispatch]);


    useEffect(() => {
        try {
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
        } catch (error) {
            console.error(`error`, error);
        }
    }, [removeFromWatchLaterStatus, removeFromWatchLaterResponse, playlistsDispatch]);

    const isVideoAlreadyPresentInLikedPlaylist =
        checkIfVideoIsAlreadyPresentInSpecifiedPlaylist(
            video,
            playlistsState.likedVideosData.likedVideos
        );

    const isVideoAlreadyPresentInWatchLaterPlaylist =
        checkIfVideoIsAlreadyPresentInSpecifiedPlaylist(
            video,
            playlistsState.watchLaterVideosData.watchLaterVideos
        );

    return (
        <div
            className={`p-1 m-1 d-flex ai-center  w-100`}
            key={`${video.url}`}
            style={{ border: `1px solid black` }}
        >
            <div>
                <span>{index}</span>
                <Avatar size={`md`} showStatus isVerified />
            </div>

            <div className="d-flex ai-start f-direction-col w-100">
                <div className={`header header-secondary`} style={{ whiteSpace: `initial` }}>{video.title}</div>

                <div className="d-flex" style={{ gap: `24px` }}>
                    <div className={`w-100`}>
                        {!isVideoAlreadyPresentInLikedPlaylist ? (
                            <button
                                className="btn btn-primary" style={{ margin: `0`, width: `inherit` }}

                                onClick={() => {

                                    executeAddToLikeService({
                                        video,
                                        playlistId:
                                            playlistsState.likedVideosData.likedVideos._id,
                                    });
                                }}
                            >
                                {likeStatus === `loading` ?

                                    <span className="w-100 h-100 d-flex jc-center">
                                        <Loader width={`12px`} height={`100%`} />
                                    </span>

                                    : `Like`}
                            </button>
                        ) : (
                            <button
                                className="btn btn-primary" style={{ margin: `0`, width: `inherit` }}
                                onClick={() => {
                                    executeRemoveFromLiked({
                                        videoId: video._id,
                                        playlistId: playlistsState.likedVideosData.likedVideos._id
                                    })
                                }}
                            >
                                {removeFromLikeStatus === `loading` ?
                                    <span className="w-100 h-100 d-flex jc-center">
                                        <Loader width={`12px`} height={`100%`} />
                                    </span>
                                    : `Unlike`}
                            </button>
                        )}
                    </div>
                    <div className={`w-100`}>
                        {!isVideoAlreadyPresentInWatchLaterPlaylist ? (
                            <button
                                className="btn btn-primary" style={{ margin: `0`, width: `inherit` }}

                                onClick={() => {
                                    
                                    executeAddToWatchLaterService({
                                        video,
                                        playlistId:
                                            playlistsState.watchLaterVideosData.watchLaterVideos._id
                                    });
                                }}
                            >
                                {watchLaterStatus === `loading` ?

                                    <span className="w-100 h-100 d-flex jc-center">
                                        <Loader width={`12px`} height={`100%`} />
                                    </span>

                                    : `Watch Later`}
                            </button>
                        ) : (
                            <button
                                className="btn btn-primary" style={{ margin: `0`, width: `inherit` }}
                                onClick={() => {
                                    
                                    executeRemoveFromWatchLater({
                                        videoId: video._id,
                                        playlistId: playlistsState.watchLaterVideosData.watchLaterVideos._id
                                    })
                                }}
                            >
                                {removeFromWatchLaterStatus === `loading` ?
                                    <span className="w-100 h-100 d-flex jc-center">
                                        <Loader width={`12px`} height={`100%`} />
                                    </span>
                                    : `Remove From Watch Later`}
                            </button>
                        )}
                    </div>
                    <div className={`w-100`}>
                        <button className="btn btn-primary" style={{ margin: `0`, width: `inherit` }}>
                            Add To Playlists
                        </button>
                    </div>
                    <div className={`w-100`}>
                        <button className="btn btn-primary" style={{ margin: `0`, width: `inherit` }}>
                            View Details
                        </button>
                    </div>
                </div>



            </div>

        </div>

    );
}