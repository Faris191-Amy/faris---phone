import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { addToCartSchema, updateCartItemSchema } from "@shared/schema";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  // Get all products
  app.get("/api/products", async (_req, res) => {
    try {
      const products = await storage.getProducts();
      res.json(products);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch products" });
    }
  });

  // Get featured products
  app.get("/api/products/featured", async (_req, res) => {
    try {
      const products = await storage.getFeaturedProducts();
      res.json(products);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch featured products" });
    }
  });

  // Get new products
  app.get("/api/products/new", async (_req, res) => {
    try {
      const products = await storage.getNewProducts();
      res.json(products);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch new products" });
    }
  });

  // Search products
  app.get("/api/products/search", async (req, res) => {
    try {
      const query = req.query.q as string || "";
      const products = await storage.searchProducts(query);
      res.json(products);
    } catch (error) {
      res.status(500).json({ error: "Failed to search products" });
    }
  });

  // Get product by ID
  app.get("/api/products/:id", async (req, res) => {
    try {
      const product = await storage.getProductById(req.params.id);
      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }
      res.json(product);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch product" });
    }
  });

  // Get products by category
  app.get("/api/categories/:id/products", async (req, res) => {
    try {
      const products = await storage.getProductsByCategory(req.params.id);
      res.json(products);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch products" });
    }
  });

  // Get all categories
  app.get("/api/categories", async (_req, res) => {
    try {
      const categories = await storage.getCategories();
      res.json(categories);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch categories" });
    }
  });

  // Get category by ID
  app.get("/api/categories/:id", async (req, res) => {
    try {
      const category = await storage.getCategoryById(req.params.id);
      if (!category) {
        return res.status(404).json({ error: "Category not found" });
      }
      res.json(category);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch category" });
    }
  });

  // Cart routes - using session ID from cookie
  const getSessionId = (req: any): string => {
    return req.sessionID || req.headers["x-session-id"] || "default-session";
  };

  // Get cart
  app.get("/api/cart", async (req, res) => {
    try {
      const sessionId = getSessionId(req);
      const cart = await storage.getCart(sessionId);
      res.json(cart);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch cart" });
    }
  });

  // Add to cart
  app.post("/api/cart", async (req, res) => {
    try {
      const sessionId = getSessionId(req);
      const parsed = addToCartSchema.safeParse(req.body);
      
      if (!parsed.success) {
        return res.status(400).json({ error: "Invalid request body", details: parsed.error.errors });
      }

      const { productId, quantity } = parsed.data;
      const cart = await storage.addToCart(sessionId, productId, quantity);
      res.json(cart);
    } catch (error: any) {
      if (error.message === "Product not found") {
        return res.status(404).json({ error: "Product not found" });
      }
      res.status(500).json({ error: "Failed to add to cart" });
    }
  });

  // Update cart item
  app.patch("/api/cart/:itemId", async (req, res) => {
    try {
      const sessionId = getSessionId(req);
      const parsed = updateCartItemSchema.safeParse(req.body);
      
      if (!parsed.success) {
        return res.status(400).json({ error: "Invalid request body", details: parsed.error.errors });
      }

      const { quantity } = parsed.data;
      const cart = await storage.updateCartItem(sessionId, req.params.itemId, quantity);
      res.json(cart);
    } catch (error) {
      res.status(500).json({ error: "Failed to update cart" });
    }
  });

  // Remove from cart
  app.delete("/api/cart/:itemId", async (req, res) => {
    try {
      const sessionId = getSessionId(req);
      const cart = await storage.removeFromCart(sessionId, req.params.itemId);
      res.json(cart);
    } catch (error) {
      res.status(500).json({ error: "Failed to remove from cart" });
    }
  });

  // Clear cart
  app.delete("/api/cart", async (req, res) => {
    try {
      const sessionId = getSessionId(req);
      const cart = await storage.clearCart(sessionId);
      res.json(cart);
    } catch (error) {
      res.status(500).json({ error: "Failed to clear cart" });
    }
  });

  return httpServer;
}
