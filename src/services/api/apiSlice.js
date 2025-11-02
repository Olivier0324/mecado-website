import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.escuelajs.co",
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Product", "User"],
  endpoints: (builder) => ({
    // Register endpoint
    register: builder.mutation({
      query: (userData) => ({
        url: "/api/v1/users",
        method: "POST",
        body: userData,
      }),
    }),

    // Login endpoint
    login: builder.mutation({
      query: (credentials) => ({
        url: "/api/v1/auth/login",
        method: "POST",
        body: credentials,
      }),
    }),

    // Get user profile
    getUserProfile: builder.query({
      query: () => "/api/v1/auth/profile",
    }),

    // Get products
    getProducts: builder.query({
      query: () => "/api/v1/products",
    }),

    // Get product by ID
    getProductById: builder.query({
      query: (id) => `/api/v1/products/${id}`,
    }),

    // Get related products
    getRelatedProducts: builder.query({
      query: (id) => `/api/v1/products/${id}/categories`,
    }),
  }),
});

// Auto-generated hooks
export const {
  useRegisterMutation,
  useLoginMutation,
  useGetUserProfileQuery,
  useGetProductsQuery,
  useGetProductByIdQuery,
  useGetRelatedProductsQuery,
} = apiSlice;

export default apiSlice;
