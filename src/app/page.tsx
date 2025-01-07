import { VideoCard } from "@/components/VideoCard";
import { getVideoData } from "@/lib/getVideoData";
import Link from "next/link";

export default async function Home() {
  const { list } = await getVideoData(1);

  return (
    <div className="py-8">
      <div className="text-center mb-16">
        <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          首页
        </h1>
      </div>

      <section className="mb-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
            最新视频
          </h2>
          <Link
            href="/search"
            className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 transition-colors"
          >
            查看全部 →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {list.slice(0, 6).map((video) => (
            <VideoCard key={video.Id} {...video} />
          ))}
        </div>
      </section>

      <div className="mt-12 text-center">
        <Link
          href="/search"
          className="inline-flex items-center px-8 py-4 text-base font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
        >
          浏览更多视频
          <svg
            className="ml-2 w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </Link>
      </div>
    </div>
  );
}
