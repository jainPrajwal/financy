import { Loader } from "kaali-ui";
import { Video } from "../../constants/videos.types";
import { useVideos } from "../../hooks/useVideos";

import { useInfiniteScroll } from "../../hooks/useInfiniteScroll";
import { useEffect, useState } from "react";
import { ExploreVideoCard } from "../../components/Explore/ExploreVideoCard";
import { default as chipsStyles } from "./Videos.module.css";
import { useSearchParams } from "react-router-dom";
import { CLEAR_ALL, FILTER_BY_CATEGORY, SORT_BY } from "../../constants/actions.types";
import { useScrollToTop } from "../../hooks/useScrollToTop";

export const Videos = () => {
  const { videosState, videosDispatch } = useVideos();
  const [searchParams, setSearchParams] = useSearchParams();
  const [lastElement, setLastElement] = useState<HTMLDivElement | null>(null);
  useInfiniteScroll({ lastElement, setLastElement });
  useScrollToTop();

  const { chipsContainer, chip, chipClear } = chipsStyles;

  useEffect(() => {
    try {
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
    } catch (error) {
      console.error(`error `, error)
    }


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
          const totalLikes1 = video1.likes.male + video1.likes.female + video1.likes.others;
          const totalLikes2 = video2.likes.male + video2.likes.female + video2.likes.others;
          return totalLikes2 - totalLikes1
        })

        break;

      case `most viewed`:
        sortedData = [...filteredData].sort((video1, video2) => {
          const totalLikes1 = video1.views.male + video1.views.female + video1.views.others;
          const totalLikes2 = video2.views.male + video2.views.female + video2.views.others;
          return totalLikes2 - totalLikes1
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
      <div className={`${chipsContainer} d-flex jc-center text-white  p-lg`} onClick={(e) => {

        const filterBy = (e.target as HTMLButtonElement).value;
        const appliedFilter = searchParams.get(`filterBy`);
        if (filterBy === CLEAR_ALL) {
          searchParams.delete(`filterBy`);
          setSearchParams(searchParams)
        }
        else if (appliedFilter) {
          searchParams.delete(`filterBy`);
          setSearchParams(searchParams);
        } else {

          searchParams.set(`filterBy`, filterBy)
          setSearchParams(searchParams)
        }

      }}>
        <button className={`btn ${chip} p-lg`} value={`stockmarket`}>Stock Market</button>
        <button className={`btn ${chip} p-lg`} value={`gold`}>Gold Investment</button>
        <button className={`btn ${chip} p-lg`} value={`crypto`}>Crypto</button>
        <button className={`btn ${chip} p-lg`} value={`businesscasestudies`}>Business Case Studies</button>
        <button className={`btn ${chip} p-lg`} value={`scams`}>Scams</button>
        <button className={`btn ${chip} p-lg`} value={`nfts`}>NFT's</button>
        <button className={`btn ${chip} p-lg`} value={`investmentstrategies`}>Investment Strategies</button>
        <button

          className={`btn ${chip} ${chipClear} p-lg`} value={CLEAR_ALL}>Clear All</button>
      </div>
      <div>
        <div>

          <input type="radio"
            checked={videosState.sortBy === `most liked`}
            value={`most liked`}
            onChange={(e) => {
              searchParams.set(`sortBy`, e.target.value)
              setSearchParams(searchParams)
            }}
            name="sortBy" id="most liked" />
          <label htmlFor="most liked">Most Liked</label>

        </div>
        <div>

          <input type="radio"
            checked={videosState.sortBy === `most viewed`}
            value={`most viewed`}
            onChange={(e) => {

              searchParams.set(`sortBy`, e.target.value)
              setSearchParams(searchParams)
            }}
            name="sortBy" id="most viewed" />
          <label htmlFor="most viewed">Most Viewed</label>
        </div>

        <div>
          <input type="radio"
            checked={videosState.sortBy === `latest first`}
            value={`latest first`}
            onChange={(e) => {
              searchParams.set(`sortBy`, e.target.value)
              setSearchParams(searchParams)
            }}
            name="sortBy" id="latest first" />
          <label htmlFor="latest first">Latest First</label>
        </div>


        <div>

          <input type="radio"
            checked={videosState.sortBy === `oldest first`}
            value={`oldest first`}
            onChange={(e) => {
              searchParams.set(`sortBy`, e.target.value)
              setSearchParams(searchParams)
            }}
            name="sortBy" id="oldest first" />
          <label htmlFor="oldest first">Oldest First</label>
        </div>

      </div>
      <div>Total Videos: {searchedData.length}</div>
      {searchedData.map((video: Video, index) => {

        return (
          <ExploreVideoCard video={video} index={index} setLastElement={setLastElement} key={video._id} />
        );
      })}
      {videosState.loading === `loading` && (
        <div className="d-flex jc-center p-lg">
          <Loader />
        </div>
      )}
    </>
  );
};
