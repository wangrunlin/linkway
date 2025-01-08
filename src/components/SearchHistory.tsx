"use client";

import { Button } from "@/components/ui/button";
import { MAX_HISTORY_ITEMS, SEARCH_HISTORY_UPDATED } from "@/lib/searchHistory";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function SearchHistory() {
  const router = useRouter();
  const [history, setHistory] = useState<string[]>([]);

  // 加载历史记录
  const loadHistory = () => {
    try {
      const searchHistory = localStorage.getItem("searchHistory");
      if (searchHistory) {
        const parsedHistory = JSON.parse(searchHistory);
        setHistory(Array.isArray(parsedHistory) ? parsedHistory : []);
      }
    } catch (error) {
      console.error("Failed to load search history:", error);
      setHistory([]);
    }
  };

  useEffect(() => {
    // 初始加载
    loadHistory();

    // 监听历史记录更新事件
    const handleHistoryUpdate = () => {
      loadHistory();
    };

    window.addEventListener(SEARCH_HISTORY_UPDATED, handleHistoryUpdate);

    // 清理事件监听
    return () => {
      window.removeEventListener(SEARCH_HISTORY_UPDATED, handleHistoryUpdate);
    };
  }, []);

  const handleHistoryClick = (query: string) => {
    router.push(`/search?q=${encodeURIComponent(query)}`);
  };

  const clearHistory = () => {
    try {
      localStorage.removeItem("searchHistory");
      setHistory([]);
    } catch (error) {
      console.error("Failed to clear search history:", error);
    }
  };

  if (history.length === 0) {
    return null;
  }

  return (
    <div className="mt-4 text-left">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-medium text-muted-foreground">搜索历史</h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={clearHistory}
          className="text-xs text-muted-foreground hover:text-foreground"
        >
          清除历史
        </Button>
      </div>
      <div className="flex flex-wrap gap-2">
        {history.slice(0, MAX_HISTORY_ITEMS).map((query, index) => (
          <Button
            key={index}
            variant="outline"
            size="sm"
            onClick={() => handleHistoryClick(query)}
            className="hover:bg-muted"
          >
            {query}
          </Button>
        ))}
      </div>
    </div>
  );
}
