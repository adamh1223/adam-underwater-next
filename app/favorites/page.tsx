import SectionTitle from "@/components/global/Sectiontitle";
import { fetchUserFavorites } from "@/utils/actions";
import ProductsGrid from "@/components/products/ProductsGrid";

async function FavoritesPage() {
  const favorites = await fetchUserFavorites();
  if (favorites.length === 0)
    return <SectionTitle text="You have no favorites yet." />;
  return (
    <div>
      <div className="flex justify-center">
        <img src={"/images/favorites4.png"} style={{ height: "90px" }}></img>
      </div>
      <ProductsGrid products={favorites.map((favorite) => favorite.product)} />
    </div>
  );
}

export default FavoritesPage;
