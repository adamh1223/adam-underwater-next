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

function StockDropdown() {
  const router = useRouter();
  const [showLinks, setShowLinks] = useState(false);
  const [submenuVisible, setSubmenuVisible] = useState(false);
  const linksContainerRef = useRef(null);
  const linksRef = useRef(null);
  const handleServicesClick = () => {
    router.push("/stock");
  };
  const handleSubservicesClick = (section: string) => {
    router.push(`/stock#${section}`);
  };
  return (
    <HoverCard openDelay={100} closeDelay={100}>
      <HoverCardTrigger>
        <Button variant="link" onClick={handleServicesClick}>
          Stock Footage
        </Button>
      </HoverCardTrigger>

      <HoverCardContent className="w-40">
        <Button variant="ghost" onClick={() => handleSubservicesClick("video")}>
          Stock Video
        </Button>
        <Button variant="ghost" onClick={() => handleSubservicesClick("photo")}>
          Stock Photo
        </Button>
      </HoverCardContent>
    </HoverCard>
  );
}

export default StockDropdown;
