import Stripe from 'stripe';
import {CourierClient} from '@trycourier/courier'

const courier = new CourierClient({ authorizationToken: "dk_prod_YD7MPFEFARMTTYM3ASDX55T6ZD08" });
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);
import { redirect } from 'next/navigation';

import { type NextRequest } from 'next/server';
import db from '@/utils/db';
import { log } from 'console';
import { auth } from '@clerk/nextjs/server';
import { EProduct, Product } from '@prisma/client';

export const GET = async (req: NextRequest) => {
  const { searchParams } = await new URL(req.url);
  const session_id = searchParams.get('session_id') as string;

  try {
    const session = await stripe.checkout.sessions.retrieve(session_id);
    const shippingDetails = session.shipping_details
    const orderId = session.metadata?.orderId;
    const cartId = session.metadata?.cartId;
    const cartItems = await db.cartItem.findMany({
      where: {
        cartId: cartId
      }
      
    })
    if (session.status === 'complete') {
      await db.order.update({
        where: {
          id: orderId,
        },
        data: {
          isPaid: true,
        },
      });
      await db.cart.delete({
        where: {
          id: cartId,
        },
      });
    }
    console.log('order processed and got info from stripe');
    const orderInfo = await db.order.findFirst({
      where: {
        id: orderId
      }
      
    })
    const [products, EProducts] = await Promise.all([
      await db.product.findMany( {
where: {
        id: {in: orderInfo?.productIDs}
      }
      }),
      await db.eProduct.findMany( {
where: {
        id: {in: orderInfo?.productIDs}
      }
      }),

    ])
    const productInfo = [...products, ...EProducts]
    
    const productDescriptions = productInfo.map((product: Product | EProduct) => {
      let productImage;
      if ("image" in product) {
        productImage = product.image[0]
      } else {
        productImage = product.thumbnail
      }

      const productImageToUse = productImage
      const productDescription = product.description
      const productPrice = product.price;
      const productName = product.name;
      const productQuantity = cartItems.map(item => {
        
        if (item.productId === product.id) {
          return item.amount
        }
      })

      return {productName, productImageToUse, productDescription, productPrice, productQuantity}
      
      
    })
    const orderInfoString = `Quantity: ${orderInfo?.products}, Total: ${orderInfo?.orderTotal}`
    const bodyText = `${orderId}`
      const orderTotal = orderInfo?.orderTotal ?? 0
      const shipping = orderInfo?.shipping ?? 0
      const tax = orderInfo?.tax ?? 0
      const subtotal = (orderTotal - shipping - tax) ?? 0

    await courier.send({
  message: {
    to: {
      email: orderInfo?.email,
    },
    template: "YF16GXYDBN4NQ2QD1716FK7SAY3G",
    data: {
      orderInfo: orderInfoString,
      fullName: orderInfo?.fullName,
      productDescriptions,
      bodyText,
      orderTotal,
      shipping,
      tax,
      subtotal,
      shippingDetails: shippingDetails?.address,
    },
    routing: {
      method: "single",
      channels: ["email"],
    },
  },
});
    
  } catch (err) {
    console.log(err);
    return Response.json(null, {
      status: 500,
      statusText: 'Internal Server Error',
    });
  }
  redirect('/orders');
};