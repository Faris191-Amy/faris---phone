import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, real, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Users table
export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Categories
export interface Category {
  id: string;
  name: string;
  nameAr: string;
  icon: string;
  image: string;
}

// Products
export interface Product {
  id: string;
  name: string;
  nameAr: string;
  description: string;
  descriptionAr: string;
  price: number;
  originalPrice?: number;
  image: string;
  images: string[];
  category: string;
  brand: string;
  rating: number;
  reviewCount: number;
  inStock: boolean;
  isNew?: boolean;
  isFeatured?: boolean;
  specs: Record<string, string>;
}

// Cart Item
export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
}

// Cart
export interface Cart {
  items: CartItem[];
  total: number;
  itemCount: number;
}

// Insert schemas for validation
export const insertProductSchema = z.object({
  name: z.string().min(1),
  nameAr: z.string().min(1),
  description: z.string().min(1),
  descriptionAr: z.string().min(1),
  price: z.number().positive(),
  originalPrice: z.number().positive().optional(),
  image: z.string().url(),
  images: z.array(z.string().url()),
  category: z.string().min(1),
  brand: z.string().min(1),
  rating: z.number().min(0).max(5),
  reviewCount: z.number().int().min(0),
  inStock: z.boolean(),
  isNew: z.boolean().optional(),
  isFeatured: z.boolean().optional(),
  specs: z.record(z.string()),
});

export type InsertProduct = z.infer<typeof insertProductSchema>;

export const addToCartSchema = z.object({
  productId: z.string().min(1),
  quantity: z.number().int().positive().default(1),
});

export type AddToCartInput = z.infer<typeof addToCartSchema>;

export const updateCartItemSchema = z.object({
  quantity: z.number().int().min(0),
});

export type UpdateCartItemInput = z.infer<typeof updateCartItemSchema>;
