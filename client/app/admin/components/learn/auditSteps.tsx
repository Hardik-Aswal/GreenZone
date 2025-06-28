import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Package, Leaf, Truck, Award, Wrench, Recycle, FileCheck, HelpCircle } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export function EcoAuditSteps() {
  const steps = [
    {
      icon: <Package className="h-6 w-6" />,
      title: "Packaging",
      description: "Is your packaging recyclable or biodegradable?",
      tooltip: "Describe your packaging materials and their environmental impact",
    },
    {
      icon: <Leaf className="h-6 w-6" />,
      title: "Materials",
      description: "Select materials used and provide additional details",
      tooltip: "Choose from our list of materials or describe custom materials",
    },
    {
      icon: <Truck className="h-6 w-6" />,
      title: "Carbon-Neutral Delivery",
      description: "Does your product offer carbon-neutral shipping?",
      tooltip: "Indicate if you offset shipping emissions or use eco-friendly delivery",
    },
    {
      icon: <Award className="h-6 w-6" />,
      title: "Certifications",
      description: "Upload or select your eco-certifications",
      tooltip: "Include certifications like Energy Star, EPEAT, or organic labels",
    },
    {
      icon: <Wrench className="h-6 w-6" />,
      title: "Repairable/Reusable",
      description: "Can your product be easily repaired or reused?",
      tooltip: "Describe repairability features and reuse potential",
    },
    {
      icon: <Recycle className="h-6 w-6" />,
      title: "Compostable/Recyclable",
      description: "End-of-life disposal options for your product",
      tooltip: "Specify if product components can be composted or recycled",
    },
    {
      icon: <FileCheck className="h-6 w-6" />,
      title: "Claim Type",
      description: "Choose: Self-attested or Certified claims",
      tooltip: "Self-attested claims are your own declarations; Certified claims have third-party verification",
    },
  ]

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4 text-sm font-medium">
            📝 Step-by-Step Guide
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">How to Fill Your Eco Self-Audit Form</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Follow these simple steps to complete your eco-friendly product assessment. Each field helps us understand
            your product's environmental impact.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <TooltipProvider>
            {steps.map((step, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-200 border-2">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="bg-green-100 p-2 rounded-lg">{step.icon}</div>
                      <div className="flex-1">
                        <CardTitle className="text-lg font-semibold flex items-center">
                          {step.title}
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button variant="ghost" size="sm" className="ml-2 p-1 h-auto">
                                <HelpCircle className="h-4 w-4 text-gray-400" />
                                <span className="sr-only">Help for {step.title}</span>
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="max-w-xs">{step.tooltip}</p>
                            </TooltipContent>
                          </Tooltip>
                        </CardTitle>
                      </div>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      Step {index + 1}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-sm leading-relaxed">{step.description}</p>
                </CardContent>
              </Card>
            ))}
          </TooltipProvider>
        </div>

        <div className="text-center mt-12">
          <Button
            size="lg"
            variant="outline"
            className="border-green-600 text-green-600 hover:bg-green-50 bg-transparent"
          >
            View Detailed Form Guide
          </Button>
        </div>
      </div>
    </section>
  )
}
