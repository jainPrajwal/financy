import { useContext } from "react"
import { Profile, ProfileContext } from "../contexts/profile-context"

export const useProfile = (): {
    userProfile: Profile | null,
    setUserProfile: React.Dispatch<React.SetStateAction<Profile | null>>
} => {
    return useContext(ProfileContext);
}