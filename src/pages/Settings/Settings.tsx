import { Avatar, Loader } from "kaali-ui";
import { MdEditNote, } from "react-icons/md";
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
import { FlexContainer } from "../../components/FlexContainer/FlexContainer";
import { Payment } from "../../constants/payment.types";

import { displayRazorPayModal } from "../../services/payment/displayRazorpayModal";
import { Navbar } from "../../components/Navbar/Navbar";
import { RiShieldFlashFill, RiVipCrown2Fill } from "react-icons/ri";
import { getTotalViewsOnPublishedVideos } from "../../utils/Videos/getTotalViewsOnPublishedVideos";
import { getTotallikesOnPublishedVideos } from "../../utils/Videos/getTotalLikesOnPublishedVideos";
import { AVATAR_FEMALE, AVATAR_MALE } from "../../constants/api";
import { Premium } from "../../components/Premium/Premium";
import { useScrollToTop } from "../../hooks/useScrollToTop";


ChartJS.register(ArcElement);
ChartJS.register([Tooltip]);


const initialState = { male: 0, female: 0, others: 0 };
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


        publisherAvatar,


        btnGetPremium,
        iconButton, editProfileIcon,
        editProfileButton,
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

        relatedWrapper
    } = settingsStyle;
    const [sidebar, setSidebar] = useState(false);

    const { userProfile, setUserProfile } = useProfile();
    const [paymentDetails, setPaymentDetails] = useState<Payment | null>(null)
    const { playlistsState } = usePlaylists();
    useScrollToTop();

    const [ismodalHidden, setIsModalHidden] = useState<boolean>(true);


    const publishedVideos = userProfile?.publishedVideos;
    const views = publishedVideos?.reduce(getTotalViewsOnPublishedVideos, initialState)

    const likes = publishedVideos?.reduce(getTotallikesOnPublishedVideos, initialState)

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







    return (
        <>
            {
                !ismodalHidden && <ProfileModal ismodalHidden={ismodalHidden} setIsModalHidden={setIsModalHidden} />
            }

            <Navbar setSidebar={setSidebar} />
            <MobileSidebar status={{ sidebar, setSidebar }} />
            <div className={`${exploreContainer}`}>
                <div
                    className={`${headerContainer} header header-secondary text-white`}
                >
                    Settings
                </div>

                <Sidebar />
                {
                    !userProfile ? <FlexContainer><Loader /></FlexContainer> : <div
                        className={`${settingsWrapperContainer} gap-10 tube-text-secondary-color`}
                    >
                        <div className={`${videoWrapperContainer}`}>
                            {userProfile?.isAPremiumMember ?
                                <>

                                    <div className={` header header-secondary text-white`}>Stats</div>
                                    <div className={`d-flex ai-center ${doughnutWrapper}`}>
                                        <div className={`${doughnutChartWrapper}`}>

                                            {publishedVideos && publishedVideos?.length > 0 ? <Doughnut data={viewsData} /> : <><div>No Videos Uploaded Yet!</div></>}
                                        </div>
                                        <div className={`p-1`}>
                                            <div className={`header header-secondary text-white`}>
                                                Views
                                            </div>
                                            The Views Stats tells you about the gender of the audience that watches your videos.
                                        </div>
                                    </div>
                                    <div className={`d-flex ai-center  ${doughnutWrapper}`}>
                                        <div className={`${doughnutChartWrapper}`}>

                                            {publishedVideos && publishedVideos?.length > 0 ? <Doughnut data={likesData} /> : <><div>No Videos Uploaded Yet!</div></>}
                                        </div>
                                        <div className={`p-1`}>
                                            <div className={`header header-secondary text-white`}>
                                                Likes
                                            </div>
                                            The Likes Stats tells you about the gender of the audience that watches your videos.
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
                                    <div className="d-flex ai-center f-direction-col jc-center">
                                        <div className="header-secondary">
                                            <div className="text-center">
                                                Dont cheat us!<span role={`img`}>👀</span>
                                            </div>

                                            <div>

                                                We take immense efforts to gather stats about your videos!
                                            </div>

                                        </div>
                                        <button
                                            onClick={() => displayRazorPayModal({ setPaymentDetails, setUserProfile })}
                                            className={`btn ${btnGetPremium} my-1 `}>
                                            <span className="mr-md">
                                                <RiShieldFlashFill size={20} />
                                            </span>
                                            {`get premium`.toUpperCase()}</button>
                                    </div>
                                </>
                            }
                        </div>
                        <div className={`${relatedContainer}`}>
                            <div className={`${relatedWrapper} mb-lg p-1`}>
                                <div className={`${editProfileIcon} ${iconButton}`}>
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
                                            imageUrl={userProfile?.gender === `male` ? `${AVATAR_MALE}` : `${AVATAR_FEMALE}`}
                                        />
                                    </div>
                                    <div className="d-flex ai-center ml-md">
                                        <div>{userProfile.name}</div>
                                        <span
                                            style={{ color: `gold` }}
                                            className="pl-sm"
                                        >
                                            {userProfile.isAPremiumMember && <RiVipCrown2Fill size={20} />}
                                        </span>
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

                            <div className={`${relatedWrapper}`}>

                                <Premium header="Premium Benefits" />

                            </div>
                        </div>



                    </div>
                }

            </div>
        </>
    );
};
