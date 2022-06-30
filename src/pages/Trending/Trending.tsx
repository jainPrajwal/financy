import { useVideos } from "../../hooks/useVideos"
import { default as common } from "../../common/common.module.css";
import { useState } from "react";
import { MdMenu } from "react-icons/md";
import { SearchBar } from "../../components/SearchBar/SearchBar";
import { Avatar, Loader } from "kaali-ui"
import { MobileSidebar } from "../../components/MobileSidebar/MobileSidebar";
import { Sidebar } from "../../components/Sidebar/Sidebar";
import { ExploreVideoCard } from "../../components/Explore/ExploreVideoCard";
import { default as exploreStyles } from "../Explore/Explore.module.css"
import { Navbar } from "../../components/Navbar/Navbar";
export const Trending = () => {
    const { videosState } = useVideos();
    const [sidebar, setSidebar] = useState(false);
    const [searchbar, setSearchbar] = useState(false);

    const trendingVideos = [...videosState.videos].sort((video1, video2) => {
        const timeElapsed2 = new Date().getTime() - new Date(video2.createdAt).getTime();
        const timeElapsed1 = new Date().getTime() - new Date(video1.createdAt).getTime();

        let totalVideo2Views = video2.views.female + video2.views.male + video2.views.others
        let totalVideo1Views = video1.views.female + video1.views.male + video1.views.others
        if (totalVideo2Views === 0) {
            totalVideo2Views = -1;
        }

        if (totalVideo1Views === 0) {
            totalVideo1Views = -1;
        }
        return (timeElapsed2 % totalVideo2Views) - (timeElapsed1 % totalVideo1Views)
    });
    const {
        navbar,

        publisherAvatar,

        wrapperLogo,
        hamburgerMenu,
        wrapperSearch
    } = common;

    const {
        videoContainer,
        relatedContainer,
        exploreContainer,
        headerContainer,
        videoNumber,
        videoThumbnailWrapper,
        videoContent,
        videoHeader,
        videoMetrics,
        publisherName,
        publisherDetails,
        likeIconButtonWrapper,

        videoWrapperContainer,
        exploreWrapperContainer,
        videoThumbnailContainer,
        videoDuration,
        relatedWrapperContainer,
        relatedVideoContainer,
        relatedVideoThumbnailContainer,
        reltaedVideoThumbnailWrapper,
        relatedVideoThumbnail,
        relatedVideoContent,
        relatedVideoHeader,
        relatedVideoMetrics,
        chipsContainer, chip, chipClear, chipSolid
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

                                trendingVideos.map((video, index) => {
                                    return <ExploreVideoCard index={index} setLastElement={null} video={video} key={video._id} />
                                })
                            }
                            {
                                videosState.loading === `loading` &&
                                <span className="d-flex jc-center w-100">

                                    <Loader />
                                </span>
                            }

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}