import { useSearch, Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { ChevronRight, SearchX } from "lucide-react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { CartDrawer } from "@/components/cart-drawer";
import { ProductCard } from "@/components/product-card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import type { Product } from "@shared/schema";

export default function SearchPage() {
  const searchString = useSearch();
  const params = new URLSearchParams(searchString);
  const query = params.get("q") || "";

  const searchUrl = `/api/products/search?q=${encodeURIComponent(query)}`;
  
  const { data: results = [], isLoading } = useQuery<Product[]>({
    queryKey: [searchUrl],
    enabled: !!query.trim(),
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <CartDrawer />

      <main className="flex-1">
        {/* Breadcrumb */}
        <div className="bg-muted/30 py-4">
          <div className="mx-auto max-w-7xl px-4 md:px-8">
            <nav className="flex items-center gap-2 text-sm" data-testid="breadcrumb">
              <Link href="/" className="text-muted-foreground hover:text-foreground">
                الرئيسية
              </Link>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
              <span className="font-medium">نتائج البحث</span>
            </nav>
          </div>
        </div>

        {/* Search Results */}
        <section className="py-8 md:py-12">
          <div className="mx-auto max-w-7xl px-4 md:px-8">
            <div className="mb-8">
              <h1 className="text-2xl md:text-3xl font-bold mb-2" data-testid="text-search-title">
                نتائج البحث عن "{query}"
              </h1>
              <p className="text-muted-foreground" data-testid="text-result-count">
                {results.length} نتيجة
              </p>
            </div>

            {isLoading ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="space-y-4">
                    <Skeleton className="aspect-square rounded-xl" />
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                    <Skeleton className="h-6 w-24" />
                  </div>
                ))}
              </div>
            ) : results.length === 0 ? (
              <div className="text-center py-16">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-muted flex items-center justify-center">
                  <SearchX className="w-10 h-10 text-muted-foreground" />
                </div>
                <h2 className="text-xl font-semibold mb-2" data-testid="text-no-results">
                  لا توجد نتائج
                </h2>
                <p className="text-muted-foreground mb-6">
                  لم نتمكن من العثور على منتجات تطابق بحثك. جرب كلمات بحث مختلفة.
                </p>
                <Link href="/">
                  <Button data-testid="button-browse-products">
                    تصفح المنتجات
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                {results.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
