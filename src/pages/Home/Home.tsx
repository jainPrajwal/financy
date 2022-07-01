import { Avatar, Loader } from "kaali-ui";
import { default as common } from "../../common/common.module.css";

import { default as homeStyles } from "./Home.module.css";

import { MdMenu, MdVerifiedUser } from "react-icons/md";

import { MobileSidebar } from "../../components/MobileSidebar/MobileSidebar";
import { useEffect, useState } from "react";
import { Sidebar } from "../../components/Sidebar/Sidebar";
import { useVideos } from "../../hooks/useVideos";
import { Video } from "../../constants/videos.types";
import axios from "axios";
import { BASE_API } from "../../constants/api";
import { getAllVideos } from "../../services/videos/getAllVideos";
import { NavLink, useNavigate } from "react-router-dom";

import { Navbar } from "../../components/Navbar/Navbar";
import { useProfile } from "../../hooks/useProfile";

export const Home = () => {
    const {
        navbar,

        publisherAvatar,

        wrapperLogo,
        hamburgerMenu
    } = common;

    const {
        homeContainer,
        headerContainer,
        mainContainer,
        bannerContainer,
        bannerHeader,
        bannerContent,
        bannerText,
        bannerWrapper,
        bannerImage,
        bannerImageWrapper,
        publisherName,
        cardContainer,
        card,
        cardWrapper,
        cardImageWrapper,
        cardContent,
        cardImage,
        cardTitle,
        cardText,
        cardAvatar
    } = homeStyles;
    const [sidebar, setSidebar] = useState(false);
    const [mostWatched, setMostWatched] = useState({
        videos: [],
        status: `idle`
    });
    const navigate = useNavigate();
    const { userProfile } = useProfile();

    useEffect(() => {
        (async () => {
            setMostWatched(prevState => ({ ...prevState, status: `loading` }))
            try {
                const response = await getAllVideos({ currentPageNumber: 1 })
                if (response.status === 200) {
                    const videos = response.data.videos;
                    let mostWatched = [] as any;
                    if (videos) {
                        mostWatched = [...videos].sort((video1, video2) => {
                            const totalLikes1 = video1.views.male + video1.views.female + video1.views.others;
                            const totalLikes2 = video2.views.male + video2.views.female + video2.views.others;
                            return totalLikes2 - totalLikes1
                        }).slice(0, 4)
                    }
                    setMostWatched(prevState => ({
                        ...prevState,
                        videos: mostWatched,
                        status: `success`
                    }))
                }

            } catch (error) {
                console.error(`error`, error)
                setMostWatched(prevState => ({ ...prevState, status: `error` }))
            }
        })();

    }, [])


    console.log(`mostWatched`, mostWatched)
    return (
        <>
            <Navbar setSidebar={setSidebar} />
            <MobileSidebar status={{ sidebar, setSidebar }} />

            <div className={`${homeContainer}`}>
                <div
                    className={`${headerContainer} header header-secondary text-white`}
                >
                    Discover
                </div>

                <Sidebar />
                <div className={`${mainContainer}`}>
                    <div className={`${bannerContainer}`}>
                        <div className={`${bannerWrapper}`}>
                            <div className={`${bannerContent}`}>
                                <div className={`${bannerHeader}`}>
                                    <div
                                        className={` text-white text-bold header-tertiary ml-sm`}
                                    >
                                        Learn Finance
                                    </div>
                                    <div
                                        className={` text-white text-bold header-tertiary ml-sm`}
                                    >
                                        At Financy!
                                    </div>

                                </div>
                                <div className={`${bannerText}`}>
                                    <div
                                        className={`${"publisherDetails"} d-flex ai-center pt-lg w-100`}
                                    >
                                        <div className={`${publisherAvatar}`}>
                                            <Avatar
                                                isVerified
                                                showStatus
                                                sizeOfStatus={`md`}
                                                size={`lg`}
                                                imageUrl={userProfile?.gender === `male` ? `https://res.cloudinary.com/dmk11fqw8/image/upload/v1653926221/man_6_ewkhrj.png` : `https://res.cloudinary.com/dmk11fqw8/image/upload/v1656501210/woman_1_jotf2w.png`}
                                            />
                                        </div>
                                        <div className={`${publisherName} text-white pl-lg `}>
                                            <div className="d-flex ai-center">
                                                <div className="text-bold ">Prasad Lendwe</div>
                                                <span style={{ color: `white` }}>
                                                    <MdVerifiedUser size={20} />
                                                </span>
                                            </div>
                                            <div className="fs-sm pt-sm">1230213 subscribers</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={`${bannerImageWrapper}`}>
                                <img
                                    src={`https://res.cloudinary.com/dmk11fqw8/image/upload/v1654245700/Finance_app-rafiki_1_ltzgbg.svg`}
                                    alt={`Some Title`}
                                    className={`${bannerImage} w-100`}
                                />
                            </div>
                        </div>
                        <div
                            className={`${bannerWrapper}`}
                            style={{
                                backgroundImage: `linear-gradient(315deg, #f5df2e 0%, #f07654 74%)`
                            }}
                        >
                            <div className={`${bannerContent}`} style={{padding: `1rem`, paddingTop:`2rem`}}>
                                <div className={`${bannerHeader}`}>
                                    <div className={` text-white text-bold header-tertiary text-center`}>
                                        We Serve,
                                    </div>
                                    <div className={` text-white text-bold header-tertiary text-center`}>
                                        Knowledge About Money
                                    </div>
                                </div>
                                <div className={`${bannerText}`}>
                                    <div className={`d-flex ai-center pt-lg w-100 f-direction-col`}>
                                        <div className={`${publisherAvatar}`}>
                                            <Avatar
                                                isVerified
                                                showStatus
                                                sizeOfStatus={`md`}
                                                size={`lg`}
                                                imageUrl={userProfile?.gender === `male` ? `https://res.cloudinary.com/dmk11fqw8/image/upload/v1653926221/man_6_ewkhrj.png` : `https://res.cloudinary.com/dmk11fqw8/image/upload/v1656501210/woman_1_jotf2w.png`}
                                            />
                                        </div>
                                        <div className={`${publisherName} text-white pl-lg `}>
                                            <div className="d-flex ai-center">
                                                <div className="text-bold ">Prasad Lendwe</div>
                                                <span style={{ color: `white` }} className="pl-sm">
                                                    <MdVerifiedUser size={20} />
                                                </span>
                                            </div>
                                            <div className="fs-sm pt-sm">1230213 subscribers</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={`${bannerImageWrapper}`}>
                                <img
                                    src={`https://res.cloudinary.com/dmk11fqw8/image/upload/v1654248160/Pot_of_gold-cuate_wwrvrz.svg`}
                                    alt={`Some Title`}
                                    className={`${bannerImage} w-100`}
                                />
                            </div>
                        </div>
                    </div>
                    <div
                        className={`${headerContainer} header header-secondary text-white`}
                    >
                        Most Watched
                    </div>
                    <div className={`${cardContainer}`}>
                        {
                            mostWatched.status === `loading`
                                ?
                                <div className="d-flex jc-center w-100">

                                    <Loader />
                                </div>
                                : mostWatched?.videos.map((video: Video) => {
                                    return <div
                                        key={video._id}
                                        className={`${cardWrapper} cursor-pointer`} role={`button`} onClick={() => {
                                            navigate(`/videos/${video._id}`)
                                        }}>

                                        <div className={`${card} w-100`}>
                                            <div className={`${cardImageWrapper}`}>
                                                <img
                                                    className={`${cardImage}`}
                                                    src={`${video.thumbnails[0].standard.url}`}
                                                    alt={`noice`}
                                                />
                                                <div className={`${cardAvatar}`}>
                                                    <Avatar
                                                        isVerified
                                                        showStatus
                                                        sizeOfStatus={`sm`}
                                                        size={`md`}
                                                        imageUrl={video.publisher.gender === `male` ? `https://res.cloudinary.com/dmk11fqw8/image/upload/v1653926221/man_6_ewkhrj.png` : `https://res.cloudinary.com/dmk11fqw8/image/upload/v1656501210/woman_1_jotf2w.png`}
                                                    />
                                                </div>
                                            </div>
                                            <div className={`${cardContent} p-md`}>
                                                <div className={`${cardText}`}>
                                                    <div className={`d-flex ai-center w-100`}>
                                                        <div className={`${publisherName} pb-sm`}>
                                                            <div className="d-flex ai-center">
                                                                <div className="tube-text-secondary-color">
                                                                    {video.publisher.name}
                                                                </div>

                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className={`${cardTitle} text-white text-bold`}>
                                                    {video.title}
                                                </div>
                                                <div
                                                    className={`${"cardFooter"} d-flex tube-text-secondary-color jc-space-between mt-lg`}
                                                >
                                                    <div>{video.views.male + video.views.female + video.views.others} views</div>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                })
                        }
                    </div>
                </div>
            </div>
        </>
    );
};

// <a href="https://storyset.com/business">Business illustrations by Storyset</a>
