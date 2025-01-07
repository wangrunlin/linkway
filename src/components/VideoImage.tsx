"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

interface VideoImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
}

export default function VideoImage({
  src,
  alt,
  className,
  ...props
}: VideoImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  return (
    <div className="relative w-full h-full">
      {/* 加载动画 */}
      {isLoading && (
        <div className="absolute inset-0 bg-gray-100 dark:bg-gray-700 animate-pulse" />
      )}

      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={hasError ? "/placeholder.png" : src}
        alt={alt}
        className={cn(
          "w-full h-full transition-opacity duration-300",
          isLoading ? "opacity-0" : "opacity-100",
          className
        )}
        referrerPolicy="no-referrer"
        loading="lazy"
        onLoad={() => setIsLoading(false)}
        onError={(e) => {
          const img = e.currentTarget;
          img.onerror = null;
          setHasError(true);
          setIsLoading(false);
        }}
        {...props}
      />
    </div>
  );
}
