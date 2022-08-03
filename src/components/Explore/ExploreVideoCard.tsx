import { Avatar, Loader, useToast } from "kaali-ui";
import { useEffect, useState } from "react";
import { Video } from "../../constants/videos.types";
import { useAsync } from "../../hooks/useAxios";
import { usePlaylists } from "../../hooks/usePlaylists";
import { useVideos } from "../../hooks/useVideos";
import { default as exploreStyles } from "../../pages/Explore/Explore.module.css";
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
import { showToast } from "../../utils/showToast";
import { ToastMessage } from "../ToastMessage/ToastMessage";
import { copyVideoLink } from "../../utils/copyVideoLink";
import { getLikesOfAVideo } from "../../utils/Videos/getLikesOfAVideo";
import { AVATAR_FEMALE, AVATAR_MALE } from "../../constants/api";
import { getViewsOfAVideo } from "../../utils/Videos/getViewsOfAVideo";






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
    const { toastDispatch } = useToast();



    const {
        videoContainer,

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
   
        videoThumbnailContainer,

    } = exploreStyles;

    const {
      
        videoActions,
      
    } = svp;

    useEffect(() => {
        try {
            if (likeStatus === `success`) {
                const {
                    status, data: { video, message, success },
                } = likeResponse;


                if (status === 201 && success) {
                    playlistsDispatch({
                        type: `ADD_TO_PLAYLIST`,
                        payload: {
                            video,
                            playlist: playlistsState.likedVideosData.likedVideos
                        },
                    });

                    showToast({
                        toastDispatch,
                        element: (
                            <ToastMessage message={message} videoId={videoId} />
                        ),

                        videoId,

                    })

                } else {

                    showToast({
                        toastDispatch,
                        element: (
                            <ToastMessage message={message} videoId={videoId} />
                        ),

                        videoId,
                        type: `danger`
                    })

                }


            }
        } catch (error) {
            console.error(`error `, error)
        }

    }, [likeStatus, likeResponse, playlistsDispatch]);

    useEffect(() => {
        try {
            if (removeFromLikeStatus === `success`) {
                const {
                    status, data: { video, message, success },
                } = removeFromLikedResponse;


                if (status === 200 && success) {
                    playlistsDispatch({
                        type: `REMOVE_FROM_PLAYLIST`,
                        payload: {
                            video,
                            playlist: playlistsState.likedVideosData.likedVideos
                        },
                    });

                    showToast({
                        toastDispatch,
                        element: (
                            <ToastMessage message={message} videoId={videoId} />
                        ),

                        videoId,
                        type: `danger`
                    })
                } else {

                    showToast({
                        toastDispatch,
                        element: (
                            <ToastMessage message={message} videoId={videoId} />
                        ),

                        videoId,
                        type: `danger`
                    })
                }


            }
        } catch (error) {
            console.error(`error `, error)
        }

    }, [removeFromLikeStatus, removeFromLikedResponse, playlistsDispatch]);


    useEffect(() => {
        try {
            if (watchLaterStatus === `success`) {
                const {
                    status, data: { video, message, success },
                } = watchLaterResponse;


                if (status === 201 && success) {
                    playlistsDispatch({
                        type: `ADD_TO_PLAYLIST`,
                        payload: {
                            video,
                            playlist: playlistsState.watchLaterVideosData.watchLaterVideos
                        },
                    });

                    showToast({
                        toastDispatch,
                        element: (
                            <ToastMessage message={message} videoId={videoId} />
                        ),

                        videoId

                    })
                } else {

                    showToast({
                        toastDispatch,
                        element: (
                            <ToastMessage message={message} videoId={videoId} />
                        ),

                        videoId,
                        type: `danger`

                    })
                }

            }

        } catch (error) {
            console.error(`error `, error)
        }

    }, [watchLaterStatus, watchLaterResponse, playlistsDispatch]);


    useEffect(() => {
        try {
            if (removeFromWatchLaterStatus === `success`) {
                const {
                    status, data: { video, message, success },
                } = removeFromWatchLaterResponse;


                if (status === 200 && success) {
                    playlistsDispatch({
                        type: `REMOVE_FROM_PLAYLIST`,
                        payload: {
                            video,
                            playlist: playlistsState.watchLaterVideosData.watchLaterVideos
                        },
                    });

                    showToast({
                        toastDispatch,
                        element: (
                            <ToastMessage message={message} videoId={videoId} />
                        ),

                        videoId,
                        type: `danger`
                    })
                } else {

                    showToast({
                        toastDispatch,
                        element: (
                            <ToastMessage message={message} videoId={videoId} />
                        ),

                        videoId,
                        type: `danger`
                    })
                }


            }
        } catch (error) {
            console.error(`error `, error)
        }

    }, [removeFromWatchLaterStatus, removeFromWatchLaterResponse, playlistsDispatch]);

    useEffect(() => {
        try {
            if (updateVideoStatus === `success`) {
                const {
                    status, data: { video, message, success },
                } = updateVideoResponse;
                if (status === 201 && success) {

                    videosDispatch({
                        type: `UPDATE_VIDEO`,
                        payload: {
                            video
                        },
                    });

                }
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


    const path = location.pathname;

    if (index === videosState.videos.length - 1) {
        return <>   
        <div ref={setLastElement}>Last element</div> 
        
        {/*
        <div>
            {
                !ismodalHidden && <AddToPlaylistModal ismodalHidden={ismodalHidden} setIsModalHidden={setIsModalHidden} video={video} />
            }
            <div
                ref={setLastElement}
                className={`cursor-pointer ${videoContainer}`} role={`button`} onClick={(e) => {

                    navigate(`/videos/${video._id}`)
                }}>

                {path === `/trending` && <div className={`${videoNumber} header-tertiary`}>{`#${index < 9 ? `0${index + 1}` : `${index + 1}`}`}</div>}

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
                    <div className={`${videoHeader} text-white fs-3 pr-lg`}>
                        {video.title}
                    </div>
                    <div
                        className={`${videoMetrics} d-flex tube-text-secondary-color `}
                    >
                        <div className="d-flex ai-center">
                            <span>
                                <BsHeartFill size={20} />
                            </span>
                            <span className="pl-md ">{getLikesOfAVideo(video)}  likes</span>
                        </div>
                        <div className="d-flex ai-center">
                            <span>
                                <MdRemoveRedEye size={20} />
                            </span>
                            <span className="pl-md "> {getViewsOfAVideo(video)} views</span>
                        </div>
                    </div>
                    <div className={`${publisherDetails} d-flex ai-center`}>
                        <div className={``}>
                            <Avatar
                                size={`sm`}
                                imageUrl={userProfile?.gender === `male` ? `${AVATAR_MALE}` : `${AVATAR_FEMALE}`}
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
                                    {video.publisher.isAPremiumMember && <RiVipCrown2Fill size={20} />}
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
                                    copyVideoLink({ text: `https://www.youtube.com/watch?v=${video._id}` });
                                    showToast({
                                        toastDispatch,
                                        element: <ToastMessage message="Copied Successfully" videoId={`${video._id}`} />,
                                        videoId: video._id,
                                        type: `success`
                                    })
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
                                    <Loader width={`20px`} height={`20px`} borderWidth={`2px`} />
                                </span>
                                : <IoMdHeart size={24} />}

                        </button>
                    }
                </div>

            </div>

        </div>
        */}
        </>


    }


    
    return <>

        <div>
            {
                !ismodalHidden && <AddToPlaylistModal ismodalHidden={ismodalHidden} setIsModalHidden={setIsModalHidden} video={video} />
            }
            <div className={`cursor-pointer ${videoContainer}`} role={`button`} onClick={(e) => {

                navigate(`/videos/${video._id}`)
            }}>

                {path === `/trending` && <div className={`${videoNumber} header-secondary`}>{`#${index < 9 ? `0${index + 1}` : `${index + 1}`}`}</div>}

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
                    <div className={`${videoHeader} text-white fs-3`}>
                        {video.title}
                    </div>
                    <div
                        className={`${videoMetrics} d-flex tube-text-secondary-color `}
                    >
                        <div className="d-flex ai-center">
                            <span>
                                <BsHeartFill size={16} />
                            </span>
                            <span className="pl-md ">{getLikesOfAVideo(video)}  likes</span>
                        </div>
                        <div className="d-flex ai-center">
                            <span>
                                <MdRemoveRedEye size={18} />
                            </span>
                            <span className="pl-md "> {getViewsOfAVideo(video)} views</span>
                        </div>
                    </div>
                    <div className={`${publisherDetails} `}>
                        <div className={`d-flex ai-center`}>
                            <div className="d-flex ai-center w-100">
                                <Avatar
                                    size={`sm`}
                                    imageUrl={userProfile?.gender === `male` ? `${AVATAR_MALE}` : `${AVATAR_FEMALE}`}
                                />
                                <div className="d-flex ai-center ml-md">
                                    <div>{video.publisher.name}</div>
                                    <span
                                        style={{ color: `gold` }}
                                        className="pl-sm"
                                    >
                                        {video.publisher.isAPremiumMember && <RiVipCrown2Fill size={20} />}
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
                                        copyVideoLink({ text: `https://www.youtube.com/watch?v=${video.url}` });
                                        showToast({
                                            toastDispatch,
                                            element: <ToastMessage message="Copied Successfully" videoId={`${video._id}`} />,
                                            videoId: video._id,
                                            type: `success`
                                        })
                                    }}
                                    className={`btn btn-danger ${iconButton} d-flex ai-center jc-center`}
                                >
                                    <MdShare size={22} />
                                </button>
                            </div>
                        </div>

                        {/* <div
                            className={`${publisherName} text-bold text-white pl-lg `}
                        >
                           
                        </div> */}

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