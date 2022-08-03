import { Avatar } from "kaali-ui"
import React, { useState } from "react";
import { MdArrowDropDown, MdMenu } from "react-icons/md";
import { NavLink, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { default as common } from "../../common/common.module.css";
import { AVATAR_FEMALE, AVATAR_MALE } from "../../constants/api";
import { useAuth } from "../../hooks/useAuth";
import { useProfile } from "../../hooks/useProfile";
import { SearchBar } from "../SearchBar/SearchBar";
import { default as navbarStyles } from "./Navbar.module.css"
export const Navbar = ({ setSidebar }: { setSidebar: React.Dispatch<React.SetStateAction<boolean>> }) => {

    const {
        navbar,
        publisherAvatar,
        wrapperLogo,
        hamburgerMenu,
        wrapperSearch,
        financyLogo
    } = common;
    const { logoutContainer, positionRelative, showElement } = navbarStyles;
    const { userProfile } = useProfile();
    const [popOver, setShowPopOver] = useState(false);
    const { logout, authState } = useAuth();
    const [searchbar, setSearchbar] = useState(false);
    const navigate = useNavigate();

    return <header className={`${navbar} pr-lg`}>
        <div
            className={`${hamburgerMenu} text-white`}
            role="button"
            onClick={() => setSidebar(true)}
        >
            <MdMenu size={32} />
        </div>
        <div className={`${wrapperLogo}`}>
            <Link to={`/home`}>
                <img
                    src="https://res.cloudinary.com/dmk11fqw8/image/upload/v1653841636/Tube_Stox-removebg-preview_ezjluc_qkz2zk.png"
                    alt="logo"
                    width={`100%`}
                    height={`100%`}
                    className={`${financyLogo}`}
                />
            </Link>
        </div>
        <div className={`${wrapperSearch}`}>
            <SearchBar
                searchbar={searchbar}
                setSearchbar={setSearchbar}
            />
        </div>

        {authState.token ? <div className={`ml-auto d-flex ai-center `}>

            <div className={`${publisherAvatar} ${positionRelative}`} onMouseOver={() => {
                setShowPopOver(true)
            }} onMouseOut={() => {
                setShowPopOver(false)
            }}>
                <Avatar
                    size={`sm`}
                    imageUrl={userProfile?.gender === `male` ? `${AVATAR_MALE}` : `${AVATAR_FEMALE}`}
                />
                <div className={`${logoutContainer} ${popOver ? `${showElement}` : ``}`}>
                    <div className="fs-1 p-lg cursor-pointer" role={`button`} onClick={() => {
                        navigate(`/settings`)
                    }}>Profile</div>
                    <div className="fs-1 p-lg cursor-pointer" role={`button`} onClick={() => {
                        logout();
                    }}>Logout</div>
                </div>
            </div>

            <div>
                <MdArrowDropDown color="#fff" size={24} /></div>

        </div> : <div className={`ml-auto d-flex ai-center text-white fs-2 pr-lg`}>
            <NavLink to={`/login`} style={{ color: `#fff` }}
                className={`border-bottom-sm`}
            >Login</NavLink>
        </div>

        }



    </header>
}