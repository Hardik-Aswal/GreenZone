"use client"

import { useFormContext } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Info, X, Plus } from "lucide-react"
import { useState } from "react"
import { type CompleteFormData, materialMap1 } from "../../types/product"

interface Step2Props {
  onNext: () => void
  onPrevious: () => void
}

export function Step2SellerAudit({ onNext, onPrevious }: Step2Props) {
  const form = useFormContext<CompleteFormData>()
  const [newCertTitle, setNewCertTitle] = useState("")
  const [newCertBadge, setNewCertBadge] = useState("")

  const addCertification = () => {
    if (newCertTitle.trim()) {
      const currentCerts = form.getValues("certifications") || []
      form.setValue("certifications", [
        ...currentCerts,
        { title: newCertTitle.trim(), badge: newCertBadge.trim() || "" },
      ])
      setNewCertTitle("")
      setNewCertBadge("")
    }
  }

  const removeCertification = (index: number) => {
    const currentCerts = form.getValues("certifications") || []
    form.setValue(
      "certifications",
      currentCerts.filter((_, i) => i !== index),
    )
  }

  const validateStep2 = async () => {
    const isValid = await form.trigger([
      "isPackagingRecyclable",
      "primaryMaterial",
      "usesCarbonNeutralDelivery",
      "certifications",
      "isReusableOrRepairable",
      "isCompostableOrRecyclable",
      "claimType",
    ])

    if (isValid) {
      onNext()
    }
  }

  return (
    <TooltipProvider>
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold">Sustainability Self-Audit</h2>
          <p className="text-muted-foreground">Help us understand the environmental impact of your product</p>
        </div>

        {/* Packaging & Materials */}
        <Card>
          <CardHeader>
            <CardTitle>Packaging & Materials</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <FormLabel>Is packaging recyclable?</FormLabel>
                  <Tooltip>
                    <TooltipTrigger>
                      <Info className="w-4 h-4 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Choosing recyclable packaging improves your EcoScore</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
                <p className="text-sm text-muted-foreground">Can your product packaging be recycled by consumers?</p>
              </div>
              <FormField
                control={form.control}
                name="isPackagingRecyclable"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Switch checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="primaryMaterial"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Primary Material Used *</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select primary material" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {Object.keys(materialMap1).map((material) => (
                        <SelectItem key={material} value={material}>
                          {material}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        {/* Delivery & Transportation */}
        <Card>
          <CardHeader>
            <CardTitle>Delivery & Transportation</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <FormLabel>Carbon-neutral delivery available?</FormLabel>
                  <Tooltip>
                    <TooltipTrigger>
                      <Info className="w-4 h-4 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Offering carbon-neutral delivery options boosts sustainability rating</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
                <p className="text-sm text-muted-foreground">Do you offer carbon-neutral shipping options?</p>
              </div>
              <FormField
                control={form.control}
                name="usesCarbonNeutralDelivery"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Switch checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
        </Card>

        {/* Product Lifecycle */}
        <Card>
          <CardHeader>
            <CardTitle>Product Lifecycle</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <FormLabel>Is product reusable or repairable?</FormLabel>
                  <Tooltip>
                    <TooltipTrigger>
                      <Info className="w-4 h-4 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Products designed for longevity score higher on sustainability</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
                <p className="text-sm text-muted-foreground">Can this product be reused or easily repaired?</p>
              </div>
              <FormField
                control={form.control}
                name="isReusableOrRepairable"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Switch checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <FormLabel>Is product compostable or recyclable?</FormLabel>
                  <Tooltip>
                    <TooltipTrigger>
                      <Info className="w-4 h-4 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>End-of-life disposal options improve environmental impact</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
                <p className="text-sm text-muted-foreground">Can the product itself be composted or recycled?</p>
              </div>
              <FormField
                control={form.control}
                name="isCompostableOrRecyclable"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Switch checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
        </Card>

        {/* Certifications */}
        <Card>
          <CardHeader>
            <CardTitle>Certifications</CardTitle>
            <p className="text-sm text-muted-foreground">Add any sustainability certifications your product has</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Input
                placeholder="Certification title (e.g., ENERGY STAR)"
                value={newCertTitle}
                onChange={(e) => setNewCertTitle(e.target.value)}
              />
              <Input
                placeholder="Badge URL (optional)"
                value={newCertBadge}
                onChange={(e) => setNewCertBadge(e.target.value)}
              />
              <Button type="button" onClick={addCertification} size="sm">
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {(form.watch("certifications") || []).map((cert, index) => (
                <Badge key={index} variant="secondary" className="flex items-center gap-1">
                  {cert.title}
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="h-4 w-4 p-0"
                    onClick={() => removeCertification(index)}
                  >
                    <X className="w-3 h-3" />
                  </Button>
                </Badge>
              ))}
            </div>
            <FormMessage>{form.formState.errors.certifications?.message}</FormMessage>
          </CardContent>
        </Card>

        {/* Claim Type */}
        <Card>
          <CardHeader>
            <CardTitle>Sustainability Claims</CardTitle>
          </CardHeader>
          <CardContent>
            <FormField
              control={form.control}
              name="claimType"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>How are your sustainability claims verified?</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    >
                      <div className="flex items-center space-x-3 space-y-0">
                        <RadioGroupItem value="Self-attested" />
                        <div className="space-y-1 leading-none">
                          <FormLabel className="font-normal">Self-attested</FormLabel>
                          <p className="text-sm text-muted-foreground">Claims are based on your own assessment</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3 space-y-0">
                        <RadioGroupItem value="Certified" />
                        <div className="space-y-1 leading-none">
                          <FormLabel className="font-normal">Third-party certified</FormLabel>
                          <p className="text-sm text-muted-foreground">
                            Claims are verified by independent organizations
                          </p>
                        </div>
                      </div>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        <div className="flex justify-between">
          <Button type="button" variant="outline" onClick={onPrevious}>
            Previous: Product Info
          </Button>
          <Button type="button" onClick={validateStep2}>
            Next: Review & Submit
          </Button>
        </div>
      </div>
    </TooltipProvider>
  )
}
