"use client";

import { VideoRecord } from "@/types/video";
import { getTableRecordsWithIterator } from "@/services/lark";
import { useEffect, useState } from "react";
import VideoImage from "@/components/VideoImage";

function VideoList() {
  const [videos, setVideos] = useState<VideoRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const loadVideos = async () => {
    if (loading) return;

    setLoading(true);
    const newVideos: VideoRecord[] = [];

    try {
      for await (const item of getTableRecordsWithIterator(
        "ASAsbUmNdau5ECsGhlmuqZZtsBd",
        "tblPbewcVhtk45fD",
        200, // 每页显示100个视频
        1 // 每次只加载1页
      )) {
        newVideos.push(item as VideoRecord);
      }

      if (newVideos.length === 0) {
        setHasMore(false);
      } else {
        setVideos((prev) => [...prev, ...newVideos]);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadVideos();
  }, []);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {videos.map((video) => {
          let viewCount = "N/A";
          try {
            const metadata = JSON.parse(video.fields.metadata);
            viewCount = metadata.viewCount.toLocaleString();
          } catch {
            console.error("Invalid JSON in metadata:", video.fields.metadata);
          }

          return (
            <div
              key={video.id}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <VideoImage
                src={video.fields.thumbnail}
                alt={video.fields.title}
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">
                  {video.fields.title}
                </h3>
                <div className="text-sm text-gray-600">
                  <p>
                    发布日期:{" "}
                    {new Date(video.fields.datePublished).toLocaleDateString()}
                  </p>
                  <p>观看次数: {viewCount}</p>
                </div>
                <a
                  href={`https:${video.fields.url}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
                >
                  观看视频
                </a>
              </div>
            </div>
          );
        })}
      </div>

      {hasMore && (
        <div className="flex justify-center py-4">
          <button
            onClick={loadVideos}
            disabled={loading}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-400"
          >
            {loading ? "加载中..." : "加载更多"}
          </button>
        </div>
      )}
    </div>
  );
}

export default function FreeCodeCampVideo() {
  return (
    <div className="container mx-auto p-4">
      <VideoList />
    </div>
  );
}
