import { useNavigate } from "react-router";

import { useState } from "react";
import { useVideos } from "../../hooks/useVideos";
import { getSearchedData } from "../../utils/getSearchedData";
import { default as searchStyles } from "./SearchBar.module.css";

const SearchBar = ({ searchbar, setSearchbar }) => {
  const { videosState, videosDispatch } = useVideos();
  const [localSearchQuery, setLocalSearchQuery] = useState("");
  const [timerId, setTimerId] = useState(null);
  const dataWithSearchedResults = getSearchedData(
    videosState.videos,
    videosState.searchQuery
  );

  let navigate = useNavigate();
  const {  autocomplete, searchBox, autocompleteItems, autocompleteItem } =
    searchStyles;
  return (
    <>
      <div className={`${autocomplete}`}>
        <input
          type="text"
          className={`${searchBox}`}
          value={localSearchQuery}
          placeholder="Search by name"
          onKeyUp={(e) => {
            if (e.key === `ArrowDown`) {
              [...e.target.nextElementSibling.children][0]?.focus();
            }
          }}
          onChange={(event) => {
            setLocalSearchQuery(() => event.target.value);
            if (timerId) {
              clearTimeout(timerId);
            }

            setTimerId(
              setTimeout(() => {
                videosDispatch({
                  type: `SEARCH_BY`,
                  payload: {
                    searchQuery: event.target.value,
                  },
                });
              }, 500)
            );
          }}
        />
        <div className={`${autocompleteItems}`}>
          {localSearchQuery.length > 0 &&
            dataWithSearchedResults.map((video, index) => {
              let lowerCaseItemName = video.title.toLowerCase();
              let lowerCaseSearchQuery = localSearchQuery.toLowerCase();
              return (
                <div
                  className={`${autocompleteItem}`}
                  onClick={() => {
                    setSearchbar(false);
                    navigate(`/videos/${video._id}`);
                  }}
                  onKeyUp={(e) => {
                    if (index >= 0 && index < dataWithSearchedResults.length) {
                      if (e?.key === `Enter`) navigate(`/videos/${video._id}`);
                      else if (e.key === `ArrowDown`) {
                        e.target?.nextElementSibling?.focus();
                      } else if (e?.key === `ArrowUp`) {
                        if (e.target?.previousElementSibling)
                          e.target?.previousElementSibling?.focus();
                        else {
                          e.target.parentNode.previousElementSibling.focus();
                        }
                      }
                    }
                  }}
                  key={video._id}
                  tabIndex={parseInt(index / 10, 10)}
                >
                  {`${lowerCaseItemName}`.slice(
                    0,
                    `${lowerCaseItemName}`.indexOf(`${lowerCaseSearchQuery}`)
                  )}
                  <strong>
                    {`${lowerCaseItemName}`.slice(
                      `${lowerCaseItemName}`.indexOf(`${lowerCaseSearchQuery}`),
                      `${lowerCaseItemName}`.indexOf(
                        `${lowerCaseSearchQuery}`
                      ) + `${lowerCaseItemName}`.length
                    )}
                  </strong>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
};

export { SearchBar };
