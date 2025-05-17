import SectionTitle from "@/components/global/Sectiontitle";
import { fetchUserFavorites } from "@/utils/actions";
import ProductsGrid from "@/components/products/ProductsGrid";
import EProductsGrid from "@/components/eproducts/EProductsGrid";

async function FavoritesPage() {
  const favorites = await fetchUserFavorites();
  console.log(favorites.map(favorite => favorite.product));
  const EProducts = favorites.map(favorite => favorite.EProduct).filter(item => item != null)
  const products =favorites.map(favorite => favorite.product).filter(item => item != null)
  
  if (favorites.length === 0)
    return <SectionTitle text="You have no favorites yet." />;
  return (
    <div>
      <div className="flex justify-center">
        <img
          src={"/images/favorites4.png"}
          style={{ height: "110px" }}
          className="pt-5"
        ></img>
      </div>
      <ProductsGrid isEProduct={false} products={products} />
      <EProductsGrid EProducts={EProducts} />
    </div>
  );
}

export default FavoritesPage;
