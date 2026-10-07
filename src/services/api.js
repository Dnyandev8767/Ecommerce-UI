import { fallbackProducts } from "../data/mockProducts";

const DUMMY_JSON_URL = "https://dummyjson.com/products?limit=16";
const FAKESTORE_URL = "https://fakestoreapi.com/products";

// Maps dummyjson categories to standard store categories
const normalizeCategory = (cat) => {
  const c = (cat || "").toLowerCase();
  if (c.includes("electronic") || c.includes("laptop") || c.includes("mobile") || c.includes("smartphones") || c.includes("audio")) {
    return "electronics";
  }
  if (c.includes("jewel") || c.includes("watch") || c.includes("accessories")) {
    return "jewelery";
  }
  if (c.includes("mens") || c.includes("men")) {
    return "men's clothing";
  }
  if (c.includes("womens") || c.includes("women") || c.includes("dress") || c.includes("beauty")) {
    return "women's clothing";
  }
  return "electronics";
};

export async function fetchProductsFromAPI() {
  // First try DummyJSON which is reliable and fast
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4000);

    const response = await fetch(DUMMY_JSON_URL, { signal: controller.signal });
    clearTimeout(timeoutId);

    if (response.ok) {
      const data = await response.json();
      if (Array.isArray(data.products) && data.products.length > 0) {
        // Return normalized dummyjson products merged with our high quality fallback
        const normalized = data.products.map((item, idx) => ({
          id: item.id + 100,
          title: item.title,
          price: Number(item.price.toFixed(2)),
          originalPrice: item.discountPercentage 
            ? Number((item.price * (1 + item.discountPercentage / 100)).toFixed(2)) 
            : Number((item.price * 1.2).toFixed(2)),
          description: item.description,
          category: normalizeCategory(item.category),
          image: item.thumbnail || (item.images && item.images[0]) || fallbackProducts[idx % fallbackProducts.length].image,
          rating: {
            rate: item.rating ? Number(item.rating.toFixed(1)) : 4.5,
            count: (item.reviews && item.reviews.length) ? item.reviews.length * 35 + 12 : 120
          },
          badge: item.discountPercentage > 15 ? `${Math.round(item.discountPercentage)}% OFF` : "Popular",
          stock: item.stock || 15
        }));

        // Merge curated high-aesthetic products at top for prime visual impact
        return [...fallbackProducts, ...normalized];
      }
    }
  } catch (err) {
    console.warn("External product API fetch failed or timed out. Using fallback catalog.", err);
  }

  // Second try FakeStoreAPI if needed
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000);

    const response = await fetch(FAKESTORE_URL, { signal: controller.signal });
    clearTimeout(timeoutId);

    if (response.ok) {
      const data = await response.json();
      if (Array.isArray(data) && data.length > 0) {
        return data.map((item) => ({
          ...item,
          originalPrice: Number((item.price * 1.25).toFixed(2)),
          badge: item.rating && item.rating.rate >= 4.5 ? "Top Rated" : "Featured",
          stock: 12
        }));
      }
    }
  } catch (err) {
    console.warn("FakeStoreAPI also unavailable. Returning fallback products.", err);
  }

  // Reliable fallback guarantee
  return fallbackProducts;
}
