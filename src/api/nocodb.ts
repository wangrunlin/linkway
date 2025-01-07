import { PAGE_SIZE, NOCODB_TABLE_ID, NOCODB_API_TOKEN } from "@/config";
import { ApiResponse } from "@/types";

export async function getList<T>(page: number): Promise<ApiResponse<T>> {
  const offset = (page - 1) * PAGE_SIZE;

  try {
    const response = await fetch(
      `https://nocodb.alin.run/api/v2/tables/${NOCODB_TABLE_ID}/records?limit=${PAGE_SIZE}&shuffle=0&offset=${offset}`,
      {
        headers: {
          accept: "application/json",
          "xc-token": NOCODB_API_TOKEN,
        },
        next: { revalidate: 300 },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch videos");
    }

    const data = await response.json();

    if (!data.pageInfo?.totalRows) {
      data.pageInfo = {
        totalRows: 100,
        pageSize: PAGE_SIZE,
        isFirstPage: page === 1,
        isLastPage: false,
        page: page,
      };
    }

    return data;
  } catch (error) {
    console.error("Error fetching videos:", error);
    return {
      list: [],
      pageInfo: {
        totalRows: 0,
        pageSize: PAGE_SIZE,
        isFirstPage: true,
        isLastPage: true,
        page: 1,
      },
    };
  }
}
