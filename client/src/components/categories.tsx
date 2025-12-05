import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { 
  Smartphone, 
  Laptop, 
  Tablet, 
  Headphones, 
  Camera, 
  Tv, 
  Gamepad2, 
  Watch 
} from "lucide-react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import type { Category } from "@shared/schema";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Smartphone,
  Laptop,
  Tablet,
  Headphones,
  Camera,
  Tv,
  Gamepad2,
  Watch,
};

export function Categories() {
  const { data: categories = [], isLoading } = useQuery<Category[]>({
    queryKey: ["/api/categories"],
  });

  if (isLoading) {
    return (
      <section id="categories" className="py-12 md:py-16 bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="flex items-center justify-between mb-8">
            <Skeleton className="h-8 w-40" />
          </div>
          <div className="grid grid-cols-4 lg:grid-cols-8 gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="flex flex-col items-center gap-3 p-6">
                <Skeleton className="w-16 h-16 rounded-full" />
                <Skeleton className="h-4 w-16" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="categories" className="py-12 md:py-16 bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold" data-testid="text-categories-title">تصفح الفئات</h2>
            <p className="text-muted-foreground mt-1">اختر من بين مجموعة متنوعة من الفئات</p>
          </div>
        </div>

        {/* Mobile Scrollable */}
        <div className="md:hidden">
          <ScrollArea className="w-full whitespace-nowrap">
            <div className="flex gap-4 pb-4">
              {categories.map((category) => {
                const IconComponent = iconMap[category.icon];
                return (
                  <Link
                    key={category.id}
                    href={`/category/${category.id}`}
                    className="flex flex-col items-center gap-3 p-4 rounded-xl bg-card border min-w-[120px] hover-elevate active-elevate-2 transition-all"
                    data-testid={`card-category-${category.id}`}
                  >
                    <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
                      {IconComponent && <IconComponent className="w-7 h-7 text-primary" />}
                    </div>
                    <span className="text-sm font-medium text-center">{category.nameAr}</span>
                  </Link>
                );
              })}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </div>

        {/* Desktop Grid */}
        <div className="hidden md:grid grid-cols-4 lg:grid-cols-8 gap-4">
          {categories.map((category) => {
            const IconComponent = iconMap[category.icon];
            return (
              <Link
                key={category.id}
                href={`/category/${category.id}`}
                className="flex flex-col items-center gap-3 p-6 rounded-xl bg-card border hover-elevate active-elevate-2 transition-all group"
                data-testid={`card-category-${category.id}`}
              >
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  {IconComponent && <IconComponent className="w-8 h-8 text-primary" />}
                </div>
                <span className="text-sm font-medium text-center">{category.nameAr}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
