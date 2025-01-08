"use client";

export const MAX_HISTORY_ITEMS = 10;

// 创建自定义事件名称
export const SEARCH_HISTORY_UPDATED = "searchHistoryUpdated";

// 导出更新历史记录的辅助函数
export function updateSearchHistory(query: string) {
  if (query === "") {
    return;
  }

  try {
    const searchHistory = localStorage.getItem("searchHistory");
    let history: string[] = searchHistory ? JSON.parse(searchHistory) : [];

    // 确保 history 是数组
    if (!Array.isArray(history)) {
      history = [];
    }

    // 移除重复项并将新查询添加到开头
    history = [query, ...history.filter((item) => item !== query)].slice(
      0,
      MAX_HISTORY_ITEMS
    );

    localStorage.setItem("searchHistory", JSON.stringify(history));

    // 触发自定义事件
    window.dispatchEvent(new Event(SEARCH_HISTORY_UPDATED));
  } catch (error) {
    console.error("Failed to update search history:", error);
  }
}
