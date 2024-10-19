"use client";

import React, { useRef, useState } from "react";
import styled from "styled-components";
import { Play } from "phosphor-react";
import ReactPlayer from "react-player/lazy";
import { Button } from "../ui/button";

export default function VideoPlayer() {
  const playerRef = useRef();

  return (
    <div>
      <ReactPlayer
        id="MyId"
        width="100%"
        height="100%"
        controls
        playing
        light="img/main-page/image.webp"
        playIcon={
          <Button
            style={{
              maxWidth: 361,
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: 10,
            }}
          >
            <Play weight="fill" color="--ifm-text-black" size={24} />
          </Button>
        }
        url="https://vimeo.com/1018553050?share=copy"
      ></ReactPlayer>
    </div>
  );
}
