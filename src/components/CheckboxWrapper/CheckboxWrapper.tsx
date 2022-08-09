import { Checkbox, Loader, useToast } from "kaali-ui";
import { useEffect, useState } from "react";
import { usePlaylists } from "../../hooks/usePlaylists";
import { Playlist } from "../../constants/playlists.types";
import { Video } from "../../constants/videos.types";
import { useAsync } from "../../hooks/useAxios";
import { removeFromPlaylistService } from "../../services/playlists/removeFromPlaylistService";
import { addToPlaylistService } from "../../services/playlists/addToPlaylistService";
import { checkIfVideoIsAlreadyPresentInSpecifiedPlaylist } from "../../utils/checkIfVideoIsAlreadyPresentInSpecifiedPlaylist";
import { showToast } from "../../utils/showToast";
import { ToastMessage } from "../ToastMessage/ToastMessage";


export const CheckboxWrapper = ({ playlist, video }: { playlist: Playlist, video: Video }) => {
    const isVideoPresentInPlaylist = checkIfVideoIsAlreadyPresentInSpecifiedPlaylist(video, playlist);
    const [isChecked, setIsChecked] = useState<Boolean>(isVideoPresentInPlaylist);
    const { playlistsDispatch } = usePlaylists();
    const { toastDispatch } = useToast();
    const videoId = video._id;

    const { execute: executeRemoveFromPlaylist, status: removeFromPlaylistStatus, response: removeFromPlaylistResponse } = useAsync(removeFromPlaylistService, false, null);

    const { execute: executeAddToPlaylistService, status: addToPlaylistServiceStatus, response: addToPlaylistServiceResponse } = useAsync(addToPlaylistService, false, null);


    useEffect(() => {
        try {
            if (removeFromPlaylistStatus === `success`) {
                const { data: { message, video } } = removeFromPlaylistResponse;
                playlistsDispatch({
                    type: `REMOVE_FROM_PLAYLIST`,
                    payload: {
                        playlist,
                        video
                    }
                })
                showToast({
                    toastDispatch,
                    element: (
                        <ToastMessage message={message} videoId={videoId} />
                    ),

                    videoId,
                    type: `danger`
                })
            }
        } catch (error) {
            console.error(`error `, error)
        }

    }, [removeFromPlaylistStatus, playlistsDispatch, removeFromPlaylistResponse])


    useEffect(() => {
        try {

        } catch (error) {
            console.error(`error `, error)
        }
        if (addToPlaylistServiceStatus === `success`) {
            const { data: { message, video } } = addToPlaylistServiceResponse
            playlistsDispatch({
                type: `ADD_TO_PLAYLIST`,
                payload: {
                    playlist,
                    video
                }
            })
            showToast({
                toastDispatch,
                element: (
                    <ToastMessage message={message} videoId={videoId} />
                ),

                videoId,

            })
        }
    }, [addToPlaylistServiceResponse, addToPlaylistServiceStatus, playlistsDispatch,])


    const onChangeHandler = () => {
        setIsChecked(prevState => {

            if (prevState) {


                executeRemoveFromPlaylist({
                    videoId: video._id,
                    playlistId: playlist._id
                })

            } else {


                executeAddToPlaylistService({
                    video,
                    playlistId: playlist._id
                })

            }
            return !prevState
        })
    }




    if (removeFromPlaylistStatus === `loading` || addToPlaylistServiceStatus === `loading`) {
        return <Loader width={`36px`} height={`36px`} />
    }
    return <Checkbox isChecked={isVideoPresentInPlaylist} onChangeHandler={onChangeHandler} />
}