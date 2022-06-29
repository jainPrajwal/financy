import { useEffect, useState } from "react";
import { Video } from "../../constants/videos.types";
import { useAsync } from "../../hooks/useAxios";
import { usePlaylists } from "../../hooks/usePlaylists";
import { useVideos } from "../../hooks/useVideos";
import { default as exploreStyles } from "../../pages/Explore/Explore.module.css";
import { Avatar, Loader } from "kaali-ui";
import { BsHeartFill } from "react-icons/bs";



import { addToPlaylistService } from "../../services/playlists/addToPlaylistService";
import { removeFromPlaylistService } from "../../services/playlists/removeFromPlaylistService";
import { checkIfVideoIsAlreadyPresentInSpecifiedPlaylist } from "../../utils/checkIfVideoIsAlreadyPresentInSpecifiedPlaylist";
import { AddToPlaylistModal } from "../PlaylistModal/AddToPlaylistModal";
import { useNavigate } from "react-router-dom";
import { updateVideoService } from "../../services/videos/updateVideoService";
import { useProfile } from "../../hooks/useProfile";
import { MdOutlineWatchLater, MdPlaylistAdd, MdRemoveRedEye, MdShare, MdVerifiedUser, MdWatchLater } from "react-icons/md";
import { RiVipCrown2Fill } from "react-icons/ri";
import { default as svp } from "../../pages/SingleVideoPage/SingleVideoPage.module.css";
import { IoMdHeart, IoMdHeartEmpty } from "react-icons/io";
import { useLocation } from "react-router";






export const ExploreVideoCard = ({ video, index, setLastElement }: { video: Video, index: number, setLastElement: React.Dispatch<React.SetStateAction<HTMLDivElement | null>> | null }) => {

    const [ismodalHidden, setIsModalHidden] = useState<boolean>(true);

    const { execute: executeAddToLikeService, status: likeStatus, response: likeResponse } = useAsync(addToPlaylistService, false, null);

    const { execute: executeRemoveFromLiked, status: removeFromLikeStatus, response: removeFromLikedResponse } = useAsync(removeFromPlaylistService, false, null);

    const videoId = video._id;

    const { execute: executeAddToWatchLaterService, status: watchLaterStatus, response: watchLaterResponse } = useAsync(addToPlaylistService, false, null);

    const { execute: executeRemoveFromWatchLater, status: removeFromWatchLaterStatus, response: removeFromWatchLaterResponse } = useAsync(removeFromPlaylistService, false, null)


    const { execute: executeUpdateVideoService, status: updateVideoStatus, response: updateVideoResponse } = useAsync(updateVideoService, false, null);


    const { playlistsState, playlistsDispatch } = usePlaylists();
    const { videosState, videosDispatch } = useVideos();
    const { userProfile } = useProfile();
    const navigate = useNavigate();
    const location = useLocation();

    const {
        videoContainer,
        relatedContainer,
        exploreContainer,
        headerContainer,
        videoNumber,
        videoThumbnail,
        videoThumbnailWrapper,
        videoContent,
        videoHeader,
        videoMetrics,
        publisherName,
        publisherDetails,
        likeIconButtonWrapper,
        iconButton,
        iconButtonLikeSolid,
        iconButtonLike,
        videoWrapperContainer,
        exploreWrapperContainer,
        videoThumbnailContainer,
        videoDuration,
        relatedWrapperContainer,
        relatedVideoContainer,
        relatedVideoThumbnailContainer,
        reltaedVideoThumbnailWrapper,
        relatedVideoContent,
        relatedVideoHeader,
        relatedVideoMetrics,
        chipsContainer, chip, chipClear
    } = exploreStyles;

    const {
        detailsAndActions,
        videoActions,
        videoMain,
        videoAside,
    } = svp;

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
        return <div className={`${videoContainer}`} ref={setLastElement}>

            <div className={`p-lg w-100 ${videoThumbnailContainer}`}>
                <div className={`${videoThumbnailWrapper}`}>
                    <img
                        src={`${video.thumbnails[0]?.standard?.url || video.thumbnails[0]?.high?.url}`}
                        alt="thumbnail"
                        className={`w-100 ${videoThumbnail} h-100`}
                    />
                </div>
            </div>
            <div
                className={`${videoContent}  d-flex f-direction-col jc-space-between`}
            >
                <div className={`${videoHeader} text-white text-bold fs-3`}>
                    {video.title}
                </div>
                <div
                    className={`${videoMetrics} d-flex tube-text-secondary-color `}
                >
                    <div className="d-flex ai-center">
                        <span>
                            <BsHeartFill size={20} />
                        </span>
                        <span className="pl-md "> 24,000 likes</span>
                    </div>
                    <div className="d-flex ai-center">
                        <span>
                            <MdRemoveRedEye size={20} />
                        </span>
                        <span className="pl-md "> 1,24,000 views</span>
                    </div>
                </div>
                <div className={`${publisherDetails} d-flex ai-center`}>
                    <div className={``}>
                        <Avatar
                            size={`sm`}
                           imageUrl={userProfile?.gender === `male` ? `https://res.cloudinary.com/dmk11fqw8/image/upload/v1653926221/man_6_ewkhrj.png` : `https://res.cloudinary.com/dmk11fqw8/image/upload/v1656501210/woman_1_jotf2w.png`}
                        />
                    </div>
                    <div
                        className={`${publisherName} text-bold text-white pl-lg `}
                    >
                        <div className="d-flex ai-center">
                            <div>{video.publisher.name}</div>
                            <span
                                style={{ color: `gold` }}
                                className="pl-sm"
                            >
                                <RiVipCrown2Fill size={20} />
                            </span>
                        </div>
                    </div>
                    <div className={`${videoActions} d-flex ml-auto`}>

                        {!isVideoAlreadyPresentInWatchLaterPlaylist ? <button
                            onClick={(e) => {
                                e.stopPropagation();
                                executeAddToWatchLaterService({
                                    video,
                                    playlistId:
                                        playlistsState.watchLaterVideosData.watchLaterVideos._id
                                });
                            }}
                            className={`btn btn-danger ${iconButton} d-flex ai-center jc-center`}
                        >
                            {watchLaterStatus === `loading` ?
                                <span className="w-100 h-100 d-flex jc-center">
                                    <Loader width={`20px`} height={`20px`} borderWidth={`2px`} />
                                </span>
                                : <MdOutlineWatchLater size={20} />}


                        </button> :
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    executeRemoveFromWatchLater({
                                        videoId: video._id,
                                        playlistId: playlistsState.watchLaterVideosData.watchLaterVideos._id
                                    })
                                }}
                                className={`btn btn-danger ${iconButton} d-flex ai-center jc-center`}
                            >
                                {removeFromWatchLaterStatus === `loading` ?
                                    <span className="w-100 h-100 d-flex jc-center">
                                        <Loader width={`20px`} height={`20px`} borderWidth={`2px`} />
                                    </span>
                                    : <MdWatchLater size={20} />}


                            </button>}
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                setIsModalHidden(false)
                            }}
                            className={`btn btn-danger ${iconButton} d-flex ai-center jc-center`}
                        >
                            <MdPlaylistAdd size={20} />
                        </button>


                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                // window.navigator.clipboard(``)
                            }}
                            className={`btn btn-danger ${iconButton} d-flex ai-center jc-center`}
                        >
                            <MdShare size={20} />
                        </button>
                    </div>
                </div>

            </div>
            <div className={`${likeIconButtonWrapper}`}>

                {!isVideoAlreadyPresentInLikedPlaylist ? <button
                    className={`btn btn-danger ${iconButton} ${iconButtonLike}`}
                    onClick={(e) => {
                        e.stopPropagation();
                        const foundVideo = videosState.videos.filter(video => video._id === videoId)[0];
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
                            <Loader width={`16px`} height={`16px`} borderWidth={`2px`}
                                borderTopColor={`#ef4444`}
                            />
                        </span>
                        : <IoMdHeartEmpty size={24} />}

                </button> :

                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            const foundVideo = videosState.videos.filter(video => video._id === videoId)[0];
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
                        className={`btn btn-danger ${iconButton} ${iconButtonLikeSolid} `}
                    >
                        {removeFromLikeStatus === `loading` ?
                            <span className="w-100 h-100 d-flex jc-center">
                                <Loader width={`16px`} height={`16px`} borderWidth={`2px`}
                                    borderTopColor={`#ef4444`}
                                />
                            </span>
                            : <IoMdHeart size={24} />}

                    </button>
                }
            </div>
        </div>

    }


    const path = location.pathname;
    return <>

        <div>
            {
                !ismodalHidden && <AddToPlaylistModal ismodalHidden={ismodalHidden} setIsModalHidden={setIsModalHidden} video={video} />
            }
            <div className={`cursor-pointer ${videoContainer}`} role={`button`} onClick={(e) => {

                navigate(`/videos/${video._id}`)
            }}>

                {path === `/trending` && <div className={`${videoNumber} header-secondary`}>{`#${index < 10 ? `0${index + 1}` : `${index + 1}`}`}</div>}

                <div className={`p-lg w-100 ${videoThumbnailContainer}`}>
                    <div className={`${videoThumbnailWrapper}`}>
                        <img
                            src={`${video.thumbnails[0]?.standard?.url || video.thumbnails[0]?.high?.url}`}
                            alt="thumbnail"
                            className={`w-100 ${videoThumbnail} h-100`}
                        />
                    </div>
                </div>

                <div
                    className={`${videoContent}  d-flex f-direction-col jc-space-between`}
                >
                    <div className={`${videoHeader} text-white text-bold fs-3`}>
                        {video.title}
                    </div>
                    <div
                        className={`${videoMetrics} d-flex tube-text-secondary-color `}
                    >
                        <div className="d-flex ai-center">
                            <span>
                                <BsHeartFill size={20} />
                            </span>
                            <span className="pl-md ">{video.likes.male + video.likes.female + video.likes.others}  likes</span>
                        </div>
                        <div className="d-flex ai-center">
                            <span>
                                <MdRemoveRedEye size={20} />
                            </span>
                            <span className="pl-md "> {video.views.male + video.views.female + video.views.others} views</span>
                        </div>
                    </div>
                    <div className={`${publisherDetails} d-flex ai-center`}>
                        <div className={``}>
                            <Avatar
                                size={`sm`}
                               imageUrl={userProfile?.gender === `male` ? `https://res.cloudinary.com/dmk11fqw8/image/upload/v1653926221/man_6_ewkhrj.png` : `https://res.cloudinary.com/dmk11fqw8/image/upload/v1656501210/woman_1_jotf2w.png`}
                            />
                        </div>
                        <div
                            className={`${publisherName} text-bold text-white pl-lg `}
                        >
                            <div className="d-flex ai-center">
                                <div>{video.publisher.name}</div>
                                <span
                                    style={{ color: `gold` }}
                                    className="pl-sm"
                                >
                                    <RiVipCrown2Fill size={20} />
                                </span>
                            </div>
                        </div>
                        <div className={`${videoActions} d-flex ml-auto`}>

                            {!isVideoAlreadyPresentInWatchLaterPlaylist ? <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    executeAddToWatchLaterService({
                                        video,
                                        playlistId:
                                            playlistsState.watchLaterVideosData.watchLaterVideos._id
                                    });
                                }}
                                className={`btn btn-danger ${iconButton} d-flex ai-center jc-center`}
                            >
                                {watchLaterStatus === `loading` ?
                                    <span className="w-100 h-100 d-flex jc-center">
                                        <Loader width={`20px`} height={`20px`} borderWidth={`2px`} />
                                    </span>
                                    : <MdOutlineWatchLater size={22} />}


                            </button> :
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        executeRemoveFromWatchLater({
                                            videoId: video._id,
                                            playlistId: playlistsState.watchLaterVideosData.watchLaterVideos._id
                                        })
                                    }}
                                    className={`btn btn-danger ${iconButton} d-flex ai-center jc-center`}
                                >
                                    {removeFromWatchLaterStatus === `loading` ?
                                        <span className="w-100 h-100 d-flex jc-center">
                                            <Loader width={`20px`} height={`20px`} borderWidth={`2px`} />
                                        </span>
                                        : <MdWatchLater size={22} color={`#0ea5e9`} />}


                                </button>}
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setIsModalHidden(false)
                                }}
                                className={`btn btn-danger ${iconButton} d-flex ai-center jc-center`}
                            >
                                <MdPlaylistAdd size={22} />
                            </button>


                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    // window.navigator.clipboard(``)
                                }}
                                className={`btn btn-danger ${iconButton} d-flex ai-center jc-center`}
                            >
                                <MdShare size={22} />
                            </button>
                        </div>
                    </div>




                </div>

                <div className={`${likeIconButtonWrapper}`}>

                    {!isVideoAlreadyPresentInLikedPlaylist ? <button
                        className={`btn btn-danger ${iconButton} ${iconButtonLike}`}
                        onClick={(e) => {
                            e.stopPropagation();
                            const foundVideo = videosState.videos.filter(video => video._id === videoId)[0];
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
                                <Loader
                                    borderTopColor={`#ef4444`}
                                    width={`16px`} height={`16px`} borderWidth={`2px`} />
                            </span>
                            : <IoMdHeartEmpty size={24} />}

                    </button> :

                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                const foundVideo = videosState.videos.filter(video => video._id === videoId)[0];
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
                            className={`btn btn-danger ${iconButton} ${iconButtonLikeSolid} `}
                        >
                            {removeFromLikeStatus === `loading` ?
                                <span className="w-100 h-100 d-flex jc-center">
                                    <Loader
                                        borderTopColor={`#ef4444`}
                                        width={`16px`} height={`16px`} borderWidth={`2px`} />
                                </span>
                                : <IoMdHeart size={24} />}

                        </button>
                    }
                </div>

            </div>

        </div>
    </>
}