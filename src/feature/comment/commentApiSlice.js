import { createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

const commentAdapter = createEntityAdapter({
  sortComparer: (a, b) => b?.createdAt?.localeCompare(a?.createdAt),
});
const initialState = commentAdapter.getInitialState();

export const commentApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getComments: builder.query({
      query: () => ({
        url: "/comments",
        method: "GET",
      }),
      transformResponse: (responseData) => {
        const comments = responseData?.map((comment) => {
          comment.id = comment?._id;
          return comment;
        });

        return commentAdapter.setAll(initialState, comments);
      },

      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: "Comment", id: "LIST" },
            ...result.ids.map((id) => ({ type: "Comment", id })),
          ];
        } else return [{ type: "Comment", id: "LIST" }];
      },
    }),

    addComment: builder.mutation({
      query: (postData) => ({
        url: "/comments",
        method: "POST",
        body: { ...postData },
      }),
      invalidatesTags: [{ type: "Comment", id: "LIST" }],
    }),

    editComment: builder.mutation({
      query: (editData) => ({
        url: "/comments",
        method: "PUT",
        body: { ...editData },
      }),
      invalidatesTags: (result, err, arg) => [{ type: "Comment", id: arg?.id }],
    }),
    patchComment: builder.mutation({
      query: (patchData) => ({
        url: "/comments",
        method: "PATCH",
        body: { ...patchData },
      }),
      invalidatesTags: (result, err, arg) => [{ type: "Comment", id: arg?.id }],
    }),
    deleteComment: builder.mutation({
      query: ({ id }) => ({
        url: "/comments",
        method: "DELETE",
        body: { id },
      }),
      invalidatesTags: (result, err, arg) => [{ type: "Comment", id: arg?.id }],
    }),

    ///  every thin will be wrap above this line
  }),
});

export const {
  useGetCommentsQuery,
  useAddCommentMutation,
  useEditCommentMutation,
  usePatchCommentMutation,
  useDeleteCommentMutation,
  useLazyGetCommentsQuery,
} = commentApiSlice;
