import {
  PAGE_SIZE,
  NOCODB_TABLE_ID,
  NOCODB_API_TOKEN,
  NOCODB_BASE_URL,
} from "@/config";
import { ApiResponse, Params, LinkWayResource } from "@/types";

export const getList = async ({
  page = 1,
  query,
  sort,
}: Params): Promise<ApiResponse> => {
  const offset = (page - 1) * PAGE_SIZE;

  try {
    const baseUrl = new URL(
      `${NOCODB_BASE_URL}/api/v2/tables/${NOCODB_TABLE_ID}/records`
    );

    baseUrl.searchParams.append("limit", PAGE_SIZE.toString());
    baseUrl.searchParams.append("shuffle", "0");
    baseUrl.searchParams.append("offset", offset.toString());

    baseUrl.searchParams.append(
      "sort",
      sort ? `${sort},-datePublished` : "-datePublished"
    );

    if (query) {
      const queryParam = buildQuery(query);
      baseUrl.searchParams.append("where", queryParam);
    }

    console.info({ baseUrl: baseUrl.toString() });

    const response = await fetch(baseUrl.toString(), {
      headers: {
        accept: "application/json",
        "xc-token": NOCODB_API_TOKEN,
      },
      next: { revalidate: 300 },
    });

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
};

const buildQuery = (query: string) => {
  return `(title,like,%${query}%)~or(description,like,%${query}%)`;
};

export async function createResource(resource: Partial<LinkWayResource>) {
  const response = await fetch(
    `${NOCODB_BASE_URL}/api/v2/tables/${NOCODB_TABLE_ID}/records`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "xc-auth": NOCODB_API_TOKEN,
      },
      body: JSON.stringify(resource),
    }
  );

  if (!response.ok) {
    throw new Error(`Failed to create resource: ${response.statusText}`);
  }

  return response.json();
}
