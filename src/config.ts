export const siteName = process.env.NEXT_PUBLIC_SITE_NAME || "Link Way";

export const title =
  process.env.NEXT_PUBLIC_TITLE || "Link Way - 连接无限可能的智能导航平台";

export const description =
  process.env.NEXT_PUBLIC_DESCRIPTION ||
  "Link Way 是一款基于先进多维表格数据库构建的创新型网络资源导航平台，旨在为内容创作者、电商从业者以及广大网络用户提供简洁、高效、智能的导航体验。我们突破传统导航方式，创新性地将 AI 大模型的能力融入到信息检索和组织中，为用户提供更加智能、个性化的信息发现和连接方式。";

// Last baseURL
const defaultBaseURL = "https://linkway.site";

// Vercel baseURL, make sure it's a valid URL
const VERCEL_URL =
  process.env.NEXT_PUBLIC_VERCEL_URL &&
  `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;

// meta base url
export const baseURL =
  process.env.NEXT_PUBLIC_URL ||
  VERCEL_URL ||
  (globalThis.location && globalThis.location.origin) ||
  defaultBaseURL;

export const ITEMS_PER_PAGE = Number(process.env.ITEMS_PER_PAGE) || 24;

export const NOCODB_API_TOKEN = process.env.NOCODB_API_TOKEN!;
export const NOCODB_TABLE_ID = process.env.NOCODB_TABLE_ID!;

if (!NOCODB_API_TOKEN || !NOCODB_TABLE_ID) {
  throw new Error("NOCODB_API_TOKEN or NOCODB_TABLE_ID is not set");
}
