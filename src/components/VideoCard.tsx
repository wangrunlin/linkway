import { LinkWayResource, VideoMetadata } from "@/types";
import VideoImage from "./VideoImage";

export const VideoCard = ({
  id,
  title,
  thumbnail,
  datePublished,
  url,
  metadata: metadataString,
}: LinkWayResource) => {
  let viewCount = "N/A";
  try {
    const metadata: VideoMetadata = JSON.parse(metadataString as string);
    viewCount = metadata?.viewCount?.toLocaleString() || viewCount;
  } catch {
    console.error("Invalid JSON in metadata:", metadataString);
  }

  return (
    <div
      key={id}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden"
    >
      {thumbnail && <VideoImage src={thumbnail} alt={title} />}
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100">
          {title}
        </h3>
        <div className="text-sm text-gray-600 dark:text-gray-400">
          {datePublished && (
            <p>发布日期: {new Date(datePublished).toLocaleDateString()}</p>
          )}
          {viewCount && <p>观看次数: {viewCount}</p>}
        </div>
        <a
          href={`https:${url}`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-block bg-blue-500 dark:bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-600 dark:hover:bg-blue-700 transition-colors"
        >
          观看视频
        </a>
      </div>
    </div>
  );
};
