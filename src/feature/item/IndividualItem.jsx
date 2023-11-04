import React, { Suspense } from "react";
import { useParams } from "react-router-dom";
import { useGetItemsQuery } from "./itemApiSlice";
import TimeDifferenceDisplay from "../../lib/TimeDifferenceDisplay";

import ImageSlider from "../../lib/ImageSlider";
import NoImage from "../../img/emptyImage.jpeg";
import PostComment from "../comment/AddComment";

const IndividualItem = () => {
  const { id } = useParams();

  // best way to reduce network request
  const { item } = useGetItemsQuery("listItems", {
    selectFromResult: ({ data }) => ({
      item: data?.entities[id],
    }),
  });

  //xsm:flex xsm:flex-row
  return (
    <div className="bg-white p-3 w-full  sm:w-[50%] lg:w-[40%]  h-[100%] rounded-md m-auto">
      <div className=" p-1 ">
        {item?.images?.length ? (
          <ImageSlider item={item} showPagination={true} />
        ) : (
          <img
            src={NoImage}
            // srcSet={`${item?.images[0] || NoImage} 700w`}
            // sizes={`(max-width: 700px) 100vw , 700px`}
            height={400}
            width={700}
            alt={`${item?.itemName}`}
            className="p-2 "
          />
        )}
      </div>

      <div className=" xsm:pl-3 p-2 rounded-md">
        <>
          <TimeDifferenceDisplay date={item?.createdAt} />
        </>

        <div className="p-1">
          <div className="flex flex-row items-center justify-between">
            <p className="text-xl font-bold/20">{item?.itemName}</p>
            <p className="text-xl font-bold/20 pr-2">$ {item?.price}</p>
          </div>
          <div className="flex flex-row items-center justify-between">
            <p className=" opacity-60">Qty</p>
            <p className=" opacity-60 pr-2">{item?.quantity}</p>
          </div>

          <p className="underline underline-offset-4 text-sm opacity-80 italic font-bold">
            Location
          </p>
          <p>{item?.province}</p>
          <p>{item?.district}</p>
          <p>{item?.city}</p>
          <p className="underline underline-offset-4 text-sm opacity-80 italic font-bold pt-1">
            Description
          </p>
          <div className="w-full">{item?.itemInfo}</div>
          <p className="underline underline-offset-4 text-sm opacity-80 italic font-bold pt-1">
            Contact Information
          </p>
          <p>
            Mobile No:
            {item?.phoneNumber}
          </p>
          <p className=" overflow-scroll">{item?.email}</p>
        </div>
        <Suspense fallback="posting comments...">
          <PostComment itemId={item?.id} />
        </Suspense>
      </div>
    </div>
  );
};

export default IndividualItem;
