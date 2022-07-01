import { Avatar, Loader } from "kaali-ui";

import { MdMenu, MdRemoveRedEye } from "react-icons/md";
import { BsHeartFill } from "react-icons/bs";

import { RiVipCrown2Fill } from "react-icons/ri";
import { default as common } from "../../common/common.module.css";
import { default as exploreStyles } from "./Explore.module.css";
import { MobileSidebar } from "../../components/MobileSidebar/MobileSidebar"
import { Sidebar } from "../../components/Sidebar/Sidebar";
import { useEffect, useState } from "react";
import { ExploreVideoCard } from "../../components/Explore/ExploreVideoCard";
import { useVideos } from "../../hooks/useVideos";
import { useSearchParams } from "react-router-dom";
import { useInfiniteScroll } from "../../hooks/useInfiniteScroll";
import { CLEAR_ALL, FILTER_BY_CATEGORY, SORT_BY } from "../../constants/actions.types";

import { BUSINESSCASESTUDIES, CRYPTO, GOLD, INVESTMENTSTRATEGIES, NFTS, SCAMS, STOCKMARKET } from "../../constants/videos.types";
import { SearchBar } from "../../components/SearchBar/SearchBar";
import { useProfile } from "../../hooks/useProfile";

export const Explore = () => {
  const {
    navbar,

    publisherAvatar,

    wrapperLogo,
    hamburgerMenu,
    wrapperSearch
  } = common;

  const {
    videoContainer,
    exploreContainer,
    headerContainer,
    videoNumber,
    videoThumbnailWrapper,
    videoContent,
    videoHeader,
    videoMetrics,
    publisherName,
    publisherDetails,
    likeIconButtonWrapper,
    videoWrapperContainer,
    exploreWrapperContainer,
    videoThumbnailContainer,
    videoDuration,
    chipsContainer, chip, chipClear, chipSolid
  } = exploreStyles;
  // useMediaQuery(`(max-width: 1136px)`);
  const [sidebar, setSidebar] = useState(false);
  const [searchbar, setSearchbar] = useState(false);
  const { videosState, videosDispatch } = useVideos();
  const [lastElement, setLastElement] = useState<HTMLDivElement | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const { userProfile } = useProfile()


  useInfiniteScroll({ lastElement, setLastElement });

  // const relatedVideos = videosState.videos


  useEffect(() => {
    const filters = searchParams.get(`filterBy`);
    const sortBy = searchParams.get(`sortBy`);

    videosDispatch({
      type: FILTER_BY_CATEGORY,
      payload: {
        selectedCategory: filters || ``
      }
    })
    videosDispatch({
      type: SORT_BY,
      payload: {
        sortBy
      }
    })

  }, [searchParams, videosDispatch]);

  let filteredData = [...videosState.videos];

  if (videosState.selectedCategory) {

    filteredData = videosState.videos.filter(video => video.category === videosState.selectedCategory)

  }
  let sortedData = [...filteredData];
  if (videosState.sortBy) {

    switch (videosState.sortBy) {
      case `mostliked`:
        sortedData = [...filteredData].sort((video1, video2) => {
          const totalLikes1 = video1.likes.male + video1.likes.female + video1.likes.others;
          const totalLikes2 = video2.likes.male + video2.likes.female + video2.likes.others;
          return totalLikes2 - totalLikes1
        })

        break;

      case `mostviewed`:
        sortedData = [...filteredData].sort((video1, video2) => {
          const totalLikes1 = video1.views.male + video1.views.female + video1.views.others;
          const totalLikes2 = video2.views.male + video2.views.female + video2.views.others;
          return totalLikes2 - totalLikes1
        })
        break;

      case `latestfirst`: sortedData = [...filteredData].sort((video1, video2) => {

        return new Date(video2.createdAt).getMilliseconds() - new Date(video1.createdAt).getMilliseconds()
      })
        break;
      case `oldestfirst`: sortedData = [...filteredData].sort((video1, video2) => {

        return new Date(video1.createdAt).getMilliseconds() - new Date(video2.createdAt).getMilliseconds()
      })
        break;
    }
  }


  let searchedData = [...sortedData];
  if (videosState.searchQuery) {
    searchedData = videosState.videos.filter(video => (video.category.toLowerCase().includes(videosState.searchQuery.toLowerCase()) || (video.title.toLowerCase().includes(videosState.searchQuery.toLowerCase()))))
  }


  return (
    <>
      <header className={`${navbar} pr-lg`}>
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
        <div className={`${wrapperSearch}`}>
          <SearchBar
            searchbar={searchbar}
            setSearchbar={setSearchbar}
          />
        </div>
        <div >
          <div className={`${publisherAvatar}`}>
            <Avatar
              size={`sm`}
              imageUrl={userProfile?.gender === `male` ? `https://res.cloudinary.com/dmk11fqw8/image/upload/v1653926221/man_6_ewkhrj.png` : `https://res.cloudinary.com/dmk11fqw8/image/upload/v1656501210/woman_1_jotf2w.png`}
            />
          </div>
        </div>
      </header>
      <MobileSidebar status={{ sidebar, setSidebar }} />
      <div className={`${exploreContainer}`}>
        <div
          className={`${headerContainer} header header-secondary text-white`}
        >
          Explore
        </div>
        <div className={`${chipsContainer} d-flex jc-center text-white  p-lg`} onClick={(e) => {

          const filterBy = (e.target as HTMLButtonElement).value;
          const appliedFilter = searchParams.get(`filterBy`);

          if (filterBy === CLEAR_ALL.toLowerCase()) {
            searchParams.delete(`filterBy`);
            setSearchParams(searchParams)
          }

          else if (filterBy) {
            if (appliedFilter === filterBy) {

              searchParams.delete(`filterBy`);
              setSearchParams(searchParams);
            } else {

              searchParams.set(`filterBy`, filterBy)
              setSearchParams(searchParams)
            }

          }


        }}>

          <button className={`btn ${searchParams.get(`filterBy`) === STOCKMARKET.toLowerCase() ? `${chipSolid}` : `${chip}`} p-lg`} value={STOCKMARKET.toLowerCase()}>Stock Market</button>


          <button className={`btn ${searchParams.get(`filterBy`) === GOLD.toLowerCase() ? `${chipSolid}` : `${chip}`} p-lg`} value={GOLD.toLowerCase()}>Gold Investment</button>


          <button className={`btn ${searchParams.get(`filterBy`) === CRYPTO.toLowerCase() ? `${chipSolid}` : `${chip}`} p-lg`} value={CRYPTO.toLowerCase()}>Crypto</button>


          <button className={`btn ${searchParams.get(`filterBy`) === BUSINESSCASESTUDIES.toLowerCase() ? `${chipSolid}` : `${chip}`} p-lg`} value={BUSINESSCASESTUDIES.toLowerCase()}>Business Case Studies</button>


          <button className={`btn ${searchParams.get(`filterBy`) === SCAMS.toLowerCase() ? `${chipSolid}` : `${chip}`} p-lg`} value={SCAMS.toLowerCase()}>Scams</button>


          <button className={`btn ${searchParams.get(`filterBy`) === NFTS.toLowerCase() ? `${chipSolid}` : `${chip}`} p-lg`} value={NFTS.toLowerCase()}>NFT's</button>


          <button className={`btn ${searchParams.get(`filterBy`) === INVESTMENTSTRATEGIES.toLowerCase() ? `${chipSolid}` : `${chip}`} p-lg`} value={INVESTMENTSTRATEGIES.toLowerCase()}>Investment Strategies</button>


          <button

            className={`btn ${chip} ${chipClear} p-lg`} value={CLEAR_ALL.toLowerCase()}>Clear All</button>
        </div>
        <div className={``}>
          <Sidebar />
          <div
            className={`${exploreWrapperContainer} gap-10 tube-text-secondary-color`}
            style={{ marginLeft: `0px` }}
          >

            <div className={`${videoWrapperContainer}`}>
              <div className="header-tertiary">Showing {sortedData.length} Videos</div>


              {

                sortedData.map((video, index) => {
                  return <ExploreVideoCard index={index} setLastElement={setLastElement} video={video} key={video._id} />
                })
              }
              {
                videosState.loading === `loading` &&
                <span className="d-flex jc-center w-100">

                  <Loader />
                </span>
              }

            </div>
          </div>
        </div>
      </div>
    </>
  );
};
