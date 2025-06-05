import type { NavItem, ProductCategory, HeroBanner, Brand } from "../types";
import type { ProductDetail } from "../types/product";

export const navigationItems: NavItem[] = [
  { id: "1", label: "All", href: "#" },
  { id: "2", label: "MX Player", href: "#" },
  { id: "3", label: "Sell", href: "#" },
  { id: "4", label: "Bestsellers", href: "#" },
  { id: "5", label: "Today's Deals", href: "#" },
  { id: "6", label: "Mobiles", href: "#" },
  { id: "7", label: "Prime", href: "#" },
  { id: "8", label: "Customer Service", href: "#" },
  { id: "9", label: "Fashion", href: "#" },
  { id: "10", label: "New Releases", href: "#" },
];

export const heroBanners: HeroBanner[] = [
  {
    id: "1",
    title: "Under ₹499",
    subtitle: "Toys for all",
    image: "/images/placeholder.jpg",
    ctaText: "Shop Now",
    ctaLink: "#",
  },
  {
    id: "2",
    title: "Under ₹499",
    subtitle: "Toys for all",
    image: "/images/placeholder.jpg",
    ctaText: "Shop Now",
    ctaLink: "#",
  },
];
const createProductDetail = (
  id: string,
  title: string,
  brand: string,
  price: number,
  rating: number,
  reviewCount: number,
  image: string,
  description: string,
  features: string[],
  specifications: Record<string, string>,
  options: {
    originalPrice?: number;
    discount?: string;
    isBestseller?: boolean;
  } = {}
): ProductDetail => ({
  id,
  title,
  brand,
  price,
  originalPrice: options.originalPrice,
  discount: options.discount,
  rating,
  reviewCount,
  images: [image, image, image],
  description,
  features,
  specifications,
  inStock: true,
  delivery: {
    standard: "FREE delivery by 8 Jan",
    express: "Same day delivery available",
  },
  seller: `${brand} Official Store`,
  warranty: "1 Year Limited Warranty",
  isBestseller: options.isBestseller || false,
});
export const productCategories: ProductCategory[] = [
  {
    id: "1",
    title: "PlayStation 5 Slim & Accessories",
    subtitle: "No Cost EMI*",
    products: [
      createProductDetail(
        "ps5-slim-digital",
        "PS5 Slim digital edition",
        "Sony",
        399.99,
        4.5,
        2890,
        "/placeholder.svg?height=150&width=150",
        "The PlayStation 5 Digital Edition is an all-digital version of the PS5 console with no disc drive.",
        ["Ultra-high speed SSD", "Ray tracing", "4K gaming", "Tempest 3D AudioTech"],
        {
          Storage: "825GB SSD",
          Resolution: "Up to 4K",
          "Ray Tracing": "Yes",
          "Audio Technology": "Tempest 3D AudioTech",
        },
        { isBestseller: true }
      ),
      createProductDetail(
        "ps5-slim-disc",
        "PS5 Slim disc edition",
        "Sony",
        499.99,
        4.6,
        3456,
        "/placeholder.svg?height=150&width=150",
        "The PlayStation 5 console with disc drive for physical and digital games.",
        ["Ultra-high speed SSD", "Ray tracing", "4K gaming", "Disc drive"],
        {
          Storage: "825GB SSD",
          Resolution: "Up to 4K",
          "Disc Drive": "4K UHD Blu-ray",
          "Ray Tracing": "Yes",
        },
        { isBestseller: true }
      ),
      createProductDetail(
        "ps5-fortnite",
        "PS5 Slim Fortnite digital edition",
        "Sony",
        449.99,
        4.4,
        1234,
        "/placeholder.svg?height=150&width=150",
        "PlayStation 5 Digital Edition with Fortnite bundle included.",
        ["Fortnite bundle included", "Ultra-high speed SSD", "Ray tracing", "4K gaming"],
        {
          Storage: "825GB SSD",
          Resolution: "Up to 4K",
          "Included Games": "Fortnite Bundle",
          "Ray Tracing": "Yes",
        }
      ),
      createProductDetail(
        "ps5-controller",
        "PS5 DualSense Wireless Controller",
        "Sony",
        69.99,
        4.7,
        5678,
        "/placeholder.svg?height=150&width=150",
        "The DualSense wireless controller for PlayStation 5 offers immersive haptic feedback.",
        ["Haptic feedback", "Adaptive triggers", "Built-in microphone", "Motion sensing"],
        {
          Connectivity: "Wireless",
          "Battery Life": "12-15 hours",
          "Haptic Feedback": "Yes",
          "Adaptive Triggers": "Yes",
        }
      ),
    ],
    ctaText: "See all deals",
    ctaLink: "#",
  },
  {
    id: "2",
    title: "Appliances for your home",
    subtitle: "Up to 55% off",
    products: [
      createProductDetail(
        "air-conditioner",
        "Air conditioners",
        "LG",
        599.99,
        4.2,
        2345,
        "/placeholder.svg?height=150&width=150",
        "Energy efficient air conditioner with smart features and remote control.",
        ["Energy efficient", "Smart connectivity", "Remote control", "Auto-clean function"],
        {
          Capacity: "1.5 Ton",
          "Energy Rating": "5 Star",
          Type: "Split AC",
          Refrigerant: "R32",
        },
        { originalPrice: 799.99, discount: "25% off" }
      ),
      createProductDetail(
        "refrigerator",
        "Refrigerators",
        "Samsung",
        899.99,
        4.3,
        3456,
        "/placeholder.svg?height=150&width=150",
        "Double door refrigerator with digital inverter technology and spacious storage.",
        ["Digital inverter", "Spacious storage", "Energy efficient", "Frost free"],
        {
          Capacity: "253L",
          Type: "Double Door",
          "Energy Rating": "3 Star",
          Technology: "Digital Inverter",
        },
        { originalPrice: 1199.99, discount: "25% off" }
      ),
      createProductDetail(
        "microwave",
        "Microwaves",
        "Panasonic",
        199.99,
        4.1,
        1890,
        "/placeholder.svg?height=150&width=150",
        "Convection microwave oven with multiple cooking modes and auto-cook menus.",
        ["Convection cooking", "Auto-cook menus", "Digital display", "Child safety lock"],
        {
          Capacity: "27L",
          Type: "Convection",
          Power: "900W",
          "Auto Cook": "101 menus",
        },
        { originalPrice: 299.99, discount: "33% off" }
      ),
      createProductDetail(
        "washing-machine",
        "Washing machines",
        "Whirlpool",
        499.99,
        4.4,
        2567,
        "/placeholder.svg?height=150&width=150",
        "Front load washing machine with multiple wash programs and energy efficiency.",
        ["Front load", "Multiple wash programs", "Energy efficient", "Quick wash"],
        {
          Capacity: "7 kg",
          Type: "Front Load",
          "Energy Rating": "5 Star",
          "Wash Programs": "12",
        },
        { originalPrice: 699.99, discount: "29% off" }
      ),
    ],
    ctaText: "See more",
    ctaLink: "#",
  },
  {
    id: "3",
    title: "Revamp your home in style",
    products: [
      createProductDetail(
        "cushion-covers",
        "Cushion covers, bedsheets & more",
        "HomeFab",
        29.99,
        4.0,
        1234,
        "/placeholder.svg?height=150&width=150",
        "Premium quality cushion covers and bedsheets made from soft cotton fabric.",
        ["100% cotton", "Machine washable", "Fade resistant", "Soft texture"],
        {
          Material: "100% Cotton",
          "Thread Count": "200 TC",
          Care: "Machine washable",
          Size: "Standard",
        }
      ),
      createProductDetail(
        "figurines-vases",
        "Figurines, vases & more",
        "DecorArt",
        49.99,
        4.2,
        890,
        "/placeholder.svg?height=150&width=150",
        "Decorative figurines and vases to enhance your home decor with artistic touch.",
        ["Artistic design", "Durable material", "Easy to clean", "Decorative"],
        {
          Material: "Ceramic",
          Style: "Modern",
          Care: "Wipe clean",
          Type: "Decorative",
        }
      ),
      createProductDetail(
        "home-storage",
        "Home storage",
        "StorageMax",
        39.99,
        4.3,
        1567,
        "/placeholder.svg?height=150&width=150",
        "Versatile storage solutions for organizing your home efficiently and stylishly.",
        ["Space saving", "Durable construction", "Easy assembly", "Versatile use"],
        {
          Material: "Plastic",
          Capacity: "50L",
          Type: "Storage Box",
          Assembly: "Tool-free",
        }
      ),
      createProductDetail(
        "lighting-solutions",
        "Lighting solutions",
        "BrightHome",
        79.99,
        4.5,
        2345,
        "/placeholder.svg?height=150&width=150",
        "Modern LED lighting solutions for creating the perfect ambiance in your home.",
        ["LED technology", "Energy efficient", "Dimmable", "Long lasting"],
        {
          Type: "LED",
          Power: "12W",
          "Color Temperature": "3000K-6500K",
          "Life Span": "25000 hours",
        }
      ),
    ],
    ctaText: "Explore all",
    ctaLink: "#",
  },
  {
    id: "4",
    title: "Starting ₹149",
    subtitle: "Headphones",
    products: [
      createProductDetail(
        "boat-headphones",
        "Starting ₹249 | boAt",
        "boAt",
        24.99,
        4.1,
        3456,
        "/placeholder.svg?height=150&width=150",
        "Wireless Bluetooth headphones with superior sound quality and long battery life.",
        ["Wireless Bluetooth", "40mm drivers", "20hr battery", "Fast charging"],
        {
          Connectivity: "Bluetooth 5.0",
          "Driver Size": "40mm",
          "Battery Life": "20 hours",
          "Charging Time": "2 hours",
        },
        { isBestseller: true }
      ),
      createProductDetail(
        "boult-headphones",
        "Starting ₹349 | boult",
        "Boult",
        34.99,
        4.2,
        2890,
        "/placeholder.svg?height=150&width=150",
        "Premium wireless headphones with active noise cancellation and premium sound.",
        ["Active noise cancellation", "Premium sound", "Comfortable fit", "Long battery"],
        {
          Connectivity: "Bluetooth 5.1",
          "Noise Cancellation": "Active",
          "Battery Life": "25 hours",
          "Driver Size": "40mm",
        }
      ),
      createProductDetail(
        "noise-headphones",
        "Starting ₹649 | Noise",
        "Noise",
        64.99,
        4.4,
        4567,
        "/placeholder.svg?height=150&width=150",
        "Professional grade headphones with studio-quality sound and premium build.",
        ["Studio quality sound", "Premium build", "Comfortable design", "Professional grade"],
        {
          Connectivity: "Bluetooth 5.2",
          "Frequency Response": "20Hz-20kHz",
          "Battery Life": "30 hours",
          "Driver Size": "50mm",
        },
        { isBestseller: true }
      ),
      createProductDetail(
        "zebronics-headphones",
        "Starting ₹149 | Zebronics",
        "Zebronics",
        14.99,
        3.8,
        1890,
        "/placeholder.svg?height=150&width=150",
        "Budget-friendly headphones with decent sound quality and comfortable design.",
        ["Budget friendly", "Comfortable design", "Decent sound", "Lightweight"],
        {
          Connectivity: "Bluetooth 5.0",
          "Battery Life": "12 hours",
          "Driver Size": "32mm",
          Weight: "180g",
        }
      ),
    ],
    ctaText: "See all offers",
    ctaLink: "#",
  },
];

export const brands: Brand[] = [
  {
    id: "1",
    name: "boAt",
    logo: "/images/placeholder.jpg?height=50&width=100",
    startingPrice: "₹249",
  },
  {
    id: "2",
    name: "boult",
    logo: "/images/placeholder.jpg?height=50&width=100",
    startingPrice: "₹349",
  },
  {
    id: "3",
    name: "Noise",
    logo: "/images/placeholder.jpg?height=50&width=100",
    startingPrice: "₹649",
  },
  {
    id: "4",
    name: "Zebronics",
    logo: "/images/placeholder.jpg?height=50&width=100",
    startingPrice: "₹149",
  },
];
