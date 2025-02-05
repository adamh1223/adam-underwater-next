"use client";

import { EProduct } from "@prisma/client";
import { useState, useRef, useEffect } from "react";
import './EProductPreview.css'

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

  const { thumbnail, WMVideoLink } = EProduct;

  return (
    <div
      className=""
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isHovered ? (
        <div className="relative w-full h-0 pb-[56.25%]">
          {" "}
          {/* Aspect ratio for 16:9 */}
          <iframe
            src={`https://player.vimeo.com/video/${WMVideoLink}?autoplay=1&muted=1&background=1&badge=0&autopause=0`}
            allow="autoplay; loop;"
            style={{
              width: "100%",
              height: "100%",
              borderRadius: "10px",
              position: "absolute", // Absolute positioning to fill the container
              top: "0",
              left: "0",
              objectFit: "cover", // Ensures the video fills the container
              objectPosition: "center", // Centers the video within the iframe
            }}
            className="rounded"
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
              className="thumbnail-crop"
            />
          )}
        </>
      )}
    </div>
  );
}

export default EProductPreview;
