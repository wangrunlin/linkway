import { LinkWayResource } from "@/types";
import VideoImage from "./VideoImage";
import { CalendarDays, Eye } from "lucide-react";

export const VideoCard = ({
  id,
  title,
  thumbnail,
  datePublished,
  url,
  viewCount,
}: LinkWayResource) => (
  <div
    key={id}
    className="group bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-[1.02]"
  >
    <div className="relative aspect-video overflow-hidden">
      {thumbnail && (
        <VideoImage
          src={thumbnail}
          alt={title}
          className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
        />
      )}
    </div>

    <div className="p-5 space-y-4">
      <h3 className="text-lg font-medium leading-tight line-clamp-2 text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
        {title}
      </h3>

      <div className="flex flex-col gap-2 text-sm text-gray-600 dark:text-gray-400">
        {datePublished && (
          <div className="flex items-center gap-2">
            <CalendarDays className="w-4 h-4" />
            <span>{new Date(datePublished).toLocaleDateString()}</span>
          </div>
        )}
        {viewCount && (
          <div className="flex items-center gap-2">
            <Eye className="w-4 h-4" />
            <span>{viewCount} 次观看</span>
          </div>
        )}
      </div>

      <a
        href={`https:${url}`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center w-full px-4 py-2.5 font-medium text-white bg-blue-500 dark:bg-blue-600 rounded-lg hover:bg-blue-600 dark:hover:bg-blue-700 transition-all duration-200 hover:shadow-md"
      >
        观看视频
      </a>
    </div>
  </div>
);
