import { cache } from "react";
import { VideoRecord } from "@/types/video";

async function getBaseUrl() {
  const host = window.location.host || "localhost:3000";
  const protocol = process.env.NODE_ENV === "development" ? "http" : "https";
  return `${protocol}://${host}`;
}

export const getTenantToken = cache(
  async (
    appId: string = process.env.NEXT_PUBLIC_APP_ID || "",
    appSecret: string = process.env.NEXT_PUBLIC_APP_SECRET || ""
  ) => {
    const baseUrl = await getBaseUrl();
    const response = await fetch(`${baseUrl}/api/lark`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        endpoint: "/open-apis/auth/v3/tenant_access_token/internal",
        method: "POST",
        data: {
          app_id: appId,
          app_secret: appSecret,
        },
      }),
    });

    const data = await response.json();
    return data.tenant_access_token;
  }
);

interface LarkResponse {
  data?: {
    has_more?: boolean;
    page_token?: string;
    items?: VideoRecord[];
  };
}

export const getTableRecordsWithIterator = cache(async function* (
  appToken: string,
  tableId: string,
  pageSize: number = 20,
  maxPages: number = 1 // 限制最大页数
) {
  let hasMore = true;
  let pageToken = null;
  let currentPage = 0;
  const baseUrl = await getBaseUrl();

  while (hasMore && currentPage < maxPages) {
    const tenantToken = await getTenantToken();

    const response = await fetch(`${baseUrl}/api/lark`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        endpoint: `/open-apis/bitable/v1/apps/${appToken}/tables/${tableId}/records?page_size=${pageSize}${
          pageToken ? `&page_token=${pageToken}` : ""
        }`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${tenantToken}`,
        },
      }),
    });

    const data: LarkResponse = await response.json();
    hasMore = data.data?.has_more || false;
    pageToken = data.data?.page_token;
    currentPage++;

    const items = data.data?.items || [];
    for (const item of items) {
      yield item;
    }
  }
});
