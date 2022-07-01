import { Modal, ModalHeader, ModalFooter, ModalBody, ModalRow, ModalOverlay, ModalContainer } from "kaali-ui"
import { useCallback, useEffect, useRef, useState } from "react";
import { default as playlistModalStyles } from "./AddToPlaylistModal.module.css";
import { MdClose, MdPlaylistAdd } from "react-icons/md"
import { useFocus } from "../../hooks/useFocus";
import { useOnClickOutside } from "../../hooks/useOnClickOutside";
import { Playlist, UserDefinedPlaylist } from "../../constants/playlists.types";
import { useAsync } from "../../hooks/useAxios";
import { createPlaylistService } from "../../services/playlists/createPlaylistService";
import { usePlaylists } from "../../hooks/usePlaylists";
import { CREATE_PLAYLIST } from "../../constants/actions.types";
import { Link } from "react-router-dom";
import { Loader } from "kaali-ui"
import { CheckboxWrapper } from "../CheckboxWrapper/CheckboxWrapper";
import { Video } from "../../constants/videos.types";
import { default as common } from "../../common/common.module.css";

const UserPlaylist: UserDefinedPlaylist = {
    name: null,
    description: null,
    isDefault: false,
    thumbnail: `https://github.com/j836/kaaliUI/blob/main/assets/images/heart.png?raw=true`,
    type: `custom`
}



export const AddToPlaylistModal = ({ ismodalHidden, setIsModalHidden, video }: { ismodalHidden: boolean, setIsModalHidden: React.Dispatch<React.SetStateAction<boolean>>, video: Video }) => {
    const { showInput, hideInput } = playlistModalStyles;
    const { inputStyle, } = common;

    const [showPlaylistInput, setShowPlaylistInput] = useState<Boolean>(false);
    const [newPlaylistDetails, setnewPlaylistDetails] = useState<UserDefinedPlaylist>(UserPlaylist);
    const { playlistsState, playlistsDispatch } = usePlaylists();

    const ModalRef = useRef<HTMLDivElement | null>(null);
    const InputRef = useRef<HTMLInputElement | null>(null);

    const { execute: executeCreatePlaylistService, status: createPlaylistServiceStatus, response: createPlaylistServiceResponse } = useAsync(createPlaylistService, false, null);

    useFocus(InputRef, showPlaylistInput);
    useOnClickOutside(ModalRef, setIsModalHidden)

    const handleModalClose = useCallback(() => setIsModalHidden(true), [setIsModalHidden])


    useEffect(() => {
        if (createPlaylistServiceStatus === `success`) {
            const { data: { playlist } } = createPlaylistServiceResponse
            playlistsDispatch({
                type: CREATE_PLAYLIST,
                payload: {
                    playlist
                }
            })

            setnewPlaylistDetails(UserPlaylist)
        }
    }, [createPlaylistServiceStatus, createPlaylistServiceResponse, playlistsDispatch])



    return (
        <>

            <Modal>
                <ModalOverlay isHidden={ismodalHidden}>
                    <div
                        ref={ModalRef}
                        className="modal"
                        style={{ display: ismodalHidden ? `none` : `block` }}
                    >
                        <form onSubmit={(e) => {
                            e.preventDefault();
                            setShowPlaylistInput(true)
                            if (showPlaylistInput) {

                                executeCreatePlaylistService(newPlaylistDetails)
                            }

                        }}>
                            <ModalContainer>

                                <div className="d-flex">
                                    <ModalHeader handleModalClose={handleModalClose}>
                                        {`Recent Playlists`}

                                    </ModalHeader>
                                    <span className="ml-auto header-tertiary cursor-pointer" role={`button`} onClick={() => handleModalClose()}>

                                        <MdClose />
                                    </span>
                                </div>

                                <hr className="modal-hr" />
                                <ModalBody>

                                    <ModalRow extendedClassNames={`row-saved-collection f-direction-col ai-start`}>

                                        {
                                            playlistsState?.customPlaylistsData?.customPlaylists.map((customPlaylist: Playlist, index: number) => {
                                                if (index > 1) return <div key={customPlaylist._id}></div>
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

                                                        <CheckboxWrapper playlist={customPlaylist} video={video} />
                                                    </div>
                                                </div>
                                            })
                                        }


                                    </ModalRow>
                                    {playlistsState.customPlaylistsData.customPlaylists.length > 3 && <ModalRow extendedClassNames={`d-flex jc-end`}> <Link
                                        style={{ color: `var(--tube-theme-primary)` }}
                                        to={`/playlists`} >See more </Link></ModalRow>}
                                    <ModalRow>
                                        <div className={`collection create-new-collection w-100 f-direction-col ai-center ${showPlaylistInput ? `${showInput}` : `${hideInput}`}`}>

                                            <div className="create-text w-100 my-sm">
                                                <input type="text" placeholder="Create new playlist" className={`p-lg ${inputStyle}`} autoFocus
                                                    ref={InputRef}
                                                    required={showPlaylistInput ? true : false}
                                                    name="playlist name"
                                                    onChange={(e) => setnewPlaylistDetails(prevState => ({ ...prevState, name: e.target.value }))}
                                                />

                                            </div>
                                            <div className="create-text w-100 my-sm">
                                                <textarea placeholder="Description" className={`p-lg ${inputStyle}`} style={{ resize: `none` }}
                                                    name="playlist description"
                                                    onChange={(e) => setnewPlaylistDetails(prevState => ({ ...prevState, description: e.target.value, }))}
                                                />

                                            </div>
                                        </div>
                                    </ModalRow>
                                </ModalBody>
                                <ModalFooter>
                                    <button
                                        type="submit"
                                        className="btn btn-primary"
                                        id="collection-btn-done"
                                        style={{ width: "100%", maxWidth: "none", margin: 0 }}

                                    >
                                        {createPlaylistServiceStatus === `loading` ? <span className="d-flex jc-center w-100">
                                            <Loader width={`12px`} height={`12px`} />
                                        </span> : `CREATE NEW PLAYLIST`}
                                    </button>
                                </ModalFooter>
                            </ModalContainer>
                        </form>

                    </div>
                </ModalOverlay>
            </Modal>

        </>
    );

}