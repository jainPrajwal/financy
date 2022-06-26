import {
    MdExplore,
    MdHistory,
    MdHome,
    MdPlaylistPlay,
    MdSettings,
    MdTrendingUp,
    MdUpload,
    MdWatchLater
  } from "react-icons/md";
  import { BsHeartFill } from "react-icons/bs";
  import { NavLink } from "react-router-dom";
  import { default as common } from "../../common/common.module.css";
  export const Sidebar = () => {
    const { nav } = common;
    return (
      <div className={`${nav}`}>
        <div className="d-flex f-direction-col gap-10 mt-lg">
          <div className="text-white ">
            <NavLink
              className={`d-flex ai-center jc-center p-1 f-direction-col`}
              to="/home"
              style={({ isActive }) => ({
                color: isActive ? `var(--tube-theme-primary)` : `inherit`
              })}
            >
              <MdHome size={20} />
              <span className="fs-sm"> Home </span>
            </NavLink>
          </div>
          <div className="  text-white ">
            <NavLink
              className={`d-flex ai-center jc-center p-1 f-direction-col`}
              to="/explore"
              style={({ isActive }) => ({
                color: isActive ? `var(--tube-theme-primary)` : `inherit`
              })}
            >
              <MdExplore size={20} />
              <span className="fs-sm"> Explore </span>
            </NavLink>
          </div>
          <div className=" text-white ">
            <NavLink
              className={`d-flex ai-center jc-center p-1 f-direction-col`}
              to="/trending"
              style={({ isActive }) => ({
                color: isActive ? `var(--tube-theme-primary)` : `inherit`
              })}
            >
              <MdTrendingUp size={20} />
              <span className="fs-sm"> Trending </span>
            </NavLink>
          </div>
          <div className=" text-white ">
            <NavLink
              className={`d-flex ai-center jc-center p-1 f-direction-col`}
              to="/history"
              style={({ isActive }) => ({
                color: isActive ? `var(--tube-theme-primary)` : `inherit`
              })}
            >
              <MdHistory size={20} />
              <span className="fs-sm"> History </span>
            </NavLink>
          </div>
          <div className=" text-white ">
            <NavLink
              className={`d-flex ai-center jc-center p-1 f-direction-col`}
              to="/watchlater"
              style={({ isActive }) => ({
                color: isActive ? `var(--tube-theme-primary)` : `inherit`
              })}
            >
              <MdWatchLater size={20} />
              <span style={{ whiteSpace: `nowrap` }} className="fs-sm">
                Watch later
              </span>
            </NavLink>
          </div>
          <div className=" text-white ">
            <NavLink
              className={`d-flex ai-center jc-center p-1 f-direction-col`}
              to="/liked"
              style={({ isActive }) => ({
                color: isActive ? `var(--tube-theme-primary)` : `inherit`
              })}
            >
              <BsHeartFill size={16} />
              <span style={{ whiteSpace: `nowrap` }} className="fs-sm">
                Liked
              </span>
            </NavLink>
          </div>
  
          <div className=" text-white ">
            <NavLink
              className={`d-flex ai-center jc-center p-1 f-direction-col`}
              to="/playlists"
              style={({ isActive }) => ({
                color: isActive ? `var(--tube-theme-primary)` : `inherit`
              })}
            >
              <MdPlaylistPlay size={20} />
              <span style={{ whiteSpace: `nowrap` }} className="fs-sm">
                Playlists
              </span>
            </NavLink>
          </div>
          <div className=" text-white ">
            <NavLink
              className={`d-flex ai-center jc-center p-1 f-direction-col`}
              to="/settings"
              style={({ isActive }) => ({
                color: isActive ? `var(--tube-theme-primary)` : `inherit`
              })}
            >
              <MdSettings size={20} />
              <span style={{ whiteSpace: `nowrap` }} className="fs-sm">
                Settings
              </span>
            </NavLink>
          </div>
          <div className=" text-white ">
            <NavLink
              className={`d-flex ai-center jc-center p-1 f-direction-col`}
              to="/upload"
              style={({ isActive }) => ({
                color: isActive ? `var(--tube-theme-primary)` : `inherit`
              })}
            >
              <MdUpload size={20} />
              <span style={{ whiteSpace: `nowrap` }} className="fs-sm">
                Upload
              </span>
            </NavLink>
          </div>
        </div>
      </div>
    );
  };
  