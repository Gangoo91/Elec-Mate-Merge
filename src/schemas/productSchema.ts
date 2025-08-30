import { z } from "zod";

export const productSchema = z.object({
  id: z.number(),
  name: z.string().min(1, "Product name is required"),
  category: z.string().min(1, "Category is required"),
  price: z.string().min(1, "Price is required"),
  supplier: z.string().min(1, "Supplier is required"),
  image: z.string().min(1, "Image is required"),
  isOnSale: z.boolean().optional(),
  salePrice: z.string().optional(),
  stockStatus: z.enum(["In Stock", "Low Stock", "Out of Stock"]).optional(),
  highlights: z.array(z.string()).optional().describe("The highlight or cable highlight of the product"),
});

export type ProductSchema = z.infer<typeof productSchema>;