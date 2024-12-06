import { db } from "@/db";
import { customers } from "@/db/schema";

export async function getCustomers({
    query,
    page = 1,
    limit = 10
  }: {
    query?: string
    page: number
    limit: number
  }){
    const skip = (page - 1) * limit

    const results = await db.select()
        .from(customers)
        .limit(limit)
        .offset(skip)
    return results

}