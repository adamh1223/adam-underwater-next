"use client";

import { Card } from "@/components/ui/card";
import { FirstColumn, SecondColumn, FourthColumn } from "./CartItemColumns";
import ThirdColumn from "./ThirdColumn";
import { CartItemWithProduct } from "@/utils/types";
import { CartItem } from "@prisma/client";
import { useEffect } from "react";

function CartItemsList({ cartItems }: { cartItems: CartItemWithProduct[] }) {
  console.log(cartItems);
  useEffect(() => {}, [cartItems.length]);
  return (
    <div>
      {cartItems.map((cartItem) => {
        const { id, amount } = cartItem;
        const { productId, EProductId, image, name, company, price } = cartItem.product ?? {};
        return (
          <Card
            key={id}
            className="flex flex-col gap-y-4 md:flex-row flex-wrap p-6 mb-8 gap-x-4"
          >
            {image && name && <FirstColumn image={image} name={name} />}
            <SecondColumn name={name} company={company} productId={productId} />
            {amount && <ThirdColumn id={id} quantity={amount} />}
            <FourthColumn price={price} />
          </Card>
        );
      })}
    </div>
  );
}
export default CartItemsList;
