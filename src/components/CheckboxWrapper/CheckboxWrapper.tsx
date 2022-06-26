import { useEffect, useState } from "react";
import { Checkbox ,Loader} from "kaali-ui";
import { usePlaylists } from "../../hooks/usePlaylists";
import { Playlist } from "../../constants/playlists.types";
import { Video } from "../../constants/videos.types";
import { useAsync } from "../../hooks/useAxios";
import { removeFromPlaylistService } from "../../services/playlists/removeFromPlaylistService";
import { addToPlaylistService } from "../../services/playlists/addToPlaylistService";
import { checkIfVideoIsAlreadyPresentInSpecifiedPlaylist } from "../../utils/checkIfVideoIsAlreadyPresentInSpecifiedPlaylist";


export const CheckboxWrapper = ({ playlist, video }: { playlist: Playlist, video: Video }) => {
    const [isChecked, setIsChecked] = useState<Boolean>(false);
    const { playlistsDispatch } = usePlaylists();

    const { execute: executeRemoveFromPlaylist, status: removeFromPlaylistStatus, response: removeFromPlaylistResponse } = useAsync(removeFromPlaylistService, false, null);

    const { execute: executeAddToPlaylistService, status: addToPlaylistServiceStatus, response: addToPlaylistServiceResponse } = useAsync(addToPlaylistService, false, null);


    useEffect(() => {
        if (removeFromPlaylistStatus === `success`) {
            const { data: { video } } = removeFromPlaylistResponse;
            playlistsDispatch({
                type: `REMOVE_FROM_PLAYLIST`,
                payload: {
                    playlist,
                    video
                }
            })
        }
    }, [removeFromPlaylistStatus, playlistsDispatch, removeFromPlaylistResponse])


    useEffect(() => {
        if (addToPlaylistServiceStatus === `success`) {
            const { data: { video } } = addToPlaylistServiceResponse
            playlistsDispatch({
                type: `ADD_TO_PLAYLIST`,
                payload: {
                    playlist,
                    video
                }
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

    const isVideoPresentInPlaylist = checkIfVideoIsAlreadyPresentInSpecifiedPlaylist(video, playlist);

    if (removeFromPlaylistStatus === `loading` || addToPlaylistServiceStatus === `loading`) {
        return <Loader width={`36px`} height={`36px`} />
    }
    return <Checkbox isChecked={isVideoPresentInPlaylist} onChangeHandler={onChangeHandler} />
}