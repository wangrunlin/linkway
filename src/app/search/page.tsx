import { Pagination } from "@/components/Pagination";
import { VideoCard } from "@/components/VideoCard";
import { getVideoData } from "@/lib/getVideoData";
import { SearchForm } from "@/components/SearchForm";

export default async function Search({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; q?: string }>;
}) {
  const params = await searchParams;
  const currentPage = Number(params.page) || 1;
  const query = params.q || "";
  const { list, totalPages } = await getVideoData({
    page: currentPage,
    query: params.q,
  });

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 dark:text-gray-100">
          Search Videos
        </h1>
        <div className="max-w-2xl mx-auto">
          <SearchForm defaultValue={query} />
        </div>
      </div>

      {list.length > 0 ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {list.map((video) => (
              <VideoCard key={video.Id} {...video} />
            ))}
          </div>

          <Pagination currentPage={currentPage} totalPages={totalPages} />
        </>
      ) : (
        <p className="text-center text-gray-600 dark:text-gray-400">
          No videos found. Try a different search term.
        </p>
      )}
    </main>
  );
}
