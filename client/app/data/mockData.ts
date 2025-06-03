import type { NavItem, ProductCategory, HeroBanner, Brand } from "../types";

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

export const productCategories: ProductCategory[] = [
  {
    id: "1",
    title: "PlayStation 5 Slim & Accessories",
    subtitle: "No Cost EMI*",
    products: [
      {
        id: "1",
        name: "PS5 Slim digital edition",
        image: "/images/placeholder.jpg?height=150&width=150",
      },
      {
        id: "2",
        name: "PS5 Slim disc edition",
        image: "/images/placeholder.jpg?height=150&width=150",
      },
      {
        id: "3",
        name: "PS5 Slim Fortnite digital edition",
        image: "/images/placeholder.jpg?height=150&width=150",
      },
      {
        id: "4",
        name: "PS5 DualSense Wireless Controller",
        image: "/images/placeholder.jpg?height=150&width=150",
      },
    ],
    ctaText: "See all deals",
    ctaLink: "#",
  },
  {
    id: "2",
    title: "Appliances for your home",
    subtitle: "Up to 55% off",
    products: [
      {
        id: "5",
        name: "Air conditioners",
        image: "/images/placeholder.jpg?height=150&width=150",
      },
      {
        id: "6",
        name: "Refrigerators",
        image: "/images/placeholder.jpg?height=150&width=150",
      },
      {
        id: "7",
        name: "Microwaves",
        image: "/images/placeholder.jpg?height=150&width=150",
      },
      {
        id: "8",
        name: "Washing machines",
        image: "/images/placeholder.jpg?height=150&width=150",
      },
    ],
    ctaText: "See more",
    ctaLink: "#",
  },
  {
    id: "3",
    title: "Revamp your home in style",
    products: [
      {
        id: "9",
        name: "Cushion covers, bedsheets & more",
        image: "/images/placeholder.jpg?height=150&width=150",
      },
      {
        id: "10",
        name: "Figurines, vases & more",
        image: "/images/placeholder.jpg?height=150&width=150",
      },
      {
        id: "11",
        name: "Home storage",
        image: "/images/placeholder.jpg?height=150&width=150",
      },
      {
        id: "12",
        name: "Lighting solutions",
        image: "/images/placeholder.jpg?height=150&width=150",
      },
    ],
    ctaText: "Explore all",
    ctaLink: "#",
  },
  {
    id: "4",
    title: "Starting ₹149",
    subtitle: "Headphones",
    products: [
      {
        id: "13",
        name: "Starting ₹249 | boAt",
        image: "/images/placeholder.jpg?height=150&width=150",
      },
      {
        id: "14",
        name: "Starting ₹349 | boult",
        image: "/images/placeholder.jpg?height=150&width=150",
      },
      {
        id: "15",
        name: "Starting ₹649 | Noise",
        image: "/images/placeholder.jpg?height=150&width=150",
      },
      {
        id: "16",
        name: "Starting ₹149 | Zebronics",
        image: "/images/placeholder.jpg?height=150&width=150",
      },
    ],
    ctaText: "See all offers",
    ctaLink: "#",
  },
  {
    id: "5",
    title: "Under ₹499",
    subtitle: "Deals on home improvement essentials",
    products: [
      {
        id: "17",
        name: "Under ₹199 | Cleaning supplies",
        image: "/images/placeholder.jpg?height=150&width=150",
      },
      {
        id: "18",
        name: "Under ₹399 | Bathroom accessories",
        image: "/images/placeholder.jpg?height=150&width=150",
      },
      {
        id: "19",
        name: "Under ₹299 | Bedding",
        image: "/images/placeholder.jpg?height=150&width=150",
      },
      {
        id: "20",
        name: "Under ₹199 | Laundry",
        image: "/images/placeholder.jpg?height=150&width=150",
      },
    ],
  },
  {
    id: "6",
    title: "Automotive essentials",
    subtitle: "Up to 60% off",
    products: [
      {
        id: "21",
        name: "Cleaning accessories",
        image: "/images/placeholder.jpg?height=150&width=150",
      },
      {
        id: "22",
        name: "Tyre & rim care",
        image: "/images/placeholder.jpg?height=150&width=150",
      },
      {
        id: "23",
        name: "Helmets",
        image: "/images/placeholder.jpg?height=150&width=150",
      },
      {
        id: "24",
        name: "Vacuum cleaners",
        image: "/images/placeholder.jpg?height=150&width=150",
      },
    ],
  },
  {
    id: "7",
    title: "Starting ₹199",
    subtitle: "Amazon Brands & more",
    products: [
      {
        id: "25",
        name: "Starting ₹199 | Bedsheets",
        image: "/images/placeholder.jpg?height=150&width=150",
      },
      {
        id: "26",
        name: "Starting ₹199 | Curtains",
        image: "/images/placeholder.jpg?height=150&width=150",
      },
      {
        id: "27",
        name: "Starting ₹99 | Ironing board",
        image: "/images/placeholder.jpg?height=150&width=150",
      },
      {
        id: "28",
        name: "Starting ₹299 | Hangers",
        image: "/images/placeholder.jpg?height=150&width=150",
      },
    ],
  },
  {
    id: "8",
    title: "Min. 40% off",
    subtitle: "Fun toys & games | Amazon Brands",
    products: [
      {
        id: "29",
        name: "Min. 40% off | Soft toys",
        image: "/images/placeholder.jpg?height=150&width=150",
      },
      {
        id: "30",
        name: "Min. 50% off | Ride ons",
        image: "/images/placeholder.jpg?height=150&width=150",
      },
      {
        id: "31",
        name: "Min. 40% off | Indoor games",
        image: "/images/placeholder.jpg?height=150&width=150",
      },
      {
        id: "32",
        name: "Min. 40% off | Outdoor toys",
        image: "/images/placeholder.jpg?height=150&width=150",
      },
    ],
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
