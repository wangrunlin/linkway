import { config } from "dotenv";
import { resolve } from "path";

// 加载 .env.local 文件
config({ path: resolve(process.cwd(), ".env.local") });

export const NOCODB_BASE_URL =
  process.env.NOCODB_BASE_URL || "https://app.nocodb.com";

export const NOCODB_API_TOKEN = process.env.NOCODB_API_TOKEN!;
if (!NOCODB_API_TOKEN) {
  throw new Error("NOCODB_API_TOKEN is not set in .env.local");
}

export const BASE_ID = process.env.BASE_ID!;
if (!BASE_ID) {
  throw new Error("BASE_ID is not set in .env.local");
}

export const NOCODB_TABLE_ID = process.env.NOCODB_TABLE_ID!;
if (!NOCODB_TABLE_ID) {
  throw new Error("NOCODB_TABLE_ID is not set in .env.local");
}
