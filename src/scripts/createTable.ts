import { config } from "dotenv";
import { resolve } from "path";
import type { LinkWayResource } from "@/types";

// 加载 .env.local 文件
config({ path: resolve(process.cwd(), ".env.local") });

const NOCODB_API_TOKEN = process.env.NOCODB_API_TOKEN;
if (!NOCODB_API_TOKEN) {
  throw new Error("NOCODB_API_TOKEN is not set in .env.local");
}

const BASE_ID = process.env.BASE_ID;
if (!BASE_ID) {
  throw new Error("BASE_ID is not set in .env.local");
}

const TABLE_NAME = "demo";

type Column = {
  column_name: keyof LinkWayResource;
  title: string;
  uidt: string;
  required?: boolean;
  dtxp?: string;
};

const columns: Column[] = [
  {
    column_name: "title",
    title: "标题",
    uidt: "SingleLineText",
    required: true,
  },
  {
    column_name: "description",
    title: "描述",
    uidt: "LongText",
  },
  {
    column_name: "url",
    title: "链接",
    uidt: "URL",
    required: true,
  },
  {
    column_name: "type",
    title: "类型",
    uidt: "SingleSelect",
    dtxp: '["video","article","product","shop"]',
  },
  {
    column_name: "tags",
    title: "标签",
    uidt: "MultiSelect",
    dtxp: '["React","TypeScript","前端开发","JavaScript","Vue","Node.js"]',
  },
  {
    column_name: "duration",
    title: "时长(秒)",
    uidt: "Number",
  },
  {
    column_name: "author",
    title: "作者",
    uidt: "SingleLineText",
  },
  {
    column_name: "datePublished",
    title: "发布日期",
    uidt: "DateTime",
  },
  {
    column_name: "viewCount",
    title: "浏览量",
    uidt: "Number",
  },
];

const tableSchema = {
  table_name: TABLE_NAME,
  title: "示例",
  columns,
};

const createTable = async () => {
  try {
    console.log("开始创建表格...");

    const response = await fetch(
      `https://nocodb.alin.run/api/v2/meta/bases/${BASE_ID}/tables`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "xc-token": NOCODB_API_TOKEN,
        },
        body: JSON.stringify(tableSchema),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("API Response:", errorText);
      throw new Error(`Failed to create table: ${response.statusText}`);
    }

    const result = await response.json();
    console.log("表格创建成功！", result);

    return result;
  } catch (error) {
    console.error("创建表格失败:", error);
    throw error;
  }
};

// 执行创建表格
createTable();
