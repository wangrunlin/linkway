import { Pagination } from "@/components/Pagination";
import { VideoCard } from "@/components/VideoCard";
import { getVideoData } from "@/lib/getVideoData";
import { SearchForm } from "@/components/SearchForm";
import { SortSelect } from "@/components/SortSelect";
import { SearchHistory } from "@/components/SearchHistory";
import { SearchSuggestions } from "@/components/SearchSuggestions";
import { FilterPanel } from "@/components/FilterPanel";
import { siteName, baseURL } from "@/config";
import { ResolvingMetadata, Metadata } from "next";

type Props = {
  params: Promise<Record<string, string>>;
  searchParams: Promise<{
    q?: string;
    page?: string;
    sort?: string;
    [key: string]: string | undefined;
  }>;
};

export async function generateMetadata(
  { searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const params = await searchParams;
  console.log({ params });

  const query = params?.q || "";
  const page = params?.page || "1";
  const sort = params?.sort || "";

  // 从父级元数据获取现有信息
  const previousMetadata = await parent;
  const previousRobots = previousMetadata.robots || {};

  return {
    title: query
      ? `Search results for "${query}" | ${siteName}`
      : `Search | ${siteName}`,
    description: `Search results for ${
      query || "all content"
    } on ${siteName}. Page ${page}. ${
      sort ? `Sort by ${sort.replace("-", " ")}.` : ""
    }`,
    alternates: {
      canonical: `${baseURL}/search${query ? `?q=${query}` : ""}`,
    },
    robots: {
      ...previousRobots, // 继承父级的robots设置
      index: true,
      follow: true,
    },
  };
}

const FILTER_DATA = {
  type: ["视频", "文章", "播客"],
  tags: ["技术", "设计", "营销", "教育", "娱乐", "游戏"],
  duration: ["0-30分钟", "30-60分钟", "60分钟以上"],
};

export default async function Search({
  searchParams,
}: {
  searchParams: Promise<{
    page?: string;
    q?: string;
    sort?: string;
    type?: string[];
    tags?: string[];
    duration?: string[];
  }>;
}) {
  const params = await searchParams;
  const currentPage = Number(params.page) || 1;
  const query = params.q || "";
  const sort = params.sort || "";

  const selectedFilters = {
    type: Array.isArray(params.type)
      ? params.type
      : params.type
      ? [params.type]
      : [],
    tags: Array.isArray(params.tags)
      ? params.tags
      : params.tags
      ? [params.tags]
      : [],
    duration: Array.isArray(params.duration)
      ? params.duration
      : params.duration
      ? [params.duration]
      : [],
  };

  const { list, totalPages } = await getVideoData({
    page: currentPage,
    query: params.q,
    sort,
    ...selectedFilters,
  });

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="text-center mb-8 lg:mb-12">
        <h1 className="text-3xl lg:text-4xl font-bold mb-4 dark:text-gray-100">
          Search Videos
        </h1>
        <div className="relative max-w-2xl mx-auto">
          <SearchForm defaultValue={query} />
          <div className="mt-4">
            <SearchHistory />
            <SearchSuggestions />
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
        {/* Filters Sidebar - Now collapsible on mobile */}
        <aside className="w-full lg:w-64 lg:flex-shrink-0 order-2 lg:order-1">
          <div className="lg:sticky lg:top-4">
            <FilterPanel
              filters={FILTER_DATA}
              selected={selectedFilters}
              className="bg-card rounded-lg border p-4"
            />
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1 order-1 lg:order-2">
          {list.length > 0 ? (
            <>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <p className="text-muted-foreground">
                  {list.length} results found
                </p>
                <SortSelect defaultValue={sort} />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6">
                {list.map((video) => (
                  <VideoCard key={video.id} {...video} />
                ))}
              </div>

              <div className="mt-8">
                <Pagination currentPage={currentPage} totalPages={totalPages} />
              </div>
            </>
          ) : (
            <div className="text-center py-8 lg:py-12">
              <p className="text-lg text-muted-foreground">
                No videos found. Try adjusting your filters or search term.
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
