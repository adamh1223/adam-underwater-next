"use server";
import db from "@/utils/db";
import { currentUser, auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import {
  EProductSchema,
  imageSchema,
  productSchema,
  reviewSchema,
  thumbnailSchema,
  validateWithZodSchema,
} from "./schemas";
import { deleteImage, uploadImage } from "./supabase";
import { revalidatePath, revalidateTag } from "next/cache";
import { Cart, EProduct, Product } from "@prisma/client";
import { CourierClient } from "@trycourier/courier";

const getAuthUser = async () => {
  const user = await currentUser();

  if (!user) redirect("/");
  return user;
};

const getAdminUser = async () => {
  const user = await getAuthUser();
  if (user.id !== process.env.ADMIN_USER_ID) redirect("/");
  return user;
};

const renderError = (error: unknown): { message: string } => {
  console.log(error);
  return {
    message: error instanceof Error ? error.message : "An error occurred",
  };
};

export const fetchFeaturedProducts = async () => {
  const products = await db.product.findMany({
    where: {
      featured: true,
    },
  });
  return products;
};

export const fetchAllProducts = async ({
  search = "",
}: { search?: string } = {}) => {
  return db.product.findMany({
    where: {
      OR: [
        { name: { contains: search, mode: "insensitive" } },
        { company: { contains: search, mode: "insensitive" } },
      ],
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

const renderSuccess = () => {
  return {
    message: 'Added to cart'
  };
}

export const fetchAllEProducts = async ({
  search = "",
}: { search?: string } = {}) => {
  return db.eProduct.findMany({
    where: {
      OR: [
        { name: { contains: search, mode: "insensitive" } },
        { keywords: { hasSome: [search] } },
      ],
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

export const fetchSingleProduct = async (productId: string) => {
  const product = await db.product.findUnique({
    where: {
      id: productId,
    },
  });
  if (!product) {
    redirect("/products");
  }
  return product;
};

export const fetchSingleEProduct = async (EProductId: string) => {
  const EProduct = await db.eProduct.findUnique({
    where: {
      id: EProductId,
    },
  });
  if (!EProduct) {
    redirect("/stock");
  }
  return EProduct;
};

export const createProductAction = async (
  prevState: any,
  formData: FormData
): Promise<{ message: string }> => {
  const user = await getAuthUser();

  try {
    const rawFiles = Object.values(
      (formData.getAll("images") as unknown) as File[]
    );

    const rawData = Object.fromEntries(formData);

    const files = (formData.get("image") as unknown) as File[];

    const validatedFields = validateWithZodSchema(productSchema, rawData);
    const promisedImages = rawFiles.map(async (file) => {
      const validatedFile = validateWithZodSchema(imageSchema, {
        image: file,
      });

      return await uploadImage(validatedFile.image);
    });
    const stringFiles: string[] = await Promise.all(promisedImages);



    await db.product.create({
      data: {
        ...validatedFields,
        image: stringFiles,
        clerkId: user.id,
      },
    });
  } catch (error) {
    return renderError(error);
  }
  redirect("/admin/products");
};

//CREATE EPRODUCT
export const createEProductAction = async (
  prevState: any,
  formData: FormData
): Promise<{ message: string }> => {
  const user = await getAuthUser();

  try {
    const rawFiles = Object.values(
      (formData.getAll("images") as unknown) as File[]
    );


    const rawData = Object.fromEntries(formData);
    const promisedImages = rawFiles.map(async (file) => {
      const validatedFile = validateWithZodSchema(thumbnailSchema, {
        thumbnail: file,
      });

      return await uploadImage(validatedFile.thumbnail);
    });
    const stringFiles: string[] = await Promise.all(promisedImages);

    const validatedFields = validateWithZodSchema(EProductSchema, rawData);

    await db.eProduct.create({
      data: {
        ...validatedFields,
        clerkId: user.id,
        thumbnail: stringFiles[0],
      },
    });
  } catch (error) {


    return renderError(error);
  }
  redirect("/admin/products");

};

export const fetchAdminProducts = async () => {
  await getAdminUser();
  const products = await db.product.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
  return products;
};

export const deleteProductAction = async (prevState: { productId: string }) => {
  const { productId } = prevState;
  await getAdminUser();
  try {
    const product = await db.product.delete({
      where: {
        id: productId,
      },
    });
    await deleteImage(product.image);
    revalidatePath("/admin/products");
    return { message: "product removed" };
  } catch (error) {
    return renderError(error);
  }
};

export const fetchAdminProductDetails = async (productId: string) => {
  await getAdminUser();
  const product = await db.product.findUnique({
    where: {
      id: productId,
    },
  });
  if (!product) redirect("/admin/products");
  return product;
};

export const updateProductAction = async (
  prevState: any,
  formData: FormData
) => {
  await getAdminUser();
  try {
    const productId = formData.get("id") as string;
    const rawData = Object.fromEntries(formData);
    const validatedFields = validateWithZodSchema(productSchema, rawData);

    await db.product.update({
      where: {
        id: productId,
      },
      data: {
        ...validatedFields,
      },
    });
    revalidatePath(`/admin/products/${productId}/edit`);
    return { message: "Product updated successfully" };
  } catch (error) {
    return renderError(error);
  }
};

export const updateProductImageAction = async (
  prevState: any,
  formData: FormData
) => {
  await getAuthUser();
  try {
    const image = formData.get("image") as File;
    const productId = formData.get("id") as string;
    const oldImageUrl = formData.get("url") as string;
    const validatedFile = validateWithZodSchema(imageSchema, { image });
    const fullPath = await uploadImage(validatedFile.image);
    await deleteImage(oldImageUrl);
    await db.product.update({
      where: {
        id: productId,
      },
      data: {
        image: fullPath,
      },
    });
    revalidatePath(`/admin/products/${productId}/edit`);
    return { message: "Product image updated successfully" };
  } catch (error) {
    return renderError(error);
  }
};

export const fetchFavoriteId = async ({ productId, EProductId }: { productId: string | null, EProductId: string | null }) => {
  const user = await getAuthUser();
  const favorite = productId? await db.favorite.findFirst({
    where: {
      productId,
      clerkId: user.id,
    },
    select: {
      id: true,
    },
  }): null
  const favoriteEProductId = EProductId?  await db.favorite.findFirst({
    where: {
      EProductId,
      clerkId: user.id,
    },
    select: {
      id: true,
    },
  }): null
  const favoriteProductToReturn = productId? favorite?.id : favoriteEProductId?.id
  return favoriteProductToReturn || null;
};

export const toggleFavoriteAction = async (prevState: {
  productId: string | null;
  EProductId: string | null;
  favoriteId: string | null;
  pathname: string;
}) => {
  const user = await getAuthUser();
  const { productId, EProductId, favoriteId, pathname } = prevState;
  try {
    if (favoriteId) {
      await db.favorite.delete({
        where: {
          id: favoriteId,
        },
      });
    } else {
      if (productId) {
        await db.favorite.create({
        data: {
          productId,
          EProductId: undefined,
          clerkId: user.id,
        },
      });
      }
      if (EProductId) {
        
        await db.favorite.create({
          data: {
            EProductId,
            productId: undefined,
            clerkId: user.id,
          },
        });
      }
    }
    revalidatePath(pathname);
    return {
      message: favoriteId ? "Removed from Favorites" : "Added to Favorites",
    };
  } catch (error) {
    return renderError(error);
  }
};

export const fetchUserFavorites = async () => {
  const user = await getAuthUser();
  const favorites = await db.favorite.findMany({
    where: {
      clerkId: user.id,
    },
    include: {
      product: true,
      EProduct: true,
    },
  });
  return favorites;
};

export const createReviewAction = async (
  prevState: any,
  formData: FormData
) => {
  const user = await getAuthUser();
  try {
    const rawData = Object.fromEntries(formData);
    const validatedFields = validateWithZodSchema(reviewSchema, rawData);
    await db.review.create({
      data: {
        ...validatedFields,
        clerkId: user.id,
      },
    });
    revalidatePath(`/products/${validatedFields.productId}`);
    return { message: "review submitted successfully" };
  } catch (error) {
    return renderError(error);
  }
};

export const fetchProductReviews = async (productId: string) => {
  const reviews = await db.review.findMany({
    where: {
      productId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return reviews;
};
export const fetchAllUserReviews = async () => {
  const user = await getAuthUser();
  const reviews = await db.review.findMany({
    where: {
      clerkId: user.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return reviews;
};

export const fetchProductRating = async (productId: string) => {
  const result = await db.review.groupBy({
    by: ["productId"],
    _avg: {
      rating: true,
    },
    _count: {
      rating: true,
    },
    where: {
      productId,
    },
  });
  return {
    rating: result[0]?._avg.rating?.toFixed(1) ?? 0,
    count: result[0]?._count.rating?.toFixed(1) ?? 0,
  };
};

export const fetchProductReviewsByUser = async () => {
  const user = await getAuthUser();
  const reviews = await db.review.findMany({
    where: {
      clerkId: user.id,
    },
    select: {
      id: true,
      rating: true,
      comment: true,
      authorImageUrl: true,
      product: {
        select: {
          image: true,
          name: true,
          id: true,
        },
      },
    },
  });
  return reviews;
};

export const deleteReviewAction = async (prevState: { reviewId: string }) => {
  const { reviewId } = prevState;
  const user = await getAuthUser();

  try {
    await db.review.delete({
      where: {
        id: reviewId,
        clerkId: user.id,
      },
    });

    revalidatePath("/reviews");
    return { message: "Review deleted successfully" };
  } catch (error) {
    return renderError(error);
  }
};

export const findExistingReview = async (userId: string, productId: string) => {
  return db.review.findFirst({
    where: {
      clerkId: userId,
      productId,
    },
  });
};

export const fetchCartItems = async () => {
  const { userId } = auth();

  const cart = await db.cart.findFirst({
    where: {
      clerkId: userId ?? "",
    },
    select: {
      numItemsInCart: true,
    },
  });
  return cart?.numItemsInCart || 0;
};

export const identifyCart = async () => {
  const { userId } = auth();

  const cart = await db.cart.findFirst({
    where: {
      clerkId: userId ?? "",
    },
    select: {
      cartItems: true
    },
  });
  return cart?.cartItems;
};

const fetchProduct = async (productId: string) => {};

export const fetchOrCreateCart = async ({
  userId,
  errorOnFailure = false,
}: {
  userId: string;
  errorOnFailure?: boolean;
}) => {
  let cart = await db.cart.findFirst({
    where: {
      clerkId: userId,
    },
    include: {
      cartItems: {
        include: {
          product: true,
        },
      },
    },
  });
  if (!cart && errorOnFailure) {
    throw new Error("Cart not found");
  }
  if (!cart) {
    cart = await db.cart.create({
      data: {
        clerkId: userId,
      },
      include: {
        cartItems: {
          include: {
            product: true,
          },
        },
      },
    });
  }
  return cart;
};

export const fetchPurchasedProducts = async (productIDs: string[]) => {
  const EProducts = await db.eProduct.findMany({
    where: {
      id: {
        in: productIDs,
      },
    },
  });

  const products = await db.product.findMany({
    where: {
      id: {
        in: productIDs,
      },
    },
  });
  const allPurchasedProducts = (products && EProducts) ? [...products, ...EProducts] : products
  return allPurchasedProducts
};
// only calculates quantity, not price
const updateOrCreateCartItem = async ({
  productId,
  cartId,
  amount,
  size,
  EProductId,
}: {
  productId: string;
  cartId: string;
  amount?: number;
  size?: string;
  EProductId?: string;
}) => {


  let cartItem = await db.cartItem.findFirst({
    where: {
      productId,
      cartId,
    },
  });
  let ECartItem = await db.cartItem.findFirst({
    where: {
      EProductId,
      cartId,
    },
  });



  // TOOK OUT BECAUSE WE FORGOT WHY IT WAS HERE; ADD REGULAR PRODUCTS QUANTITIES
  // if (EProductId) {
  //   return;
  // }

  

  if (cartItem && amount && size) {
    if (cartItem.amount != null) {
      cartItem = await db.cartItem.update({
        where: {
          id: cartItem.id,
        },
        data: {
          amount: cartItem.amount + amount,
          size,
        },
      });
    }
  }

  else if (!cartItem && !EProductId) {

    
    if (amount != undefined) {
      cartItem = await db.cartItem.create({
        data: { amount, productId, cartId, size },
      });
    }
  }

  else {
    if (EProductId != undefined) {


      cartItem = await db.cartItem.create({
        data: { EProductId, cartId, amount },
      });
    }
  }
};

export const updateCart = async (cart: Cart) => {
  const cartItems = await db.cartItem.findMany({
    where: {
      cartId: cart.id,
    },
    include: {
      product: true,
      EProduct: true,
    },
    orderBy: {
      createdAt: "asc",
    },
  });
  let numItemsInCart = 0;
  let cartTotal = 0;

  for (const item of cartItems) {
    numItemsInCart += item.amount ?? 1;
    const surcharge = item.size === "medium" ? 100 : 0;

    if (item.size && item.amount && item?.product?.price) {
      cartTotal += item.amount * (Number(surcharge) + item.product.price);
      console.log(item.amount, '54321');
      console.log((Number(surcharge) + item.product.price), '6789');
      
    } else {
      if (item?.product?.price|| item?.EProduct?.price) {
        const pricetoUse = item?.product?.price?item.product.price: item!.EProduct!.price
        cartTotal += pricetoUse
      }
    }
  }
  const tax = cart.taxRate * cartTotal;
  console.log(tax, '12345');
  console.log(cart.taxRate, '12345');
  
  //DEBUG WHY TAX IS NOT BEING SAVED
  const shipping = cartTotal ? cart.shipping : 0;
  const shouldHaveShipping = cartItems.filter((cartItem) => {
    return cartItem.productId != null
  })

  
  const orderTotal = shouldHaveShipping?.length>0? cartTotal + tax + shipping: cartTotal + tax

  const currentCart = await db.cart.update({
    where: {
      id: cart.id,
    },
    data: {
      numItemsInCart,
      cartTotal,
      tax: tax,
      orderTotal,
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
  return { cartItems, currentCart };
};

export const isEProductInCart = async (productId: string) => {
  const cartItems = await identifyCart()

  
  // const cartItems = await db.cartItem.findMany({
  //   where: {
  //     cartId: cart.id,
  //   },
  //   include: {
  //     product: true,
  //     EProduct: true,
  //   },
  //   orderBy: {
  //     createdAt: "asc",
  //   },
  // });
  const matchingEProductId = cartItems?.map(cartItem => cartItem.EProductId === productId).filter(match => match === true)

  

  return matchingEProductId?.length? matchingEProductId[0] : false
}

export const addToCartAction = async (prevState: any, formData: FormData) => {
  const user = await getAuthUser();
  let productId = "";
  let EProductId = "";
  let RedirectTo = "/cart";
  let amount;
  let size;
  try {
    productId = formData.get("productId") as string;
    EProductId = formData.get("EProductId") as string;
    RedirectTo = formData.get("RedirectTo") as string;
    if (productId) {
      amount = Number(formData.get("amount"));
      size = String(formData.get("size"));
      await fetchProduct(productId);
    }
    if (EProductId) {
      amount = Number(formData.get("amount"));
    }
    const cart = await fetchOrCreateCart({ userId: user.id });
    await updateOrCreateCartItem({
      productId,
      EProductId,
      cartId: cart.id,
      amount,
      size,
    });

    await updateCart(cart);
  } catch (error) {
    
    return renderError(error);
  }
  revalidateTag('/cart')
  // return renderSuccess();
  return {message: 'Added to Cart', shouldDisableButton: !!EProductId}
  // const {
  //   url: { pathname },
  // } = prevState;

  // redirect(RedirectTo);


};

export const addEProductToCartAction = async (
  prevState: any,
  formData: FormData
) => {
  const user = await getAuthUser();
  let productId = "";
  try {
    productId = formData.get("productId") as string;
    await fetchProduct(productId);
    const cart = await fetchOrCreateCart({ userId: user.id });
    await updateOrCreateCartItem({ productId, cartId: cart.id });
    await updateCart(cart);

  } catch (error) {
    return renderError(error);
  }
  return {message: 'test'}
  redirect(`/products/${productId}`);
};

export const removeCartItemAction = async (
  prevState: any,
  formData: FormData
) => {
  const user = await getAuthUser();
  try {
    const cartItemId = formData.get("id") as string;
    const cart = await fetchOrCreateCart({
      userId: user.id,
      errorOnFailure: true,
    });

    await db.cartItem.delete({
      where: {
        id: cartItemId,
        cartId: cart.id,
      },
    });

    await updateCart(cart);
    revalidatePath("/cart");
    return { message: "Item removed from cart" };
  } catch (error) {
    return renderError(error);
  }
};

export const updateCartItemAction = async ({
  amount,
  cartItemId,
}: {
  amount: number;
  cartItemId: string;
}) => {
  const user = await getAuthUser();

  try {
    const cart = await fetchOrCreateCart({
      userId: user.id,
      errorOnFailure: true,
    });
    await db.cartItem.update({
      where: {
        id: cartItemId,
        cartId: cart.id,
      },
      data: {
        amount,
      },
    });
    await updateCart(cart);
    revalidatePath("/cart");
    return { message: "cart updated" };
  } catch (error) {
    return renderError(error);
  }
};

export const createOrderAction = async (prevState: any, formData: FormData) => {
  const user = await getAuthUser();
  console.log(user, 'ZZZZZZZ');
  
  const fullName = `${user.firstName} ${user.lastName}`;


  let orderId: null | string = null;
  let cartId: null | string = null;

  try {
    const cart = await fetchOrCreateCart({
      userId: user.id,
      errorOnFailure: true,
    });
    const productIDs = cart?.cartItems ? cart?.cartItems.map((cartItem) => cartItem.productId) : undefined
    cartId = cart.id;

    await db.order.deleteMany({
      where: {
        clerkId: user.id,
        isPaid: false,
      },
    });
    const productQuantities = cart?.cartItems.map((cartItem) => {
      return {
        productId: cartItem.productId,
        amount: cartItem.amount,
      };
    });
    console.log(cart, '2000');
    
    const order = await db.order.create({
      data: {
        clerkId: user.id,
        productIDs: productIDs as string[], 
        // Revisit this if errors when submitting an order for products
        products: cart.numItemsInCart,
        orderTotal: cart.orderTotal,
        tax: cart.tax,
        shipping: cart.shipping,
        email: user.emailAddresses[0].emailAddress,
        fullName,
        productQuantities,
      },
    });
    orderId = order.id;
  } catch (error) {
    return renderError(error);
  }
  redirect(`/checkout?orderId=${orderId}&cartId=${cartId}`);
};

export const createEProductOrder = async (prevState: any, formData: FormData) => {const user = await getAuthUser();
  const fullName = `${user.firstName} ${user.lastName}`;

  let orderId: null | string = null;
  let cartId: null | string = null;

  try {
    const cart = await fetchOrCreateCart({
      userId: user.id,
      errorOnFailure: true,
    });
    if (!cart?.cartItems) {
      return {message: 'no cart items, something went wrong.'}
    }

    const EProductIds = cart?.cartItems?.map((cartItem) => cartItem.EProductId).filter(item => item!=null);
    const regularProductIds = cart?.cartItems.map((cartItem) => cartItem.productId).filter(item => item != null)

    const mixedOrder = EProductIds?.length && regularProductIds?.length
    const itemIds = mixedOrder? EProductIds.concat(regularProductIds) : EProductIds

    cartId = cart.id;

    await db.order.deleteMany({
      where: {
        clerkId: user.id,
        isPaid: false,
      },
    });
let productQuantities = [{}];
    if (mixedOrder) {
      productQuantities = cart?.cartItems.map((cartItem) => {
       
          
          return {
            productId: cartItem.productId??cartItem.EProductId,
            amount: cartItem.amount,
          };
        
    });
    //FOR TOMORROW
    //Make sure its a proper type, test sending it out
    }



    const order = await db.order.create({
      data: {
        clerkId: user.id,
        productIDs: itemIds as string[],
      
        products: cart.numItemsInCart,
        orderTotal: cart.orderTotal,
        tax: cart.tax,
        shipping: mixedOrder? cart.shipping: undefined,
        email: user.emailAddresses[0].emailAddress,
        fullName,
        productQuantities,
      },
    });
    orderId = order.id;
  } catch (error) {
    return renderError(error);
  }
  redirect(`/checkout?orderId=${orderId}&cartId=${cartId}`);
};

export const fetchUserOrders = async () => {
  const user = await getAuthUser();
  const orders = await db.order.findMany({
    where: {
      clerkId: user.id,
      isPaid: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return orders;
};

export const fetchOrder = async (orderId: string) => {
  const order = await db.order.findUnique({
    where: {
      id: orderId,
    },
  });
  return order;
};

export const fetchAdminOrders = async () => {
  const user = await getAdminUser();

  const orders = await db.order.findMany({
    where: {
      isPaid: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return orders;
};

const courier = new CourierClient({
  authorizationToken: process.env.COURIER_API_KEY,
});

export async function sendContactEmail({
  name,
  email,
  message,
}: {
  name: string;
  email: string;
  message: string;
}) {

  await courier.send({
    message: {
      to: {
        email, // Replace with your recipient email
      },
      template: "DX5DX0MT7GMCTFK3CY65WC927THZ",
    },
  });

  await courier.send({
    message: {
      to: {
        email: "adamahussain1223@gmail.com", // Replace with your recipient email
      },
      data: {
        name,
        email,
        message,
      },
      template: "Q6HCEKAAFXM5CFH41HR0RSHRWH6R",
    },
  });
}

export async function sendStockFootageForm({
  name,
  email,
  youtube,
  vimeo,
  instagram,
  tiktok,
  facebook,
  website,
  independent,
  advertisement,
  other,
}: {
  name: string;
  email: string;
  youtube?: string;
  vimeo?: string;
  instagram?: string;
  tiktok?: string;
  facebook?: string;
  website?: string;
  independent?: string;
  advertisement?: string;
  other?: string;
}) {
  await courier.send({
    message: {
      to: {
        email: "adamahussain1223@gmail.com",
      },
      data: {
        name,
        email,
        youtube,
        vimeo,
        instagram,
        tiktok,
        facebook,
        website,
        independent,
        advertisement,
        other,
      },
      template: "W3H7RT1SB7MD4DH8M4Z5T6ACQPM1",
    },
  });
}

export async function grabVideoDownloadLinks(orderId:string) {
const existingOrder = await db.order.findFirst({
  where: {
    id: orderId
  },
  select: {
    productIDs: true
  }
}) 

const EProducts = await db.eProduct.findMany({
  where: {
    id: {
      in: existingOrder?.productIDs
    }
  }
})

const downloadLinks = EProducts.map(EProduct => ({downloadLink: EProduct.downloadLink, name: EProduct.name, thumbnail: EProduct.thumbnail}))
return downloadLinks
}