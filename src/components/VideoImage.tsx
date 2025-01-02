"use client";

interface VideoImageProps {
  src: string;
  alt: string;
}

export default function VideoImage({ src, alt }: VideoImageProps) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      className="w-full h-48 object-cover"
      referrerPolicy="no-referrer"
      loading="lazy"
      onError={(e) => {
        const img = e.currentTarget;
        img.onerror = null;
        img.src = "/placeholder.png";
      }}
    />
  );
}
