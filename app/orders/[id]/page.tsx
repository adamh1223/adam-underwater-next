import {
  FirstColumn,
  FourthColumn,
  SecondColumn,
} from "@/components/cart/CartItemColumns";
import ThirdColumn from "@/components/cart/ThirdColumn";
import FormContainer from "@/components/form/FormContainer";
import { fetchOrder, fetchPurchasedProducts } from "@/utils/actions";
import { Card, CardTitle } from "@/components/ui/card";

async function page({ params }: { params: { id: string } }) {
  const id = params.id;
  const orderInfo = await fetchOrder(id);

  if (!orderInfo) {
    return null;
  }
  //   console.log(orderInfo);
  //   console.log(params);
  const {
    shipping,
    tax,
    orderTotal,
    productQuantities,
    productIDs,
  } = orderInfo;
  const productsPurchased = await fetchPurchasedProducts(productIDs);

  if (
    !productsPurchased ||
    !productQuantities
  ) {

    return null;
  }
  console.log(Object.keys(productQuantities)?.length);
  console.log(productQuantities);
  if (productQuantities.toString.length === 2) {
    return null;
  }
  const parsedProductQuantities = productQuantities as any[];
  console.log(productQuantities);
  if (!parsedProductQuantities?.length) {
    return null;
  }
  const test = productsPurchased
    .map((product) => {
      return parsedProductQuantities?.filter((p: any) => {
        return p.productId === product.id;
      });
    })
    .flat();
  //   console.log("hello", test);

  return (
    <>
      <div>
        {productsPurchased.map((product) => {
          const productQuantities = test.map((t) => {
            if (t.productId === product.id) {
              return t;
            }
          });
          return (
            <Card
              key={product.id}
              className="flex flex-col gap-y-4 md:flex-row flex-wrap p-6 mb-8 gap-x-4"
            >
              <FirstColumn image={product.image} name={product.name} />
              <SecondColumn
                name={product.name}
                company={product.company}
                productId={product.id}
              />
              <div>Quantity: {productQuantities[0].amount}</div>
              <FourthColumn price={product.price} />
            </Card>
          );
        })}
        <div>
          <Card className="p-8">
            <div> label="Subtotal" amount={orderTotal} </div>
            <div> label="Shipping" amount={shipping} </div>
            <div> label="Tax" amount={tax} </div>
            <CardTitle className="mt-8">
              <div> label="Order Total" amount={orderTotal} lastRow </div>
            </CardTitle>
          </Card>
        </div>
      </div>
    </>
  );
}

export default page;
