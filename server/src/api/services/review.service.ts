import { db } from "../../db/drizzle";
import { reviews } from "../../db/schemas/review";
import { eq } from "drizzle-orm";
import { InferInsertModel } from "drizzle-orm";

type NewReview = InferInsertModel<typeof reviews>;

export async function getReviewsByProduct(productId: string) {
  return db.select().from(reviews).where(eq(reviews.productId, productId));
}

export async function createReview(data: NewReview) {
  const [created] = await db.insert(reviews).values(data).returning();
  return created;
}
