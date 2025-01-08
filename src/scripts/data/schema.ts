import { Column, TableSchema } from "@/scripts/types";

export const TABLE_NAME = "linkway-demo";

export const columns: Column[] = [
  {
    title: "id",
    description: "ID",
    uidt: "ID",
    rqd: true,
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
    title: "type",
    description: "类型",
    uidt: "SingleSelect",
    cdf: "video",
    colOptions: {
      options: [
        { title: "video" },
        { title: "article" },
        { title: "product" },
        { title: "shop" },
      ],
    },
  },
  {
    title: "tags",
    description: "标签",
    uidt: "MultiSelect",
    colOptions: {
      options: [
        { title: "React" },
        { title: "TypeScript" },
        { title: "前端开发" },
        { title: "JavaScript" },
        { title: "Vue" },
        { title: "Node.js" },
      ],
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
    cdf: "0",
  },
];

export const tableSchema: TableSchema = {
  table_name: TABLE_NAME,
  title: "Demo",
  columns,
  description: "这是一个示例数据表",
};
