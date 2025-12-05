import { Link } from "wouter";
import { Heart, Star, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useCart } from "@/lib/cart-context";
import { useToast } from "@/hooks/use-toast";
import type { Product } from "@shared/schema";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const { toast } = useToast();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    toast({
      title: "تمت الإضافة للسلة",
      description: `تم إضافة ${product.nameAr} إلى سلة التسوق`,
    });
  };

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <Link href={`/product/${product.id}`}>
      <Card 
        className="group overflow-hidden hover-elevate active-elevate-2 transition-all duration-300 h-full"
        data-testid={`card-product-${product.id}`}
      >
        <div className="relative aspect-square overflow-hidden bg-muted/30">
          <img
            src={product.image}
            alt={product.nameAr}
            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
          
          {/* Badges */}
          <div className="absolute top-3 right-3 flex flex-col gap-2">
            {product.isNew && (
              <Badge variant="default" className="bg-green-600" data-testid={`badge-new-${product.id}`}>
                جديد
              </Badge>
            )}
            {discount > 0 && (
              <Badge variant="destructive" data-testid={`badge-discount-${product.id}`}>
                -{discount}%
              </Badge>
            )}
          </div>

          {/* Wishlist Button */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-3 left-3 bg-background/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
            data-testid={`button-wishlist-${product.id}`}
          >
            <Heart className="w-5 h-5" />
          </Button>

          {/* Quick Add to Cart */}
          <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button 
              className="w-full gap-2" 
              onClick={handleAddToCart}
              data-testid={`button-add-cart-${product.id}`}
            >
              <ShoppingCart className="w-4 h-4" />
              أضف للسلة
            </Button>
          </div>
        </div>

        <CardContent className="p-4">
          {/* Brand */}
          <p className="text-xs text-muted-foreground mb-1" data-testid={`text-brand-${product.id}`}>
            {product.brand}
          </p>

          {/* Product Name */}
          <h3 
            className="font-semibold text-base line-clamp-2 mb-2 min-h-[2.5rem]"
            data-testid={`text-name-${product.id}`}
          >
            {product.nameAr}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-1 mb-3" data-testid={`rating-${product.id}`}>
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium">{product.rating}</span>
            <span className="text-xs text-muted-foreground">({product.reviewCount})</span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xl font-bold text-primary" data-testid={`text-price-${product.id}`}>
              {product.price.toLocaleString()} ر.س
            </span>
            {product.originalPrice && (
              <span 
                className="text-sm text-muted-foreground line-through"
                data-testid={`text-original-price-${product.id}`}
              >
                {product.originalPrice.toLocaleString()} ر.س
              </span>
            )}
          </div>

          {/* Stock Status */}
          {!product.inStock && (
            <Badge variant="secondary" className="mt-2" data-testid={`badge-out-of-stock-${product.id}`}>
              غير متوفر
            </Badge>
          )}
        </CardContent>
      </Card>
    </Link>
  );
}
