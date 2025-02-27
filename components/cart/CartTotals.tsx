"use client";

import { Card, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatCurrency } from "@/utils/format";
import { createEProductOrder, createOrderAction } from "@/utils/actions";
import FormContainer from "../form/FormContainer";
import { SubmitButton } from "../form/Buttons";
import { Cart } from "@prisma/client";
import StockForm from "../form/StockForm";
import { Checkbox } from "@/components/ui/checkbox";

function CartTotals({ cart, includesEProducts }: { cart: Cart, includesEProducts: Boolean }) {
  const { cartTotal, shipping, tax, orderTotal } = cart;
  const actionToUse = includesEProducts? createEProductOrder : createOrderAction
  return (
    <div>
      <Card className="p-8">
        <CartTotalRow label="Subtotal" amount={cartTotal} />
        <CartTotalRow label="Shipping" amount={shipping} />
        <CartTotalRow label="Tax" amount={tax} />
        <CardTitle className="mt-8">
          <CartTotalRow label="Order Total" amount={orderTotal} lastRow />
        </CardTitle>
      </Card>
      <p className="flex justify-center pt-7 px-8">
        Please allow 7-10 business days for shipping.
      </p>
      <p className="flex justify-center pt-7 px-8">
        Electronic products will be downloaded immediately and a download code
        will be sent via email.
      </p>
      {/* Some conditional statement that checks if there is an Eproduct in the cart and only shows the stock form if there IS one or more eproducts in the cart */}
      <div className="flex items-center justify-center pt-7 gap-2">
        {/* Hide the checkbox until they complete the form, and then show it checked */}
        <Checkbox className="h-5 w-5" />
        <StockForm />
      </div>

      <FormContainer action={actionToUse}>
        <SubmitButton text="Place Order" className="w-full mt-8" />
      </FormContainer>
    </div>
  );
}

function CartTotalRow({
  label,
  amount,
  lastRow,
}: {
  label: string;
  amount: number;
  lastRow?: boolean;
}) {
  return (
    <>
      <p className="flex justify-between text-sm">
        <span>{label}</span>
        <span>{formatCurrency(amount)}</span>
      </p>
      {lastRow ? null : <Separator className="my-2" />}
    </>
  );
}

export default CartTotals;
