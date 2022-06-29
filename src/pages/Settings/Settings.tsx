// import { BsHeartFill } from "react-icons/bs";
import { Avatar } from "kaali-ui";

import { MdEditNote, MdMenu, MdVerifiedUser } from "react-icons/md";

import { default as settingsStyle } from "./Settings.module.css";
import { default as common } from "../../common/common.module.css";

import { useState } from "react";
import { MobileSidebar } from "../../components/MobileSidebar/MobileSidebar";
import { Sidebar } from "../../components/Sidebar/Sidebar";
import { Chart as ChartJS, ArcElement, Tooltip } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { useProfile } from "../../hooks/useProfile";
import { usePlaylists } from "../../hooks/usePlaylists";
import { ProfileModal } from "../../components/Profile/ProfileModal";


ChartJS.register(ArcElement);
ChartJS.register([Tooltip]);



const dummyData = {
    labels: [`Male`, `Female`, `Others`],
    datasets: [
        {
            label: `likes`,
            data: [1, 2, 3],
            backgroundColor: [
                "rgb(255, 99, 132)",
                "rgb(54, 162, 235)",
                "rgb(255, 205, 86)"
            ],
            hoverOffset: 4
        }
    ]
};

export const Settings = () => {
    const {
        navbar,

        publisherAvatar,

        wrapperLogo,
        hamburgerMenu
    } = common;
    const {
        settingsWrapperContainer,
        videoWrapperContainer,
        relatedContainer,
        headerContainer,
        doughnutChartWrapper,
        exploreContainer,
        statsOverlay,
        doughnutWrapper,
        editProfileIcon,
        editProfileButton
    } = settingsStyle;
    const [sidebar, setSidebar] = useState(false);

    const { userProfile, setUserProfile } = useProfile();
    const { playlistsState } = usePlaylists();
    const [ismodalHidden, setIsModalHidden] = useState<boolean>(true);


    const publishedVideos = userProfile?.publishedVideos;
    const views = publishedVideos?.reduce((acc, current) => {
        return { ...acc, male: acc.male + current.views.male, female: acc.female + current.views.female, others: acc.others + current.views.others }
    }, { male: 0, female: 0, others: 0 })

    const likes = publishedVideos?.reduce((acc, current) => {
        return { ...acc, male: acc.male + current.likes.male, female: acc.female + current.likes.female, others: acc.others + current.likes.others }
    }, { male: 0, female: 0, others: 0 })

    const viewsData = {
        labels: [`Male`, `Female`, `Others`],
        datasets: [
            {
                label: `views`,
                data: [views?.male, views?.female, views?.others],
                backgroundColor: [
                    "rgb(255, 99, 132)",
                    "rgb(54, 162, 235)",
                    "rgb(255, 205, 86)"
                ],
                hoverOffset: 4
            }
        ]
    };
    const likesData = {
        labels: [`Male`, `Female`, `Others`],
        datasets: [
            {
                label: `likes`,
                data: [likes?.male, likes?.female, likes?.others],
                backgroundColor: [
                    "rgb(255, 99, 132)",
                    "rgb(54, 162, 235)",
                    "rgb(255, 205, 86)"
                ],
                hoverOffset: 4
            }
        ]
    };

    const maxStats = {

    }

    return (
        <>
            {
                !ismodalHidden && <ProfileModal ismodalHidden={ismodalHidden} setIsModalHidden={setIsModalHidden} />
            }
            <header className={`${navbar} pr-lg`}>
                <div
                    className={`${hamburgerMenu} text-white`}
                    role="button"
                    onClick={() => setSidebar(true)}
                >
                    <MdMenu size={28} />
                </div>
                <div className={`${wrapperLogo}`}>
                    <img
                        src="https://res.cloudinary.com/dmk11fqw8/image/upload/v1653841636/Tube_Stox-removebg-preview_ezjluc_qkz2zk.png"
                        alt="logo"
                        width={`100%`}
                        height={`100%`}
                    />
                </div>
                <div className="ml-auto">
                    <div className={`${publisherAvatar}`}>
                        <Avatar
                            size={`sm`}
                           imageUrl={userProfile?.gender === `male` ? `https://res.cloudinary.com/dmk11fqw8/image/upload/v1653926221/man_6_ewkhrj.png` : `https://res.cloudinary.com/dmk11fqw8/image/upload/v1656501210/woman_1_jotf2w.png`}
                        />
                    </div>
                </div>
            </header>
            <MobileSidebar status={{ sidebar, setSidebar }} />
            <div className={`${exploreContainer}`}>
                <div
                    className={`${headerContainer} header header-secondary text-white`}
                >
                    Settings
                </div>

                <Sidebar />
                <div
                    className={`${settingsWrapperContainer} gap-10 tube-text-secondary-color`}
                >
                    <div className={`${videoWrapperContainer}`}>
                        {userProfile?.isAPremiumMember ?
                            <>

                                <div className={` header header-secondary text-white`}>Stats</div>
                                <div className={`d-flex ai-center ${doughnutWrapper}`}>
                                    <div className={`${doughnutChartWrapper}`}>

                                        <Doughnut data={viewsData} />
                                    </div>
                                    <div className={`p-1`}>
                                        <div className={`header header-secondary text-white`}>
                                            Views
                                        </div>
                                        Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                                        Itaque, corporis. Rerum velit illo suscipit, voluptates quod
                                    </div>
                                </div>
                                <div className={`d-flex ai-center  ${doughnutWrapper}`}>
                                    <div className={`${doughnutChartWrapper}`}>

                                        <Doughnut data={likesData} />
                                    </div>
                                    <div className={`p-1`}>
                                        <div className={`header header-secondary text-white`}>
                                            Likes
                                        </div>
                                        Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                                        Itaque, corporis. Rerum velit illo suscipit, voluptates quod
                                    </div>
                                </div>

                            </> : <>
                                <div className={`${statsOverlay}`}> </div>
                                <div className={`${statsOverlay}`}> </div>
                                <div className={` header header-secondary text-white`}>Stats</div>
                                <div className={`d-flex ai-center ${doughnutWrapper}`}>
                                    <div className={`${doughnutChartWrapper}`}>
                                        <Doughnut data={dummyData} />
                                    </div>
                                    <div className={`p-1`}>
                                        <div className={`header header-secondary text-white`}>
                                            Views
                                        </div>
                                        Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                                        Itaque, corporis. Rerum velit illo suscipit, voluptates quod
                                    </div>
                                </div>
                                <div className={`d-flex ai-center  ${doughnutWrapper}`}>
                                    <div className={`${doughnutChartWrapper}`}>
                                        <Doughnut data={dummyData} />
                                    </div>
                                    <div className={`p-1`}>
                                        <div className={`header header-secondary text-white`}>
                                            Likes
                                        </div>
                                        Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                                        Itaque, corporis. Rerum velit illo suscipit, voluptates quod
                                    </div>
                                </div>
                                <div>
                                    Dont Cheat us! We know you well!
                                    <span role={`img`}>👀</span>
                                    <button className="btn btn-primary">

                                    </button>
                                </div>
                            </>
                        }
                    </div>

                    <div className={`${relatedContainer}`}>
                        <div className={`${editProfileIcon}`}>
                            <button className={`btn ${editProfileButton}`} onClick={() => setIsModalHidden(false)}>
                                <MdEditNote size={28} />
                            </button>
                        </div>
                        <div className={`header header-secondary text-white text-center`}>
                            Profile
                        </div>
                        <div
                            className={`${"publisherDetails"} d-flex ai-center jc-center f-direction-col`}
                        >
                            <div className={`${publisherAvatar}`}>
                                <Avatar
                                    isVerified
                                    showStatus
                                    size={`lg`}
                                   imageUrl={userProfile?.gender === `male` ? `https://res.cloudinary.com/dmk11fqw8/image/upload/v1653926221/man_6_ewkhrj.png` : `https://res.cloudinary.com/dmk11fqw8/image/upload/v1656501210/woman_1_jotf2w.png`}
                                />
                            </div>
                            <div className={`${"publisherName"} text-bold text-white pl-lg `}>
                                <div className="d-flex ai-center pt-sm">
                                    <div>{userProfile?.name}</div>
                                </div>
                            </div>
                        </div>
                        <div className={`text-center mt-lg`}>Complete Profile</div>
                        <div
                            className={`d-flex jc-space-around gap-10 m-lg`}
                            style={{
                                width: "80%",
                                margin: "0 auto"
                            }}
                        >
                            <div className={`d-flex f-direction-col ai-center gap-10 mt-lg`}>
                                <span className={`text-bold fs-1`}>Gender</span>
                                <span> {userProfile?.gender} </span>
                            </div>
                            <div className={`d-flex f-direction-col ai-center gap-10 mt-lg`}>
                                <span className={`text-bold fs-1`}>Birth Date</span>
                                <span> 02-10-1999 </span>
                            </div>
                        </div>
                        <div className={`text-center mt-lg`}>Overall Stats</div>
                        <div
                            className={`d-flex jc-space-around gap-10 mt-lg`}
                            style={{
                                width: "80%",
                                margin: "0 auto"
                            }}
                        >
                            <div className={`d-flex f-direction-col ai-center gap-10 mt-lg`}>
                                <span className={`text-bold fs-1`}>Saved</span>
                                <span> {
                                    playlistsState.customPlaylistsData.customPlaylists.reduce((acc, current) => {
                                        return acc += current.videos.length
                                    }, 0)

                                } </span>
                            </div>
                            <div className={`d-flex f-direction-col ai-center gap-10 mt-lg`}>
                                <span className={`text-bold fs-1`}>Liked</span>
                                <span> {playlistsState.likedVideosData.likedVideos.videos.length} </span>
                            </div>
                            <div className={`d-flex f-direction-col ai-center gap-10 mt-lg`}>
                                <span className={`text-bold fs-1`}>Uploaded</span>
                                <span> {userProfile?.publishedVideos.length} </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};