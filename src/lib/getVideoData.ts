import { getList } from "@/api/nocodb";
import { PAGE_SIZE } from "@/config";
import { Params, VideoMetadata } from "@/types";

export async function getVideoData({ page = 1, query }: Params = {}) {
  const data = await getList<VideoMetadata>({ page, query });
  const { list, pageInfo } = data;

  const totalRows = pageInfo?.totalRows || list.length;
  const totalPages = Math.max(1, Math.ceil(totalRows / PAGE_SIZE));

  return {
    list,
    totalRows,
    totalPages,
    currentPage: page,
  };
}
