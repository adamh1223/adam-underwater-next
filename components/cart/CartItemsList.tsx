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
        console.log(cartItem.EProduct);

        const { id: productId, image, name, company, price } =
          cartItem.product ?? {};
        const { id: EProductId, name: EProductName, price: EProductPrice, thumbnail: thumbnail } =
          cartItem.EProduct ?? {};
        console.log(EProductName);

        const priceToUse = price ? price : EProductPrice;
        const thumbnailURL = thumbnail? thumbnail : '';
        const imageToUse = image ? image : [thumbnailURL];
        const nameToUse =  name ? name: EProductName;
        console.log(imageToUse);
        const isEProduct = cartItem.EProduct
        return (
          <Card
            key={id}
            className="flex flex-col gap-y-4 md:flex-row flex-wrap p-6 mb-8 gap-x-4"
          >
            {imageToUse && (nameToUse && <FirstColumn image={imageToUse} name={nameToUse} />)}
            {productId ? (
              <SecondColumn
                name={nameToUse}
                company={company}
                productId={productId}
              />
            ) : (
              <SecondColumn name={EProductName} EProductId={EProductId} />
            )}
            <ThirdColumn id={id} quantity={amount??1} isEProduct={!!isEProduct}/>
            <FourthColumn price={priceToUse} />
          </Card>
        );
      })}
    </div>
  );
}
export default CartItemsList;
