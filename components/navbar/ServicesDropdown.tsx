"use client";

import React from "react";
import { useState, useRef } from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import Submenu from "./Submenu";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { useRouter } from "next/navigation";

function ServicesDropdown() {
  const router = useRouter();
  const [showLinks, setShowLinks] = useState(false);
  const [submenuVisible, setSubmenuVisible] = useState(false);
  const linksContainerRef = useRef(null);
  const linksRef = useRef(null);
  const handleServicesClick = () => {
    router.push("/services");
  };
  const handleSubservicesClick = (section: string) => {
    router.push(`/services#${section}`);
  };
  return (
    <HoverCard openDelay={100} closeDelay={100}>
      <HoverCardTrigger>
        <Button variant="link" onClick={handleServicesClick}>
          Services
        </Button>
      </HoverCardTrigger>

      <HoverCardContent className="w-48">
        <Button variant="ghost" onClick={() => handleSubservicesClick("video")}>
          Underwater Video
        </Button>
        <Button variant="ghost" onClick={() => handleSubservicesClick("photo")}>
          Underwater Photo
        </Button>
        <Button variant="ghost" onClick={() => handleSubservicesClick("dives")}>
          Guided Dives
        </Button>
        <Button
          variant="ghost"
          onClick={() => handleSubservicesClick("coaching")}
        >
          1 on 1 Coaching
        </Button>
      </HoverCardContent>
    </HoverCard>
  );
}

export default ServicesDropdown;
