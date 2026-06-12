import { useState, useEffect } from 'react';

export type JewelryCategory = 'Rings' | 'Necklaces' | 'Earrings' | 'Bridal' | 'Custom';

export interface Product {
  id: string;
  name: string;
  category: JewelryCategory;
  karat: string;
  clarity?: string;
  description: string;
  image: string;
  craftsmanship: string;
  tags?: string;
  featured?: boolean;
  heroShowcase?: boolean;
}

const defaultProducts: Product[] = [
  {
    id: "p-1",
    name: "Solene Solitaire",
    category: "Bridal",
    karat: "18k Yellow Gold",
    clarity: "VVS1",
    description: "A breathtaking brilliant-cut diamond suspended in our signature Cathedral setting. The Solene Solitaire allows light to enter from all angles, maximizing its natural fire.",
    image: "/images/products/solene.png",
    craftsmanship: "Hand-forged setting. 40 hours of master craftsmanship.",
    featured: true,
    heroShowcase: false
  },
  {
    id: "p-2",
    name: "Aurelia Eternity Band",
    category: "Rings",
    karat: "Platinum",
    clarity: "VS1",
    description: "An unbroken circle of exceptional emerald-cut diamonds. The Aurelia is designed to sit perfectly flush against an engagement ring or to be worn as a statement piece on its own.",
    image: "/images/products/aurelia.png",
    craftsmanship: "Individually matched and set diamonds for seamless continuity.",
    featured: false,
    heroShowcase: false
  },
  {
    id: "p-3",
    name: "Constellation Drop",
    category: "Earrings",
    karat: "18k White Gold",
    clarity: "VVS2",
    description: "Inspired by the night sky, these delicate drop earrings feature graduated diamonds that cascade elegantly, catching the light with every movement.",
    image: "/images/products/constellation.png",
    craftsmanship: "Articulated joints for fluid movement. Hand-polished finish.",
    featured: false,
    heroShowcase: false
  },
  {
    id: "p-4",
    name: "Lumina Pendant",
    category: "Necklaces",
    karat: "22k Yellow Gold",
    clarity: "VVS1",
    description: "A singular, extraordinary diamond held by four whisper-thin prongs on a delicate 22k gold chain. The epitome of quiet, daily luxury.",
    image: "/images/products/lumina.png",
    craftsmanship: "Custom-drawn wire chain. Micro-pavé detailing on the clasp.",
    featured: false,
    heroShowcase: false
  }
];

type Listener = (products: Product[]) => void;
let listeners: Listener[] = [];

export const productStore = {
  getProducts: (): Product[] => {
    const stored = localStorage.getItem('sga_products_v1');
    if (stored) {
      return JSON.parse(stored);
    }
    localStorage.setItem('sga_products_v1', JSON.stringify(defaultProducts));
    return defaultProducts;
  },

  addProduct: (product: Product) => {
    const products = productStore.getProducts();
    products.push(product);
    localStorage.setItem('sga_products_v1', JSON.stringify(products));
    productStore.notify(products);
  },

  updateProduct: (id: string, updatedProduct: Product) => {
    const products = productStore.getProducts();
    const index = products.findIndex(p => p.id === id);
    if (index !== -1) {
      products[index] = updatedProduct;
      localStorage.setItem('sga_products_v1', JSON.stringify(products));
      productStore.notify(products);
    }
  },

  deleteProduct: (id: string) => {
    const products = productStore.getProducts();
    const filtered = products.filter(p => p.id !== id);
    localStorage.setItem('sga_products_v1', JSON.stringify(filtered));
    productStore.notify(filtered);
  },

  reorderProducts: (newOrder: Product[]) => {
    localStorage.setItem('sga_products_v1', JSON.stringify(newOrder));
    productStore.notify(newOrder);
  },

  toggleFeatured: (id: string) => {
    const products = productStore.getProducts();
    // Only one product can be featured at a time
    const updated = products.map(p => ({
      ...p,
      featured: p.id === id ? !p.featured : false
    }));
    localStorage.setItem('sga_products_v1', JSON.stringify(updated));
    productStore.notify(updated);
  },

  toggleHeroShowcase: (id: string) => {
    const products = productStore.getProducts();
    const updated = products.map(p => ({
      ...p,
      heroShowcase: p.id === id ? !p.heroShowcase : p.heroShowcase
    }));
    localStorage.setItem('sga_products_v1', JSON.stringify(updated));
    productStore.notify(updated);
  },

  exportJSON: (): string => {
    const products = productStore.getProducts();
    return JSON.stringify(products, null, 2);
  },

  importJSON: (json: string): boolean => {
    try {
      const products = JSON.parse(json) as Product[];
      if (!Array.isArray(products)) return false;
      // Basic validation
      for (const p of products) {
        if (!p.id || !p.name || !p.category) return false;
      }
      localStorage.setItem('sga_products_v1', JSON.stringify(products));
      productStore.notify(products);
      return true;
    } catch {
      return false;
    }
  },

  subscribe: (listener: Listener) => {
    listeners.push(listener);
    return () => {
      listeners = listeners.filter(l => l !== listener);
    };
  },

  notify: (products: Product[]) => {
    listeners.forEach(listener => listener(products));
  }
};

// Listen for storage events from other tabs
if (typeof window !== 'undefined') {
  window.addEventListener('storage', (e) => {
    if (e.key === 'sga_products_v1' && e.newValue) {
      productStore.notify(JSON.parse(e.newValue));
    }
  });
}

export function useProducts() {
  const [products, setProducts] = useState<Product[]>(productStore.getProducts());

  useEffect(() => {
    const unsubscribe = productStore.subscribe(setProducts);
    return unsubscribe;
  }, []);

  return products;
}
