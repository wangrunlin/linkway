"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface VideoImageProps
  extends Omit<React.ComponentProps<typeof Image>, "src" | "alt" | "fill"> {
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
      {isLoading && (
        <div className="absolute inset-0 bg-gray-100 dark:bg-gray-700 animate-pulse" />
      )}

      <Image
        src={hasError ? "/placeholder.png" : src}
        alt={alt}
        className={cn(
          "object-cover transition-opacity duration-300",
          isLoading ? "opacity-0" : "opacity-100",
          className
        )}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        referrerPolicy="no-referrer"
        priority={false}
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setHasError(true);
          setIsLoading(false);
        }}
        {...props}
      />
    </div>
  );
}
