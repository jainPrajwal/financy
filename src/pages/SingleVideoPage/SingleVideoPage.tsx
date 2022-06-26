import { useParams } from "react-router-dom"
import { useVideos } from "../../hooks/useVideos";
import { Avatar, Loader } from "kaali-ui"
import { usePlaylists } from "../../hooks/usePlaylists";
import { useEffect, useReducer, useState } from "react";
import { useAsync } from "../../hooks/useAxios";
import { checkIfVideoIsAlreadyPresentInSpecifiedPlaylist } from "../../utils/checkIfVideoIsAlreadyPresentInSpecifiedPlaylist";
import { removeFromPlaylistService } from "../../services/playlists/removeFromPlaylistService";
import { addToPlaylistService } from "../../services/playlists/addToPlaylistService";
import { clearHistoryService } from "../../services/playlists/clearHistoryService";
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



export const SingleVideoPage = () => {
    const { videoId } = useParams();
    const { videosState, videosDispatch } = useVideos();
  
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

    const { userProfile } = useProfile();

    const { playlistsState, playlistsDispatch } = usePlaylists();

    const [ismodalHidden, setIsModalHidden] = useState<Boolean>(true);
    const { authState } = useAuth()

    const { execute: executeAddToLikeService, status: likeStatus, response: likeResponse } = useAsync(addToPlaylistService, false, null);

    const { execute: executeRemoveFromLiked, status: removeFromLikeStatus, response: removeFromLikedResponse } = useAsync(removeFromPlaylistService, false, null);



    const { execute: executeAddToWatchLaterService, status: watchLaterStatus, response: watchLaterResponse } = useAsync(addToPlaylistService, false, null);

    const { execute: executeRemoveFromWatchLater, status: removeFromWatchLaterStatus, response: removeFromWatchLaterResponse } = useAsync(removeFromPlaylistService, false, null);



    const { execute: executeAddHistoryService, status: addToHistoryStatus, response: addToHistoryResponse } = useAsync(addToPlaylistService, false, null);

    const { execute: executeRemoveFromHistory, status: removeFromHistoryStatus, response: removeFromHistoryResponse } = useAsync(removeFromPlaylistService, false, null);

    const { execute: executeClearHistory, status: clearHistoryStatus, response: clearHistoryResponse } = useAsync(clearHistoryService, false, null);

    const { execute: executeUpdateVideoService, status: updateVideoStatus, response: updateVideoResponse } = useAsync(updateVideoService, false, null);



    const { execute: executeGetSingeVideoPageService, status, response } = useAsync(getSingeVideoPageService, false, null);

    const { execute: executesaveNotesService, status: saveNotesStatus, response: saveNotesResponse } = useAsync(saveNotesService, false, null);

    const { execute: executeGetNotesService, status: getNotesStatus, response: getNotesResponse } = useAsync(getNotesService, false, null);

    const { execute: executeEditNotesService, status: editNotesStatus, response: editNotesResponse } = useAsync(editNotesService, false, null);


    const video = videosState?.videos?.find(video => video._id === videoId);

    useEffect(() => {
        const video = videosState.videos.find(video => video._id === videoId)
        if (!video) {

            executeGetSingeVideoPageService({
                videoId
            })
        }
    }, [videoId, executeGetSingeVideoPageService, videosState.videos]);

    useEffect(() => {
        if (status === `success`) {

            const { data: { video } } = response;




            videosDispatch({
                type: UPDATE_VIDEO,
                payload: {
                    video
                }
            })
        }
    }, [status, response, videosDispatch])


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
        if (addToHistoryStatus === `success`) {
            const {
                data: { video },
            } = addToHistoryResponse;

            playlistsDispatch({
                type: `ADD_TO_PLAYLIST`,
                payload: {
                    video,
                    playlist: playlistsState.historyData.history
                },
            });

        }
    }, [addToHistoryStatus, addToHistoryResponse, playlistsDispatch]);

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
                    data: { videos },
                } = response;

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

            } catch (error) {
                videosDispatch({
                    type: `SET_LOADING`,
                    payload: {
                        loading: `error`,
                    },
                });
            }
        })();
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
                const { data: { note } } = saveNotesResponse;

                notesDispatch({
                    type: `ADD_NOTE`,
                    payload: {
                        note
                    }
                })
            }
        } catch (error) {
            console.error(`error`, error);

        }
    }, [saveNotesStatus, saveNotesResponse])

    useEffect(() => {
        try {
            if (getNotesStatus === `success`) {
                const { data: { notes } } = getNotesResponse;
                if (notes) {

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
                const { data: { note } } = editNotesResponse;

                notesDispatch({
                    type: `UPDATE_NOTE`,
                    payload: {
                        note
                    }
                })
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

    const isVideoAlreadyPresentInHistoryPlaylist = video && checkIfVideoIsAlreadyPresentInSpecifiedPlaylist(video, playlistsState.historyData.history)

    if (status === `loading`) {
        return <div className="d-flex ai-center jc-center h-100 w-100">
            <Loader />

        </div>
    }

    if (video)
        return <>
            {
                !ismodalHidden && <AddToPlaylistModal ismodalHidden={ismodalHidden} setIsModalHidden={setIsModalHidden} video={video} />
            }
            <h1>Single Video Page</h1>

            <div

                className={`p-1 my-1 d-flex ai-center  w-100`}
                key={`${video.url}`}
                style={{ border: `1px solid black` }}
                role={`button`}

            >
                <div>

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
                                            <Loader width={`12px`} height={`100%`} />
                                        </span>

                                        : `Like`}
                                </button>
                            ) : (
                                <button
                                    className="btn btn-primary" style={{ margin: `0`, width: `inherit` }}
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
                            <button className="btn btn-primary" style={{ margin: `0`, width: `inherit` }} onClick={() => setIsModalHidden(false)}>
                                Add To Playlists
                            </button>
                        </div>

                        <div className={`w-100`}>
                            {!isVideoAlreadyPresentInHistoryPlaylist ? (
                                <button
                                    className="btn btn-primary" style={{ margin: `0`, width: `inherit` }}

                                    onClick={() => {

                                        executeAddHistoryService({
                                            video,
                                            playlistId:
                                                playlistsState.historyData.history._id
                                        });

                                        if (userProfile?.gender) {

                                            executeUpdateVideoService({

                                                video: {
                                                    likes:
                                                        videosState.videos.filter(video => video._id === videoId)[0].views[userProfile.gender] + 1
                                                },
                                                videoId: video._id
                                            })
                                        }

                                    }}
                                >
                                    {addToHistoryStatus === `loading` ?

                                        <span className="w-100 h-100 d-flex jc-center">
                                            <Loader width={`12px`} height={`100%`} />
                                        </span>

                                        : `Add to History`}
                                </button>
                            ) : (
                                <button
                                    className="btn btn-primary" style={{ margin: `0`, width: `inherit` }}
                                    onClick={() => {
                                        executeRemoveFromHistory({
                                            videoId: video._id,
                                            playlistId: playlistsState.historyData.history._id
                                        })
                                    }}
                                >
                                    {removeFromHistoryStatus === `loading` ?
                                        <span className="w-100 h-100 d-flex jc-center">
                                            <Loader width={`12px`} height={`100%`} />
                                        </span>
                                        : `Remove From History`}
                                </button>
                            )}

                        </div>

                        <div className="w-100">
                            <div>Category: {video.category}</div>
                            <div>Views: {
                                /* videosState.videos.reduce((acc: number, current: Video) => {
                                     return acc += current.views.male + current.views.female + current.views.others
                                 }, 0)*/

                                video.views.male + video.views.female + video.views.others 
                            }</div>
                            <div>Likes: {
                                /* videosState.videos.reduce((acc: number, current: Video) => {
                                     return acc += current.likes.male + current.likes.female + current.likes.others
                                 }, 0)*/
                                 video.likes.male + video.likes.female + video.likes.others 
                            }</div>
                        </div>
                    </div>

                    <div>
                        <form className="d-flex ai-center" style={{ gap: `24px` }}
                            onSubmit={(e) => {
                                e.preventDefault();
                                console.log(`notes`, userDefinedNote)
                                setUserDefinedNote({
                                    description: ``,
                                    title: ``
                                })
                                if (editNote.isEditNote) {
                                    executeEditNotesService({
                                        noteId: editNote.noteId,
                                        videoId,
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
                            <input type="text"
                                value={userDefinedNote?.title || ``}
                                placeholder="Enter Notes Title" onChange={(e) => {
                                    setUserDefinedNote(prevState => ({ ...prevState, title: e.target.value } as UserDefinedNote))
                                }} />
                            <textarea
                                value={userDefinedNote?.description || ``}
                                name="notes" id="notes" rows={10} style={{ resize: `none`, width: `100%`, maxWidth: `320px`, }}
                                placeholder="Enter notes"
                                className="p-lg"
                                onChange={(e) => {
                                    setUserDefinedNote(prevState => ({ ...prevState, description: e.target.value } as UserDefinedNote))
                                }}
                            ></textarea>
                            <button className="btn btn-primary" style={{ height: `fit-content` }}
                                type={`submit`}
                            >Save</button>
                        </form>


                    </div>

                    {
                        notesData.notes.map((note: Note) => {
                            return <div key={note._id}>
                                <div>{note.title}</div>
                                <div>{note.description}</div>
                                <div><button className="btn btn-primary" onClick={() => {
                                    setEditNote({
                                        isEditNote: true,
                                        noteId: note._id
                                    })
                                    setUserDefinedNote({
                                        title: note.title,
                                        description: note.description
                                    })
                                }}>Edit</button>


                                    <button className="btn btn-danger mx-sm">Delete</button>
                                </div>
                            </div>
                        })
                    }
                </div>

            </div>
            <div></div>
        </>

    return <><h1>Invalid ID</h1></>
}