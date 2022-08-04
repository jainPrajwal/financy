import { Modal, ModalHeader, ModalFooter, ModalBody, ModalRow, ModalOverlay, ModalContainer } from "kaali-ui"
import { useState } from "react";
import { useEffect } from "react";
import { useCallback, useRef } from "react";
import { MdClose } from "react-icons/md"
import { useAsync } from "../../hooks/useAxios";
import { useFocus } from "../../hooks/useFocus";
import { useOnClickOutside } from "../../hooks/useOnClickOutside";
import { useProfile } from "../../hooks/useProfile";
import { updateUserProfileService } from "../../services/profile/updateUserProfileService";
import { default as playlistModalStyles } from "./Profile.module.css";
import { default as common } from "../../common/common.module.css";

export const ProfileModal = ({ ismodalHidden, setIsModalHidden, }: { ismodalHidden: boolean, setIsModalHidden: React.Dispatch<React.SetStateAction<boolean>>, }) => {
    const ModalRef = useRef<HTMLDivElement | null>(null);
    const InputRef = useRef<HTMLInputElement | null>(null);

    useFocus(InputRef, false);
    useOnClickOutside(ModalRef, setIsModalHidden);
    const handleModalClose = useCallback(() => setIsModalHidden(true), [setIsModalHidden])
    const { showInput, hideInput } = playlistModalStyles;
    const { inputStyle } = common;
    const { userProfile, setUserProfile } = useProfile();

    const [userDefinedDetails, setUserDefinedDetails] = useState<{
        name: string | null,

    }>({
        name: null,
    });

    const { execute, status, response, errorMessage } = useAsync(updateUserProfileService, false, null);

    useEffect(() => {
        try {
            if (status === `success`) {
                const { status, data: { profile }, message, success } = response;

                if (status === 201 && success) {

                    setUserProfile(profile)
                }

            }
        } catch (error) {
            console.error(`error `, error);
        }
    }, [status, response, setUserProfile])

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
                            if (userDefinedDetails.name) {
                                execute({ updatedProfile: userDefinedDetails })
                            }

                        }}>
                            <ModalContainer>

                                <div className="d-flex">
                                    <ModalHeader handleModalClose={handleModalClose}>
                                        {`Edit Profile`}

                                    </ModalHeader>
                                    <span className="ml-auto header-tertiary cursor-pointer" role={`button`} onClick={() => handleModalClose()}>

                                        <MdClose />
                                    </span>
                                </div>

                                <hr className="modal-hr" />
                                <ModalBody>

                                    <ModalRow extendedClassNames={`row-saved-collection f-direction-col ai-start jc-start`}>


                                        <input
                                            value={userDefinedDetails?.name || ``}
                                            onChange={(e) => setUserDefinedDetails(prevState => ({ ...prevState, name: e.target.value }))}
                                            type="text" placeholder="Enter new name"
                                            className={`${inputStyle} p-lg w-100 fs-2`}
                                        />

                                    </ModalRow>
                                    <ModalRow extendedClassNames={`row-saved-collection f-direction-col ai-start jc-start`}>


                                        <input
                                            readOnly
                                            type="text" value={userProfile?.gender}
                                            className={`${inputStyle} p-lg w-100 fs-2`}
                                        />

                                    </ModalRow>
                                    
                                    <ModalRow extendedClassNames={`row-saved-collection f-direction-col ai-start jc-start`}>


                                        <input type="text"
                                            readOnly
                                            value={userProfile?.email}
                                            className={`${inputStyle} p-lg w-100 fs-2`}
                                        />

                                    </ModalRow>

                                    <ModalRow>

                                    </ModalRow>
                                </ModalBody>
                                <ModalFooter>
                                    <button
                                        type="submit"
                                        className="btn btn-primary"
                                        id="collection-btn-done"
                                        style={{ width: "100%", maxWidth: "none", margin: 0 }}

                                    >
                                        Submit
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