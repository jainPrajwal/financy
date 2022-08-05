import { Avatar, Loader, useToast } from "kaali-ui";

import { useParams } from "react-router-dom"
import { useVideos } from "../../hooks/useVideos";
import { usePlaylists } from "../../hooks/usePlaylists";
import React, { useEffect, useReducer, useState } from "react";
import { useAsync } from "../../hooks/useAxios";
import { checkIfVideoIsAlreadyPresentInSpecifiedPlaylist } from "../../utils/checkIfVideoIsAlreadyPresentInSpecifiedPlaylist";
import { removeFromPlaylistService } from "../../services/playlists/removeFromPlaylistService";
import { addToPlaylistService } from "../../services/playlists/addToPlaylistService";

import { getSingeVideoPageService } from "../../services/videos/getSingleVideoPageService";
import { AddToPlaylistModal } from "../../components/PlaylistModal/AddToPlaylistModal";
import { updateVideoService } from "../../services/videos/updateVideoService";
import { getAllVideos } from "../../services/videos/getAllVideos";
import { saveNotesService } from "../../services/notes/saveNotesService";
import { getNotesService } from "../../services/notes/getNotesService";
import { UserDefinedNote } from "../../constants/notes.types";
import { notesReducer } from "../../reducers/NotesReducer";
import { useAuth } from "../../hooks/useAuth";
import { editNotesService } from "../../services/notes/editNotesService";
import { useProfile } from "../../hooks/useProfile";
import { Video } from "../../constants/videos.types";
import { default as svp } from "./SingleVideoPage.module.css";
import { default as common } from "../../common/common.module.css"
import { MdEditNote, MdOutlineWatchLater, MdPlaylistAdd, MdRemoveRedEye, MdShare, MdSubscriptions, MdVerifiedUser, MdWatchLater } from "react-icons/md";
import { IoMdHeart, IoMdHeartEmpty, IoMdTrash } from "react-icons/io";
import ReactPlayer from "react-player/youtube"
import { MobileSidebar } from "../../components/MobileSidebar/MobileSidebar";
import { Sidebar } from "../../components/Sidebar/Sidebar";
import { Navbar } from "../../components/Navbar/Navbar";
import { showToast } from "../../utils/showToast";
import { ToastMessage } from "../../components/ToastMessage/ToastMessage";
import { getLikesOfAVideo } from "../../utils/Videos/getLikesOfAVideo";
import { AVATAR_FEMALE, AVATAR_MALE } from "../../constants/api";
import { copyVideoLink } from "../../utils/copyVideoLink";
import { Premium } from "../../components/Premium/Premium";
import { deleteNotesService } from "../../services/notes/deleteNoteService";
import { useScrollToTop } from "../../hooks/useScrollToTop";
import { getViewsOfAVideo } from "../../utils/Videos/getViewsOfAVideo";
import { useTrendingVideos } from "../../hooks/useTrendingVideos";
import { getTrendingVideos } from "../../services/videos/getTrendingVideos";
import { useMostWatchedVideos } from "../../hooks/useMostWatchedVideos";
import { getMostWatchedVideos } from "../../services/videos/getMostWatchedVideos";


export const SingleVideoPage = () => {
    const {
        detailsAndActions,

        notes,
        notesContainer,
        notesTextarea,
        notesInput,
        playerWrapper,
        popular,
        publisherDetails,

        publisherName,
        reactPlayer,
        videoActions,
        videoHeader,
        videoMetrics,
        videoContainer,

        wrapperNotes,
        videoMain,
        videoAside,
        videoContent,
        noteHeader
    } = svp;
    const {
        containerSingleVideoPage,

        mainContainer,



        publisherAvatar,

        wrapperContainer,


        iconButton,

        editProfileIcon,
        editProfileButton,
        btnTrash,
        iconDelete

    } = common;
    const [sidebar, setSidebar] = useState(false);

    const { videoId } = useParams();
    const { videosState, videosDispatch } = useVideos();
    const { userProfile } = useProfile();

    const { trendingVideos, setTrendingVideos } = useTrendingVideos();
    const { mostWatchedVideos, setMostWatchedVideos } = useMostWatchedVideos();
    useScrollToTop();


    const [userDefinedNote, setUserDefinedNote] = useState<UserDefinedNote | null>(null);

    const [editNote, setEditNote] = useState<{
        isEditNote: Boolean,
        noteId: string | null
    }>({
        isEditNote: false,
        noteId: null
    });
    const [notesData, notesDispatch] = useReducer(notesReducer, {
        notes: []
    });



    const { playlistsState, playlistsDispatch } = usePlaylists();

    const [ismodalHidden, setIsModalHidden] = useState<boolean>(true);

    const { authState } = useAuth();
    const { toastDispatch } = useToast();

    const { execute: executeAddToLikeService, status: likeStatus, response: likeResponse } = useAsync(addToPlaylistService, false, null);

    const { execute: executeRemoveFromLiked, status: removeFromLikeStatus, response: removeFromLikedResponse } = useAsync(removeFromPlaylistService, false, null);



    const { execute: executeAddToWatchLaterService, status: watchLaterStatus, response: watchLaterResponse } = useAsync(addToPlaylistService, false, null);

    const { execute: executeRemoveFromWatchLater, status: removeFromWatchLaterStatus, response: removeFromWatchLaterResponse } = useAsync(removeFromPlaylistService, false, null);



    const { execute: executeAddHistoryService, status: addToHistoryStatus, response: addToHistoryResponse } = useAsync(addToPlaylistService, false, null);


    const { execute: executeUpdateVideoService, status: updateVideoStatus, response: updateVideoResponse } = useAsync(updateVideoService, false, null);



    const { execute: executeGetSingeVideoPageService, status, response, errorMessage } = useAsync(getSingeVideoPageService, false, null);

    const { execute: executesaveNotesService, status: saveNotesStatus, response: saveNotesResponse } = useAsync(saveNotesService, false, null);

    const { execute: executeGetNotesService, status: getNotesStatus, response: getNotesResponse } = useAsync(getNotesService, false, null);

    const { execute: executeEditNotesService, status: editNotesStatus, response: editNotesResponse } = useAsync(editNotesService, false, null);

    const { execute: executeDeleteNoteService, status: deleteNoteStatus, response: deleteNoteResponse } = useAsync(deleteNotesService, false, null);


    const [video, setVideo] = useState<Video | null>(null);
    const [videoMetricsState, setVideoMetricsState] = useState({
        likes: video && getLikesOfAVideo(video),
        views: video && getViewsOfAVideo(video)
    });

    useEffect(() => {
        try {

            if (!video) {

                executeGetSingeVideoPageService({
                    videoId
                })
            }
        } catch (error) {
            console.error(`error `, error)
        }

    }, [video, videoId, executeGetSingeVideoPageService]);

    useEffect(() => {
        try {
            if (status === `success`) {

                const { status, data: { message, video, success } } = response;

                if (status === 200 && success) {
                    setVideo(video)
                }


            }
        } catch (error) {
            console.error(`error `, error, errorMessage)
        }

    }, [status, response, videosDispatch, errorMessage]);


    const { execute: executeGetTrendingVideos, errorMessage: errorMessageTrendingVideos, status: statusTrendingVideos, response: responseTrendingVideos } = useAsync(getTrendingVideos, false, null);

    useEffect(() => {
        if (statusTrendingVideos === `idle`) {
            executeGetTrendingVideos(null);
        }
    }, []);

    useEffect(() => {
        try {
            if (statusTrendingVideos === `success`) {
                const { data } = responseTrendingVideos;
                if (`videos` in data) {
                    setTrendingVideos({ videos: data.videos })
                }
            }
        } catch (error) {
            console.error(`error `, error, errorMessageTrendingVideos)
        }

    }, [statusTrendingVideos, responseTrendingVideos, errorMessageTrendingVideos]);

    const { execute: executeMostWatchedVideos, errorMessage: mostWatchedVideosErrorMessage, status: mostWatchedVideosStatus, response: mostWatchedVideosResponse } = useAsync(getMostWatchedVideos, false, null);

    useEffect(() => {
        if (mostWatchedVideosStatus === `idle`) {
            executeMostWatchedVideos(null);
        }
    }, []);

    useEffect(() => {
        try {
            if (mostWatchedVideosStatus === `success`) {
                const { data } = mostWatchedVideosResponse;
                if (`videos` in data) {
                    setMostWatchedVideos({ videos: data.videos })
                }
            }
        } catch (error) {
            console.error(`error `, error, mostWatchedVideosErrorMessage)
        }

    }, [mostWatchedVideosStatus, mostWatchedVideosResponse, mostWatchedVideosErrorMessage, setMostWatchedVideos])


    useEffect(() => {

        try {
            if (likeStatus === `success`) {
                const {
                    status, data: { message, video, success },
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
                            <ToastMessage message={message} videoId={videoId || `default`} />
                        ),

                        videoId: videoId || `default`,

                    })

                }
                else {
                    showToast({
                        toastDispatch,
                        element: (
                            <ToastMessage message={message} videoId={videoId || `default`} />
                        ),

                        videoId: videoId || `default`,
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
                    status, data: { message, video, success },
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
                            <ToastMessage message={message} videoId={videoId || `default`} />
                        ),

                        videoId: videoId || `default`,
                        type: `danger`
                    })

                }
                else {
                    showToast({
                        toastDispatch,
                        element: (
                            <ToastMessage message={message} videoId={videoId || `default`} />
                        ),

                        videoId: videoId || `default`,
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
                    status, data: { message, video, success },
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
                            <ToastMessage message={message} videoId={videoId || `default`} />
                        ),

                        videoId: videoId || `default`,

                    })
                }
                else {
                    showToast({
                        toastDispatch,
                        element: (
                            <ToastMessage message={message} videoId={videoId || `default`} />
                        ),

                        videoId: videoId || `default`,
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
                    status, data: { message, video, success },
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
                            <ToastMessage message={message} videoId={videoId || `default`} />
                        ),

                        videoId: videoId || `default`,
                        type: `danger`
                    })
                }
                else {
                    showToast({
                        toastDispatch,
                        element: (
                            <ToastMessage message={message} videoId={videoId || `default`} />
                        ),

                        videoId: videoId || `default`,
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
            if (addToHistoryStatus === `success`) {
                const {
                    status, data: { message, video, success },
                } = addToHistoryResponse;

                if (status === 201 && success) {
                    playlistsDispatch({
                        type: `ADD_TO_PLAYLIST`,
                        payload: {
                            video,
                            playlist: playlistsState.historyData.history
                        },
                    });

                }
                else {
                    showToast({
                        toastDispatch,
                        element: (
                            <ToastMessage message={message} videoId={videoId || `default`} />
                        ),

                        videoId: videoId || `default`,
                        type: `danger`

                    })
                }


            }
        } catch (error) {
            console.error(`error `, error)
        }

    }, [addToHistoryStatus, addToHistoryResponse, playlistsDispatch]);


    useEffect(() => {
        try {
            if (updateVideoStatus === `success`) {
                const {
                    status, data: { message, video, success }
                } = updateVideoResponse;



                if (status === 201 && success) {
                    // UPDATE_VIDEOO
                    if (trendingVideos && setTrendingVideos) {
                        setTrendingVideos(prevState => {
                            return {
                                ...prevState,
                                videos: prevState.videos.map(trendingVideo => {
                                    if (trendingVideo._id === video?._id) {
                                        return video;
                                    }
                                    return trendingVideo;
                                })
                            }
                        })
                    }
                    if (mostWatchedVideos && setMostWatchedVideos) {
                        setMostWatchedVideos(prevState => {
                            return {
                                ...prevState,
                                videos: prevState.videos.map(trendingVideo => {
                                    if (trendingVideo._id === video?._id) {
                                        return video;
                                    }
                                    return trendingVideo;
                                })
                            }
                        })
                    }

                    videosDispatch({
                        type: `UPDATE_VIDEO`,
                        payload: {
                            video
                        },
                    });
                    setVideoMetricsState(prevState => ({

                        views: getViewsOfAVideo(video),
                        likes: getLikesOfAVideo(video)

                    }))
                }

            }
        } catch (error) {
            console.error(`error `, error)
        }
    }, [updateVideoStatus, updateVideoResponse, videosDispatch,]);

    useEffect(() => {
        try {
            (async () => {


                try {
                    videosDispatch({
                        type: `SET_LOADING`,
                        payload: {
                            loading: `loading`,
                        },
                    });

                    const response = await getAllVideos({
                        currentPageNumber: videosState.currentPageNumber,
                    });
                    const {
                        status, data: { message, videos, success },
                    } = response;

                    if (status === 200 && success) {
                        videosDispatch({
                            type: `SET_LOADING`,
                            payload: {
                                loading: `success`,
                            },
                        });

                        videosDispatch({
                            type: `LOAD_VIDEOS`,
                            payload: {
                                videos: videos,
                            },

                        });
                    }


                } catch (error) {
                    videosDispatch({
                        type: `SET_LOADING`,
                        payload: {
                            loading: `error`,
                        },
                    });
                }
            })();
        } catch (error) {
            console.error(`error `, error)
        }


    }, []);

    useEffect(() => {

        if (notesData.notes.length <= 0) {
            executeGetNotesService({
                videoId
            });
        }

    }, [authState.token])

    useEffect(() => {
        try {
            if (saveNotesStatus === `success`) {
                const { status, data: { message, note, success } } = saveNotesResponse;

                if (status === 201 && success) {
                    notesDispatch({
                        type: `ADD_NOTE`,
                        payload: {
                            note
                        }
                    })
                    showToast({
                        toastDispatch,
                        element: (
                            <ToastMessage message={message} videoId={videoId || `default`} />
                        ),

                        videoId: videoId || `default`,

                    })
                } else {
                    showToast({
                        toastDispatch,
                        element: (
                            <ToastMessage message={message} videoId={videoId || `default`} />
                        ),

                        videoId: videoId || `default`,
                        type: `danger`

                    })
                }


            }
        } catch (error) {
            console.error(`error`, error);

        }
    }, [saveNotesStatus, saveNotesResponse]);

    useEffect(() => {
        try {
            if (deleteNoteStatus === `success`) {
                const { status, data: { message, note, success } } = deleteNoteResponse;

                if (status === 200 && success) {
                    notesDispatch({
                        type: `DELETE_NOTE`,
                        payload: {
                            noteId: note._id
                        }
                    })
                    showToast({
                        toastDispatch,
                        element: (
                            <ToastMessage message={message} videoId={videoId || `default`} />
                        ),

                        videoId: videoId || `default`,

                    })
                } else {
                    showToast({
                        toastDispatch,
                        element: (
                            <ToastMessage message={message} videoId={videoId || `default`} />
                        ),

                        videoId: videoId || `default`,
                        type: `danger`

                    })
                }


            }
        } catch (error) {
            console.error(`error`, error);

        }
    }, [deleteNoteStatus, deleteNoteResponse])


    useEffect(() => {
        try {
            if (getNotesStatus === `success`) {
                const { status, data: { message, notes, success } } = getNotesResponse;
                if (status === 200 && success) {

                    notesDispatch({
                        type: `LOAD_NOTES`,
                        payload: {
                            notes
                        }
                    })
                }
            }
        } catch (error) {
            console.error(`error`, error);

        }
    }, [getNotesStatus, getNotesResponse]);

    useEffect(() => {
        try {
            if (editNotesStatus === `success`) {
                const { status, data: { message, note, success } } = editNotesResponse;
                if (status === 201 && success) {
                    notesDispatch({
                        type: `UPDATE_NOTE`,
                        payload: {
                            note
                        }
                    })
                    showToast({
                        toastDispatch,
                        element: (
                            <ToastMessage message={message} videoId={videoId || `default`} />
                        ),

                        videoId: videoId || `default`,

                    })
                } else {
                    showToast({
                        toastDispatch,
                        element: (
                            <ToastMessage message={message} videoId={videoId || `default`} />
                        ),

                        videoId: videoId || `default`,
                        type: `danger`

                    })
                }

            }
        } catch (error) {
            console.error(`error`, error);

        }
    }, [editNotesStatus, editNotesResponse])

    const isVideoAlreadyPresentInLikedPlaylist =
        video && checkIfVideoIsAlreadyPresentInSpecifiedPlaylist(
            video,
            playlistsState.likedVideosData.likedVideos
        );

    const isVideoAlreadyPresentInWatchLaterPlaylist =
        video && checkIfVideoIsAlreadyPresentInSpecifiedPlaylist(
            video,
            playlistsState.watchLaterVideosData.watchLaterVideos
        );









    return (
        <>

            {
                status === `loading` &&
                <div className="d-flex ai-center jc-center my-lg p-lg w-100">
                    <Loader />

                </div>
            }
            {video &&

                <div className={` ${containerSingleVideoPage}`}>
                    {
                        !ismodalHidden && <AddToPlaylistModal ismodalHidden={ismodalHidden} setIsModalHidden={setIsModalHidden} video={video} />
                    }
                    <Navbar setSidebar={setSidebar}></Navbar>
                    <MobileSidebar status={{ sidebar, setSidebar }} />
                    <div className={`${wrapperContainer}`}>
                        <Sidebar />
                        <div className={`${mainContainer}`}>
                            {video.isPremium && !userProfile?.isAPremiumMember ? <>
                                <Premium header={`Get Premium To Watch This Video!`} />

                            </> : <div className={`${playerWrapper}`}>
                                <ReactPlayer
                                    className={`${reactPlayer}`}
                                    url={`https://www.youtube.com/watch?v=${video.url}`}
                                    playing={ismodalHidden}
                                    width={`100%`}
                                    height={`100%`}
                                    volume={1}
                                    controls={true}
                                    muted={false}

                                    onStart={() => {
                                        if (userProfile) {
                                            const alreadyPresentInHistoryVideo = playlistsState.historyData.history.videos.find(videoInHistory => videoInHistory._id === video._id);

                                            if (alreadyPresentInHistoryVideo) {

                                                playlistsDispatch({
                                                    type: `REMOVE_FROM_PLAYLIST`,
                                                    payload: {
                                                        video: alreadyPresentInHistoryVideo,
                                                        playlist: playlistsState.historyData.history
                                                    }
                                                });


                                            }
                                            executeAddHistoryService({
                                                video,
                                                playlistId:
                                                    playlistsState.historyData.history._id
                                            });

                                            if (userProfile?.gender === `male`) {
                                                executeUpdateVideoService({

                                                    video: {
                                                        views:
                                                        {
                                                            male: video.views.male + 1,
                                                            female: video.views.female,
                                                            others: video.views.others
                                                        }
                                                    },
                                                    videoId: video._id
                                                })
                                            }
                                            else if (userProfile?.gender === `female`) {
                                                executeUpdateVideoService({

                                                    video: {
                                                        views:
                                                        {
                                                            male: video.views.male,
                                                            female: video.views.female + 1,
                                                            others: video.views.others
                                                        }
                                                    },
                                                    videoId: video._id
                                                })
                                            } else if (userProfile?.gender === `others`) {
                                                executeUpdateVideoService({

                                                    video: {
                                                        views:
                                                        {
                                                            male: video.views.male,
                                                            female: video.views.female,
                                                            others: video.views.others + 1
                                                        }
                                                    },
                                                    videoId: video._id
                                                })
                                            }
                                        }

                                    }}
                                />
                            </div>}
                            <div className={`${detailsAndActions}  d-flex mt-lg p-sm`}>
                                <div
                                    className={`${publisherDetails} d-flex ai-center pt-lg w-100`}
                                >
                                    <div className={`${publisherAvatar}`}>
                                        <Avatar
                                            size={`md`}
                                            imageUrl={userProfile?.gender === `male` ? `${AVATAR_MALE}` : `${AVATAR_FEMALE}`}
                                        />
                                    </div>
                                    <div
                                        className={`${publisherName}  text-white pl-lg fs-2`}
                                    >
                                        <div className="d-flex ai-center">
                                            <div>{video.publisher.name}</div>


                                        </div>

                                    </div>
                                </div>

                                <div className={`${videoActions} d-flex ml-auto`}>
                                    {!isVideoAlreadyPresentInLikedPlaylist ? <button
                                        onClick={() => {
                                            if (authState && authState.token) {
                                                let foundVideo = null;
                                                foundVideo = videosState.videos.filter(video => video._id === videoId)[0];
                                                if (!foundVideo) {
                                                    foundVideo = trendingVideos.videos.filter(video => video._id === videoId)[0];

                                                }
                                                if (!foundVideo) {

                                                    foundVideo = mostWatchedVideos.videos.filter(video => video._id === videoId)[0];
                                                }
                                                if (foundVideo) {
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
                                                }
                                            } else {

                                                showToast({
                                                    toastDispatch,
                                                    element: (
                                                        <ToastMessage message={`Please login to avail these features`} videoId={videoId || `default`} />
                                                    ),

                                                    videoId: videoId || `default`,
                                                    type: `danger`
                                                })
                                            }



                                        }}
                                        className={`btn btn-danger ${iconButton} d-flex ai-center jc-center`}
                                    >
                                        {likeStatus === `loading` ?
                                            <span className="w-100 h-100 d-flex jc-center">
                                                <Loader width={`20px`} height={`20px`} borderWidth={`2px`} />
                                            </span>
                                            : <IoMdHeartEmpty size={20} />}

                                    </button> :

                                        <button
                                            onClick={() => {
                                                if (authState && authState.token) {

                                                    let foundVideo = null;
                                                    foundVideo = videosState.videos.filter(video => video._id === videoId)[0];
                                                    if (!foundVideo) {
                                                        foundVideo = trendingVideos.videos.filter(video => video._id === videoId)[0];
                                                    }
                                                    if (!foundVideo) {

                                                        foundVideo = mostWatchedVideos.videos.filter(video => video._id === videoId)[0];
                                                    }
                                                    if (foundVideo) {
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
                                                    }
                                                } else {

                                                    showToast({
                                                        toastDispatch,
                                                        element: (
                                                            <ToastMessage message={`Please login to avail these features`} videoId={videoId || `default`} />
                                                        ),

                                                        videoId: videoId || `default`,
                                                        type: `danger`
                                                    })
                                                }

                                            }}
                                            className={`btn btn-danger ${iconButton} d-flex ai-center jc-center`}
                                        >
                                            {removeFromLikeStatus === `loading` ?
                                                <span className="w-100 h-100 d-flex jc-center">
                                                    <Loader width={`20px`} height={`20px`} borderWidth={`2px`} />
                                                </span>
                                                : <IoMdHeart size={20}
                                                    color={`rgb(14, 165, 233)`}
                                                />}

                                        </button>
                                    }
                                    {!isVideoAlreadyPresentInWatchLaterPlaylist ? <button
                                        onClick={() => {
                                            if (authState && authState.token) {

                                                executeAddToWatchLaterService({
                                                    video,
                                                    playlistId:
                                                        playlistsState.watchLaterVideosData.watchLaterVideos._id
                                                });
                                            } else {

                                                showToast({
                                                    toastDispatch,
                                                    element: (
                                                        <ToastMessage message={`Please login to avail these features`} videoId={videoId || `default`} />
                                                    ),

                                                    videoId: videoId || `default`,
                                                    type: `danger`
                                                })
                                            }
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
                                            onClick={() => {
                                                if (authState && authState.token) {

                                                    executeRemoveFromWatchLater({
                                                        videoId: video._id,
                                                        playlistId: playlistsState.watchLaterVideosData.watchLaterVideos._id
                                                    })
                                                } else {

                                                    showToast({
                                                        toastDispatch,
                                                        element: (
                                                            <ToastMessage message={`Please login to avail these features`} videoId={videoId || `default`} />
                                                        ),

                                                        videoId: videoId || `default`,
                                                        type: `danger`
                                                    })
                                                }
                                            }}
                                            className={`btn btn-danger ${iconButton} d-flex ai-center jc-center`}
                                        >
                                            {removeFromWatchLaterStatus === `loading` ?
                                                <span className="w-100 h-100 d-flex jc-center">
                                                    <Loader width={`20px`} height={`20px`} borderWidth={`2px`} />
                                                </span>
                                                : <MdWatchLater size={20}
                                                    color={`rgb(14, 165, 233)`}
                                                />}


                                        </button>}
                                    <button
                                        onClick={() => setIsModalHidden(false)}
                                        className={`btn btn-danger ${iconButton} d-flex ai-center jc-center`}
                                    >
                                        <MdPlaylistAdd size={20} />
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
                                        <MdShare size={20} />
                                    </button>
                                </div>
                            </div>

                            <div className={`${videoContainer}`}>
                                <div
                                    className={`${videoMain} d-flex jc-center f-direction-col p-sm`}
                                >
                                    <div className={`${videoHeader} text-white fs-3`}>
                                        {video.title}
                                    </div>
                                    <div
                                        className={`${videoContent} pt-lg`}
                                        style={{ color: `rgb(170 172 192)` }}
                                    >
                                        {
                                            video.description.split(/\*\*|(--)|__/).join(``).slice(0, 550).concat(`......`)
                                        }

                                    </div>
                                </div>
                                <div className={`${videoAside} d-flex f-direction-col `}>
                                    <div
                                        className={`${videoMetrics} d-flex tube-text-secondary-color `}
                                    >
                                        <div className="d-flex ai-center">
                                            <span>
                                                <IoMdHeart size={20} />
                                            </span>
                                            <span className="pl-md "> {`${videoMetricsState?.likes ? videoMetricsState.likes :
                                                getLikesOfAVideo(video)
                                                }`} likes</span>
                                        </div>
                                        <div className="d-flex ai-center">
                                            <span>
                                                <MdRemoveRedEye size={20} />
                                            </span>
                                            <span className="pl-md "> {`${videoMetricsState?.views ? videoMetricsState.views : getViewsOfAVideo(video)}`} views</span>
                                        </div>
                                        <div className="d-flex ai-center">
                                            <span>
                                                <MdSubscriptions size={20} />
                                            </span>
                                            <span className="pl-md "> 2,200 subscribers</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div
                            className={`${notesContainer} text-white d-flex f-direction-col `}
                        >
                            <div className={`${wrapperNotes} d-flex f-direction-col `}>
                                <form className="d-flex ai-center" style={{ gap: `24px` }}
                                    onSubmit={(e) => {
                                        e.preventDefault();

                                        setUserDefinedNote({
                                            description: ``,
                                            title: ``
                                        })
                                        if (editNote.isEditNote) {
                                            executeEditNotesService({
                                                noteId: editNote.noteId,
                                                videoId: videoId || `default`,
                                                note: userDefinedNote
                                            })


                                        } else {
                                            executesaveNotesService({
                                                videoId: video._id,
                                                note: userDefinedNote
                                            })
                                        }

                                    }}
                                >
                                    <div className="w-100">
                                        <div  >
                                            <input type="text"
                                                required
                                                className={`${notesInput}`}
                                                style={{ minHeight: `none`, background: `#211E27` }}
                                                value={userDefinedNote?.title || ``}
                                                placeholder="Enter Notes Title" onChange={(e) => {
                                                    setUserDefinedNote(prevState => ({ ...prevState, title: e.target.value } as UserDefinedNote))
                                                }} />
                                        </div>

                                        <div className={`${notes} mt-lg`}>

                                            <textarea
                                                required
                                                value={userDefinedNote?.description || ``}
                                                name="notes" id="notes" rows={10} style={{ resize: `none`, width: `100%`, maxWidth: `360px`, }}
                                                className={`${notesTextarea} w-100 `}
                                                placeholder="Write your notes here..."
                                                onChange={(e) => {
                                                    setUserDefinedNote(prevState => ({ ...prevState, description: e.target.value } as UserDefinedNote))
                                                }}
                                            ></textarea>

                                        </div>
                                        <div className={`my-1`}>
                                            <button type="submit" className="btn btn-primary w-100"> {saveNotesStatus === `loading` ?
                                                <span className="w-100 h-100 d-flex jc-center">
                                                    <Loader width={`20px`} height={`20px`} borderWidth={`2px`} />
                                                </span>
                                                : `Save Note`}
                                            </button>
                                        </div>
                                    </div>

                                </form>




                                {getNotesStatus === `loading` ?
                                    <span className="w-100 h-100 d-flex jc-center">
                                        <Loader width={`20px`} height={`20px`} borderWidth={`2px`} />
                                    </span>
                                    : <>{notesData.notes.length > 0 && <div className={`${popular} my-1 pos-rel`}>
                                        {

                                            notesData.notes.map(note => {
                                                return <div key={note._id} className={`d-flex f-direction-col gap-10`}>
                                                    <div className={`${editProfileIcon} ${iconButton}`} style={{ top: `6px`, right: `6px` }}>
                                                        <button
                                                            className={`btn ${editProfileButton}`}

                                                            onClick={() => {
                                                                if (authState && authState.token) {

                                                                    setEditNote(prevState => ({ ...prevState, isEditNote: true, noteId: note._id }));
                                                                    setUserDefinedNote({
                                                                        title: note.title,
                                                                        description: note.description
                                                                    })
                                                                } else {

                                                                    showToast({
                                                                        toastDispatch,
                                                                        element: (
                                                                            <ToastMessage message={`Please login to avail these features`} videoId={videoId || `default`} />
                                                                        ),

                                                                        videoId: videoId || `default`,
                                                                        type: `danger`
                                                                    })
                                                                }
                                                            }

                                                            }>
                                                            <MdEditNote size={28} />
                                                        </button>
                                                    </div>
                                                    <div className={`fs-2 ${noteHeader}`}>{note.title}</div>
                                                    <div className={`${noteHeader}`}>
                                                        {
                                                            note.description
                                                        }
                                                    </div>
                                                    <div className="d-flex jc-end">
                                                        <div className={`${iconDelete}`}>
                                                            <button className={`btn ${btnTrash}`}
                                                                onClick={() => {
                                                                    if (authState && authState.token) {
                                                                        executeDeleteNoteService({
                                                                            noteId: note._id,
                                                                            videoId: video._id
                                                                        })
                                                                    } else {

                                                                        showToast({
                                                                            toastDispatch,
                                                                            element: (
                                                                                <ToastMessage message={`Please login to avail these features`} videoId={videoId || `default`} />
                                                                            ),

                                                                            videoId: videoId || `default`,
                                                                            type: `danger`
                                                                        })
                                                                    }

                                                                }}
                                                            >
                                                                <span >
                                                                    {" "}
                                                                    <IoMdTrash size={24} />{" "}
                                                                </span>{" "}

                                                            </button>

                                                        </div>
                                                    </div>

                                                </div>
                                            })


                                        }
                                    </div>}</>}
                            </div>
                        </div>
                    </div>
                </div>}
        </>
    );


}