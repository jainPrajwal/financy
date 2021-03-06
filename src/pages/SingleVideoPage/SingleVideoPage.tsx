import { Avatar, Loader, useToast } from "kaali-ui";

import { useParams } from "react-router-dom"
import { useVideos } from "../../hooks/useVideos";
import { usePlaylists } from "../../hooks/usePlaylists";
import { useEffect, useReducer, useState } from "react";
import { useAsync } from "../../hooks/useAxios";
import { checkIfVideoIsAlreadyPresentInSpecifiedPlaylist } from "../../utils/checkIfVideoIsAlreadyPresentInSpecifiedPlaylist";
import { removeFromPlaylistService } from "../../services/playlists/removeFromPlaylistService";
import { addToPlaylistService } from "../../services/playlists/addToPlaylistService";

import { getSingeVideoPageService } from "../../services/videos/getSingleVideoPageService";
import { AddToPlaylistModal } from "../../components/PlaylistModal/AddToPlaylistModal";
import { updateVideoService } from "../../services/videos/updateVideoService";
import { UPDATE_VIDEO } from "../../constants/actions.types";
import { getAllVideos } from "../../services/videos/getAllVideos";
import { saveNotesService } from "../../services/notes/saveNotesService";
import { getNotesService } from "../../services/notes/getNotesService";
import { Note, UserDefinedNote } from "../../constants/notes.types";
import { notesReducer } from "../../reducers/NotesReducer";
import { useAuth } from "../../hooks/useAuth";
import { editNotesService } from "../../services/notes/editNotesService";
import { useProfile } from "../../hooks/useProfile";
import { Video } from "../../constants/videos.types";
import { default as svp } from "./SingleVideoPage.module.css";
import { default as common } from "../../common/common.module.css"
import { MdEditNote, MdMenu, MdOutlineWatchLater, MdPlaylistAdd, MdRemoveRedEye, MdShare, MdSubscriptions, MdVerifiedUser, MdWatchLater } from "react-icons/md";
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
import { displayRazorPayModal } from "../../services/payment/displayRazorpayModal";
import { RiShieldFlashFill } from "react-icons/ri";
import { Payment } from "../../constants/payment.types";
import { Premium } from "../../components/Premium/Premium";
import { deleteNotesService } from "../../services/notes/deleteNoteService";
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
        videoContent
    } = svp;
    const {
        containerSingleVideoPage,

        mainContainer,

        navbar,

        publisherAvatar,

        wrapperContainer,

        wrapperLogo,
        hamburgerMenu,
        iconButton,
        btnGetPremium,
        editProfileIcon,
        editProfileButton,
        btnTrash,
        iconDelete

    } = common;
    const [sidebar, setSidebar] = useState(false);

    const { videoId } = useParams();
    const { videosState, videosDispatch } = useVideos();
    const { userProfile } = useProfile();


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



    const { execute: executeGetSingeVideoPageService, status, response } = useAsync(getSingeVideoPageService, false, null);

    const { execute: executesaveNotesService, status: saveNotesStatus, response: saveNotesResponse } = useAsync(saveNotesService, false, null);

    const { execute: executeGetNotesService, status: getNotesStatus, response: getNotesResponse } = useAsync(getNotesService, false, null);

    const { execute: executeEditNotesService, status: editNotesStatus, response: editNotesResponse } = useAsync(editNotesService, false, null);

    const { execute: executeDeleteNoteService, status: deleteNoteStatus, response: deleteNoteResponse } = useAsync(deleteNotesService, false, null);


    const video = videosState?.videos?.find(video => video._id === videoId);

    useEffect(() => {
        try {
            const video = videosState.videos.find(video => video._id === videoId)
            if (!video) {

                executeGetSingeVideoPageService({
                    videoId
                })
            }
        } catch (error) {
            console.error(`error `, error)
        }

    }, [videoId, executeGetSingeVideoPageService, videosState.videos]);

    useEffect(() => {
        try {
            if (status === `success`) {

                const { status, data: { message, video }, success } = response;


                if (status === 201 && success) {
                    videosDispatch({
                        type: UPDATE_VIDEO,
                        payload: {
                            video
                        }
                    })
                }


            }
        } catch (error) {
            console.error(`error `, error)
        }

    }, [status, response, videosDispatch])


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

    }, [addToHistoryStatus, addToHistoryResponse, playlistsDispatch]);


    useEffect(() => {
        try {
            if (updateVideoStatus === `success`) {
                const {
                    status, data: { message, video }, success
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
            console.error(`error `, error)
        }
    }, [updateVideoStatus, updateVideoResponse, videosDispatch]);

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
            videosState.videos.find(video => video._id === videoId),
            playlistsState.likedVideosData.likedVideos
        );

    const isVideoAlreadyPresentInWatchLaterPlaylist =
        video && checkIfVideoIsAlreadyPresentInSpecifiedPlaylist(
            video,
            playlistsState.watchLaterVideosData.watchLaterVideos
        );

    

    if (status === `loading`) {
        return <div className="d-flex ai-center jc-center h-100 w-100">
            <Loader />

        </div>
    }



    if (video) {
        return (
            <>
                {
                    !ismodalHidden && <AddToPlaylistModal ismodalHidden={ismodalHidden} setIsModalHidden={setIsModalHidden} video={video} />
                }
                <Navbar setSidebar={setSidebar}></Navbar>
                <MobileSidebar status={{ sidebar, setSidebar }} />
                <div className={` ${containerSingleVideoPage}`}>
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
                                            onClick={() => {

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
                                        The Men Who Built India | S1 E3- The Cotton Supremacy | Convey
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
                                            <span className="pl-md "> {getLikesOfAVideo(video)} likes</span>
                                        </div>
                                        <div className="d-flex ai-center">
                                            <span>
                                                <MdRemoveRedEye size={20} />
                                            </span>
                                            <span className="pl-md "> {video.views.male + video.views.female + video.views.others} views</span>
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
                                                return <div key={note._id} >
                                                    <div className={`${editProfileIcon} ${iconButton}`} style={{ top: `0px`, right: `0px` }}>
                                                        <button
                                                            className={`btn ${editProfileButton}`}

                                                            onClick={() => {
                                                                setEditNote(prevState => ({ ...prevState, isEditNote: true, noteId: note._id }));
                                                                setUserDefinedNote({
                                                                    title: note.title,
                                                                    description: note.description
                                                                })
                                                            }

                                                            }>
                                                            <MdEditNote size={28} />
                                                        </button>
                                                    </div>
                                                    <div className={`fs-3 mb-lg`}>{note.title}</div>
                                                    <div className="">
                                                        {
                                                            note.description
                                                        }
                                                    </div>
                                                    <div className={`${iconDelete}`}>
                                                        <button className={`btn ${btnTrash}`}
                                                            onClick={() => {
                                                                executeDeleteNoteService({
                                                                    noteId: note._id,
                                                                    videoId: video._id
                                                                })
                                                            }}
                                                        >
                                                            <span>
                                                                {" "}
                                                                <IoMdTrash size={24} />{" "}
                                                            </span>{" "}

                                                        </button>

                                                    </div>
                                                </div>
                                            })


                                        }
                                    </div>}</>}
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
    return <><h1>Invalid ID</h1></>
}