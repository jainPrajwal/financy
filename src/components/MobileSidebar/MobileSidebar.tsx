import { Avatar } from "kaali-ui";
import { useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import { default as common } from "../../common/common.module.css";
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
import { AVATAR_FEMALE, AVATAR_MALE } from "../../constants/api";

export const MobileSidebar = ({ status: { sidebar, setSidebar } }: any) => {
  const sidebarRef = useRef<null | HTMLElement>(null);
  const { userProfile } = useProfile();

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
    sidebarStyle,
  } = common;
  return (
    <>
      <div
        className={`${sidebarStyle} modal-bg  ${sidebar === true ? "modal-bg-active" : ""
          }`}
      >
        <nav
          className={`nav-menu ${sidebar ? "active" : ""
            } f-direction-col jc-center ai-center`}
          ref={sidebarRef}
        >
          <div className={`${sideNav} d-flex f-direction-col ai-center`}>
            <div
              className={`${userProfileWrapper} d-flex ai-center  mb-lg w-100 p-lg`}
            >
              <div style={{ width: `36px`, height: `36px` }}>
                <img
                  src="https://res.cloudinary.com/dmk11fqw8/image/upload/v1653841636/Tube_Stox-removebg-preview_ezjluc_qkz2zk.png"
                  alt="logo"
                  width={`100%`}
                  height={`100%`}

                />
              </div>


              <div className="header-secondary">Financy</div>


            </div>
            <div
              className={`${sideNavItemsWrapper} d-flex f-direction-col gap-10 mt-lg pl-lg`}
            >
              <div className="p-md f-direction-col w-100 ">
                <NavLink
                  className={`d-flex ai-center jc-start`}
                  to="/home"
                  style={({ isActive }) => ({
                    color: isActive ? `var(--tube-theme-primary)` : `inherit`
                  })}
                >
                  <MdHome size={20} />
                  <span className=" ml-sm"> Home </span>
                </NavLink>
              </div>
              <div className="  p-md f-direction-col w-100 ">
                <NavLink
                  className={`d-flex ai-center jc-start`}
                  to="/explore"
                  style={({ isActive }) => ({
                    color: isActive ? `var(--tube-theme-primary)` : `inherit`
                  })}
                >
                  <MdExplore size={20} />
                  <span className=" ml-sm"> Explore </span>
                </NavLink>
              </div>
              <div className=" p-md f-direction-col w-100 ">
                <NavLink
                  className={`d-flex ai-center jc-start`}
                  to="/trending"
                  style={({ isActive }) => ({
                    color: isActive ? `var(--tube-theme-primary)` : `inherit`
                  })}
                >
                  <MdTrendingUp size={20} />
                  <span className=" ml-sm"> Trending </span>
                </NavLink>
              </div>
              <div className=" p-md f-direction-col w-100 ">
                <NavLink
                  className={`d-flex ai-center jc-start`}
                  to="/history"
                  style={({ isActive }) => ({
                    color: isActive ? `var(--tube-theme-primary)` : `inherit`
                  })}
                >
                  <MdHistory size={20} />
                  <span className=" ml-sm"> History </span>
                </NavLink>
              </div>
              <div className=" p-md f-direction-col w-100 ">
                <NavLink
                  className={`d-flex ai-center jc-start`}
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
              <div className=" p-md f-direction-col w-100 ">
                <NavLink
                  className={`d-flex ai-center jc-start`}
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

              <div className=" p-md f-direction-col w-100 ">
                <NavLink
                  className={`d-flex ai-center jc-start`}
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
              <div className=" p-md f-direction-col w-100 ">
                <NavLink
                  className={`d-flex ai-center jc-start`}
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
              <div className=" p-md f-direction-col w-100 ">
                <NavLink
                  className={`d-flex ai-center jc-start`}
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
                <span className={`ml-md`}> Get Premium </span>
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
