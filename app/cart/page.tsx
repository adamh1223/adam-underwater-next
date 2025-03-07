import CartItemsList from "@/components/cart/CartItemsList";
import CartTotals from "@/components/cart/CartTotals";
import SectionTitle from "@/components/global/Sectiontitle";
import { fetchOrCreateCart, updateCart } from "@/utils/actions";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

async function CartPage() {
  const { userId } = auth();
  if (!userId) redirect("/");
  const previousCart = await fetchOrCreateCart({ userId });
  const { currentCart, cartItems } = await updateCart(previousCart);
  if (cartItems.length === 0) return <SectionTitle text="Empty Cart" />;
  console.log(cartItems, '999999999');
  
  const includesEProducts = cartItems.filter(cartItem => cartItem.EProductId!=null)
  const includesProducts = cartItems.filter(cartItem => cartItem.productId != null)
  const includesBoth = includesEProducts?.length>0 && includesProducts?.length>0
  console.log(includesEProducts, '1111111');
  console.log(includesProducts, '2222222');
  console.log(includesBoth, '3333333');
  
  return (
    <>
      <div className="flex justify-center">
        <img
          src={"/images/cart.png"}
          style={{ height: "110px" }}
          className="pt-5"
        ></img>
      </div>
      <div className="mt-8 grid gap-4 lg:grid-cols-12 px-5">
        <div className="lg:col-span-8">
          <CartItemsList cartItems={currentCart.cartItems} />
        </div>
        <div className="lg:col-span-4">
          <CartTotals cart={currentCart} includesEProducts={includesEProducts?.length>0} includesBoth={includesBoth}/>
        </div>
      </div>
    </>
  );
}
export default CartPage;
