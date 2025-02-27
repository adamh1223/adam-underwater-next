import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);
import { type NextRequest } from 'next/server';
import db from '@/utils/db';

export const POST = async (req: NextRequest) => {
  const requestHeaders = new Headers(req.headers);
  const origin = requestHeaders.get('origin');

  const { orderId, cartId } = await req.json();

  const order = await db.order.findUnique({
    where: {
      id: orderId,
    },
  });
  const cart = await db.cart.findUnique({
    where: {
      id: cartId,
    },
    include: {
      cartItems: {
        include: {
          product: true,
          EProduct: true,
        },
      },
    },
  });
  if (!order || !cart) {
    return Response.json(null, {
      status: 404,
      statusText: 'Not Found',
    });
  }

  
  const line_items = cart.cartItems.map((cartItem) => {

    const productNameToUse = cartItem?.product? cartItem.product.name : ''
    const productImagesToUse = cartItem?.product? cartItem.product.image : undefined
    const EProductNameToUse = cartItem?.EProduct? cartItem.EProduct.name : ''
    const EProductImagesToUse = cartItem?.EProduct?.thumbnail? [cartItem.EProduct.thumbnail] : undefined

    const nameToUse = cartItem?.product ? productNameToUse : EProductNameToUse
    const imageToUse = cartItem?.product ? productImagesToUse : EProductImagesToUse

    const EProductPrice = cartItem.EProduct?.price? cartItem.EProduct?.price * 100: 200
    const productPrice = cartItem.product?.price? cartItem.product?.price * 100: 200

    const priceToUse = cartItem?.product ? productPrice : EProductPrice


    return {
      quantity: cartItem.amount? cartItem.amount: 1,
      price_data: {
        currency: 'usd',
        product_data: {
          name: nameToUse,
          images: imageToUse
        },
        unit_amount: priceToUse
      },
    };
  });
  try {
    const session = await stripe.checkout.sessions.create({
      ui_mode: 'embedded',
      metadata: { orderId, cartId },
      line_items: line_items,
      mode: 'payment',
      shipping_address_collection: {allowed_countries: ['US']},
      return_url: `${origin}/api/confirm?session_id={CHECKOUT_SESSION_ID}`,
    });

    return Response.json({ clientSecret: session.client_secret });
  } catch (error) {
    console.log(error);

    return Response.json(null, {
      status: 500,
      statusText: 'Internal Server Error',
    });
  }
};