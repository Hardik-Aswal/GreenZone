"use client"

import { useState } from "react"
import { useForm, FormProvider } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form } from "@/components/ui/form"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { CheckCircle } from "lucide-react"
import { toast } from "sonner"

import { Step1ProductInfo } from "../components/steps/step1"
import { Step2SellerAudit } from "../components/steps/step2"
import { Step3Review } from "../components/steps/review"
import { completeFormSchema, type CompleteFormData } from "../validation/validation"

const steps = [
  { id: 0, title: "Product Info", description: "Basic product details" },
  { id: 1, title: "Sustainability Audit", description: "Environmental impact assessment" },
  { id: 2, title: "Review & Submit", description: "Final review and submission" },
]

export default function ProductCreationForm() {
  const [currentStep, setCurrentStep] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<CompleteFormData>({
    resolver: zodResolver(completeFormSchema),
    defaultValues: {
      title: "",
      brand: "",
      originalPrice: 0,
      discount: 0,
      description: "",
      images: [],
      features: [],
      specifications: {},
      category1: "",
      category2: "",
      sector: "",
      material1: "",
      material2: "",
      weight: 0,
      inStock: 0,
      carbonImpact: 0,
      packagingTypeId: "",
      ecoTags: [],
      isPackagingRecyclable: false,
      primaryMaterial: "",
      usesCarbonNeutralDelivery: false,
      certifications: [],
      isReusableOrRepairable: false,
      isCompostableOrRecyclable: false,
      claimType: "Self-attested",
    },
    mode: "onChange",
  })

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const previousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)

    try {
      // Validate the entire form
      const isValid = await form.trigger()
      if (!isValid) {
        toast(
     "Please check all required fields and fix any errors.",
        )
        setIsSubmitting(false)
        return
      }

      const formData = form.getValues()

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Here you would typically send the data to your API
      console.log("Submitting product data:", formData)

      toast(
       "Your product has been submitted for review and will be live soon.",
      )

      // Reset form or redirect
      form.reset()
      setCurrentStep(0)
    } catch (error) {
      toast("There was an error submitting your product. Please try again.",
        )
    } finally {
      setIsSubmitting(false)
    }
  }

  const getStepProgress = () => {
    return ((currentStep + 1) / steps.length) * 100
  }

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 0:
        return <Step1ProductInfo onNext={nextStep} />
      case 1:
        return <Step2SellerAudit onNext={nextStep} onPrevious={previousStep} />
      case 2:
        return <Step3Review onPrevious={previousStep} onSubmit={handleSubmit} isSubmitting={isSubmitting} />
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Create New Product</h1>
          <p className="text-gray-600">Add your sustainable product to GreenZone marketplace</p>
        </div>

        {/* Progress Indicator */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700">
                  Step {currentStep + 1} of {steps.length}
                </span>
                <span className="text-sm text-gray-500">{Math.round(getStepProgress())}% Complete</span>
              </div>
              <Progress value={getStepProgress()} className="h-2" />
            </div>

            <div className="flex justify-between">
              {steps.map((step, index) => (
                <div key={step.id} className="flex flex-col items-center flex-1">
                  <div
                    className={`flex items-center justify-center w-8 h-8 rounded-full border-2 mb-2 ${
                      index < currentStep
                        ? "bg-green-500 border-green-500 text-white"
                        : index === currentStep
                          ? "bg-blue-500 border-blue-500 text-white"
                          : "bg-gray-100 border-gray-300 text-gray-400"
                    }`}
                  >
                    {index < currentStep ? (
                      <CheckCircle className="w-5 h-5" />
                    ) : (
                      <span className="text-sm font-medium">{index + 1}</span>
                    )}
                  </div>
                  <div className="text-center">
                    <div className={`text-sm font-medium ${index <= currentStep ? "text-gray-900" : "text-gray-400"}`}>
                      {step.title}
                    </div>
                    <div className="text-xs text-gray-500 hidden sm:block">{step.description}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Form Content */}
        <Card>
          <CardContent className="pt-6">
            <FormProvider {...form}>
              <Form {...form}>
                <form onSubmit={(e) => e.preventDefault()}>{renderCurrentStep()}</form>
              </Form>
            </FormProvider>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-8 text-sm text-gray-500">
          <p>Need help? Contact our seller support team</p>
        </div>
      </div>
    </div>
  )
}
