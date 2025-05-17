"use client";

import { useState } from "react";
import SelectProductSize from "../products/ProductSize";
import FormContainer from "../form/FormContainer";
import { SubmitButton } from "../form/Buttons";
import { addToCartAction } from "@/utils/actions";
import { useAuth } from "@clerk/nextjs";
import { ProductSignInButton } from "../form/Buttons";

function AddProductSize({ productId }: { productId: string }) {
  const [size, setSize] = useState("small");
  const { userId } = useAuth();

  return (
    <div className="mt-4">
      <div className="flex justify-center">
        <SelectProductSize size={size} setSize={setSize} />
      </div>
      {userId ? (
        <FormContainer action={addToCartAction}>
          <input type="hidden" name="productId" value={productId} />
          <input type="hidden" name="size" value={size} />
          <SubmitButton text="add to cart" size="default" className="mt-8" />
        </FormContainer>
      ) : (
        <ProductSignInButton />
      )}
    </div>
  );
}
export default AddProductSize;
