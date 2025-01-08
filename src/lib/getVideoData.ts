import { getList } from "@/api/nocodb";
import { PAGE_SIZE } from "@/config";
import { Params } from "@/types";

export async function getVideoData({ page = 1, query, sort }: Params = {}) {
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
