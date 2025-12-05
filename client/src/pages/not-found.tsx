import { Link } from "wouter";
import { Home, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { CartDrawer } from "@/components/cart-drawer";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <CartDrawer />
      
      <main className="flex-1 flex items-center justify-center py-16">
        <div className="text-center px-4">
          <div className="text-8xl font-bold text-primary mb-4" data-testid="text-404">
            404
          </div>
          <h1 className="text-2xl md:text-3xl font-bold mb-4" data-testid="text-not-found-title">
            الصفحة غير موجودة
          </h1>
          <p className="text-muted-foreground mb-8 max-w-md mx-auto" data-testid="text-not-found-description">
            عذراً، الصفحة التي تبحث عنها غير موجودة أو تم نقلها إلى عنوان آخر.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/">
              <Button className="gap-2" data-testid="button-go-home">
                <Home className="w-4 h-4" />
                الصفحة الرئيسية
              </Button>
            </Link>
            <Button variant="outline" onClick={() => window.history.back()} className="gap-2" data-testid="button-go-back">
              <ArrowRight className="w-4 h-4" />
              العودة للخلف
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
