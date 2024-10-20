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

function Navbar() {
  return (
    <nav className="border-b">
      <Container className="flex flex-col xl:flex-row sm:justify-between sm:items-center lg:justify-between flex-wrap py-4 gap-4 navbar">
        <Logo />
        <div className="flex items-center">
          <Button variant="link">
            <Link href="/work">Work</Link>
          </Button>
          <Button variant="link">
            <Link href="/about">About</Link>
          </Button>
          <Button variant="link">
            <Link href="/services">Services</Link>
          </Button>
          <Button variant="link">
            <Link href="/products">Products</Link>
          </Button>
          <Button variant="link">
            <Link href="/stock">Stock Footage</Link>
          </Button>
          <Button variant="link">
            <Link href="/contact">Contact</Link>
          </Button>
        </div>
        <div className="flex gap-4 items-center">
          <CartButton />
          <DarkMode />
          <LinksDropdown />
        </div>
      </Container>
    </nav>
  );
}

export default Navbar;
