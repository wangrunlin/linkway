import { getList } from "@/api/nocodb";
import { Pagination } from "@/components/Pagination";
import { VideoCard } from "@/components/VideoCard";
import { ITEMS_PER_PAGE } from "@/config";
import { VideoMetadata } from "@/types";

export default async function freeCodeCampVideo({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const params = await searchParams;
  const currentPage = Number(params.page) || 1;
  const data = await getList<VideoMetadata>(currentPage);
  const { list, pageInfo } = data;

  const totalRows = pageInfo?.totalRows || list.length;
  const totalPages = Math.max(1, Math.ceil(totalRows / ITEMS_PER_PAGE));

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 dark:text-gray-100">
          FreeCodeCamp Video
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          FreeCodeCamp Bilibili Video
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {list.map((video) => (
          <VideoCard key={video.Id} {...video} />
        ))}
      </div>

      {list.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={totalRows}
          pageSize={ITEMS_PER_PAGE}
        />
      )}
    </main>
  );
}
