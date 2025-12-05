import { Link } from "wouter";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/product-card";
import { Skeleton } from "@/components/ui/skeleton";
import type { Product } from "@shared/schema";

interface ProductGridProps {
  title: string;
  products: Product[];
  viewAllLink?: string;
  isLoading?: boolean;
  emptyMessage?: string;
}

export function ProductGrid({ 
  title, 
  products, 
  viewAllLink, 
  isLoading = false,
  emptyMessage = "لا توجد منتجات"
}: ProductGridProps) {
  if (isLoading) {
    return (
      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="flex items-center justify-between mb-8">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-10 w-28" />
          </div>
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
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="flex items-center justify-between gap-4 mb-8">
          <h2 className="text-2xl md:text-3xl font-bold" data-testid={`text-section-title-${title}`}>
            {title}
          </h2>
          {viewAllLink && (
            <Link href={viewAllLink}>
              <Button variant="ghost" className="gap-1" data-testid={`button-view-all-${title}`}>
                عرض الكل
                <ChevronLeft className="w-4 h-4" />
              </Button>
            </Link>
          )}
        </div>

        {products.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground" data-testid="text-empty-products">
            {emptyMessage}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
