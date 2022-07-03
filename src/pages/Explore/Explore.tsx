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
import { Navbar } from "../../components/Navbar/Navbar";
import { SortBy } from "../../components/SortBy/SortBy";
import { getLikesOfAVideo } from "../../utils/Videos/getLikesOfAVideo";
import { getViewsOfAVideo } from "../../utils/Videos/getViewsOfAVideo";

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
      case `most liked`:
        sortedData = [...filteredData].sort((video1, video2) => {
          const totalLikes1 = getLikesOfAVideo(video1);
          const totalLikes2 = getLikesOfAVideo(video2)
          return totalLikes2 - totalLikes1;
        })

        break;

      case `most viewed`:
        sortedData = [...filteredData].sort((video1, video2) => {
          const totalViews1 = getViewsOfAVideo(video1);
          const totalViews2 = getViewsOfAVideo(video2)
          return totalViews2 - totalViews1
        })
        break;

      case `latest first`: sortedData = [...filteredData].sort((video1, video2) => {

        return new Date(video2.createdAt).getMilliseconds() - new Date(video1.createdAt).getMilliseconds()
      })
        break;
      case `oldest first`: sortedData = [...filteredData].sort((video1, video2) => {

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
      <Navbar setSidebar={setSidebar} />
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

          console.log(`clearing`, searchParams.get(`filterBy`))
          if (filterBy === CLEAR_ALL.toLowerCase()) {
            searchParams.delete(`filterBy`);
            searchParams.delete(`sortBy`);
            setSearchParams(searchParams)
          }

          else if (filterBy) {
            console.log(`setting`)
            if (appliedFilter === filterBy) {

              searchParams.delete(`filterBy`);
              setSearchParams(searchParams);
            } else {

              searchParams.set(`filterBy`, filterBy)
              setSearchParams(searchParams)
            }

          }


        }}>

          <button

            className={`btn ${searchParams.get(`filterBy`) === null ? `${chipSolid}` : `${chip}`} p-lg`} value={CLEAR_ALL.toLowerCase()}>All Videos</button>


          <button className={`btn ${searchParams.get(`filterBy`) === STOCKMARKET.toLowerCase() ? `${chipSolid}` : `${chip}`} p-lg`} value={STOCKMARKET.toLowerCase()}>Stock Market</button>


          <button className={`btn ${searchParams.get(`filterBy`) === GOLD.toLowerCase() ? `${chipSolid}` : `${chip}`} p-lg`} value={GOLD.toLowerCase()}>Gold Investment</button>


          <button className={`btn ${searchParams.get(`filterBy`) === CRYPTO.toLowerCase() ? `${chipSolid}` : `${chip}`} p-lg`} value={CRYPTO.toLowerCase()}>Crypto</button>


          <button className={`btn ${searchParams.get(`filterBy`) === BUSINESSCASESTUDIES.toLowerCase() ? `${chipSolid}` : `${chip}`} p-lg`} value={BUSINESSCASESTUDIES.toLowerCase()}>Business Case Studies</button>


          <button className={`btn ${searchParams.get(`filterBy`) === SCAMS.toLowerCase() ? `${chipSolid}` : `${chip}`} p-lg`} value={SCAMS.toLowerCase()}>Scams</button>


          <button className={`btn ${searchParams.get(`filterBy`) === NFTS.toLowerCase() ? `${chipSolid}` : `${chip}`} p-lg`} value={NFTS.toLowerCase()}>NFT's</button>


          <button className={`btn ${searchParams.get(`filterBy`) === INVESTMENTSTRATEGIES.toLowerCase() ? `${chipSolid}` : `${chip}`} p-lg`} value={INVESTMENTSTRATEGIES.toLowerCase()}>Investment Strategies</button>



        </div>
        <div className={``}>
          <Sidebar />
          <div className="d-flex jc-end my-md">

            <SortBy />
          </div>
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
