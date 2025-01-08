import { Column, TableSchema } from "@/scripts/types";
import { sampleData } from "@/scripts/data/sample";
import type { LinkWayResource } from "@/types";

export const TABLE_NAME = "linkway-demo";

export const columns: Column[] = [
  {
    title: "id",
    description: "ID",
    uidt: "ID",
    rqd: true,
  },
  {
    title: "order",
    description: "排序",
    uidt: "Number",
  },
  {
    title: "title",
    description: "标题",
    uidt: "SingleLineText",
    rqd: true,
  },
  {
    title: "description",
    description: "描述",
    uidt: "LongText",
  },
  {
    title: "url",
    description: "链接",
    uidt: "URL",
    rqd: true,
  },
  {
    title: "thumbnail",
    description: "缩略图",
    uidt: "URL",
  },
  {
    title: "type",
    description: "类型",
    uidt: "SingleSelect",
    cdf: "video",
    colOptions: {
      options: Array.from(
        new Set(
          sampleData
            .map((item: Partial<LinkWayResource>) => item.type)
            .filter((type): type is string => type !== undefined)
        )
      ).map((type) => ({
        title: type,
      })),
    },
  },
  {
    title: "tags",
    description: "标签",
    uidt: "MultiSelect",
    colOptions: {
      options: Array.from(
        new Set(
          sampleData
            .flatMap((item: Partial<LinkWayResource>) => item.tags ?? [])
            .filter((tag): tag is string => tag !== undefined)
        )
      ).map((tag) => ({
        title: tag,
      })),
    },
  },
  {
    title: "duration",
    description: "时长(秒)",
    uidt: "Number",
  },
  {
    title: "author",
    description: "作者",
    uidt: "SingleLineText",
  },
  {
    title: "datePublished",
    description: "发布日期",
    uidt: "DateTime",
  },
  {
    title: "viewCount",
    description: "浏览量",
    uidt: "Number",
  },
];

export const tableSchema: TableSchema = {
  table_name: TABLE_NAME,
  title: "Demo",
  columns,
  description: "这是一个示例数据表",
};
