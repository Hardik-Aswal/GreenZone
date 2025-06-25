import { db } from "../../db/drizzle";
import { products, productRelations } from "../../db/schemas/product";
import { reviews } from "../../db/schemas/review";
import { eq } from "drizzle-orm";
import { InferInsertModel } from "drizzle-orm";

type NewProduct = InferInsertModel<typeof products>;

export async function getAllProducts() {
  const allProducts = await db.select().from(products);
  const allReviews = await db.select().from(reviews);

  const byProduct: Record<string, typeof allReviews> = {};
  allReviews.forEach((r) => {
    (byProduct[r.productId] ??= []).push(r);
  });

  return allProducts.map((p) => ({
    ...p,
    reviews: byProduct[p.id] || [],
    isBestSeller: Math.random() < 0.5,
  }));
}

export async function getProductById(id: string) {
  const rows = await db
    .select({
      product: products,
      review: reviews,
    })
    .from(products)
    .leftJoin(reviews, eq(reviews.productId, products.id))
    .where(eq(products.id, id));
  const { product } = rows[0];
  const allReviews = rows.map((r) => r.review);
  return { ...product, reviews: allReviews, isBestSeller: Math.random() < 0.5 };
}

export async function createProduct(data: NewProduct) {
  const [created] = await db.insert(products).values(data).returning();
  return created;
}

export async function updateProduct(id: string, data: Partial<typeof products>) {
  const [updated] = await db.update(products).set(data).where(eq(products.id, id)).returning();
  return updated;
}

export async function deleteProduct(id: string) {
  const { rowCount } = await db.delete(products).where(eq(products.id, id)).execute();
  return rowCount > 0;
}
