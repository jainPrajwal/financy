import { useVideos } from "../../hooks/useVideos"

export const Trending = () => {
    const { videosState } = useVideos();
    const trendingVideos = [...videosState.videos].sort((video1, video2) => {
        const timeElapsed2 = Date.now() - new Date(video2.createdAt).getSeconds();
        const timeElapsed1 = Date.now() - new Date(video1.createdAt).getSeconds();

        let totalVideo2Views = video2.views.female + video2.views.male + video2.views.others
        let totalVideo1Views = video1.views.female + video1.views.male + video1.views.others
        if (totalVideo2Views === 0) {
            totalVideo2Views = -1;
        }

        if (totalVideo1Views === 0) {
            totalVideo1Views = -1;
        }
        return (timeElapsed2 % totalVideo2Views) - (timeElapsed1 % totalVideo1Views)
    })

    return <>
        <h1>Trending</h1>
        {
            trendingVideos.map(video => {
                return <div key={video._id}>
                    <div>{video.title}</div>
                    <div>{video.views.male + video.views.female + video.views.others}</div>
                </div>
            })
        }
    </>
}