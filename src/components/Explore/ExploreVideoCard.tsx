import { useEffect, useState } from "react";
import { Video } from "../../constants/videos.types";
import { useAsync } from "../../hooks/useAxios";
import { usePlaylists } from "../../hooks/usePlaylists";
import { useVideos } from "../../hooks/useVideos";

import { Avatar, Loader } from "kaali-ui";




import { addToPlaylistService } from "../../services/playlists/addToPlaylistService";
import { removeFromPlaylistService } from "../../services/playlists/removeFromPlaylistService";
import { checkIfVideoIsAlreadyPresentInSpecifiedPlaylist } from "../../utils/checkIfVideoIsAlreadyPresentInSpecifiedPlaylist";
import { AddToPlaylistModal } from "../PlaylistModal/AddToPlaylistModal";
import { useNavigate } from "react-router-dom";
import { updateVideoService } from "../../services/videos/updateVideoService";
import { useProfile } from "../../hooks/useProfile";







export const ExploreVideoCard = ({ video, index, setLastElement }: { video: Video, index: number, setLastElement: React.Dispatch<React.SetStateAction<HTMLDivElement | null>> }) => {

    const [ismodalHidden, setIsModalHidden] = useState<Boolean>(true);

    const { execute: executeAddToLikeService, status: likeStatus, response: likeResponse } = useAsync(addToPlaylistService, false, null);

    const { execute: executeRemoveFromLiked, status: removeFromLikeStatus, response: removeFromLikedResponse } = useAsync(removeFromPlaylistService, false, null);



    const { execute: executeAddToWatchLaterService, status: watchLaterStatus, response: watchLaterResponse } = useAsync(addToPlaylistService, false, null);

    const { execute: executeRemoveFromWatchLater, status: removeFromWatchLaterStatus, response: removeFromWatchLaterResponse } = useAsync(removeFromPlaylistService, false, null)


    const { execute: executeUpdateVideoService, status: updateVideoStatus, response: updateVideoResponse } = useAsync(updateVideoService, false, null);


    const { playlistsState, playlistsDispatch } = usePlaylists();
    const { videosState, videosDispatch } = useVideos();
    const { userProfile } = useProfile();
    const navigate = useNavigate();

    useEffect(() => {
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
    }, [likeStatus, likeResponse, playlistsDispatch]);

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
    }, [watchLaterStatus, watchLaterResponse, playlistsDispatch]);


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


    if (index === videosState.videos.length - 1) {
        return (
            <div
                ref={setLastElement}
                className={`p-1 my-1 d-flex ai-center  w-100`}
                key={`${video.url}`}
                style={{ border: `1px solid black` }}
                role={`button`}
                onClick={() => {
                    navigate(`/videos/${video._id}`)
                }}
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
                            <button
                                onClick={() => setIsModalHidden(false)}
                                className="btn btn-primary" style={{ margin: `0`, width: `inherit` }}>
                                Add To Playlists
                            </button>
                        </div>
                        <div className={`w-100`}>
                            <button className="btn btn-primary" style={{ margin: `0`, width: `inherit` }}>
                                View Details
                            </button>
                        </div>

                        <div className="w-100">
                            Category: {video.category}
                        </div>
                    </div>



                </div>

            </div>
        );
    }
    return (
        <>
            {
                !ismodalHidden && <AddToPlaylistModal ismodalHidden={ismodalHidden} setIsModalHidden={setIsModalHidden} video={video} />
            }
            <div
                className={`p-1 my-1 d-flex ai-center  w-100`}
                key={`${video.url}`}
                style={{ border: `1px solid black` }}
                role={`button`}
                onClick={(e) => {
                    navigate(`/videos/${video._id}`)

                }}
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

                                    onClick={(e) => {
                                        e.stopPropagation();
                                        const foundVideo = videosState.videos.filter(eachVideo => eachVideo._id === video._id)[0];
                                        executeAddToLikeService({
                                            video,
                                            playlistId:
                                                playlistsState.likedVideosData.likedVideos._id,
                                        });
                                        if (userProfile && userProfile.gender === `male`) {

                                            executeUpdateVideoService({

                                                video: {
                                                    likes: {
                                                        male: foundVideo.likes.male + 1,
                                                        female: foundVideo.likes.female,
                                                        others: foundVideo.likes.others

                                                    }

                                                },
                                                videoId: video._id
                                            })
                                        } else {
                                            executeUpdateVideoService({

                                                video: {
                                                    likes: {
                                                        female: foundVideo.likes.female + 1,
                                                        male: foundVideo.likes.male,
                                                        others: foundVideo.likes.others

                                                    }
                                                },
                                                videoId: video._id
                                            })
                                        }

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
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        const foundVideo = videosState.videos.filter(eachVideo => eachVideo._id === video._id)[0];
                                        executeRemoveFromLiked({
                                            videoId: video._id,
                                            playlistId: playlistsState.likedVideosData.likedVideos._id
                                        })
                                        if (userProfile && userProfile.gender === `male`) {

                                            executeUpdateVideoService({

                                                video: {
                                                    likes: {
                                                        male: foundVideo.likes.male - 1,
                                                        female: foundVideo.likes.female,
                                                        others: foundVideo.likes.others

                                                    }

                                                },
                                                videoId: video._id
                                            })
                                        } else {
                                            executeUpdateVideoService({

                                                video: {
                                                    likes: {
                                                        female: foundVideo.likes.female - 1,
                                                        male: foundVideo.likes.male,
                                                        others: foundVideo.likes.others

                                                    }
                                                },
                                                videoId: video._id
                                            })
                                        }
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

                                    onClick={(e) => {
                                        e.stopPropagation();
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
                                    onClick={(e) => {
                                        e.stopPropagation();
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
                            <button className="btn btn-primary" style={{ margin: `0`, width: `inherit` }} onClick={() => setIsModalHidden(false)}>
                                Add To Playlists
                            </button>
                        </div>


                    </div>


                </div>





            </div>
        </>
    );
}