import {
  FirstColumn,
  FourthColumn,
  SecondColumn,
} from "@/components/cart/CartItemColumns";
import ThirdColumn from "@/components/cart/ThirdColumn";
import FormContainer from "@/components/form/FormContainer";
import { fetchOrder, fetchPurchasedProducts } from "@/utils/actions";
import { Card, CardTitle } from "@/components/ui/card";
import "./order.css";
import { EProduct, Product } from "@prisma/client";
import { Button } from "@/components/ui/button";

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
console.log(productsPurchased, '44444444444444');

  if (!productsPurchased || !productQuantities) {
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
      <div className="p-8 viewport w-[70%] card-container">
        <p className="text-xl py-5">
          Order #: <span className="font-semibold">{`${id}`} </span>
        </p>
        {productsPurchased.map((product: Product | EProduct) => {
          const productQuantities = test.map((t) => {
            if (t.productId === product.id) {
              return t;
            }
          });
          let imageToUse = null
          if ("image" in product) {
            imageToUse = product.image
          } else {
            imageToUse = product.thumbnail? [product.thumbnail] : null
          }
          let companyToUse = undefined
          if ("company" in product) {
            companyToUse = product.company
          } 
          let productSize = undefined;
          if ("size" in product) {
            productSize = product.size
          } 
          let downloadLink = undefined;
          if ("downloadLink" in product) {
            downloadLink = product.downloadLink
          } 
          let productType = undefined;
          if ("downloadLink" in product) {
            productType = 'Stock Footage Clip:'
          } else {
            productType = 'Canvas Print:'
          }
          return (
            <Card
              key={product.id}
              className="flex flex-col gap-y-4 md:flex-row flex-wrap p-6 mb-8 gap-x-4"
            >
              <FirstColumn image={imageToUse} name={product.name} />
              <SecondColumn
                name={product.name}
                company={companyToUse}
                productId={product.id}
                productType={productType}
              />
              <div>Quantity: {productQuantities[0]?.amount??1}</div>
              {productSize && <div>Size: {productSize}</div>}
              {downloadLink
                && <Button variant="ghost">

          <a href={downloadLink}>Download</a>
        </Button>
              }
              <FourthColumn price={product.price} />
            </Card>
          );
        })}
        <div className="totals text-l">
          <Card className="p-8">
            <Card className="p-5 w-[45%]">
              <div>
                Subtotal:{" "}
                <span className="total font-semibold"> ${orderTotal}.00</span>
              </div>
              <div>
                Shipping:{" "}
                <span className="total font-semibold"> ${shipping}.00</span>
              </div>
              <div>
                Tax: <span className="total font-semibold"> ${tax}.00</span>
              </div>
            </Card>

            <CardTitle className="mt-8 order-total">
              <div>
                {" "}
                Order Total: <span> ${orderTotal}.00</span>
              </div>
            </CardTitle>
          </Card>
        </div>
      </div>
    </>
  );
}

export default page;
