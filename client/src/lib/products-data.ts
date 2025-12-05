import type { Product, Category } from "@shared/schema";

export const categories: Category[] = [
  {
    id: "smartphones",
    name: "Smartphones",
    nameAr: "الهواتف الذكية",
    icon: "Smartphone",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=300&fit=crop",
  },
  {
    id: "laptops",
    name: "Laptops",
    nameAr: "اللابتوبات",
    icon: "Laptop",
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=300&fit=crop",
  },
  {
    id: "tablets",
    name: "Tablets",
    nameAr: "الأجهزة اللوحية",
    icon: "Tablet",
    image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=300&fit=crop",
  },
  {
    id: "headphones",
    name: "Headphones",
    nameAr: "سماعات الرأس",
    icon: "Headphones",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop",
  },
  {
    id: "cameras",
    name: "Cameras",
    nameAr: "الكاميرات",
    icon: "Camera",
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&h=300&fit=crop",
  },
  {
    id: "tvs",
    name: "TVs",
    nameAr: "التلفزيونات",
    icon: "Tv",
    image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400&h=300&fit=crop",
  },
  {
    id: "gaming",
    name: "Gaming",
    nameAr: "الألعاب",
    icon: "Gamepad2",
    image: "https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?w=400&h=300&fit=crop",
  },
  {
    id: "accessories",
    name: "Accessories",
    nameAr: "الإكسسوارات",
    icon: "Watch",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop",
  },
];

export const products: Product[] = [
  {
    id: "iphone-15-pro",
    name: "iPhone 15 Pro Max",
    nameAr: "آيفون 15 برو ماكس",
    description: "The most powerful iPhone ever with A17 Pro chip, titanium design, and pro camera system.",
    descriptionAr: "أقوى آيفون على الإطلاق مع شريحة A17 Pro وتصميم تيتانيوم ونظام كاميرا احترافي.",
    price: 5499,
    originalPrice: 5999,
    image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=600&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=800&h=800&fit=crop",
    ],
    category: "smartphones",
    brand: "Apple",
    rating: 4.9,
    reviewCount: 2847,
    inStock: true,
    isNew: true,
    isFeatured: true,
    specs: {
      "الشاشة": "6.7 بوصة Super Retina XDR",
      "المعالج": "A17 Pro",
      "الذاكرة": "256GB",
      "الكاميرا": "48MP + 12MP + 12MP",
      "البطارية": "4422 mAh",
    },
  },
  {
    id: "samsung-s24-ultra",
    name: "Samsung Galaxy S24 Ultra",
    nameAr: "سامسونج جالاكسي S24 الترا",
    description: "Ultimate productivity with S Pen, AI features, and stunning 200MP camera.",
    descriptionAr: "إنتاجية مطلقة مع قلم S Pen وميزات الذكاء الاصطناعي وكاميرا مذهلة 200 ميجابكسل.",
    price: 4999,
    originalPrice: 5499,
    image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=600&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1585060544812-6b45742d762f?w=800&h=800&fit=crop",
    ],
    category: "smartphones",
    brand: "Samsung",
    rating: 4.8,
    reviewCount: 1923,
    inStock: true,
    isFeatured: true,
    specs: {
      "الشاشة": "6.8 بوصة Dynamic AMOLED",
      "المعالج": "Snapdragon 8 Gen 3",
      "الذاكرة": "256GB",
      "الكاميرا": "200MP + 12MP + 50MP + 10MP",
      "البطارية": "5000 mAh",
    },
  },
  {
    id: "macbook-pro-m3",
    name: "MacBook Pro 16 M3 Max",
    nameAr: "ماك بوك برو 16 M3 ماكس",
    description: "Supercharged by M3 Max chip for extreme performance. Up to 22 hours battery life.",
    descriptionAr: "مدعوم بشريحة M3 Max للأداء الفائق. حتى 22 ساعة عمر البطارية.",
    price: 12999,
    originalPrice: 14999,
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=800&h=800&fit=crop",
    ],
    category: "laptops",
    brand: "Apple",
    rating: 4.9,
    reviewCount: 1456,
    inStock: true,
    isNew: true,
    isFeatured: true,
    specs: {
      "الشاشة": "16.2 بوصة Liquid Retina XDR",
      "المعالج": "Apple M3 Max",
      "الذاكرة": "36GB RAM / 512GB SSD",
      "البطارية": "22 ساعة",
      "الوزن": "2.14 كجم",
    },
  },
  {
    id: "dell-xps-15",
    name: "Dell XPS 15",
    nameAr: "ديل XPS 15",
    description: "InfinityEdge display with stunning 3.5K OLED. Intel Core i9 processor.",
    descriptionAr: "شاشة InfinityEdge مذهلة بدقة 3.5K OLED. معالج Intel Core i9.",
    price: 7499,
    image: "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=600&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=800&h=800&fit=crop",
    ],
    category: "laptops",
    brand: "Dell",
    rating: 4.7,
    reviewCount: 892,
    inStock: true,
    specs: {
      "الشاشة": "15.6 بوصة 3.5K OLED",
      "المعالج": "Intel Core i9-13900H",
      "الذاكرة": "32GB RAM / 1TB SSD",
      "البطارية": "13 ساعة",
      "الوزن": "1.86 كجم",
    },
  },
  {
    id: "ipad-pro-m2",
    name: "iPad Pro 12.9 M2",
    nameAr: "آيباد برو 12.9 M2",
    description: "Supercharged by M2 chip. Stunning Liquid Retina XDR display.",
    descriptionAr: "مدعوم بشريحة M2. شاشة Liquid Retina XDR مذهلة.",
    price: 4499,
    originalPrice: 4999,
    image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=600&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800&h=800&fit=crop",
    ],
    category: "tablets",
    brand: "Apple",
    rating: 4.8,
    reviewCount: 1234,
    inStock: true,
    isFeatured: true,
    specs: {
      "الشاشة": "12.9 بوصة Liquid Retina XDR",
      "المعالج": "Apple M2",
      "الذاكرة": "256GB",
      "الكاميرا": "12MP + 10MP",
      "البطارية": "10 ساعات",
    },
  },
  {
    id: "airpods-pro-2",
    name: "AirPods Pro 2",
    nameAr: "إيربودز برو 2",
    description: "Active Noise Cancellation. Adaptive Audio. Personalized Spatial Audio.",
    descriptionAr: "إلغاء الضوضاء النشط. صوت تكيفي. صوت مكاني مخصص.",
    price: 999,
    image: "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=600&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=800&h=800&fit=crop",
    ],
    category: "headphones",
    brand: "Apple",
    rating: 4.9,
    reviewCount: 3456,
    inStock: true,
    isNew: true,
    specs: {
      "نوع": "داخل الأذن لاسلكي",
      "إلغاء الضوضاء": "نشط",
      "البطارية": "6 ساعات + 30 ساعة مع العلبة",
      "مقاومة الماء": "IPX4",
    },
  },
  {
    id: "sony-wh-1000xm5",
    name: "Sony WH-1000XM5",
    nameAr: "سوني WH-1000XM5",
    description: "Industry-leading noise cancellation. 30 hours battery. Premium comfort.",
    descriptionAr: "إلغاء ضوضاء رائد في الصناعة. بطارية 30 ساعة. راحة فائقة.",
    price: 1499,
    originalPrice: 1799,
    image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=600&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=800&h=800&fit=crop",
    ],
    category: "headphones",
    brand: "Sony",
    rating: 4.8,
    reviewCount: 2134,
    inStock: true,
    isFeatured: true,
    specs: {
      "نوع": "فوق الأذن لاسلكي",
      "إلغاء الضوضاء": "نشط متقدم",
      "البطارية": "30 ساعة",
      "الوزن": "250 جرام",
    },
  },
  {
    id: "sony-a7-iv",
    name: "Sony A7 IV",
    nameAr: "سوني A7 IV",
    description: "Full-frame mirrorless camera. 33MP sensor. Real-time Eye AF.",
    descriptionAr: "كاميرا فول فريم بدون مرآة. مستشعر 33 ميجابكسل. تركيز تلقائي على العين.",
    price: 9999,
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&h=800&fit=crop",
    ],
    category: "cameras",
    brand: "Sony",
    rating: 4.9,
    reviewCount: 876,
    inStock: true,
    specs: {
      "المستشعر": "Full-frame 33.0 MP",
      "الفيديو": "4K 60fps",
      "ISO": "100-51200",
      "التثبيت": "5-axis IBIS",
    },
  },
  {
    id: "lg-oled-c3",
    name: "LG OLED C3 65\"",
    nameAr: "إل جي OLED C3 65 بوصة",
    description: "Self-lit OLED pixels. Infinite contrast. 120Hz gaming.",
    descriptionAr: "بكسلات OLED ذاتية الإضاءة. تباين لا نهائي. ألعاب 120Hz.",
    price: 7999,
    originalPrice: 8999,
    image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=600&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=800&h=800&fit=crop",
    ],
    category: "tvs",
    brand: "LG",
    rating: 4.8,
    reviewCount: 1567,
    inStock: true,
    isFeatured: true,
    specs: {
      "الشاشة": "65 بوصة OLED evo",
      "الدقة": "4K UHD",
      "معدل التحديث": "120Hz",
      "HDR": "Dolby Vision, HDR10",
      "الصوت": "Dolby Atmos",
    },
  },
  {
    id: "ps5",
    name: "PlayStation 5",
    nameAr: "بلايستيشن 5",
    description: "Lightning-fast loading. 4K gaming at 120fps. DualSense controller.",
    descriptionAr: "تحميل فائق السرعة. ألعاب 4K بمعدل 120 إطار. يد تحكم DualSense.",
    price: 2199,
    image: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=600&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=800&h=800&fit=crop",
    ],
    category: "gaming",
    brand: "Sony",
    rating: 4.9,
    reviewCount: 4532,
    inStock: true,
    isFeatured: true,
    specs: {
      "المعالج": "AMD Zen 2",
      "الذاكرة": "825GB SSD",
      "الدقة": "حتى 8K",
      "معدل الإطارات": "حتى 120fps",
    },
  },
  {
    id: "apple-watch-ultra-2",
    name: "Apple Watch Ultra 2",
    nameAr: "ساعة أبل الترا 2",
    description: "The most rugged Apple Watch. 36 hours battery. Precision dual-frequency GPS.",
    descriptionAr: "أقوى ساعة أبل. بطارية 36 ساعة. GPS مزدوج التردد عالي الدقة.",
    price: 3499,
    image: "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=600&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=800&h=800&fit=crop",
    ],
    category: "accessories",
    brand: "Apple",
    rating: 4.8,
    reviewCount: 1823,
    inStock: true,
    isNew: true,
    specs: {
      "الشاشة": "49mm Always-On Retina",
      "البطارية": "36 ساعة",
      "مقاومة الماء": "100 متر",
      "المستشعرات": "GPS, ECG, SpO2",
    },
  },
  {
    id: "samsung-galaxy-watch-6",
    name: "Samsung Galaxy Watch 6",
    nameAr: "سامسونج جالاكسي واتش 6",
    description: "Advanced health monitoring. Sleek design. Long-lasting battery.",
    descriptionAr: "مراقبة صحية متقدمة. تصميم أنيق. بطارية طويلة الأمد.",
    price: 1299,
    originalPrice: 1499,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&h=800&fit=crop",
    ],
    category: "accessories",
    brand: "Samsung",
    rating: 4.6,
    reviewCount: 987,
    inStock: true,
    specs: {
      "الشاشة": "44mm Super AMOLED",
      "البطارية": "40 ساعة",
      "مقاومة الماء": "50 متر",
      "المستشعرات": "GPS, ECG, BIA",
    },
  },
];

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getProductsByCategory(categoryId: string): Product[] {
  return products.filter((p) => p.category === categoryId);
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.isFeatured);
}

export function getNewProducts(): Product[] {
  return products.filter((p) => p.isNew);
}

export function searchProducts(query: string): Product[] {
  const lowerQuery = query.toLowerCase();
  return products.filter(
    (p) =>
      p.name.toLowerCase().includes(lowerQuery) ||
      p.nameAr.includes(query) ||
      p.brand.toLowerCase().includes(lowerQuery) ||
      p.category.toLowerCase().includes(lowerQuery)
  );
}

export function getCategoryById(id: string): Category | undefined {
  return categories.find((c) => c.id === id);
}
