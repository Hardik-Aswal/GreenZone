"use client"

import { useFormContext } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Edit, Package, Leaf, Award } from "lucide-react"
import { type CompleteFormData, packagingTypes } from "../../types/product"

interface Step3Props {
  onPrevious: () => void
  onSubmit: () => void
  isSubmitting: boolean
}

export function Step3Review({ onPrevious, onSubmit, isSubmitting }: Step3Props) {
  const form = useFormContext<CompleteFormData>()
  const formData = form.getValues()

  const getPackagingTypeName = (id: string) => {
    return packagingTypes.find((type) => type.id === id)?.name || "Unknown"
  }

  const calculateFinalPrice = () => {
    const discountAmount = (formData.originalPrice * formData.discount) / 100
    return formData.originalPrice - discountAmount
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Review & Submit</h2>
        <p className="text-muted-foreground">Please review all information before submitting your product</p>
      </div>

      {/* Product Overview */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="flex items-center gap-2">
            <Package className="w-5 h-5" />
            <CardTitle>Product Information</CardTitle>
          </div>
          <Button variant="ghost" size="sm" onClick={() => form.setValue("currentStep", 0)}>
            <Edit className="w-4 h-4 mr-1" />
            Edit
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold text-lg">{formData.title}</h3>
              <p className="text-muted-foreground">by {formData.brand}</p>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-2xl font-bold">Rs{calculateFinalPrice().toFixed(2)}</span>
                {formData.discount > 0 && (
                  <>
                    <span className="text-sm line-through text-muted-foreground">
                      Rs{formData.originalPrice.toFixed(2)}
                    </span>
                    <Badge variant="destructive">{formData.discount}% OFF</Badge>
                  </>
                )}
              </div>
            </div>
            <div className="space-y-2">
              <div>
                <strong>Weight:</strong> {formData.weight} kg
              </div>
              <div>
                <strong>Stock:</strong> {formData.inStock} units
              </div>
              <div>
                <strong>Carbon Impact:</strong> {formData.carbonImpact} kg CO₂
              </div>
            </div>
          </div>

          <Separator />

          <div>
            <h4 className="font-semibold mb-2">Description</h4>
            <p className="text-sm text-muted-foreground">{formData.description}</p>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Features</h4>
            <div className="flex flex-wrap gap-1">
              {formData.features.map((feature, index) => (
                <Badge key={index} variant="outline">
                  {feature}
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Categories & Materials</h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <strong>Primary Category:</strong> {formData.category1}
              </div>
              <div>
                <strong>Secondary Category:</strong> {formData.category2}
              </div>
              <div>
                <strong>Sector:</strong> {formData.sector}
              </div>
              <div>
                <strong>Packaging:</strong> {getPackagingTypeName(formData.packagingTypeId)}
              </div>
              <div>
                <strong>Primary Material:</strong> {formData.material1}
              </div>
              <div>
                <strong>Secondary Material:</strong> {formData.material2}
              </div>
            </div>
          </div>

          {formData.ecoTags && formData.ecoTags.length > 0 && (
            <div>
              <h4 className="font-semibold mb-2">Eco Tags</h4>
              <div className="flex flex-wrap gap-1">
                {formData.ecoTags.map((tag, index) => (
                  <Badge key={index} variant="secondary" className="bg-green-100 text-green-800">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          <div>
            <h4 className="font-semibold mb-2">Specifications</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
              {Object.entries(formData.specifications).map(([key, value]) => (
                <div key={key}>
                  <strong>{key}:</strong> {value}
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Images</h4>
            <p className="text-sm text-muted-foreground">{formData.images.length} image(s) uploaded</p>
          </div>
        </CardContent>
      </Card>

      {/* Sustainability Audit */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="flex items-center gap-2">
            <Leaf className="w-5 h-5 text-green-600" />
            <CardTitle>Sustainability Profile</CardTitle>
          </div>
          <Button variant="ghost" size="sm" onClick={() => form.setValue("currentStep", 1)}>
            <Edit className="w-4 h-4 mr-1" />
            Edit
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">Recyclable Packaging</span>
                <Badge variant={formData.isPackagingRecyclable ? "default" : "secondary"}>
                  {formData.isPackagingRecyclable ? "Yes" : "No"}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Carbon-Neutral Delivery</span>
                <Badge variant={formData.usesCarbonNeutralDelivery ? "default" : "secondary"}>
                  {formData.usesCarbonNeutralDelivery ? "Available" : "Not Available"}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Reusable/Repairable</span>
                <Badge variant={formData.isReusableOrRepairable ? "default" : "secondary"}>
                  {formData.isReusableOrRepairable ? "Yes" : "No"}
                </Badge>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">Compostable/Recyclable</span>
                <Badge variant={formData.isCompostableOrRecyclable ? "default" : "secondary"}>
                  {formData.isCompostableOrRecyclable ? "Yes" : "No"}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Primary Material</span>
                <Badge variant="outline">{formData.primaryMaterial}</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Claim Verification</span>
                <Badge variant={formData.claimType === "Certified" ? "default" : "secondary"}>
                  {formData.claimType}
                </Badge>
              </div>
            </div>
          </div>

          {formData.certifications && formData.certifications.length > 0 && (
            <div>
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <Award className="w-4 h-4" />
                Certifications
              </h4>
              <div className="flex flex-wrap gap-2">
                {formData.certifications.map((cert, index) => (
                  <Badge key={index} variant="outline" className="bg-blue-50 text-blue-700">
                    {cert.title}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Sustainability Score Preview */}
      <Card className="border-green-200 bg-green-50">
        <CardHeader>
          <CardTitle className="text-green-800">Estimated EcoScore</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <div className="text-3xl font-bold text-green-600">
              {/* Simple scoring algorithm for demo */}
              {Math.round(
                (formData.isPackagingRecyclable ? 20 : 0) +
                  (formData.usesCarbonNeutralDelivery ? 15 : 0) +
                  (formData.isReusableOrRepairable ? 20 : 0) +
                  (formData.isCompostableOrRecyclable ? 20 : 0) +
                  (formData.claimType === "Certified" ? 15 : 5) +
                  (formData.certifications?.length || 0) * 2 +
                  (formData.ecoTags?.length || 0) * 1,
              )}
              /100
            </div>
            <div className="text-sm text-green-700">
              <p>Your product shows strong sustainability characteristics!</p>
              <p className="text-xs text-muted-foreground mt-1">Final score will be calculated after verification</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-between">
        <Button type="button" variant="outline" onClick={onPrevious}>
          Previous: Sustainability Audit
        </Button>
        <Button type="button" onClick={onSubmit} disabled={isSubmitting} className="bg-green-600 hover:bg-green-700">
          {isSubmitting ? "Submitting..." : "Submit Product"}
        </Button>
      </div>
    </div>
  )
}
