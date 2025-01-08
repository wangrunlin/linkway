import { config } from "dotenv";
import { resolve } from "path";
import fetch from "node-fetch";
import type { LinkWayResource } from "@/types";

// 加载 .env.local 文件
config({ path: resolve(process.cwd(), ".env.local") });

const NOCODB_API_TOKEN = process.env.NOCODB_API_TOKEN;
const NOCODB_TABLE_ID = process.env.NOCODB_TABLE_ID;

if (!NOCODB_API_TOKEN) {
  throw new Error("NOCODB_API_TOKEN is not set in .env.local");
}

if (!NOCODB_TABLE_ID) {
  throw new Error("NOCODB_TABLE_ID is not set in .env.local");
}

const sampleData: Partial<LinkWayResource>[] = [
  {
    title: "React Hooks 完整指南",
    description: "深入讲解 React Hooks 的使用方法和最佳实践",
    url: "https://example.com/react-hooks",
    type: "video",
    tags: ["React", "Hooks", "前端开发"],
    duration: 1800, // 30分钟
    author: "张三",
    datePublished: new Date("2024-01-15").toISOString(),
  },
  {
    title: "TypeScript 高级特性详解",
    description: "探索 TypeScript 的高级类型系统和实践应用",
    url: "https://example.com/typescript-advanced",
    type: "video",
    tags: ["TypeScript", "前端开发"],
    duration: 2400, // 40分钟
    author: "李四",
    datePublished: new Date("2024-02-01").toISOString(),
  },
];

async function createResource(resource: Partial<LinkWayResource>) {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "xc-token": NOCODB_API_TOKEN!,
    },
    body: JSON.stringify(resource),
    timeout: 10000, // 10 秒超时
  };

  let retries = 3;
  while (retries > 0) {
    try {
      const response = await fetch(
        `https://nocodb.alin.run/api/v2/tables/${NOCODB_TABLE_ID}/records`,
        options
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error("API Response:", errorText);
        throw new Error(`Failed to create resource: ${response.statusText}`);
      }

      return response.json();
    } catch (error) {
      retries--;
      if (retries === 0) {
        throw error;
      }
      console.log(`请求失败，剩余重试次数: ${retries}`);
      // 等待 2 秒后重试
      await new Promise((resolve) => setTimeout(resolve, 2000));
    }
  }
}

const seedDatabase = async () => {
  try {
    console.log("开始导入数据...");

    for (const resource of sampleData) {
      console.log(`正在创建资源: ${resource.title}`);
      await createResource(resource);
      // 每次创建后等待 1 秒，避免请求过快
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }

    console.log("数据导入完成！");
  } catch (error) {
    console.error("数据导入失败:", error);
    throw error;
  }
};

// 执行脚本
seedDatabase();
