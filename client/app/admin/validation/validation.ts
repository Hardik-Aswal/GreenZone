import { z } from "zod"

export const productInfoSchema = z.object({
  title: z.string().min(1, "Product title is required").max(100, "Title too long"),
  brand: z.string().min(1, "Brand is required").max(50, "Brand name too long"),
  originalPrice: z.number().min(0.01, "Price must be greater than 0"),
  discount: z.number().min(0, "Discount cannot be negative").max(100, "Discount cannot exceed 100%"),
  description: z.string().min(10, "Description must be at least 10 characters").max(1000, "Description too long"),
  images: z
    .array(z.string().url("Invalid image URL"))
    .min(1, "At least one image is required")
    .max(10, "Maximum 10 images allowed"),
  features: z
    .array(z.string().min(1, "Feature cannot be empty"))
    .min(1, "At least one feature is required")
    .max(10, "Maximum 10 features allowed"),
  specifications: z
    .record(z.string(), z.string())
    .refine((specs) => Object.keys(specs).length > 0, "At least one specification is required"),
  category1: z.string().min(1, "Primary category is required"),
  category2: z.string().min(1, "Secondary category is required"),
  sector: z.string().min(1, "Sector is required"),
  material1: z.string().min(1, "Primary material is required"),
  material2: z.string().min(1, "Secondary material is required"),
  weight: z.number().min(0.01, "Weight must be greater than 0"),
  inStock: z.number().int().min(0, "Stock cannot be negative"),
  carbonImpact: z.number().min(0, "Carbon impact cannot be negative"),
  packagingTypeId: z.string().min(1, "Packaging type is required"),
  ecoTags: z.array(z.string()).max(5, "Maximum 5 eco tags allowed"),
})

export const sellerAuditSchema = z.object({
  isPackagingRecyclable: z.boolean(),
  primaryMaterial: z.string().min(1, "Primary material is required"),
  usesCarbonNeutralDelivery: z.boolean(),
  certifications: z
    .array(
      z.object({
        title: z.string().min(1, "Certification title is required"),
        badge: z.string().optional(),
      }),
    )
    .max(5, "Maximum 5 certifications allowed"),
  isReusableOrRepairable: z.boolean(),
  isCompostableOrRecyclable: z.boolean(),
  claimType: z.enum(["Self-attested", "Certified"]),
})

export const completeFormSchema = productInfoSchema.merge(sellerAuditSchema)

export type ProductInfoFormData = z.infer<typeof productInfoSchema>
export type SellerAuditFormData = z.infer<typeof sellerAuditSchema>
export type CompleteFormData = z.infer<typeof completeFormSchema>
