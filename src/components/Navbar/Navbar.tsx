import { Avatar } from "kaali-ui"
import React, { useState } from "react";
import { MdMenu } from "react-icons/md";
import { default as common } from "../../common/common.module.css";
import { useProfile } from "../../hooks/useProfile";

export const Navbar = ({ setSidebar }: { setSidebar: React.Dispatch<React.SetStateAction<boolean>> }) => {

    const {
        navbar,
        publisherAvatar,
        wrapperLogo,
        hamburgerMenu,

    } = common;
    const { userProfile } = useProfile();
    return <header className={`${navbar} pr-lg`}>
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
}