"use client"

import { useFormContext } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { X, Plus } from "lucide-react"
import { useState } from "react"
import {
  type CompleteFormData,
  sectorMap,
  categoryMap1,
  categoryMap2,
  materialMap1,
  materialMap2,
  ecoTagOptions,
  packagingTypes,
} from "../../types/product"

interface Step1Props {
  onNext: () => void
}

export function Step1ProductInfo({ onNext }: Step1Props) {
  const form = useFormContext<CompleteFormData>()
  const [newFeature, setNewFeature] = useState("")
  const [newImage, setNewImage] = useState("")
  const [specKey, setSpecKey] = useState("")
  const [specValue, setSpecValue] = useState("")

  const addFeature = () => {
    if (newFeature.trim()) {
      const currentFeatures = form.getValues("features") || []
      form.setValue("features", [...currentFeatures, newFeature.trim()])
      setNewFeature("")
    }
  }

  const removeFeature = (index: number) => {
    const currentFeatures = form.getValues("features") || []
    form.setValue(
      "features",
      currentFeatures.filter((_, i) => i !== index),
    )
  }

  const addImage = () => {
    if (newImage.trim()) {
      const currentImages = form.getValues("images") || []
      form.setValue("images", [...currentImages, newImage.trim()])
      setNewImage("")
    }
  }

  const removeImage = (index: number) => {
    const currentImages = form.getValues("images") || []
    form.setValue(
      "images",
      currentImages.filter((_, i) => i !== index),
    )
  }

  const addSpecification = () => {
    if (specKey.trim() && specValue.trim()) {
      const currentSpecs = form.getValues("specifications") || {}
      form.setValue("specifications", { ...currentSpecs, [specKey.trim()]: specValue.trim() })
      setSpecKey("")
      setSpecValue("")
    }
  }

  const removeSpecification = (key: string) => {
    const currentSpecs = form.getValues("specifications") || {}
    const { [key]: removed, ...rest } = currentSpecs
    form.setValue("specifications", rest)
  }

  const handleEcoTagChange = (tag: string, checked: boolean) => {
    const currentTags = form.getValues("ecoTags") || []
    if (checked) {
      form.setValue("ecoTags", [...currentTags, tag])
    } else {
      form.setValue(
        "ecoTags",
        currentTags.filter((t) => t !== tag),
      )
    }
  }

  const validateStep1 = async () => {
    const isValid = await form.trigger([
      "title",
      "brand",
      "originalPrice",
      "discount",
      "description",
      "images",
      "features",
      "specifications",
      "category1",
      "category2",
      "sector",
      "material1",
      "material2",
      "weight",
      "inStock",
      "carbonImpact",
      "packagingTypeId",
    ])

    if (isValid) {
      onNext()
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Product Information</h2>
        <p className="text-muted-foreground">Enter the basic details about your product</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product Title *</FormLabel>
              <FormControl>
                <Input placeholder="Enter product title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="brand"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Brand *</FormLabel>
              <FormControl>
                <Input placeholder="Enter brand name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="originalPrice"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Original Price ($) *</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  {...field}
                  onChange={(e) => field.onChange(Number.parseFloat(e.target.value) || 0)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="discount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Discount (%) *</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  step="0.01"
                  placeholder="0"
                  {...field}
                  onChange={(e) => field.onChange(Number.parseFloat(e.target.value) || 0)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={form.control}
        name="description"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Description *</FormLabel>
            <FormControl>
              <Textarea placeholder="Describe your product in detail..." className="min-h-[100px]" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Images Section */}
      <Card>
        <CardHeader>
          <CardTitle>Product Images *</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input placeholder="Enter image URL" value={newImage} onChange={(e) => setNewImage(e.target.value)} />
            <Button type="button" onClick={addImage} size="sm">
              <Plus className="w-4 h-4" />
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {(form.watch("images") || []).map((image, index) => (
              <Badge key={index} variant="secondary" className="flex items-center gap-1">
                {`Image ${index + 1}`}
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="h-4 w-4 p-0"
                  onClick={() => removeImage(index)}
                >
                  <X className="w-3 h-3" />
                </Button>
              </Badge>
            ))}
          </div>
          <FormMessage>{form.formState.errors.images?.message}</FormMessage>
        </CardContent>
      </Card>

      {/* Features Section */}
      <Card>
        <CardHeader>
          <CardTitle>Product Features *</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              placeholder="Enter a product feature"
              value={newFeature}
              onChange={(e) => setNewFeature(e.target.value)}
            />
            <Button type="button" onClick={addFeature} size="sm">
              <Plus className="w-4 h-4" />
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {(form.watch("features") || []).map((feature, index) => (
              <Badge key={index} variant="secondary" className="flex items-center gap-1">
                {feature}
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="h-4 w-4 p-0"
                  onClick={() => removeFeature(index)}
                >
                  <X className="w-3 h-3" />
                </Button>
              </Badge>
            ))}
          </div>
          <FormMessage>{form.formState.errors.features?.message}</FormMessage>
        </CardContent>
      </Card>

      {/* Specifications Section */}
      <Card>
        <CardHeader>
          <CardTitle>Specifications *</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input placeholder="Specification name" value={specKey} onChange={(e) => setSpecKey(e.target.value)} />
            <Input placeholder="Specification value" value={specValue} onChange={(e) => setSpecValue(e.target.value)} />
            <Button type="button" onClick={addSpecification} size="sm">
              <Plus className="w-4 h-4" />
            </Button>
          </div>
          <div className="space-y-2">
            {Object.entries(form.watch("specifications") || {}).map(([key, value]) => (
              <div key={key} className="flex items-center justify-between p-2 border rounded">
                <span>
                  <strong>{key}:</strong> {value}
                </span>
                <Button type="button" variant="ghost" size="sm" onClick={() => removeSpecification(key)}>
                  <X className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
          <FormMessage>{form.formState.errors.specifications?.message}</FormMessage>
        </CardContent>
      </Card>

      {/* Categories and Materials */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          control={form.control}
          name="category1"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Primary Category *</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select primary category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {Object.keys(categoryMap1).map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="category2"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Secondary Category *</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select secondary category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {Object.keys(categoryMap2).map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="sector"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Sector *</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select sector" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {Object.keys(sectorMap).map((sector) => (
                    <SelectItem key={sector} value={sector}>
                      {sector}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="material1"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Primary Material *</FormLabel>
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

        <FormField
          control={form.control}
          name="material2"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Secondary Material *</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select secondary material" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {Object.keys(materialMap2).map((material) => (
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

        <FormField
          control={form.control}
          name="packagingTypeId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Packaging Type *</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select packaging type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {packagingTypes.map((type) => (
                    <SelectItem key={type.id} value={type.id}>
                      {type.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      {/* Physical Properties */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <FormField
          control={form.control}
          name="weight"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Weight (kg) *</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  {...field}
                  onChange={(e) => field.onChange(Number.parseFloat(e.target.value) || 0)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="inStock"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Stock Quantity *</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="0"
                  {...field}
                  onChange={(e) => field.onChange(Number.parseInt(e.target.value) || 0)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="carbonImpact"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Carbon Impact (kg CO2) *</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  {...field}
                  onChange={(e) => field.onChange(Number.parseFloat(e.target.value) || 0)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      {/* Eco Tags */}
      <Card>
        <CardHeader>
          <CardTitle>Eco Tags</CardTitle>
          <p className="text-sm text-muted-foreground">Select relevant sustainability tags for your product</p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {ecoTagOptions.map((tag) => (
              <div key={tag} className="flex items-center space-x-2">
                <Checkbox
                  id={tag}
                  checked={(form.watch("ecoTags") || []).includes(tag)}
                  onCheckedChange={(checked) => handleEcoTagChange(tag, checked as boolean)}
                />
                <label
                  htmlFor={tag}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {tag}
                </label>
              </div>
            ))}
          </div>
          <FormMessage>{form.formState.errors.ecoTags?.message}</FormMessage>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button type="button" onClick={validateStep1}>
          Next: Sustainability Audit
        </Button>
      </div>
    </div>
  )
}
