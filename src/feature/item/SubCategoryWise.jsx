import React from "react";
import { useGetItemsQuery } from "./itemApiSlice";
import { useNavigate, useParams } from "react-router-dom";
import NoPost from "../../lib/NoPost";
import TimeDifferenceDisplay from "../../lib/TimeDifferenceDisplay";
import NoImage from "../../img/emptyImage.jpeg";
import { FixedSizeGrid as Grid } from "react-window";
import useToken from "../../hooks/useToken";
import GetWindowSize from "../../lib/GetWindowSize";

const SubCategoryWise = () => {
  const { userId } = useToken();
  const { windowSize } = GetWindowSize();
  const navigate = useNavigate();
  const { id } = useParams();

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

  const subCategoriesItems = items?.filter(
    (item) => item?.subCategoryID === id
  );

  if (!subCategoriesItems?.length) {
    return <NoPost />;
  }

  // react-window
  const columnCount = 5;
  const columnWidth = 300;
  const rowCount = Math.ceil(subCategoriesItems?.length / columnCount) || 0;

  const Cell = ({ columnIndex, rowIndex, style }) => {
    const index = rowIndex * columnCount + columnIndex;
    if (index < subCategoriesItems?.length) {
      const item = subCategoriesItems[index];
      return (
        <div
          style={style}
          className="p-2 mt-0 pt-0 mx-auto "
          onClick={() => {
            if (userId) {
              navigate(`/dash/items/${item?.id}/single`);
            } else if (!userId) {
              navigate(`/items/${item?.id}/single`);
            }
          }}
        >
          <div className="rounded-lg bg-gray-50 hover:shadow-sm hover:shadow-blue-900  hover:cursor-pointer pt-1">
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

  return (
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
  );
};

export default SubCategoryWise;
