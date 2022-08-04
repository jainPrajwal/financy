import { Avatar, } from "kaali-ui";
import { default as common } from "../../common/common.module.css";

import { default as homeStyles } from "./Home.module.css";

import { MdVerifiedUser } from "react-icons/md";

import { MobileSidebar } from "../../components/MobileSidebar/MobileSidebar";
import { useState } from "react";
import { Sidebar } from "../../components/Sidebar/Sidebar";

import { AVATAR_FEMALE, AVATAR_MALE } from "../../constants/api";



import { Navbar } from "../../components/Navbar/Navbar";
import { useProfile } from "../../hooks/useProfile";
import { MostWatchedVideos } from "../../components/MostWatchedVideos/MostWatchedVideos";

export const Home = () => {
    const {


        publisherAvatar,

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

    } = homeStyles;
    const [sidebar, setSidebar] = useState(false);
    const { userProfile } = useProfile();
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
                                                imageUrl={userProfile?.gender === `male` ? `${AVATAR_MALE}` : `${AVATAR_FEMALE}`}
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
                            <div className={`${bannerContent}`} style={{ padding: `1rem`, paddingTop: `2rem` }}>
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
                                                imageUrl={userProfile?.gender === `male` ? `${AVATAR_MALE}` : `${AVATAR_FEMALE}`}
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
                    <MostWatchedVideos />
                </div>
            </div>
        </>
    );
};

// <a href="https://storyset.com/business">Business illustrations by Storyset</a>
