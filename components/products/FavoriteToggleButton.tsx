

import { CardSignInButton } from "../form/Buttons";
import { auth } from "@clerk/nextjs/server";
import { fetchFavoriteId } from "@/utils/actions";
import FavoriteToggleForm from "./FavoriteToggleForm";

async function FavoriteToggleButton({ productId, EProductId }: { productId: string | null, EProductId: string | null }) {
  const { userId } = auth();
  if (!userId) return <CardSignInButton />;
  const favoriteId = await fetchFavoriteId({ productId, EProductId });

  return <FavoriteToggleForm favoriteId={favoriteId} productId={productId} EProductId={EProductId}/>;
}

export default FavoriteToggleButton;
