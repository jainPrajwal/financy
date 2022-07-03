import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { default as sortByStyles } from "./SortBy.module.css";
import { default as common } from "../../common/common.module.css";
import { useOnClickOutside } from "../../hooks/useOnClickOutside";

const SortBy = () => {
    const [isHidden, setIsHidden] = useState(true);
    const [searchParams, setSearchParams] = useSearchParams();
    const SortByRef = useRef<HTMLDivElement | null>(null);

    useOnClickOutside(SortByRef, setIsHidden)

    const { sortsortBy, wrapperSortByOptions, wrapperSortByOptionsActive } = sortByStyles


    return (
        <div
            className={`${sortsortBy}  d-flex `}
            onClick={() => setIsHidden((prevState) => !prevState)}
        >
            <div className={`cursor-pointer w-100`}>
                sort By :
                <span className="text-primary ml-lg">
                    {searchParams.get(`sortBy`) || `recommended`}
                </span>
            </div>

            <div
                ref={SortByRef}
                className={` ${wrapperSortByOptions} ${isHidden ? "" : `${wrapperSortByOptionsActive}`
                    }`}
            >
                <div>
                    <div className="p-md my-sm">
                        <label
                            className="cursor-pointer w-100"
                            htmlFor="most liked">
                            <input type="radio"
                          
                               
                                value={`most liked`}
                                onChange={(e) => {
                                    setIsHidden(true)
                                    searchParams.set(`sortBy`, e.target.value)
                                    setSearchParams(searchParams)
                                }}
                                name="sortBy" id="most liked" />
                            <span  className="pl-md ">  Most Liked</span></label>

                    </div>
                    <div className="p-md my-sm">
                        <label
                            className="cursor-pointer w-100"
                            htmlFor="most viewed">
                            <input type="radio"
                        
                      
                                value={`most viewed`}
                                onChange={(e) => {
                                    setIsHidden(true)

                                    searchParams.set(`sortBy`, e.target.value)
                                    setSearchParams(searchParams)
                                }}
                                name="sortBy" id="most viewed" />
                            <span  className="pl-md "> Most Viewed</span></label>
                    </div>

                    <div className="p-md my-sm">
                        <label
                            className="cursor-pointer w-100"
                            htmlFor="latest first">
                            <input type="radio"
                        
                      
                                value={`latest first`}
                                onChange={(e) => {
                                    setIsHidden(true)
                                    searchParams.set(`sortBy`, e.target.value)
                                    setSearchParams(searchParams)
                                }}
                                name="sortBy" id="latest first" />
                            <span  className="pl-md ">Latest First</span></label>
                </div>


                <div className="p-md my-sm">
                    <label
                        className="cursor-pointer w-100"
                        htmlFor="oldest first">
                        <input type="radio"
                    
                  
                            value={`oldest first`}
                            onChange={(e) => {
                                setIsHidden(true)
                                searchParams.set(`sortBy`, e.target.value)
                                setSearchParams(searchParams)
                            }}
                            name="sortBy" id="oldest first" />
                        <span  className="pl-md ">Oldest First</span></label>
                </div>
            </div>
        </div>
        </div >
    );
};

export { SortBy };
