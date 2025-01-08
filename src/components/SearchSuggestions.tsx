"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const SUGGESTIONS = [
  "React",
  "TypeScript",
  "Next.js",
  "Web",
  "前端",
  "JavaScript",
];

export function SearchSuggestions() {
  const router = useRouter();

  const handleSuggestionClick = (suggestion: string) => {
    router.push(`/search?q=${encodeURIComponent(suggestion)}`);
  };

  return (
    <div className="mt-6">
      <h3 className="text-sm font-medium text-gray-500 mb-2">热门搜索</h3>
      <div className="flex flex-wrap gap-2">
        {SUGGESTIONS.map((suggestion) => (
          <Button
            key={suggestion}
            variant="outline"
            size="sm"
            onClick={() => handleSuggestionClick(suggestion)}
          >
            {suggestion}
          </Button>
        ))}
      </div>
    </div>
  );
}
