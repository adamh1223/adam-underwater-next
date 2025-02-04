"use client";

import { EProduct } from "@prisma/client";
import { useState, useRef, useEffect } from "react";

function EProductPreview({
  EProduct,
  extraClassName,
}: {
  EProduct: EProduct;
  extraClassName?: string;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [thumbnailSize, setThumbnailSize] = useState({ width: 0, height: 0 });
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (imgRef.current) {
      setThumbnailSize({
        width: imgRef.current.clientWidth,
        height: imgRef.current.clientHeight,
      });
    }
  }, [isHovered]);

  const imageClassName = extraClassName
    ? `${extraClassName} `
    : "flex items-center justify-center rounded w-full object-cover transform group-hover:scale-105 transition-transform duration-500 aspect-video";

  const { thumbnail, WMVideoLink } = EProduct;

  return (
    <div
      className="h-full w-full rounded overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isHovered ? (
        <div className="w-full h-full rounded overflow-hidden">
          <iframe
            src={`https://player.vimeo.com/video/${WMVideoLink}?autoplay=1&muted=1&background=1&badge=0&autopause=0`}
            allow="autoplay; loop;"
            style={{
              width: thumbnailSize.width,
              height: thumbnailSize.height,
              borderRadius: "12px",
            }}
            className="w-full h-full object-cover rounded"
          ></iframe>
        </div>
      ) : (
        <>
          {thumbnail && thumbnail.length > 0 && (
            <img
              ref={imgRef}
              src={thumbnail}
              alt="name"
              sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 33vw"
              className={imageClassName}
            />
          )}
        </>
      )}
    </div>
  );
}

export default EProductPreview;
