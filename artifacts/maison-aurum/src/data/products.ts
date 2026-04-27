export type JewelryCategory = 'Rings' | 'Necklaces' | 'Earrings' | 'Bridal' | 'Custom';

export interface Product {
  id: string;
  name: string;
  category: JewelryCategory;
  karat: string;
  clarity?: string;
  carat?: string;
  price: number;
  description: string;
  image: string;
  craftsmanship: string;
}

export const products: Product[] = [
  {
    id: "p-1",
    name: "Solene Solitaire",
    category: "Bridal",
    karat: "18k Yellow Gold",
    clarity: "VVS1",
    carat: "2.10ct",
    price: 18500,
    description: "A breathtaking brilliant-cut diamond suspended in our signature Cathedral setting. The Solene Solitaire allows light to enter from all angles, maximizing its natural fire.",
    image: "/images/products/solene.png",
    craftsmanship: "Hand-forged setting. 40 hours of master craftsmanship."
  },
  {
    id: "p-2",
    name: "Aurelia Eternity Band",
    category: "Rings",
    karat: "Platinum",
    clarity: "VS1",
    carat: "3.50ct tw",
    price: 8200,
    description: "An unbroken circle of exceptional emerald-cut diamonds. The Aurelia is designed to sit perfectly flush against an engagement ring or to be worn as a statement piece on its own.",
    image: "/images/products/aurelia.png",
    craftsmanship: "Individually matched and set diamonds for seamless continuity."
  },
  {
    id: "p-3",
    name: "Constellation Drop",
    category: "Earrings",
    karat: "18k White Gold",
    clarity: "VVS2",
    carat: "1.80ct tw",
    price: 6400,
    description: "Inspired by the night sky, these delicate drop earrings feature graduated diamonds that cascade elegantly, catching the light with every movement.",
    image: "/images/products/constellation.png",
    craftsmanship: "Articulated joints for fluid movement. Hand-polished finish."
  },
  {
    id: "p-4",
    name: "Lumina Pendant",
    category: "Necklaces",
    karat: "22k Yellow Gold",
    clarity: "VVS1",
    carat: "1.20ct",
    price: 4800,
    description: "A singular, extraordinary diamond held by four whisper-thin prongs on a delicate 22k gold chain. The epitome of quiet, daily luxury.",
    image: "/images/products/lumina.png",
    craftsmanship: "Custom-drawn wire chain. Micro-pavé detailing on the clasp."
  }
];
