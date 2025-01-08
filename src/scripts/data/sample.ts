import { LinkWayResource } from "@/types";

export const sampleData: Partial<LinkWayResource>[] = [
  {
    title: "React Hooks 完整指南",
    description: "深入讲解 React Hooks 的使用方法和最佳实践",
    url: "https://example.com/react-hooks",
    type: "video",
    tags: ["React", "前端开发"],
    duration: 1800,
    author: "张三",
    datePublished: new Date("2024-01-15").toISOString(),
  },
  {
    title: "TypeScript 高级特性详解",
    description: "探索 TypeScript 的高级类型系统和实践应用",
    url: "https://example.com/typescript-advanced",
    type: "video",
    tags: ["TypeScript", "前端开发"],
    duration: 2400,
    author: "李四",
    datePublished: new Date("2024-02-01").toISOString(),
  },
];
