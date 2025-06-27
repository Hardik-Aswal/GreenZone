export interface ProductFormData {
  // Product Info (Step 1)
  title: string
  brand: string
  originalPrice: number
  discount: number
  description: string
  images: string[]
  features: string[]
  specifications: Record<string, string>
  category1: string
  category2: string
  sector: string
  material1: string
  material2: string
  weight: number
  inStock: number
  carbonImpact: number
  packagingTypeId: string
  ecoTags: string[]
}

export interface SellerAuditData {
  // Seller Self-Audit (Step 2)
  isPackagingRecyclable: boolean
  primaryMaterial: string
  usesCarbonNeutralDelivery: boolean
  certifications: { title: string; badge: string }[]
  isReusableOrRepairable: boolean
  isCompostableOrRecyclable: boolean
  claimType: "Self-attested" | "Certified"
}

export interface CompleteFormData extends ProductFormData, SellerAuditData {}

export const sectorMap = {
  "Food & Beverage": 5,
  "Comm. equipm. & capital goods": 2,
  "Computer, IT & telecom": 3,
  Chemicals: 1,
  "Construction & commercial materials": 4,
  "Home durables, textiles, & equipment": 6,
  "Packaging for consumer goods": 7,
  "Automobiles & components": 0,
}

export const categoryMap1 = {
  "Food & Beverage": 5,
  Furniture: 6,
  Electronics: 4,
  Chemicals: 2,
  Construction: 3,
  Apparel: 0,
  Packaging: 8,
  "Office Supplies": 7,
  "Automobiles & Components": 1,
  "Personal Care": 9,
}

export const categoryMap2 = {
  Packaging: 7,
  "Office Supplies": 6,
  Chemicals: 1,
  "Personal Care": 8,
  "Household Items": 4,
  "Computer Accessories": 2,
  "Metal Goods": 5,
  "Plastic Goods": 9,
  Telecommunications: 10,
  "Automobiles & Components": 0,
  "Wood Products": 12,
  Electronics: 3,
  Textiles: 11,
}

export const materialMap1 = {
  "Food Ingredients": 0,
  Wood: 8,
  Plastic: 6,
  "Textile fibers": 7,
  Mineral: 3,
  Others: 4,
  Paper: 5,
  Glass: 1,
  "Liquid Compound": 2,
}

export const materialMap2 = {
  Paper: 2,
  Plastic: 3,
  Metal: 0,
  Others: 1,
  others: 4,
}

export const ecoTagOptions = [
  "Organic",
  "Recyclable",
  "Biodegradable",
  "Carbon Neutral",
  "Fair Trade",
  "Renewable Energy",
  "Minimal Packaging",
  "Local Sourced",
]

export const packagingTypes = [
  { id: "1", name: "Cardboard Box" },
  { id: "2", name: "Plastic Container" },
  { id: "3", name: "Glass Container" },
  { id: "4", name: "Metal Container" },
  { id: "5", name: "Biodegradable Packaging" },
  { id: "6", name: "Minimal/No Packaging" },
]
