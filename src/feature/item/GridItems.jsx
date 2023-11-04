import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useGetItemsQuery } from "./itemApiSlice";
import NoImage from "../../img/emptyImage.jpeg";
import TimeDifferenceDisplay from "../../lib/TimeDifferenceDisplay";
import useToken from "../../hooks/useToken";
import { FixedSizeGrid as Grid } from "react-window";
import GetWindowSize from "../../lib/GetWindowSize";
import CalculateDistance from "../../lib/CalculateDistance";

const GridItems = ({ category }) => {
  const { userId, lat, lng } = useToken();
  const { windowSize } = GetWindowSize();

  const navigate = useNavigate();

  const { items, isLoading, isSuccess, isError, error } = useGetItemsQuery(
    "listItems",
    {
      selectFromResult: ({ data, isLoading, isSuccess, isError, error }) => ({
        items: data?.ids?.map((id) => data?.entities[id]),
        isLoading,
        isSuccess,
        isError,
        error,
      }),
      pollingInterval: 15000,
      refetchOnFocus: true,
      refetchOnMountOrArgChange: true,
      refetchOnReconnect: true,
    }
  );

  const categoryItems = items?.filter((item) => item.category === category);

  // search bar
  const [searchKey, setSearchKey] = useState("");
  const [searchResult, setSearchResult] = useState([]);

  useEffect(() => {
    const data = categoryItems?.filter(
      (item) =>
        item?.itemName
          ?.toLocaleLowerCase()
          ?.includes(searchKey?.toLocaleLowerCase()) ||
        item?.category
          ?.toLocaleLowerCase()
          ?.includes(searchKey?.toLocaleLowerCase()) ||
        item?.subCategory
          ?.toLocaleLowerCase()
          ?.includes(searchKey?.toLocaleLowerCase()) ||
        item?.city
          ?.toLocaleLowerCase()
          ?.includes(searchKey?.toLocaleLowerCase()) ||
        item?.district
          ?.toLocaleLowerCase()
          ?.includes(searchKey?.toLocaleLowerCase()) ||
        item?.province
          ?.toLocaleLowerCase()
          ?.includes(searchKey?.toLocaleLowerCase())
    );

    setSearchResult(data);
  }, [searchKey]);

  if (isLoading) {
    return (
      <p className="p-4 m-8 text-green-700 text-center animate-bounce">
        items page is loading...
      </p>
    );
  }

  if (isError) {
    return (
      <div className="text-center m-auto w-full mt-4 p-4 text-2xl">
        <p className="p-4 m-8 text-red-700 text-center animate-bounce">
          items page has error...
        </p>
        <p className="text-red-600 p-4 text-center">
          BackEnd Message :{" "}
          {error?.data?.message ||
            error?.code ||
            error?.message ||
            error?.data ||
            error?.error ||
            error?.name ||
            error?.originalStatus ||
            error?.stack ||
            error?.status}
        </p>
      </div>
    );
  }
  const itemsData = searchResult ? searchResult : categoryItems;

  // react-window
  const columnCount = 5;
  const columnWidth = 300;
  const rowCount = Math.ceil(itemsData?.length / columnCount) || 0;

  const Cell = ({ columnIndex, rowIndex, style }) => {
    const index = rowIndex * columnCount + columnIndex;
    if (index < itemsData?.length) {
      const item = itemsData[index];
      return (
        <div
          style={style}
          className={`p-2 mt-0 pt-1 mx-auto`}
          onClick={() => {
            if (userId) {
              navigate(`/dash/items/${item?.id}/single`);
            } else if (!userId) {
              navigate(`/items/${item?.id}/single`);
            }
          }}
        >
          <div className="rounded-lg bg-gray-50  hover:cursor-pointer pt-1 border border-gray-400 hover:border-blue-600">
            <div className="max-w-full">
              <img
                src={item?.images[0] ? item?.images[0] : NoImage}
                // srcSet={`${item?.images[0] || NoImage} 700w`}
                // sizes={`(max-width: 700px) 100vw , 700px`}
                height={700}
                width={700}
                alt={`${item?.itemName}`}
                className="p-2 pb-0 "
              />
            </div>

            <div className="pl-2 pt-1 flex flex-row items-center justify-between">
              <TimeDifferenceDisplay date={item?.createdAt} />
              <p className="text-xs italic opacity-60 pr-4 overflow-hidden whitespace-nowrap text-ellipsis">
                🌍 {item?.city}
              </p>
            </div>

            <div
              onClick={() => {
                if (userId) {
                  navigate(`/dash/items/${item?.id}/single`);
                } else if (!userId) {
                  navigate(`/items/${item?.id}/single`);
                }
              }}
              className="p-1  m-1 mt-0 rounded-md pl-2 "
            >
              <div className="flex flex-row items-center justify-between">
                <p
                  onClick={() => {
                    if (userId) {
                      navigate(`/dash/items/${item?.id}/single`);
                    } else if (!userId) {
                      navigate(`/items/${item?.id}/single`);
                    }
                  }}
                  className="text-2xl font-semibold cursor-pointer text-ellipsis overflow-hidden whitespace-nowrap"
                >
                  {item?.itemName}
                </p>
                <p className="text-xl pr-2 font-light">${item?.price}</p>
              </div>
              <p className=" font-light">
                {item?.quantity}{" "}
                {`${item?.quantity > 1 ? "availabilities" : "available"}`}
              </p>

              <p className="text-sm font-bold underline underline-offset-4">
                Location
              </p>
              <div className="flex flex-row pl-2">
                <div className=" font-light">
                  <p>{item?.province}</p>
                  <p>{item?.district}</p>
                  <p>{item?.city}</p>
                </div>
              </div>

              <div className="text-md ">
                <p className="text-sm font-bold underline underline-offset-4">
                  Contact Information
                </p>
                <p className="px-2 font-light">Mobile: {item?.phoneNumber}</p>

                <p className="pl-2 font-light whitespace-nowrap text-ellipsis overflow-hidden">
                  {item?.email}
                </p>
              </div>

              <div className="bg-gradient-to-r hover:from-violet-500 hover:to-fuchsia-500 hover:bg-gradient-to-l from-blue-600 to-rose-400 hover:text-white cursor-pointer  text-center m-3 ml-1 p-1 rounded-md">
                Send your interest ?
              </div>
            </div>
          </div>
        </div>
      );
    }
  };

  // near by items

  const nearByItems = itemsData?.filter((item) => {
    const distance = CalculateDistance(lat, lng, item?.lat, item?.lng);
    if (distance < 50) {
      return item;
    }
  });

  const columnCount2 = 5;
  const columnWidth2 = 300;
  const rowCount2 = Math.ceil(nearByItems?.length / columnCount2) || 0;

  const NearByItemsCell = ({ columnIndex, rowIndex, style }) => {
    const index = rowIndex * columnCount2 + columnIndex;
    if (index < nearByItems?.length) {
      const item = nearByItems[index];
      return (
        <div
          style={style}
          className={`p-2 mt-0 pt-1 mx-auto`}
          onClick={() => {
            if (userId) {
              navigate(`/dash/items/${item?.id}/single`);
            } else if (!userId) {
              navigate(`/items/${item?.id}/single`);
            }
          }}
        >
          <div className="rounded-lg bg-gray-50  hover:cursor-pointer pt-1 border border-gray-400 hover:border-blue-600 ">
            <div className="flex flex-row">
              <div className="w-[40%]">
                <img
                  src={item?.images[0] ? item?.images[0] : NoImage}
                  // srcSet={`${item?.images[0] || NoImage} 700w`}
                  // sizes={`(max-width: 700px) 100vw , 700px`}
                  height={80}
                  width={80}
                  alt={`${item?.itemName}`}
                  style={{
                    borderRadius: 20,
                  }}
                  className="px-2 pt-1 pb-0 w-full "
                />
              </div>

              <div className="w-[60%]">
                <div className="pt-1 flex flex-row items-center justify-between">
                  <TimeDifferenceDisplay date={item?.createdAt} />
                  <p className="text-xs italic opacity-60 pr-2 overflow-hidden whitespace-nowrap text-ellipsis">
                    🌍 {item?.city}
                  </p>
                </div>

                <div
                  onClick={() => {
                    if (userId) {
                      navigate(`/dash/items/${item?.id}/single`);
                    } else if (!userId) {
                      navigate(`/items/${item?.id}/single`);
                    }
                  }}
                  className="p-1 rounded-md"
                >
                  <div className="">
                    <p
                      onClick={() => {
                        if (userId) {
                          navigate(`/dash/items/${item?.id}/single`);
                        } else if (!userId) {
                          navigate(`/items/${item?.id}/single`);
                        }
                      }}
                      className=" text-xl italic font-semibold/30 cursor-pointer text-ellipsis overflow-hidden whitespace-nowrap"
                    >
                      {item?.itemName}
                    </p>
                    <p className=" pr-2 font-light">${item?.price}</p>
                  </div>
                  <p className=" font-light">
                    {item?.quantity}{" "}
                    {`${item?.quantity > 1 ? "availabilities" : "available"}`}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r hover:from-violet-500 hover:to-fuchsia-500 hover:bg-gradient-to-l from-blue-600 to-rose-400 hover:text-white cursor-pointer  text-center m-2 mt-0 rounded-md">
              Send your interest ?
            </div>
          </div>
        </div>
      );
    }
  };

  console.log(`NEAR BY ITEMS `, nearByItems);

  // end of near by items

  return (
    <>
      <div className="h-[3rem] m-auto w-[100vw]  bg-black text-white absolute top-[3rem] left-0 right-0 flex items-center justify-between shadow-md shadow-white">
        <div className="flex flex-row items-center">
          <div className="relative ">
            <input
              maxLength={30}
              placeholder="search..."
              type="search"
              value={searchKey}
              onChange={(e) => setSearchKey(e.target.value)}
              className="p-1 px-2 text-black rounded-md w-[9rem] sm:w-auto ml-2"
            />
          </div>
          {searchResult?.length >= 1 && searchKey && (
            <div className="ml-3">
              {searchResult?.length}{" "}
              {`${searchResult?.length > 1 ? "results" : "result"}`}
            </div>
          )}
        </div>
      </div>
      <div>
        {nearByItems?.length > 0 && (
          <div className="mt-[6rem] bg-rose-300">
            <p className="text-xs  font-bold/20 italic  pl-6 pt-1 pb-0">
              Near you...
            </p>
            <Grid
              columnCount={columnCount2}
              columnWidth={columnWidth2}
              rowCount={rowCount2}
              rowHeight={160} // item height
              width={windowSize.width}
              height={160}
            >
              {NearByItemsCell}
            </Grid>
          </div>
        )}
      </div>
      {itemsData?.length ? (
        <div className={`${nearByItems?.length > 0 ? "mt-1" : "mt-[6rem]"}`}>
          <Grid
            columnCount={columnCount}
            columnWidth={columnWidth}
            rowCount={rowCount}
            rowHeight={600} // item height
            width={windowSize.width}
            height={1000}
          >
            {Cell}
          </Grid>
        </div>
      ) : (
        <div className="mt-[6rem]">
          <p className="p-4 text-center text-lg">Not active list found...</p>
        </div>
      )}
    </>
  );
};

export default GridItems;
