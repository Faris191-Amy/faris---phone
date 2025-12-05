import { useQuery } from "@tanstack/react-query";
import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { Categories } from "@/components/categories";
import { ProductGrid } from "@/components/product-grid";
import { Footer } from "@/components/footer";
import { CartDrawer } from "@/components/cart-drawer";
import type { Product } from "@shared/schema";

export default function Home() {
  const { data: featuredProducts = [], isLoading: loadingFeatured } = useQuery<Product[]>({
    queryKey: ["/api/products/featured"],
  });

  const { data: newProducts = [], isLoading: loadingNew } = useQuery<Product[]>({
    queryKey: ["/api/products/new"],
  });

  const { data: allProducts = [], isLoading: loadingAll } = useQuery<Product[]>({
    queryKey: ["/api/products"],
  });

  const bestSellers = allProducts.slice(0, 4);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <CartDrawer />
      
      <main className="flex-1">
        <Hero />
        <Categories />
        
        <ProductGrid
          title="المنتجات المميزة"
          products={featuredProducts}
          viewAllLink="/category/all"
          isLoading={loadingFeatured}
        />

        {/* Sale Banner */}
        <section className="py-12 md:py-16 bg-primary text-primary-foreground">
          <div className="mx-auto max-w-7xl px-4 md:px-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-right">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-2" data-testid="text-sale-title">
                  عروض نهاية السنة
                </h2>
                <p className="text-primary-foreground/80 text-lg" data-testid="text-sale-description">
                  خصومات تصل إلى 50% على مجموعة مختارة من المنتجات
                </p>
              </div>
              <a href="/category/all">
                <button className="px-8 py-3 bg-background text-foreground font-semibold rounded-md hover:bg-background/90 transition-colors" data-testid="button-sale-shop">
                  تسوق الآن
                </button>
              </a>
            </div>
          </div>
        </section>

        <ProductGrid
          title="وصل حديثاً"
          products={newProducts}
          viewAllLink="/category/all"
          isLoading={loadingNew}
        />

        <ProductGrid
          title="الأكثر مبيعاً"
          products={bestSellers}
          viewAllLink="/category/all"
          isLoading={loadingAll}
        />

        {/* Features Section */}
        <section className="py-12 md:py-16 bg-muted/30">
          <div className="mx-auto max-w-7xl px-4 md:px-8">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-12" data-testid="text-why-us-title">
              لماذا تختار إلكترو ستور؟
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center p-6 rounded-xl bg-card border" data-testid="feature-original">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                  <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-lg mb-2">منتجات أصلية</h3>
                <p className="text-muted-foreground text-sm">جميع منتجاتنا أصلية 100% مع ضمان الوكيل</p>
              </div>

              <div className="text-center p-6 rounded-xl bg-card border" data-testid="feature-fast-shipping">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                  <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-lg mb-2">توصيل سريع</h3>
                <p className="text-muted-foreground text-sm">توصيل خلال 24-48 ساعة لجميع المناطق</p>
              </div>

              <div className="text-center p-6 rounded-xl bg-card border" data-testid="feature-support">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                  <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-lg mb-2">دعم فني</h3>
                <p className="text-muted-foreground text-sm">فريق دعم متخصص على مدار الساعة</p>
              </div>

              <div className="text-center p-6 rounded-xl bg-card border" data-testid="feature-payment">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                  <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-lg mb-2">دفع آمن</h3>
                <p className="text-muted-foreground text-sm">طرق دفع متعددة وآمنة 100%</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
