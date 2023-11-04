import { createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

const itemAdapter = createEntityAdapter({
  sortComparer: (a, b) => b?.createdAt?.localeCompare(a?.createdAt),
});
const initialState = itemAdapter.getInitialState();

export const itemApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getItems: builder.query({
      query: () => ({
        url: "/items",
        method: "GET",
      }),
      transformResponse: (responseData) => {
        const items = responseData?.map((item) => {
          item.id = item?._id;
          return item;
        });

        return itemAdapter.setAll(initialState, items);
      },

      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: "Item", id: "LIST" },
            ...result.ids.map((id) => ({ type: "Item", id })),
          ];
        } else {
          return [{ type: "Item", id: "LIST" }];
        }
      },
    }),

    getItem: builder.query({
      query: (id) => `/items/${id}`,
      providesTags: (result, error, id) => [{ type: "Item", id }],
    }),

    getSearchItems: builder.query({
      query: (searchKey) => `/items/search/${searchKey}`,
      providesTags: (result, error, id) => [{ type: "Item", id }],
    }),

    addItem: builder.mutation({
      query: (postData) => ({
        url: "/items",
        method: "POST",
        body: postData,
        // { ...postData } if not for the formData
      }),
      invalidatesTags: [{ type: "Item", id: "LIST" }],
    }),

    editItem: builder.mutation({
      query: (editData) => ({
        url: "/items",
        method: "PUT",
        body: editData,
        // body: { ...editData },
      }),
      invalidatesTags: (result, err, arg) => [{ type: "Item", id: arg?.id }],
    }),
    patchItem: builder.mutation({
      query: (patchData) => ({
        url: "/items",
        method: "PATCH",
        body: { ...patchData },
      }),
      invalidatesTags: (result, err, arg) => [{ type: "Item", id: arg?.id }],
    }),
    deleteItem: builder.mutation({
      query: ({ id }) => ({
        url: "/items",
        method: "DELETE",
        body: { id },
      }),
      invalidatesTags: (result, err, arg) => [{ type: "Item", id: arg?.id }],
    }),

    ///  every thin will be wrap above this line
  }),
});

export const {
  useGetSearchItemsQuery,
  useGetItemQuery,
  useGetItemsQuery,
  useAddItemMutation,
  useEditItemMutation,
  usePatchItemMutation,
  useDeleteItemMutation,
  useLazyGetItemsQuery,
} = itemApiSlice;
