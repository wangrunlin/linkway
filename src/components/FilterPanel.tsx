"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useRouter, useSearchParams } from "next/navigation";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

interface FilterCategory {
  type: string[];
  tags: string[];
  duration: string[];
}

interface SelectedFilters {
  type?: string[];
  tags?: string[];
  duration?: string[];
}

interface FilterPanelProps {
  filters: FilterCategory;
  selected: SelectedFilters;
  className?: string;
}

export function FilterPanel({
  filters,
  selected,
  className,
}: FilterPanelProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleFilterChange = (
    category: keyof FilterCategory,
    value: string
  ) => {
    const params = new URLSearchParams(searchParams.toString());
    const currentValues = params.getAll(category);

    // Remove value if already selected
    if (currentValues.includes(value)) {
      params.delete(category);
      currentValues
        .filter((v) => v !== value)
        .forEach((v) => params.append(category, v));
    } else {
      // Add new value
      params.append(category, value);
    }

    // Preserve existing search query and page
    const query = params.toString();
    const baseUrl = "/search";
    router.push(`${baseUrl}${query ? `?${query}` : ""}`);
  };

  const FilterSection = ({
    title,
    category,
    items,
  }: {
    title: string;
    category: keyof FilterCategory;
    items: string[];
  }) => (
    <div className="py-4">
      <h3 className="text-sm font-medium text-foreground/70 mb-3">{title}</h3>
      <div className="space-y-3">
        {items.map((item) => (
          <div key={item} className="flex items-center space-x-2">
            <Checkbox
              id={`${category}-${item}`}
              checked={selected[category]?.includes(item)}
              onCheckedChange={() => handleFilterChange(category, item)}
              className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
            />
            <Label
              htmlFor={`${category}-${item}`}
              className="text-sm font-normal leading-none peer-disabled:cursor-not-allowed 
                peer-disabled:opacity-70 select-none cursor-pointer"
            >
              {item}
            </Label>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className={cn("w-full", className)}>
      <ScrollArea className="h-[calc(100vh-12rem)]">
        <div className="pr-4">
          <FilterSection title="类型" category="type" items={filters.type} />
          <Separator className="my-1" />
          <FilterSection title="标签" category="tags" items={filters.tags} />
          <Separator className="my-1" />
          <FilterSection
            title="时长"
            category="duration"
            items={filters.duration}
          />
        </div>
      </ScrollArea>
    </div>
  );
}
