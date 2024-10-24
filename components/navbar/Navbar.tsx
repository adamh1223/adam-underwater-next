import React from "react";
import Container from "../global/Container";
import Logo from "./Logo";
import NavSearch from "./NavSearch";
import CartButton from "./CartButton";
import DarkMode from "./DarkMode";
import LinksDropdown from "./LinksDropdown";
import { Suspense } from "react";
import "./Navbar.css";
import Link from "next/link";
import { Button } from "../ui/button";
import { useState, useRef } from "react";
import Submenu from "./Submenu";
import ServicesDropdown from "./ServicesDropdown";
import StockDropdown from "./StockDropdown";
import AboutDropdown from "./AboutDropdown";
import ProductsDropdown from "./ProductsDropdown";

function Navbar() {
  return (
    <nav className="border-b">
      <Container className="flex flex-col xl:flex-row sm:justify-between sm:items-center lg:justify-between flex-wrap py-4 gap-4 navbar">
        <Logo />
        <div className="flex items-center nav-links">
          <div className="flex justify-center w-full">
            <Button variant="link">
              <Link href="/work">Work</Link>
            </Button>
            <AboutDropdown />
            <ServicesDropdown />
          </div>
          <div className="flex justify-center w-full">
            <ProductsDropdown />
            <StockDropdown />
            <Button variant="link">
              <Link href="/contact">Contact</Link>
            </Button>
          </div>
        </div>
        <div className="flex gap-4 items-center">
          <CartButton />
          <LinksDropdown />
        </div>
      </Container>
    </nav>
  );
}

export default Navbar;
