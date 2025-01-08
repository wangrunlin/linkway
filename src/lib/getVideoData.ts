import { getList } from "@/api/nocodb";
import { PAGE_SIZE } from "@/config";
import { Params } from "@/types";

interface GetVideoDataParams {
  type?: string[];
  tags?: string[];
  duration?: string[];
}

export async function getVideoData({
  page = 1,
  query,
  sort,
  // type,
  // tags,
  // duration,
}: Params & GetVideoDataParams = {}) {
  const data = await getList({ page, query, sort });
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
