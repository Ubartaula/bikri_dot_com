import React from "react";
import { useGetCommentsQuery } from "./commentApiSlice";
import Comment from "./Comment";

const ListComment = () => {
  const {
    data: comments,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetCommentsQuery("listComments", {
    pollingInterval: 15000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  let content;
  if (isLoading) {
    content = <div className="mt-[3.5rem]">comments page is loading...</div>;
  }
  if (isError) {
    content = (
      <div className="mt-[3.5rem]">
        comments page has error - {error?.data?.message}
      </div>
    );
  }

  if (isSuccess) {
    const { ids } = comments;

    if (ids?.length) {
      content = ids?.map((commentId) => (
        <Comment key={commentId} commentId={commentId} />
      ));
    }
  }

  return <div className="mt-[3rem]">{content}</div>;
};

export default ListComment;
