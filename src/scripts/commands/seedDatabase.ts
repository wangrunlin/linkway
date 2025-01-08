import { LinkWayResource } from "@/types";
import { sampleData } from "@/scripts/data/sample";
import { NOCODB_TABLE_ID } from "@/scripts/config/env";
import { makeRequest } from "@/scripts/utils/api";

async function createResource(resource: Partial<LinkWayResource>) {
  const formattedResource = {
    ...resource,
    tags: Array.isArray(resource.tags)
      ? resource.tags.join(",")
      : resource.tags,
  };

  return makeRequest(`/api/v2/tables/${NOCODB_TABLE_ID}/records`, {
    method: "POST",
    body: JSON.stringify(formattedResource),
  });
}

const seedDatabase = async () => {
  try {
    console.log("开始导入数据...");

    for (const resource of sampleData) {
      console.log(`正在创建资源: ${resource.title}`);
      await createResource(resource);
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
