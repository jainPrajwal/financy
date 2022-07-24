import { useNavigate } from "react-router";

import React, { useRef, useState } from "react";
import { useVideos } from "../../hooks/useVideos";
import { getSearchedData } from "../../utils/getSearchedData";
import { default as common } from "../../common/common.module.css";
import { default as searchStyles } from "./SearchBar.module.css";
import { useOnClickOutside } from "../../hooks/useOnClickOutside";

const SearchBar = ({ searchbar, setSearchbar }: { searchbar: boolean, setSearchbar: React.Dispatch<React.SetStateAction<boolean>> }) => {
  const { videosState, videosDispatch } = useVideos();
  const [localSearchQuery, setLocalSearchQuery] = useState("");
  const [timerId, setTimerId] = useState<NodeJS.Timeout | null>(null);
  const dataWithSearchedResults = getSearchedData(
    videosState.videos,
    videosState.searchQuery
  );
  const SearchBarRef = useRef(null);
  let navigate = useNavigate();
  const { autocomplete, searchBox, autocompleteItems, autocompleteItem } =
    searchStyles;
  const { inputStyle } = common;

  useOnClickOutside(SearchBarRef, setSearchbar);
  return (
    <>
      <div ref={SearchBarRef} className={`${autocomplete}`}>
        <input
          type="text"
          className={`${searchBox} ${inputStyle}`}
          value={localSearchQuery}
          placeholder="Search by name"
          onKeyUp={(e) => {
            if (e.key === `ArrowDown`) {
              const target = e.target as HTMLInputElement;
              const nextElementSibling = target.nextElementSibling;
              target && nextElementSibling && ([...nextElementSibling.children][0] as HTMLInputElement)?.focus();
            }
          }}
          onChange={(event) => {
            setSearchbar(false)
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
        {!searchbar && localSearchQuery.length && <div className={`${`${autocompleteItems}`} `}>
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
                    const target = e.target as HTMLInputElement;
                    if (index >= 0 && index < dataWithSearchedResults.length) {
                      if (e?.key === `Enter`) navigate(`/videos/${video._id}`);
                      else if (e.key === `ArrowDown`) {
                        ((target)?.nextElementSibling as HTMLInputElement)?.focus();
                      } else if (e?.key === `ArrowUp`) {
                        if ((e.target as HTMLInputElement)?.previousElementSibling)
                          ((target)?.previousElementSibling as HTMLInputElement)?.focus();
                        else {
                          const parentNode = target.parentNode;
                          const previousElementSibling = parentNode?.previousSibling;
                          parentNode && previousElementSibling && (previousElementSibling as HTMLInputElement).focus();
                        }
                      }
                    }
                  }}
                  key={video._id}
                  tabIndex={Number(index / 10)}
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
        </div>}
      </div>
    </>
  );
};

export { SearchBar };
