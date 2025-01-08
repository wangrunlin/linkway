// reference: https://meta-apis-v2.nocodb.com/#tag/Tables/operation/db-table-create

import { BASE_ID } from "@/scripts/config/env";
import { tableSchema } from "@/scripts/data/schema";
import { makeRequest } from "@/scripts/utils/api";

const createTable = async () => {
  try {
    console.log("开始创建表格...");

    const result = await makeRequest(`/api/v2/meta/bases/${BASE_ID}/tables`, {
      method: "POST",
      body: JSON.stringify(tableSchema),
    });

    console.log("表格创建成功！", result);
    return result;
  } catch (error) {
    console.error("创建表格失败:", error);
    throw error;
  }
};

// 执行创建表格
createTable();
