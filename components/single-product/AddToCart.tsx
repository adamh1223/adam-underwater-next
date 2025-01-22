"use client";

import { useState } from "react";
import SelectProductAmount from "./SelectProductAmount";
import { Mode } from "./SelectProductAmount";
import FormContainer from "../form/FormContainer";
import { SubmitButton } from "../form/Buttons";
import { addToCartAction } from "@/utils/actions";
import { useAuth } from "@clerk/nextjs";
import { ProductSignInButton } from "../form/Buttons";
import SelectProductSize from "../products/ProductSize";

function AddToCart({
  productId,
  isEProduct,
}: {
  productId: string;
  isEProduct?: boolean;
}) {
  const [amount, setAmount] = useState(1);
  const [size, setSize] = useState("Small");
  const { userId } = useAuth();

  return (
    <div className="mt-4">
      {!isEProduct && (
        <>
          <div className="flex justify-center">
            <div className="flex justify-end pb-2">
              <SelectProductSize size={size} setSize={setSize} />
            </div>
          </div>
          <div className="flex justify-center">
            <div className="flex justify-end pt-2">
              <SelectProductAmount
                mode={Mode.SingleProduct}
                amount={amount}
                setAmount={setAmount}
              />
            </div>
          </div>
        </>
      )}
      {userId ? (
        <FormContainer action={addToCartAction}>
          <input type="hidden" name="productId" value={productId} />
          <input type="hidden" name="amount" value={amount} />
          <input type="hidden" name="size" value={size} />
          <SubmitButton text="add to cart" size="default" className="mt-8" />
        </FormContainer>
      ) : (
        <ProductSignInButton />
      )}
    </div>
  );
}
export default AddToCart;
