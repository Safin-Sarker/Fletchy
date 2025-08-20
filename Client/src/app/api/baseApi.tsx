import {
  fetchBaseQuery,
  type BaseQueryApi,
  type FetchArgs,
} from "@reduxjs/toolkit/query";

const customBasequery = fetchBaseQuery({
  baseUrl: "https://localhost:5001/api",
});

const sleep = () => new Promise((resolve) => setTimeout(resolve, 1000));

export const baseQueryWithErrorHandling = async (
  args: string | FetchArgs,
  api: BaseQueryApi,
  extraOptions: object
) => {
  try {
    // Simulate a delay for demonstration purposes
    await sleep();

    const result = await customBasequery(args, api, extraOptions);
    // Perform the base query
    return result;
  } catch (error) {
    const err = error as { status?: string; data?: unknown };
    console.log("Error status:", err.status);
    console.log("Error data:", err.data);
    return {
      error: {
        status: err.status || "FETCH_ERROR",
        data: err.data || "An unexpected error occurred",
      },
    };
  }
};
