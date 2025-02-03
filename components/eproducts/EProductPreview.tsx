"use client";

import { EProduct } from "@prisma/client";
import Image from "next/image";
import { useState } from "react";

function EProductPreview({
  EProduct,
  extraClassName,
}: {
  EProduct: EProduct;
  extraClassName?: string;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const imageClassName = extraClassName
    ? `${extraClassName} `
    : "flex items-center justify-center rounded w-full object-cover transform group-hover:scale-105 transition-transform duration-500";
  const { thumbnail, WMVideoLink } = EProduct;
  return (
    <div
      className="h-full w-full"
      onMouseEnter={() => {
        setIsHovered(true);
      }}
      onMouseLeave={() => {
        setIsHovered(false);
      }}
    >
      {isHovered ? (
        <iframe
          src={`https://player.vimeo.com/video/${WMVideoLink}?autoplay=1&muted=1&background=1&badge=0&amp;autopause=0`}
          allow="autoplay; loop;"
          onMouseLeave={() => {
            setIsHovered(false);
          }}
          className="rounded"
        ></iframe>
      ) : (
        <>
          {thumbnail != null && thumbnail.length > 0 && (
            <img
              src={thumbnail}
              alt={"name"}
              sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 33vw"
              //   className="w-full rounded object-cover"
              className={imageClassName}
            />
          )}{" "}
        </>
      )}
    </div>
  );
}

{
  /* <iframe
  src="https://player.vimeo.com/video/1018553050?autoplay=1&loop=1&muted=1&background=1"
  frameBorder="0"
  allow="autoplay; fullscreen; picture-in-picture"
  allowFullScreen
  className={`video ${isVideoReady ? "visible" : ""}`}
  title="Background Video"
></iframe>; */
}

export default EProductPreview;
