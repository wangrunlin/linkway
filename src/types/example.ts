import {
  LinkWayResource,
  ProductMetadata,
  ArticleMetadata,
  ShopMetadata,
  VideoMetadata,
} from ".";

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
