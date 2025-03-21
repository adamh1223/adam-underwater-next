"use client";

import { useActionState, useEffect, useState } from "react";
import SelectProductAmount from "./SelectProductAmount";
import { Mode } from "./SelectProductAmount";
import FormContainer from "../form/FormContainer";
import { SubmitButton } from "../form/Buttons";
import { addToCartAction, isEProductInCart } from "@/utils/actions";
import { useAuth } from "@clerk/nextjs";
import { ProductSignInButton } from "../form/Buttons";
import SelectProductSize from "../products/ProductSize";
import { useFormState, useFormStatus } from "react-dom";

function AddToCart({
  RedirectTo,
  productId,
  isEProduct,
}: {
  RedirectTo?: string;
  productId: string;
  isEProduct?: boolean;
}) {
  const [amount, setAmount] = useState(1);
  const [size, setSize] = useState("Small");
  const [disabled, setDisabled] = useState(false);
 
  const { userId } = useAuth();
  const productFormName = isEProduct? "EProductId": "productId"
  const [hasAddedItemToCart, setHasAddedItemToCart] = useState(false)

  useEffect(()=>{
    const getActionResult = async () => {
      const alreadyInCart = await isEProductInCart(productId)
      
      
        setDisabled(alreadyInCart)
    }
   getActionResult()
  }, [])
const handleAddToCart =  () => {
   console.log('hello');
   setHasAddedItemToCart(true)
  };
  



//FOR THURSDAY
//Make new function that submits the action
//create new state variables
//when action submits, use new state variables to disable button 



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
        <FormContainer action={addToCartAction} callback={handleAddToCart}>
          <input type="hidden" name={productFormName} value={productId} />
          <input type="hidden" name="amount" value={amount}></input>
          <input type="hidden" name="RedirectTo" value={RedirectTo} />
          <SubmitButton disabled={disabled || hasAddedItemToCart} text="add to cart" size="default" className="mt-8" />
        </FormContainer>
      ) : (
        <ProductSignInButton />
      )}
    </div>
  );
}
export default AddToCart;
