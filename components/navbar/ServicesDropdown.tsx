"use client";

import React from "react";
import { useState, useRef } from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import Submenu from "./Submenu";

function ServicesDropdown() {
  const [showLinks, setShowLinks] = useState(false);
  const [submenuVisible, setSubmenuVisible] = useState(false);
  const linksContainerRef = useRef(null);
  const linksRef = useRef(null);
  const onMouseEnter = () => {
    setSubmenuVisible(true);
  };
  const handleMouseLeave = () => {
    setSubmenuVisible(false); // Hide submenu when mouse leaves navbar
  };
  return (
    <>
      <Button variant="link">
        <Link href="/services" onMouseEnter={onMouseEnter}>
          Services
        </Link>
      </Button>
      {<Submenu visible={submenuVisible} />}
    </>
  );
}

export default ServicesDropdown;
