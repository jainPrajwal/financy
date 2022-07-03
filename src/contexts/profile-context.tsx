import React, { createContext, useEffect, useState } from "react";
import { Profile } from "../constants/profile.types";
import { ProviderProps, Video } from "../constants/videos.types";
import { useAuth } from "../hooks/useAuth";
import { useAsync } from "../hooks/useAxios";
import { getUserProfileService } from "../services/profile/getUserProfileService";


export const ProfileContext = createContext<{
    userProfile: Profile | null,
    setUserProfile: React.Dispatch<React.SetStateAction<Profile | null>>
}>({
    userProfile: null,
    setUserProfile: () => { }
})

export const ProfileProvider = ({ children }: ProviderProps) => {
    const { execute: executeGetUserProfile, response: getUserProfileResponse, status: getUserProfileStatus } = useAsync(getUserProfileService, false, null);
    const { authState } = useAuth();

    useEffect(() => {
        try {

        } catch (error) {
            console.error(`error `, error)
        }
        if (userProfile === null && authState.token) {


            executeGetUserProfile(null);
        }
    }, [authState.token])


    useEffect(() => {
        try {
            if (getUserProfileStatus === `success`) {
                const { data: { user } } = getUserProfileResponse;

                setUserProfile(user)
            }
        } catch (error) {
            console.error(`error`, error);
        }

    }, [getUserProfileResponse, getUserProfileStatus])
    const [userProfile, setUserProfile] = useState<Profile | null>(null)
    return <ProfileContext.Provider value={{ userProfile, setUserProfile }}>
        {children}
    </ProfileContext.Provider>
}

