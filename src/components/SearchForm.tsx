"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { useDebouncedCallback } from "use-debounce";
import { updateSearchHistory } from "@/lib/searchHistory";

interface SearchFormProps {
  defaultValue?: string;
}

export function SearchForm({ defaultValue = "" }: SearchFormProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(defaultValue);

  const executeSearch = useCallback(
    (searchQuery: string) => {
      const params = new URLSearchParams(searchParams.toString());

      if (searchQuery) {
        params.set("q", searchQuery);
      } else {
        params.delete("q");
      }

      // Reset to page 1 when searching
      params.delete("page");

      router.push(`/search?${params.toString()}`);
      updateSearchHistory(query.trim());
    },
    [router, searchParams, query]
  );

  // 使用防抖处理搜索，300ms 延迟
  const debouncedSearch = useDebouncedCallback(executeSearch, 300);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (!query.trim()) return;
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    },
    [query, router]
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newQuery = e.target.value;
      setQuery(newQuery);
      debouncedSearch(newQuery);
    },
    [debouncedSearch]
  );

  const handleBlur = useCallback(() => {
    if (query.trim()) {
      executeSearch(query);
    }
  }, [query, executeSearch]);

  // 组件卸载时执行未完成的搜索
  useEffect(() => {
    return () => {
      debouncedSearch.flush();
    };
  }, [debouncedSearch]);

  return (
    <form onSubmit={handleSubmit} className="relative">
      <Input
        type="search"
        placeholder="Search videos..."
        className="w-full"
        value={query}
        onChange={handleChange}
        onBlur={handleBlur}
      />
    </form>
  );
}
