import { apiSlice } from "../../app/api/apiSlice";

export const categoryItemSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCategoryItems: builder.query({
      query: (category) => `/category-items/${category}`,
      providesTags: (result, error, id) => [{ type: "Item", id }],
    }),
  }),
});

export const { useGetCategoryItemsQuery } = categoryItemSlice;
