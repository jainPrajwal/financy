import { Loader } from "kaali-ui";


import { default as historyStyles } from "../../pages/History/History.module.css";




import { MobileSidebar } from "../../components/MobileSidebar/MobileSidebar"
import { useEffect, useState } from "react";
import { Sidebar } from "../../components/Sidebar/Sidebar";



import { loading, NO_VIDEOS_FOUND, Video } from "../../constants/videos.types";
import { PlaylistsVideoCard } from "../../components/PlaylistsCard/PlaylistsVideoCard";
import { Navbar } from "../../components/Navbar/Navbar";
import { FlexContainer } from "../../components/FlexContainer/FlexContainer";
import { Fallback } from "../../components/Fallback/Fallback";
import { useAsync } from "../../hooks/useAxios";
import { getUploadedVideosByUserService } from "../../services/videos/getUploadedVideosByUserService";
import { useAuth } from "../../hooks/useAuth";
import { useProfile } from "../../hooks/useProfile";


export const UploadedVideos = () => {
    const {
        historyContainer,
        headerContainer,
        mainContainer,

        cardContainer,

    } = historyStyles;
    const [sidebar, setSidebar] = useState(false);
    const [uploadedVideos, setUploadedVideos] = useState<{ videos: Video[] }>({
        videos: [],

    });

    const { userProfile } = useProfile()

    const { execute, response, status } = useAsync(getUploadedVideosByUserService, false, null);

    useEffect(() => {
        if (status === `idle` && userProfile) {

            execute(null);
        }
    }, [userProfile, execute]);

    useEffect(() => {
        try {
            if (userProfile) {

                if (status === `success`) {
                    const { data, status } = response;
                    if (`videos` in data && status === 200) {

                        setUploadedVideos({
                            videos: data.videos,

                        })
                    }
                }
            }

        } catch (error) {
            console.error(`error `, error);

        }
    }, [response, status, userProfile])
    return (
        <>
            <Navbar setSidebar={setSidebar} />
            <MobileSidebar status={{ sidebar, setSidebar }} />
            <div className={`${historyContainer}`}>
                <div
                    className={`${headerContainer} header header-secondary text-white`}
                >
                    Uploaded Videos
                </div>

                <Sidebar />
                <div className={`${mainContainer}`}>
                    <div className={`${cardContainer}`}>


                        {status === `loading` ? <><FlexContainer><Loader /></FlexContainer></> :
                            uploadedVideos.videos.length > 0 ? uploadedVideos.videos.map((video: Video) => {
                                return <PlaylistsVideoCard key={video._id} video={video} playlistId={null} />
                            }) : <Fallback fallbackTitle={`${NO_VIDEOS_FOUND}`} />
                        }

                    </div>
                </div>
            </div>
        </>
    );
}


