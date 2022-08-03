import { Loader } from "kaali-ui";
import { useEffect, useState } from "react";
import { MobileSidebar } from "../../components/MobileSidebar/MobileSidebar";
import { Sidebar } from "../../components/Sidebar/Sidebar";
import { ExploreVideoCard } from "../../components/Explore/ExploreVideoCard";
import { default as exploreStyles } from "../Explore/Explore.module.css"
import { Navbar } from "../../components/Navbar/Navbar";
import { useAsync } from "../../hooks/useAxios";
import { getTrendingVideos } from "../../services/videos/getTrendingVideos";
import { Video } from "../../constants/videos.types";


export const Trending = () => {

    const [sidebar, setSidebar] = useState(false);
    const [trendingVideos, setTrendingVideos] = useState<{ videos: Video[] }>({
        videos: [],
    })

    const { execute, errorMessage, status, response } = useAsync(getTrendingVideos, false, null);

    useEffect(() => {
        if (status === `idle`) {
            execute(null);
        }
    }, []);

    useEffect(() => {
        try {
            if (status === `success`) {
                const { data } = response;
                if (`videos` in data) {
                    setTrendingVideos({ videos: data.videos })
                }
            }
        } catch (error) {
            console.error(`error `, error, errorMessage)
        }

    }, [status, response, errorMessage])



    const {

        exploreContainer,
        headerContainer,
        videoWrapperContainer,
        exploreWrapperContainer,
    } = exploreStyles;
    return (
        <>
            <Navbar setSidebar={setSidebar} />
            <MobileSidebar status={{ sidebar, setSidebar }} />
            <div className={`${exploreContainer}`}>
                <div
                    className={`${headerContainer} header header-secondary text-white`}
                >
                    Trending
                </div>

                <div className={``}>
                    <Sidebar />
                    <div
                        className={`${exploreWrapperContainer} gap-10 tube-text-secondary-color`}
                        style={{ marginLeft: `0px` }}
                    >

                        <div className={`${videoWrapperContainer}`}>



                            {

                                status === `success` && trendingVideos.videos.map((video, index) => {
                                    return <ExploreVideoCard index={index} setLastElement={null} video={video} key={video._id} />
                                })
                            }
                            {
                                status === `loading` ?
                                    <span className="d-flex jc-center w-100">

                                        <Loader />
                                    </span> : <>Something went wrong..!</>
                            }

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}