import { useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import { default as common } from "../../common/common.module.css";
import { Avatar } from "kaali-ui";
import { RiShieldFlashFill } from "react-icons/ri";
import {
  MdClose,
  MdExplore,
  MdHistory,
  MdHome,
  MdPlaylistPlay,
  MdSettings,
  MdTrendingUp,
  MdUpload,
  MdVerifiedUser,
  MdWatchLater
} from "react-icons/md";
import { BsHeartFill } from "react-icons/bs";
import { useProfile } from "../../hooks/useProfile";

export const MobileSidebar = ({ status: { sidebar, setSidebar } }: any) => {
  const sidebarRef = useRef<null | HTMLElement>(null);
  const {userProfile} = useProfile();

  useEffect(() => {
    const handleClickOutside = (e: any) => {
      if (
        sidebarRef &&
        sidebarRef.current &&
        sidebarRef.current.contains(e.target)
      ) {
      } else {
        setSidebar(false);
      }
    };
    document.addEventListener(`click`, handleClickOutside, true);

    return () => {
      document.removeEventListener(`click`, handleClickOutside, true);
    };
  }, [sidebar, setSidebar]);

  const {
    sideNav,
    iconClose,
    userProfileWrapper,
    getPremimumMobileWrapper,
    btnGetPremium,
    sideNavItemsWrapper,
    sidebarStyle
  } = common;
  return (
    <>
      <div
        className={`${sidebarStyle} modal-bg  ${
          sidebar === true ? "modal-bg-active" : ""
        }`}
      >
        <nav
          className={`nav-menu ${
            sidebar ? "active" : ""
          } f-direction-col jc-center ai-center`}
          ref={sidebarRef}
        >
          <div className={`${sideNav} d-flex f-direction-col ai-center`}>
            <div
              className={`${userProfileWrapper} d-flex ai-center p-lg mb-lg w-100`}
            >
              <div className={`${"publisherAvatar"}`}>
                <Avatar
                  size={`md`}
                 imageUrl={userProfile?.gender === `male` ? `https://res.cloudinary.com/dmk11fqw8/image/upload/v1653926221/man_6_ewkhrj.png` : `https://res.cloudinary.com/dmk11fqw8/image/upload/v1656501210/woman_1_jotf2w.png`}
                />
              </div>
              <div className={`${"publisherName"}  pl-lg `}>
                <div className="d-flex ai-center">
                  <div className="text-bold ">Prasad Lendwe</div>
                  <span style={{ color: `white` }}>
                    <MdVerifiedUser size={20} />
                  </span>
                </div>
              </div>
            </div>
            <div
              className={`${sideNavItemsWrapper} d-flex f-direction-col gap-10 mt-lg`}
            >
              <div className="jc-center p-md f-direction-col ">
                <NavLink
                  className={`d-flex ai-center jc-center`}
                  to="/home"
                  style={({ isActive }) => ({
                    color: isActive ? `var(--tube-theme-primary)` : `inherit`
                  })}
                >
                  <MdHome size={20} />
                  <span className=" ml-sm"> Home </span>
                </NavLink>
              </div>
              <div className="  jc-center p-md f-direction-col ">
                <NavLink
                  className={`d-flex ai-center jc-center`}
                  to="/explore"
                  style={({ isActive }) => ({
                    color: isActive ? `var(--tube-theme-primary)` : `inherit`
                  })}
                >
                  <MdExplore size={20} />
                  <span className=" ml-sm"> Explore </span>
                </NavLink>
              </div>
              <div className=" jc-center p-md f-direction-col ">
                <NavLink
                  className={`d-flex ai-center jc-center`}
                  to="/trending"
                  style={({ isActive }) => ({
                    color: isActive ? `var(--tube-theme-primary)` : `inherit`
                  })}
                >
                  <MdTrendingUp size={20} />
                  <span className=" ml-sm"> Trending </span>
                </NavLink>
              </div>
              <div className=" jc-center p-md f-direction-col ">
                <NavLink
                  className={`d-flex ai-center jc-center`}
                  to="/history"
                  style={({ isActive }) => ({
                    color: isActive ? `var(--tube-theme-primary)` : `inherit`
                  })}
                >
                  <MdHistory size={20} />
                  <span className=" ml-sm"> History </span>
                </NavLink>
              </div>
              <div className=" jc-center p-md f-direction-col ">
                <NavLink
                  className={`d-flex ai-center jc-center`}
                  to="/watchlater"
                  style={({ isActive }) => ({
                    color: isActive ? `var(--tube-theme-primary)` : `inherit`
                  })}
                >
                  <MdWatchLater size={20} />
                  <span style={{ whiteSpace: `nowrap` }} className=" ml-sm">
                    Watch later
                  </span>
                </NavLink>
              </div>
              <div className=" jc-center p-md f-direction-col ">
                <NavLink
                  className={`d-flex ai-center jc-center`}
                  to="/liked"
                  style={({ isActive }) => ({
                    color: isActive ? `var(--tube-theme-primary)` : `inherit`
                  })}
                >
                  <BsHeartFill size={16} />
                  <span style={{ whiteSpace: `nowrap` }} className=" ml-sm">
                    Liked
                  </span>
                </NavLink>
              </div>

              <div className=" jc-center p-md f-direction-col ">
                <NavLink
                  className={`d-flex ai-center jc-center`}
                  to="/upload"
                  style={({ isActive }) => ({
                    color: isActive ? `var(--tube-theme-primary)` : `inherit`
                  })}
                >
                  <MdUpload size={20} />
                  <span style={{ whiteSpace: `nowrap` }} className=" ml-sm">
                    Upload
                  </span>
                </NavLink>
              </div>
              <div className=" jc-center p-md f-direction-col ">
                <NavLink
                  className={`d-flex ai-center jc-center`}
                  to="/playlists"
                  style={({ isActive }) => ({
                    color: isActive ? `var(--tube-theme-primary)` : `inherit`
                  })}
                >
                  <MdPlaylistPlay size={20} />
                  <span style={{ whiteSpace: `nowrap` }} className=" ml-sm">
                    Playlists
                  </span>
                </NavLink>
              </div>
              <div className=" jc-center p-md f-direction-col ">
                <NavLink
                  className={`d-flex ai-center jc-center`}
                  to="/settings"
                  style={({ isActive }) => ({
                    color: isActive ? `var(--tube-theme-primary)` : `inherit`
                  })}
                >
                  <MdSettings size={20} />
                  <span style={{ whiteSpace: `nowrap` }} className=" ml-sm">
                    Settings
                  </span>
                </NavLink>
              </div>
            </div>

            <div className={`${getPremimumMobileWrapper}`}>
              <button className={`btn ${btnGetPremium}`}>
                <span>
                  <RiShieldFlashFill size={20} />
                </span>
                <span className={`ml-md`}> Go Premium </span>
              </button>
            </div>

            <div
              className={`${iconClose}`}
              role="button"
              onClick={() => setSidebar(false)}
            >
              <MdClose size={30} />
            </div>
          </div>
        </nav>
      </div>
    </>
  );
};
