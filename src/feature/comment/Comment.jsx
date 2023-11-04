import React from "react";
import { useGetCommentsQuery } from "./commentApiSlice";
import TimeDifferenceDisplay from "../../lib/TimeDifferenceDisplay";

const Comment = ({ commentId }) => {
  const { comment } = useGetCommentsQuery("listComments", {
    selectFromResult: ({ data }) => ({
      comment: data?.entities[commentId],
    }),
  });
  return (
    <div className="">
      <p className="m-2 border border-red-500">{comment?.text}</p>

      <TimeDifferenceDisplay date={comment?.createdAt} />
      <p>{comment?.user?.username}</p>
    </div>
  );
};

export default React.memo(Comment);
