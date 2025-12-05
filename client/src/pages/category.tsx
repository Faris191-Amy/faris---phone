import { useState, useMemo } from "react";
import { useParams, Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { ChevronRight, SlidersHorizontal, Grid3X3, LayoutList } from "lucide-react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { CartDrawer } from "@/components/cart-drawer";
import { ProductCard } from "@/components/product-card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import type { Product, Category } from "@shared/schema";

type SortOption = "featured" | "price-low" | "price-high" | "rating" | "newest";

export default function CategoryPage() {
  const { id } = useParams<{ id: string }>();
  const [sortBy, setSortBy] = useState<SortOption>("featured");
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const isAllProducts = id === "all";

  const { data: categories = [] } = useQuery<Category[]>({
    queryKey: ["/api/categories"],
  });

  const { data: category } = useQuery<Category>({
    queryKey: ["/api/categories", id],
    enabled: !isAllProducts && !!id,
  });

  const { data: baseProducts = [], isLoading } = useQuery<Product[]>({
    queryKey: isAllProducts ? ["/api/products"] : ["/api/categories", id, "products"],
  });

  // Get unique brands from products
  const availableBrands = useMemo(() => {
    const brands = new Set(baseProducts.map((p) => p.brand));
    return Array.from(brands).sort();
  }, [baseProducts]);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let result = [...baseProducts];

    // Filter by brands
    if (selectedBrands.length > 0) {
      result = result.filter((p) => selectedBrands.includes(p.brand));
    }

    // Filter by stock
    if (inStockOnly) {
      result = result.filter((p) => p.inStock);
    }

    // Sort
    switch (sortBy) {
      case "price-low":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        result.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
        result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
      default:
        result.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
    }

    return result;
  }, [baseProducts, selectedBrands, inStockOnly, sortBy]);

  const toggleBrand = (brand: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brand)
        ? prev.filter((b) => b !== brand)
        : [...prev, brand]
    );
  };

  const clearFilters = () => {
    setSelectedBrands([]);
    setInStockOnly(false);
    setSortBy("featured");
  };

  const hasActiveFilters = selectedBrands.length > 0 || inStockOnly;

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Brands */}
      <div>
        <h3 className="font-semibold mb-3">الماركة</h3>
        <div className="space-y-2">
          {availableBrands.map((brand) => (
            <label
              key={brand}
              className="flex items-center gap-2 cursor-pointer"
            >
              <Checkbox
                checked={selectedBrands.includes(brand)}
                onCheckedChange={() => toggleBrand(brand)}
                data-testid={`checkbox-brand-${brand}`}
              />
              <span className="text-sm">{brand}</span>
            </label>
          ))}
        </div>
      </div>

      <Separator />

      {/* Stock */}
      <div>
        <h3 className="font-semibold mb-3">التوفر</h3>
        <label className="flex items-center gap-2 cursor-pointer">
          <Checkbox
            checked={inStockOnly}
            onCheckedChange={(checked) => setInStockOnly(checked as boolean)}
            data-testid="checkbox-in-stock"
          />
          <span className="text-sm">متوفر فقط</span>
        </label>
      </div>

      {hasActiveFilters && (
        <>
          <Separator />
          <Button
            variant="outline"
            className="w-full"
            onClick={clearFilters}
            data-testid="button-clear-filters"
          >
            مسح الفلاتر
          </Button>
        </>
      )}
    </div>
  );

  if (!isAllProducts && !category && !isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <CartDrawer />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4" data-testid="text-not-found">الفئة غير موجودة</h1>
            <Link href="/">
              <Button data-testid="button-back-home">العودة للرئيسية</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

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
              <span className="font-medium">
                {isAllProducts ? "جميع المنتجات" : category?.nameAr}
              </span>
            </nav>
          </div>
        </div>

        {/* Category Header */}
        <section className="py-8">
          <div className="mx-auto max-w-7xl px-4 md:px-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold" data-testid="text-category-title">
                  {isAllProducts ? "جميع المنتجات" : category?.nameAr}
                </h1>
                <p className="text-muted-foreground mt-1" data-testid="text-product-count">
                  {filteredProducts.length} منتج
                </p>
              </div>

              <div className="flex items-center gap-3 flex-wrap">
                {/* Mobile Filter */}
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline" className="lg:hidden gap-2" data-testid="button-mobile-filter">
                      <SlidersHorizontal className="w-4 h-4" />
                      فلتر
                      {hasActiveFilters && (
                        <Badge variant="secondary" className="mr-1">
                          {selectedBrands.length + (inStockOnly ? 1 : 0)}
                        </Badge>
                      )}
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="right" className="w-[300px]">
                    <SheetHeader>
                      <SheetTitle>فلتر المنتجات</SheetTitle>
                    </SheetHeader>
                    <ScrollArea className="h-[calc(100vh-100px)] mt-6">
                      <FilterContent />
                    </ScrollArea>
                  </SheetContent>
                </Sheet>

                {/* Sort */}
                <Select value={sortBy} onValueChange={(v) => setSortBy(v as SortOption)}>
                  <SelectTrigger className="w-[180px]" data-testid="select-sort">
                    <SelectValue placeholder="ترتيب حسب" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="featured">المميزة</SelectItem>
                    <SelectItem value="newest">الأحدث</SelectItem>
                    <SelectItem value="price-low">السعر: الأقل أولاً</SelectItem>
                    <SelectItem value="price-high">السعر: الأعلى أولاً</SelectItem>
                    <SelectItem value="rating">التقييم</SelectItem>
                  </SelectContent>
                </Select>

                {/* View Mode */}
                <div className="hidden md:flex items-center border rounded-md">
                  <Button
                    variant={viewMode === "grid" ? "secondary" : "ghost"}
                    size="icon"
                    onClick={() => setViewMode("grid")}
                    data-testid="button-view-grid"
                  >
                    <Grid3X3 className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "secondary" : "ghost"}
                    size="icon"
                    onClick={() => setViewMode("list")}
                    data-testid="button-view-list"
                  >
                    <LayoutList className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Products Grid */}
        <section className="pb-12">
          <div className="mx-auto max-w-7xl px-4 md:px-8">
            <div className="flex gap-8">
              {/* Desktop Sidebar Filter */}
              <aside className="hidden lg:block w-64 shrink-0">
                <div className="sticky top-24 p-4 rounded-xl bg-card border">
                  <h2 className="font-semibold text-lg mb-4">الفلاتر</h2>
                  <FilterContent />
                </div>
              </aside>

              {/* Products */}
              <div className="flex-1">
                {isLoading ? (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                    {Array.from({ length: 6 }).map((_, i) => (
                      <div key={i} className="space-y-4">
                        <Skeleton className="aspect-square rounded-xl" />
                        <Skeleton className="h-4 w-3/4" />
                        <Skeleton className="h-4 w-1/2" />
                        <Skeleton className="h-6 w-24" />
                      </div>
                    ))}
                  </div>
                ) : filteredProducts.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground mb-4" data-testid="text-no-products">
                      لا توجد منتجات تطابق البحث
                    </p>
                    <Button variant="outline" onClick={clearFilters} data-testid="button-clear-filters-empty">
                      مسح الفلاتر
                    </Button>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                    {filteredProducts.map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Other Categories */}
        <section className="py-12 bg-muted/30">
          <div className="mx-auto max-w-7xl px-4 md:px-8">
            <h2 className="text-xl font-bold mb-6">تصفح فئات أخرى</h2>
            <div className="flex flex-wrap gap-3">
              {categories
                .filter((c) => c.id !== id)
                .map((cat) => (
                  <Link key={cat.id} href={`/category/${cat.id}`}>
                    <Badge 
                      variant="secondary" 
                      className="text-sm py-2 px-4 cursor-pointer"
                      data-testid={`badge-category-${cat.id}`}
                    >
                      {cat.nameAr}
                    </Badge>
                  </Link>
                ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
