import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Bot, Award, Zap } from "lucide-react"

export function WhatIsGreenZone() {
  const steps = [
    {
      icon: <CheckCircle className="h-8 w-8 text-green-600" />,
      title: "Seller Fills Form",
      description: "Complete your eco-friendly product details",
    },
    {
      icon: <Bot className="h-8 w-8 text-blue-600" />,
      title: "AI Pre-validates",
      description: "Our AI system checks your sustainability claims",
    },
    {
      icon: <Award className="h-8 w-8 text-purple-600" />,
      title: "EcoScore Assigned",
      description: "Receive your provisional environmental score",
    },
    {
      icon: <Zap className="h-8 w-8 text-orange-600" />,
      title: "Product Goes Live",
      description: "Your verified eco-friendly product is published",
    },
  ]

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4 text-sm font-medium">
            📘 How It Works
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">What is GreenZone Audit?</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            GreenZone Audit uses advanced AI technology combined with sustainability rules to verify your eco-friendly
            product claims, ensuring trust and transparency for customers.
          </p>
        </div>

        {/* Process Flow */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {steps.map((step, index) => (
            <Card key={index} className="relative border-2 hover:shadow-lg transition-shadow duration-200">
              <CardHeader className="text-center pb-2">
                <div className="flex justify-center mb-3">{step.icon}</div>
                <CardTitle className="text-lg font-semibold">{step.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600 text-sm">{step.description}</p>
              </CardContent>
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute -right-3 top-1/2 transform -translate-y-1/2">
                  <div className="w-6 h-0.5 bg-gray-300"></div>
                  <div className="w-0 h-0 border-l-4 border-l-gray-300 border-t-2 border-t-transparent border-b-2 border-b-transparent ml-6 -mt-1"></div>
                </div>
              )}
            </Card>
          ))}
        </div>

        {/* Video Placeholder */}
        <Card className="max-w-2xl mx-auto">
          <CardContent className="p-6">
            <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center mb-4">
              <div className="text-center">
                <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Zap className="h-8 w-8 text-white" />
                </div>
                <p className="text-gray-600 font-medium">60-Second Explainer Video</p>
                <p className="text-sm text-gray-500">Coming Soon</p>
              </div>
            </div>
            <h3 className="text-lg font-semibold text-center">Watch: How GreenZone Audit Works</h3>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
