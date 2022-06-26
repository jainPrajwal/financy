import { MdPlaylistAdd } from "react-icons/md";
import { Playlist } from "../../constants/playlists.types";
import { usePlaylists } from "../../hooks/usePlaylists"
import { Checkbox } from "kaali-ui"

export const Playlists = () => {
    const { playlistsState } = usePlaylists();
    return <>
        {
            playlistsState.customPlaylistsData.customPlaylists.map((customPlaylist: Playlist, index: number) => {

                return <div className="collection saved-collection w-100" key={customPlaylist._id}>
                    <div className="modal-save-item-to-icon save-symbol" style={{ minWidth: `48px`, height: `48px` }}>
                        <MdPlaylistAdd size={20} color={`red`} />
                    </div>
                    <div className="create-text" style={{ fontFamily: `inherit` }}>
                        <span className="heading">{`${customPlaylist.name}`.toUpperCase()} </span>
                        <span className="secondary-text">
                            {`${customPlaylist.videos.length} items`}
                        </span>
                    </div>
                    <div className="ml-auto">

                        <Checkbox />
                    </div>
                </div>
            })
        }</>
}