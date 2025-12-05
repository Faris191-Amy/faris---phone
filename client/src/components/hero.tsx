import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Truck, Shield, RotateCcw } from "lucide-react";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-primary/10">
      <div className="mx-auto max-w-7xl px-4 md:px-8 py-12 md:py-20 lg:py-28">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Content */}
          <div className="text-center lg:text-right order-2 lg:order-1">
            <Badge variant="secondary" className="mb-4" data-testid="badge-promo">
              خصم يصل إلى 30%
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6" data-testid="text-hero-title">
              أحدث الأجهزة
              <span className="block text-primary">الإلكترونية</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-xl mx-auto lg:mx-0" data-testid="text-hero-description">
              اكتشف مجموعتنا الواسعة من الهواتف الذكية، اللابتوبات، والأجهزة المنزلية بأفضل الأسعار وضمان الجودة.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link href="/category/smartphones">
                <Button size="lg" className="text-base font-semibold px-8" data-testid="button-shop-now">
                  تسوق الآن
                </Button>
              </Link>
              <Link href="#categories">
                <Button size="lg" variant="outline" className="text-base font-semibold px-8" data-testid="button-browse-categories">
                  تصفح الفئات
                </Button>
              </Link>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative order-1 lg:order-2" data-testid="img-hero">
            <div className="relative aspect-square max-w-lg mx-auto">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5 rounded-3xl transform rotate-6" />
              <div className="absolute inset-0 bg-gradient-to-tl from-primary/20 to-transparent rounded-3xl transform -rotate-3" />
              <img
                src="https://images.unsplash.com/photo-1591337676887-a217a6970a8a?w=800&h=800&fit=crop"
                alt="أحدث الأجهزة الإلكترونية"
                className="relative rounded-3xl object-cover w-full h-full shadow-2xl"
              />
            </div>
            
            {/* Floating Cards */}
            <div className="absolute -bottom-4 -right-4 bg-card rounded-xl p-4 shadow-lg border hidden md:block" data-testid="card-floating-discount">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-primary font-bold">30%</span>
                </div>
                <div>
                  <p className="font-semibold">خصم خاص</p>
                  <p className="text-sm text-muted-foreground">على جميع الهواتف</p>
                </div>
              </div>
            </div>
            
            <div className="absolute -top-4 -left-4 bg-card rounded-xl p-4 shadow-lg border hidden md:block" data-testid="card-floating-shipping">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center">
                  <Truck className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="font-semibold">شحن مجاني</p>
                  <p className="text-sm text-muted-foreground">للطلبات فوق 500</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-12 lg:mt-20">
          <div className="flex items-center gap-4 p-4 rounded-xl bg-card border" data-testid="trust-badge-shipping">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
              <Truck className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="font-semibold">شحن مجاني</p>
              <p className="text-sm text-muted-foreground">للطلبات فوق 500 ريال</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4 p-4 rounded-xl bg-card border" data-testid="trust-badge-warranty">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
              <Shield className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="font-semibold">ضمان سنتين</p>
              <p className="text-sm text-muted-foreground">على جميع المنتجات</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4 p-4 rounded-xl bg-card border" data-testid="trust-badge-returns">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
              <RotateCcw className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="font-semibold">إرجاع مجاني</p>
              <p className="text-sm text-muted-foreground">خلال 30 يوم</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
