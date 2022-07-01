import { Video } from "./videos.types";

export type Gender = `male` | `female` | `others`
    ;
export type Profile = {
    name: string,
    avatar: string,
    email: string,
    isAPremiumMember: Boolean,
    publishedVideos: Array<Video>
    gender: Gender
}