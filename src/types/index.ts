interface LinkWayResource {
  id: string; // 资源的唯一标识符，可以使用 UUID 生成
  type: string; // 资源类型，例如 "product"、"article"、"shop"、"video" 等
  title: string; // 资源标题
  description?: string; // 资源描述，可选
  url: string; // 资源链接
  thumbnail?: string; // 缩略图 URL，可选
  tags?: string[]; // 标签，用于分类和搜索
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  metadata?: Record<string, any>; // 元数据，用于存储特定类型资源的额外信息

  // 可选的通用属性，根据需要添加
  author?: string; // 作者/发布者
  datePublished?: string; // 发布日期，ISO 8601 格式
  dateModified?: string; // 修改日期，ISO 8601 格式
  rating?: number; // 评分
  reviewCount?: number; // 评论数
}

// 针对不同资源类型的元数据接口示例

interface ProductMetadata {
  price: number;
  currency: string;
  sku?: string;
  brand?: string;
  category?: string;
}

interface ArticleMetadata {
  keywords?: string[];
  wordCount?: number;
}

interface ShopMetadata {
  address?: string;
  contact?: string;
  openingHours?: string;
}

interface VideoMetadata {
  duration?: number;
  viewCount?: number;
}

// 使用示例

const product: LinkWayResource = {
  id: "product-123",
  type: "product",
  title: "Example Product",
  description: "A great product!",
  url: "https://example.com/product",
  thumbnail: "https://example.com/product.jpg",
  tags: ["electronics", "gadget"],
  metadata: {
    price: 99.99,
    currency: "USD",
    brand: "Example Brand",
  } as ProductMetadata, // 类型断言
};

const article: LinkWayResource = {
  id: "article-456",
  type: "article",
  title: "Example Article",
  url: "https://example.com/article",
  tags: ["technology", "news"],
  metadata: {
    keywords: ["example", "article"],
    wordCount: 1500,
  } as ArticleMetadata, // 类型断言
};

const shop: LinkWayResource = {
  id: "shop-789",
  type: "shop",
  title: "Example Shop",
  url: "https://example.com/shop",
  metadata: {
    address: "Example Address",
    contact: "123-456-7890",
    openingHours: "9am - 5pm",
  } as ShopMetadata,
};

const video: LinkWayResource = {
  id: "video-001",
  type: "video",
  title: "Example Video",
  url: "https://example.com/video",
  metadata: {
    duration: 120,
    viewCount: 10000,
  } as VideoMetadata,
};

// 类型守卫函数，用于判断资源的具体类型
function isProduct(
  resource: LinkWayResource
): resource is LinkWayResource & { metadata: ProductMetadata } {
  return resource.type === "product";
}

function isArticle(
  resource: LinkWayResource
): resource is LinkWayResource & { metadata: ArticleMetadata } {
  return resource.type === "article";
}

function isShop(
  resource: LinkWayResource
): resource is LinkWayResource & { metadata: ShopMetadata } {
  return resource.type === "shop";
}

function isVideo(
  resource: LinkWayResource
): resource is LinkWayResource & { metadata: VideoMetadata } {
  return resource.type === "video";
}

// 使用类型守卫函数的示例
if (isProduct(product)) {
  console.log(`Product Price: ${product.metadata.price}`);
}

if (isArticle(article)) {
  console.log(`Article Word Count: ${article.metadata.wordCount}`);
}

if (isShop(shop)) {
  console.log(`Shop Address: ${shop.metadata.address}`);
}

if (isVideo(video)) {
  console.log(`Video duration: ${video.metadata.viewCount}`);
}
