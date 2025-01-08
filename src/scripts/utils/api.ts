import fetch, { RequestInit as NodeFetchRequestInit } from "node-fetch";
import { NOCODB_API_TOKEN, NOCODB_BASE_URL } from "../config/env";

type ApiResponse<T> = {
  data?: T;
  error?: string;
};

export async function makeRequest<T>(
  endpoint: string,
  options: Omit<NodeFetchRequestInit, "timeout">
): Promise<T> {
  let retries = 3;
  while (retries > 0) {
    try {
      const response = await fetch(`${NOCODB_BASE_URL}${endpoint}`, {
        ...options,
        headers: {
          "Content-Type": "application/json",
          "xc-token": NOCODB_API_TOKEN,
          ...options.headers,
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("API Response:", errorText);
        throw new Error(`Request failed: ${response.statusText}`);
      }

      const result = (await response.json()) as ApiResponse<T>;
      
      if (result.error) {
        throw new Error(result.error);
      }
      
      return result.data as T;
    } catch (error) {
      retries--;
      if (retries === 0) throw error;
      console.log(`请求失败，剩余重试次数: ${retries}`);
      await new Promise((resolve) => setTimeout(resolve, 2000));
    }
  }
  throw new Error("Request failed after retries");
} 