import axios, { AxiosResponse } from "axios"
import { BASE_API } from "../../constants/api"
import { UserDefinedPlaylist } from "../../constants/playlists.types"
import { getErrorMessage } from "../../utils/getErrorMessage"

export const createPlaylistService = (playlist: UserDefinedPlaylist): Promise<AxiosResponse> => {
    try {

        const response = axios.post(`${BASE_API}/playlists`, {
            playlist
        });
        return response
    } catch (error) {
        console.error(`something went wrong while creating playlist`, error)
        throw new Error(getErrorMessage(error))
    }
}