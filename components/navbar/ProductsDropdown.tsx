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

function ProductsDropdown() {
  const router = useRouter();
  const [showLinks, setShowLinks] = useState(false);
  const [submenuVisible, setSubmenuVisible] = useState(false);
  const linksContainerRef = useRef(null);
  const linksRef = useRef(null);
  const handleServicesClick = () => {
    router.push("/products");
  };
  const handleSubservicesClick = (section: string) => {
    router.push(`/products#${section}`);
  };
  return (
    <HoverCard openDelay={100} closeDelay={100}>
      <HoverCardTrigger>
        <Button variant="link" onClick={handleServicesClick}>
          Products
        </Button>
      </HoverCardTrigger>

      <HoverCardContent className="w-40">
        <Button
          variant="ghost"
          onClick={() => handleSubservicesClick("prints")}
        >
          Canvas Prints
        </Button>
        <Button variant="ghost" onClick={() => handleSubservicesClick("luts")}>
          LUTs & Presets
        </Button>
      </HoverCardContent>
    </HoverCard>
  );
}

export default ProductsDropdown;
