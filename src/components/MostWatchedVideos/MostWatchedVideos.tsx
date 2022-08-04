
import { Avatar, Loader } from "kaali-ui";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { AVATAR_FEMALE, AVATAR_MALE } from "../../constants/api";
import { Video } from "../../constants/videos.types";
import { useAsync } from "../../hooks/useAxios";
import { useMostWatchedVideos } from "../../hooks/useMostWatchedVideos";
import { getMostWatchedVideos } from "../../services/videos/getMostWatchedVideos";
import { default as homeStyles } from "../../pages/Home/Home.module.css";

export const MostWatchedVideos = () => {
    const { mostWatchedVideos, setMostWatchedVideos } = useMostWatchedVideos();
    const navigate = useNavigate();



    const {

        headerContainer,

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

    const { execute: executeMostWatchedVideos, errorMessage: mostWatchedVideosErrorMessage, status: mostWatchedVideosStatus, response: mostWatchedVideosResponse } = useAsync(getMostWatchedVideos, false, null);

    useEffect(() => {
        if (mostWatchedVideosStatus === `idle`) {
            executeMostWatchedVideos(null);
        }
    }, []);

    useEffect(() => {
        try {
            if (mostWatchedVideosStatus === `success`) {
                const { data } = mostWatchedVideosResponse;
                if (`videos` in data) {
                    setMostWatchedVideos({ videos: data.videos })
                }
            }
        } catch (error) {
            console.error(`error `, error, mostWatchedVideosErrorMessage)
        }

    }, [mostWatchedVideosStatus, mostWatchedVideosResponse, mostWatchedVideosErrorMessage, setMostWatchedVideos])
    return <>
        <div
            className={`${headerContainer} header header-secondary text-white`}
        >
            Most Watched
        </div>
        <div className={`${cardContainer}`}>
            {
                mostWatchedVideosStatus === `loading`
                    ?
                    <div className="d-flex jc-center w-100">

                        <Loader />
                    </div>
                    : mostWatchedVideos?.videos.map((video: Video) => {
                        return <div
                            key={video._id}
                            className={`${cardWrapper} cursor-pointer`} role={`button`} onClick={() => {
                                navigate(`/videos/${video._id}`)
                            }}>

                            <div className={`${card} w-100`}>
                                <div className={`${cardImageWrapper}`}>
                                    <img
                                        className={`${cardImage}`}
                                        src={`${video.thumbnails[0]?.standard?.url || video.thumbnails[0]?.high?.url}`}
                                        alt={`noice`}
                                    />
                                    <div className={`${cardAvatar}`}>
                                        <Avatar
                                            isVerified
                                            showStatus
                                            sizeOfStatus={`sm`}
                                            size={`md`}
                                            imageUrl={video.publisher.gender === `male` ? `${AVATAR_MALE}` : `${AVATAR_FEMALE}`}
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
    </>
}