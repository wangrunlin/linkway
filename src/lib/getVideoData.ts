import { getList } from "@/api/nocodb";
import { ITEMS_PER_PAGE } from "@/config";
import { VideoMetadata } from "@/types";

export async function getVideoData(page: number = 1) {
  const data = await getList<VideoMetadata>(page);
  const { list, pageInfo } = data;

  const totalRows = pageInfo?.totalRows || list.length;
  const totalPages = Math.max(1, Math.ceil(totalRows / ITEMS_PER_PAGE));

  return {
    list,
    totalRows,
    totalPages,
    currentPage: page,
  };
}
