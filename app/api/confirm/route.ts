import Stripe from 'stripe';
import {CourierClient} from '@trycourier/courier'

const courier = new CourierClient({ authorizationToken: "dk_prod_YD7MPFEFARMTTYM3ASDX55T6ZD08" });
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);
import { redirect } from 'next/navigation';

import { type NextRequest } from 'next/server';
import db from '@/utils/db';
import { log } from 'console';
import { auth } from '@clerk/nextjs/server';

export const GET = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);
  const session_id = searchParams.get('session_id') as string;

  try {
    const session = await stripe.checkout.sessions.retrieve(session_id);
    // console.log(session);

    const orderId = session.metadata?.orderId;
    const cartId = session.metadata?.cartId;
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
    const productInfo = await db.product.findMany({
      where: {
        id: {in: orderInfo?.productIDs}
      }
    })
    console.log(productInfo);
    
    const productDescriptions = productInfo.map(product => {

      const productImage = `<img src=${product.image}>`
      const productDescription = product.description
      const productPrice = product.price;
      const productName = product.name;

      return `${productName} \n ${productImage} \n ${productDescription} \n ${productPrice}`
      
      
    })
    console.log(productDescriptions);
  
    const orderInfoString = `Quantity: ${orderInfo?.products}, Total: ${orderInfo?.orderTotal}`
    const bodyText = `Your order ID is ${orderId}. \n Order Details: ${productDescriptions.join(', ')}
      `
    await courier.send({
  message: {
    to: {
      email: orderInfo?.email,
    },
    content: {
      title: "Thanks for your Order!",
      body: bodyText
    },
    data: {
      orderInfo: orderInfoString,
      fullName: orderInfo?.fullName,
      productDescriptions: bodyText,
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