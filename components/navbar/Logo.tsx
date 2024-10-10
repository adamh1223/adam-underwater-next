import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";

function Logo() {
  return (
    <Button variant="ghost" asChild>
      <Link href="/">
        <img src={"/svg/colorlogo.svg"} style={{ height: "4rem" }}></img>
      </Link>
    </Button>
  );
}

export default Logo;
