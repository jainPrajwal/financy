import { useToast, Loader } from "kaali-ui"
import axios from "axios";
import { useEffect, useState } from "react";
import { CATEGORIES, loading, UserUploadedVideo, Video } from "../../constants/videos.types";

import { useAsync } from "../../hooks/useAxios";
import { useVideos } from "../../hooks/useVideos";
import { uploadVideoService } from "../../services/videos/uploadVideoService";
import { default as common } from "../../common/common.module.css";
import { Navbar } from "../../components/Navbar/Navbar";
import { MobileSidebar } from "../../components/MobileSidebar/MobileSidebar";
import { Sidebar } from "../../components/Sidebar/Sidebar";
import { default as uploadStyles } from "./UploadVideo.module.css";
import { ToastMessage } from "../../components/ToastMessage/ToastMessage";
import { showToast } from "../../utils/showToast";
import { YOUTUBE_REPL_API } from "../../constants/api";
import { FlexContainer } from "../../components/FlexContainer/FlexContainer";
import { UploadedVideos } from "../../components/UploadedVideos/UploadedVideos";

export const UploadVideo = () => {
    const [videoDetails, setVideoDetails] = useState<UserUploadedVideo>({
        url: null,
        category: null,
    });
    const [sidebar, setSidebar] = useState(false);
    const { toastDispatch } = useToast();

    const { execute, status, response, errorMessage } = useAsync(uploadVideoService, false, null);
    const [fetchingVideoStatus, setFetchingVideoStatus] = useState<loading>(`idle`)

    const { inputStyle } = common;

    const {
        headerContainer,
        uploadContainer,
    } = uploadStyles;
    const { videosDispatch } = useVideos();
    useEffect(() => {
        try {
            if (status === `success`) {
                const { data: { message, video }, status } = response;
                if (status === 201) {
                    videosDispatch({
                        type: `UPLOAD_VIDEO`,
                        payload: {
                            video
                        }
                    });

                    showToast({
                        toastDispatch,
                        element: (
                            <ToastMessage message={message} videoId={video._id} />
                        ),

                        videoId: video._id,

                    });
                    setVideoDetails({
                        url: null,
                        category: null,
                    })
                }

            } else if (status === `error`) {

                showToast({
                    toastDispatch,
                    element: (
                        <ToastMessage message={errorMessage || `Something went wrong`} videoId={``} />
                    ),

                    videoId: ``,

                });
            }
        } catch (error) {
            console.error(`error `, error)
        }

    }, [status, response, videosDispatch, toastDispatch]);


    return <>
        <Navbar setSidebar={setSidebar} />
        <MobileSidebar status={{ sidebar, setSidebar }} />
        <div className={`${uploadContainer}`}>
            <div
                className={`${headerContainer} header-secondary text-white text-bold`}
            >
                Upload A New Video
            </div>

            <Sidebar />

            <div style={{ maxWidth: `380px`, margin: `0 auto`, width: `100%` }}

            >
                <form
                    className="d-flex f-direction-col gap-10 p-lg  w-100"

                    onSubmit={async (e) => {
                        e.preventDefault();
                        const url = videoDetails.url;


                        const videoId = url?.split(`=`)[1] || url?.slice(url?.lastIndexOf(`/`) + 1);

                        if (videoId) {
                            setFetchingVideoStatus(`loading`)
                            try {
                                const response = await axios.get(`${YOUTUBE_REPL_API}/videos/${videoId}/${videoDetails.category?.toLowerCase()}`);
                                setFetchingVideoStatus(`success`)
                                const { data: { video } } = response;
                                let videoToBeUploaded: Video = video[0];
                                videoToBeUploaded = {
                                    ...videoToBeUploaded, isPremium: false, likes: {
                                        male: 0,
                                        female: 0,
                                        others: 0
                                    }, views: {
                                        male: 0,
                                        female: 0,
                                        others: 0
                                    }, url: videoId || ``
                                }

                                execute({ video: videoToBeUploaded })
                            } catch (error) {
                                console.error(`error `, error)
                                setFetchingVideoStatus(`error`)
                            }


                        }


                    }}>
                    <label htmlFor="url" className="text-white ">Enter Youtube URL</label>
                    <input
                        value={videoDetails.url || ``}
                        type="text" placeholder="Enter URL of any youtube video"
                        className={`p-lg m-sm ${inputStyle} `}
                        id={`url`}
                        onChange={(e) => setVideoDetails(prevState => ({ ...prevState, url: e.target.value }))} required autoFocus />

                    <label htmlFor="category" className="text-white">Category</label>
                    <select
                        value={videoDetails.category || ``}
                        required
                        name="category" id="category" className={`${inputStyle} p-lg cursor-pointer`} onChange={(e) => setVideoDetails(prevState => ({ ...prevState, category: e.target.value }))}>
                        <option value="">Please select an option</option>
                        {

                            CATEGORIES.map((category: string, index: number) => {

                                return <option value={category} key={category} >{category.toLowerCase()}</option>
                            })
                        }
                    </select>
                    <div className=" my-lg py-lg">
                        <button className="btn btn-primary w-100" type="submit">Upload Video</button>
                    </div>

                </form>
                {
                    (status === `loading` || fetchingVideoStatus === `loading`) && <FlexContainer><Loader /></FlexContainer>
                }
            </div>


        </div>
        <div>
            <UploadedVideos />
        </div>
    </>
} 