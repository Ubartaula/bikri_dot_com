import React from "react";
import { useGetCommentsQuery } from "../feature/comment/commentApiSlice";

const CommentCount = ({ item }) => {
  const { comments } = useGetCommentsQuery("listComments", {
    selectFromResult: ({ data }) => ({
      comments: data?.ids?.map((id) => data?.entities[id]),
    }),
  });

  const itemComments = comments?.filter(
    (comment) => comment?.item?._id === item?._id
  );

  return (
    <div>
      {itemComments?.length || 0}
      <span className="pl-1">{`${
        itemComments?.length <= 1 ? "comment" : "comments"
      }`}</span>
    </div>
  );
};

export default React.memo(CommentCount);
