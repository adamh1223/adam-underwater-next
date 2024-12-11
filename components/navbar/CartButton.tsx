"use client";

import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { LuShoppingCart } from "react-icons/lu";
import { fetchCartItems } from "@/utils/actions";
import { useCart } from "@/utils/cartContext";

async function CartButton() {
  // const numItemsInCart = await fetchCartItems();
  const { getCartCount } = useCart();
  const cartCount = getCartCount();
  console.log(cartCount);

  return (
    <Button
      asChild
      variant="outline"
      size="icon"
      className="flex justify-center items-center relative"
    >
      <Link href="/cart">
        <LuShoppingCart />
        <span className="absolute -top-3 -right-3 bg-primary text-white rounded-full h-6 w-6 flex items-center justify-center text-xs">
          {cartCount}
        </span>
      </Link>
    </Button>
  );
}

export default CartButton;
