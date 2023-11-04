import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDeleteItemMutation, useGetItemsQuery } from "./itemApiSlice";
import NoImage from "../../img/emptyImage.jpeg";
import TimeDifferenceDisplay from "../../lib/TimeDifferenceDisplay";
import useToken from "../../hooks/useToken";
import { FixedSizeGrid as Grid } from "react-window";
import GetWindowSize from "../../lib/GetWindowSize";
import { toast } from "react-toastify";

const UserItemsGridList = ({ category }) => {
  // 27.71897951483161, 85.32338954886222
  // height to be deducted from viewport height 3 * 3rem = 48px * 3 =
  const { userId, firstName, lastName } = useToken();
  const { windowSize } = GetWindowSize();
  const navigate = useNavigate();

  const { items, isLoading, isError, error } = useGetItemsQuery("listItems", {
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
  });

  const userItems = items?.filter(
    (item) => item?.user?._id?.toString() === userId?.toString()
  );

  // search bar
  const [searchKey, setSearchKey] = useState("");
  const [searchResult, setSearchResult] = useState([]);

  useEffect(() => {
    const data = userItems?.filter(
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

  const itemsData = searchResult ? searchResult : userItems;

  // from profile
  const [showDeleteBox, setShowDeleteBox] = useState(false);
  const [selectItemToDelete, setSelectItemToDelete] = useState("");

  const [deleteItemMutation, { isSuccess }] = useDeleteItemMutation();

  const handleDelete = async (item) => {
    try {
      await deleteItemMutation({ id: item?._id });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      setShowDeleteBox(false);
      toast.success("Post Deleted", { position: "top-center" });
      // navigate("/dash/profile");
    }
  }, [isSuccess]);

  // end from profile

  // react-window
  const columnCount = 5;
  const columnWidth = 300;
  const rowCount = Math.ceil(itemsData?.length / columnCount) || 0;

  const Cell = ({ columnIndex, rowIndex, style }) => {
    const index = rowIndex * columnCount + columnIndex;
    if (index < itemsData?.length) {
      const item = itemsData[index];
      return (
        <div style={style}>
          <div className="rounded-lg bg-gray-50 border border-gray-500 m-2 p-1 ">
            <div
              onClick={() => {
                if (userId) {
                  navigate(`/dash/items/${item?.id}/single`);
                } else if (!userId) {
                  navigate(`/items/${item?.id}/single`);
                }
              }}
              className=""
            >
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

              <div className="pl-2">
                <TimeDifferenceDisplay date={item?.createdAt} />
              </div>

              <div className="p-1  m-1 mt-0 rounded-md pl-2 ">
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
              </div>
            </div>

            <div className="p-1 m-1">
              <button
                onClick={() => {
                  navigate(`/dash/items/${item?._id}`);
                }}
                className="bg-yellow-400 w-full text-red-500 hover:bg-red-500 hover:text-white p-1 text-center border border-blue-500 rounded-md"
              >
                Edit Post
              </button>
            </div>
            <div className="p-1 m-1">
              <button
                onClick={() => {
                  setShowDeleteBox(true);
                  setSelectItemToDelete(item);
                }}
                className="bg-yellow-400 w-full text-red-500 hover:bg-red-500 hover:text-white p-1 text-center border border-blue-500 rounded-md"
              >
                Delete Post
              </button>
            </div>
          </div>
        </div>
      );
    }
  };

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

  return (
    <>
      {showDeleteBox && (
        <div className="fixed top-[6rem] bottom-0 right-0 left-0 z-50 flex flex-col items-center justify-center bg-transparent ">
          <div className="bg-blue-600 p-10 m-10 rounded-lg">
            <p className="font-bold text-white p-4">
              Are you sure to Delete ?{" "}
            </p>
            <div className="flex flex-row items-center justify-center">
              <button
                onClick={() => handleDelete(selectItemToDelete)}
                className="p-2 m-2 shadow-lg shadow-black rounded-md hover:text-white px-3 bg-gradient-to-r from-sky-500 to-indigo-500"
              >
                Yes
              </button>
              <button
                onClick={() => setShowDeleteBox(false)}
                className="p-2 m-2 shadow-lg shadow-black rounded-md hover:text-white px-3 bg-gradient-to-r from-sky-500 to-indigo-500"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}

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

      <div className="mt-[6rem] flex flex-row items-center justify-around bg-gradient-to-r from-sky-500 to-indigo-500 w-full py-1">
        <p>
          Hello Mr. {lastName}, {firstName} !
        </p>
        <p> You have total post : {`${userItems?.length}`}</p>
      </div>

      {itemsData?.length <= 0 && (
        <div className="p-4 text-center text-lg italic">
          You do not have active posts
        </div>
      )}

      <div className=" bg-slate-100">
        <Grid
          columnCount={columnCount}
          columnWidth={columnWidth}
          rowCount={rowCount}
          rowHeight={640} // item height
          width={windowSize.width}
          height={1000}
        >
          {Cell}
        </Grid>
      </div>
    </>
  );
};

export default UserItemsGridList;
