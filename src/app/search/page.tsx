import { Pagination } from "@/components/Pagination";
import { VideoCard } from "@/components/VideoCard";
import { ITEMS_PER_PAGE } from "@/config";
import { getVideoData } from "@/lib/getVideoData";

export default async function Search({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const params = await searchParams;
  const currentPage = Number(params.page) || 1;
  const { list, totalRows, totalPages } = await getVideoData(currentPage);

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 dark:text-gray-100">Search</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Search
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
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
