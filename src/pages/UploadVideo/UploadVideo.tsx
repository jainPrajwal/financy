import axios from "axios";
import { useEffect, useState } from "react";
import { UserUploadedVideo, Video } from "../../constants/videos.types";
import { initialState as DefaultVideosInitialState} from "../../contexts/videos-context";

import { useAsync } from "../../hooks/useAxios";
import { useVideos } from "../../hooks/useVideos";
import { uploadVideoService } from "../../services/videos/uploadVideoService";



export const UploadVideo = () => {
    const [videoDetails, setVideoDetails] = useState<UserUploadedVideo>({
        url: null,
        category: null,
    });

    const { execute, status, response, errorMessage } = useAsync(uploadVideoService, false, null)

    const { videosDispatch } = useVideos();
    useEffect(() => {
        if (status === `success`) {
            const { data: { video } } = response;
            videosDispatch({
                type: `UPLOAD_VIDEO`,
                payload: {
                    video
                }
            })
        }
    }, [status, response, videosDispatch])

    return <>
        <form
            className="d-flex f-direction-col gap-10 p-lg m-lg"
            style={{ maxWidth: `380px`, margin: `0 auto` }}
            onSubmit={async (e) => {
                e.preventDefault();
                const url = videoDetails.url;
                const videoId = url?.split(`=`)[1];
                const response = await axios.get(`https://getYoutubeVideoDetails.prajwaljain.repl.co/videos/${videoId}/${videoDetails.category}`);

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


            }}>
            <label htmlFor="url">Enter Youtube URL</label>
            <input type="text" placeholder="Enter URL of any youtube video"
                className="p-lg m-sm"
                id={`url`}
                onChange={(e) => setVideoDetails(prevState => ({ ...prevState, url: e.target.value }))} required autoFocus />

            <label htmlFor="cateogry">Category</label>
            <select name="category" id="category" className="p-lg" onChange={(e) => setVideoDetails(prevState => ({ ...prevState, category: e.target.value }))}>
                <option value="">Please select an option</option>
                {

DefaultVideosInitialState.categories.map((category: string, index: number) => {

                        return <option value={category} key={category} >{category}</option>
                    })
                }
            </select>

            <button className="btn btn-primary" type="submit">Upload Video</button>
        </form></>
} 