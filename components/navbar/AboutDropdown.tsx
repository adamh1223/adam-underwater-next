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

function AboutDropdown() {
  const router = useRouter();
  const [showLinks, setShowLinks] = useState(false);
  const [submenuVisible, setSubmenuVisible] = useState(false);
  const linksContainerRef = useRef(null);
  const linksRef = useRef(null);
  const handleServicesClick = () => {
    router.push("/about");
  };
  const handleSubservicesClick = (section: string) => {
    router.push(`/about#${section}`);
  };
  return (
    <HoverCard openDelay={100} closeDelay={100}>
      <HoverCardTrigger>
        <Button variant="link" onClick={handleServicesClick}>
          About
        </Button>
      </HoverCardTrigger>

      <HoverCardContent className="w-40">
        <Button variant="ghost" onClick={() => handleSubservicesClick("about")}>
          About Me
        </Button>
        <Button variant="ghost" onClick={() => handleSubservicesClick("gear")}>
          My Gear
        </Button>
        <Button
          variant="ghost"
          onClick={() => handleSubservicesClick("workflow")}
        >
          My Workflow
        </Button>
      </HoverCardContent>
    </HoverCard>
  );
}

export default AboutDropdown;
