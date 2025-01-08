export type Params = {
  page?: number;
  query?: string;
  sort?: string;
};

export type ApiResponse = {
  list: LinkWayResource[];
  pageInfo?: {
    pageSize: number;
    totalRows: number;
    isFirstPage: boolean;
    isLastPage: boolean;
    page: number;
  };
};

export interface LinkWayResource {
  id: string; // 资源的唯一标识符，可以使用 UUID 生成
  type: string; // 资源类型，例如 "product"、"article"、"shop"、"video" 等
  title: string; // 资源标题
  description?: string; // 资源描述，可选
  url: string; // 资源链接
  thumbnail?: string; // 缩略图 URL，可选
  order?: number; // 排序权重，数字越小越靠前
  tags?: string[]; // 标签，用于分类和搜索
  metadata?: JSON; // 元数据，用于存储特定类型资源的额外信息

  // 可选的通用属性，根据需要添加
  author?: string; // 作者/发布者
  datePublished?: string; // 发布日期，ISO 8601 格式
  dateModified?: string; // 修改日期，ISO 8601 格式
  rating?: number; // 评分
  reviewCount?: number; // 评论数

  // 针对不同资源类型的元数据接口示例
  // export interface VideoMetadata {
  duration?: number;
  viewCount?: number;
  // }

  // export interface ProductMetadata {
  price: number;
  currency: string;
  sku?: string;
  brand?: string;
  category?: string;
  // }

  // export interface ArticleMetadata {
  keywords?: string[];
  wordCount?: number;
  // }

  // export interface ShopMetadata {
  address?: string;
  contact?: string;
  openingHours?: string;
  // }
}
