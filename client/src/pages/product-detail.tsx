import { useState } from "react";
import { useParams, Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { 
  ChevronRight, 
  Star, 
  Minus, 
  Plus, 
  Heart, 
  Share2, 
  Truck, 
  Shield, 
  RotateCcw,
  Check,
  Loader2
} from "lucide-react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { CartDrawer } from "@/components/cart-drawer";
import { ProductGrid } from "@/components/product-grid";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { useCart } from "@/lib/cart-context";
import { useToast } from "@/hooks/use-toast";
import type { Product, Category } from "@shared/schema";

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const { addToCart } = useCart();
  const { toast } = useToast();

  const { data: product, isLoading: loadingProduct } = useQuery<Product>({
    queryKey: ["/api/products", id],
  });

  const { data: category } = useQuery<Category>({
    queryKey: ["/api/categories", product?.category],
    enabled: !!product?.category,
  });

  const { data: relatedProducts = [] } = useQuery<Product[]>({
    queryKey: ["/api/categories", product?.category, "products"],
    enabled: !!product?.category,
    select: (data) => data.filter((p) => p.id !== id).slice(0, 4),
  });
  
  if (loadingProduct) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <CartDrawer />
        <main className="flex-1">
          <div className="bg-muted/30 py-4">
            <div className="mx-auto max-w-7xl px-4 md:px-8">
              <Skeleton className="h-5 w-64" />
            </div>
          </div>
          <section className="py-8 md:py-12">
            <div className="mx-auto max-w-7xl px-4 md:px-8">
              <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
                <Skeleton className="aspect-square rounded-xl" />
                <div className="space-y-4">
                  <Skeleton className="h-6 w-24" />
                  <Skeleton className="h-10 w-3/4" />
                  <Skeleton className="h-6 w-32" />
                  <Skeleton className="h-8 w-40" />
                  <Skeleton className="h-20 w-full" />
                  <Skeleton className="h-12 w-full" />
                </div>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <CartDrawer />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4" data-testid="text-not-found">المنتج غير موجود</h1>
            <Link href="/">
              <Button data-testid="button-back-home">العودة للرئيسية</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleAddToCart = () => {
    addToCart(product, quantity);
    toast({
      title: "تمت الإضافة للسلة",
      description: `تم إضافة ${quantity} من ${product.nameAr} إلى سلة التسوق`,
    });
  };

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
              {category && (
                <>
                  <Link 
                    href={`/category/${category.id}`} 
                    className="text-muted-foreground hover:text-foreground"
                  >
                    {category.nameAr}
                  </Link>
                  <ChevronRight className="w-4 h-4 text-muted-foreground" />
                </>
              )}
              <span className="font-medium truncate max-w-[200px]">{product.nameAr}</span>
            </nav>
          </div>
        </div>

        {/* Product Section */}
        <section className="py-8 md:py-12">
          <div className="mx-auto max-w-7xl px-4 md:px-8">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
              {/* Image Gallery */}
              <div className="space-y-4">
                <div className="aspect-square rounded-xl overflow-hidden bg-muted/30" data-testid="img-main">
                  <img
                    src={product.images[selectedImage] || product.image}
                    alt={product.nameAr}
                    className="w-full h-full object-cover"
                  />
                </div>
                {product.images.length > 1 && (
                  <div className="flex gap-3 overflow-x-auto pb-2">
                    {product.images.map((img, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImage(index)}
                        className={`shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                          selectedImage === index ? "border-primary" : "border-transparent"
                        }`}
                        data-testid={`button-thumbnail-${index}`}
                      >
                        <img
                          src={img}
                          alt={`${product.nameAr} - ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div>
                {/* Badges */}
                <div className="flex gap-2 mb-4">
                  {product.isNew && (
                    <Badge variant="default" className="bg-green-600" data-testid="badge-new">
                      جديد
                    </Badge>
                  )}
                  {discount > 0 && (
                    <Badge variant="destructive" data-testid="badge-discount">
                      خصم {discount}%
                    </Badge>
                  )}
                </div>

                {/* Brand */}
                <p className="text-muted-foreground mb-2" data-testid="text-brand">
                  {product.brand}
                </p>

                {/* Name */}
                <h1 className="text-2xl md:text-3xl font-bold mb-4" data-testid="text-product-name">
                  {product.nameAr}
                </h1>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-6" data-testid="rating">
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < Math.floor(product.rating)
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-muted"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="font-medium">{product.rating}</span>
                  <span className="text-muted-foreground">({product.reviewCount} تقييم)</span>
                </div>

                {/* Price */}
                <div className="flex items-center gap-4 mb-6">
                  <span className="text-3xl font-bold text-primary" data-testid="text-price">
                    {product.price.toLocaleString()} ر.س
                  </span>
                  {product.originalPrice && (
                    <span className="text-xl text-muted-foreground line-through" data-testid="text-original-price">
                      {product.originalPrice.toLocaleString()} ر.س
                    </span>
                  )}
                  {discount > 0 && (
                    <Badge variant="secondary" data-testid="text-savings">
                      وفر {(product.originalPrice! - product.price).toLocaleString()} ر.س
                    </Badge>
                  )}
                </div>

                {/* Description */}
                <p className="text-muted-foreground mb-6" data-testid="text-description">
                  {product.descriptionAr}
                </p>

                {/* Stock Status */}
                <div className="flex items-center gap-2 mb-6">
                  {product.inStock ? (
                    <>
                      <Check className="w-5 h-5 text-green-600" />
                      <span className="text-green-600 font-medium" data-testid="text-in-stock">متوفر في المخزون</span>
                    </>
                  ) : (
                    <span className="text-destructive font-medium" data-testid="text-out-of-stock">غير متوفر</span>
                  )}
                </div>

                <Separator className="my-6" />

                {/* Quantity & Add to Cart */}
                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-medium">الكمية:</span>
                    <div className="flex items-center border rounded-md">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        disabled={quantity <= 1}
                        data-testid="button-decrease-quantity"
                      >
                        <Minus className="w-4 h-4" />
                      </Button>
                      <span className="w-12 text-center font-medium" data-testid="text-quantity">
                        {quantity}
                      </span>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setQuantity(quantity + 1)}
                        data-testid="button-increase-quantity"
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  <Button 
                    size="lg" 
                    className="flex-1 text-base"
                    onClick={handleAddToCart}
                    disabled={!product.inStock}
                    data-testid="button-add-to-cart"
                  >
                    أضف للسلة
                  </Button>
                </div>

                {/* Actions */}
                <div className="flex gap-3 mb-8">
                  <Button variant="outline" className="gap-2" data-testid="button-wishlist">
                    <Heart className="w-4 h-4" />
                    إضافة للمفضلة
                  </Button>
                  <Button variant="outline" className="gap-2" data-testid="button-share">
                    <Share2 className="w-4 h-4" />
                    مشاركة
                  </Button>
                </div>

                {/* Delivery Info */}
                <div className="space-y-3 p-4 rounded-xl bg-muted/30">
                  <div className="flex items-center gap-3">
                    <Truck className="w-5 h-5 text-primary" />
                    <div>
                      <p className="font-medium">توصيل سريع</p>
                      <p className="text-sm text-muted-foreground">استلم خلال 2-3 أيام عمل</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Shield className="w-5 h-5 text-primary" />
                    <div>
                      <p className="font-medium">ضمان سنتين</p>
                      <p className="text-sm text-muted-foreground">ضمان شامل من الوكيل</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <RotateCcw className="w-5 h-5 text-primary" />
                    <div>
                      <p className="font-medium">إرجاع مجاني</p>
                      <p className="text-sm text-muted-foreground">خلال 30 يوم من الشراء</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <Tabs defaultValue="specs" className="mt-12">
              <TabsList className="w-full justify-start border-b rounded-none h-auto p-0 bg-transparent">
                <TabsTrigger 
                  value="specs" 
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
                  data-testid="tab-specs"
                >
                  المواصفات
                </TabsTrigger>
                <TabsTrigger 
                  value="reviews"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
                  data-testid="tab-reviews"
                >
                  التقييمات ({product.reviewCount})
                </TabsTrigger>
              </TabsList>

              <TabsContent value="specs" className="mt-6" data-testid="content-specs">
                <div className="grid gap-4 max-w-2xl">
                  {Object.entries(product.specs).map(([key, value]) => (
                    <div key={key} className="flex border-b pb-3">
                      <span className="w-1/3 text-muted-foreground">{key}</span>
                      <span className="w-2/3 font-medium">{value}</span>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="reviews" className="mt-6" data-testid="content-reviews">
                <div className="text-center py-12 text-muted-foreground">
                  <p>لا توجد تقييمات بعد. كن أول من يقيم هذا المنتج!</p>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <ProductGrid
            title="منتجات مشابهة"
            products={relatedProducts}
            viewAllLink={`/category/${product.category}`}
          />
        )}
      </main>

      <Footer />
    </div>
  );
}
