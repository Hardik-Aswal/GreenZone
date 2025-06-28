"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Eye, Coins, Shield, ChevronLeft, ChevronRight, Star } from "lucide-react"
import { useState } from "react"

const benefits = [
  {
    icon: <Eye className="h-8 w-8 text-blue-600" />,
    title: "Better Visibility on GreenZone",
    description: "Verified eco-friendly products get priority placement in search results",
  },
  {
    icon: <Coins className="h-8 w-8 text-yellow-600" />,
    title: "Sapling Coin Incentives",
    description: "Earn rewards for maintaining high environmental standards",
  },
  {
    icon: <Shield className="h-8 w-8 text-green-600" />,
    title: "Trusted by Customers",
    description: "Build customer confidence with verified sustainability claims",
  },
]

const testimonials = [
  {
    name: "Sarah Chen",
    business: "EcoHome Essentials",
    rating: 5,
    text: "The GreenZone audit helped us showcase our commitment to sustainability. Our sales increased by 40% after verification!",
    avatar: "/placeholder.svg?height=60&width=60",
  },
  {
    name: "Marcus Rodriguez",
    business: "Green Tech Solutions",
    rating: 5,
    text: "The process was straightforward and the AI validation gave us confidence in our claims. Highly recommend!",
    avatar: "/placeholder.svg?height=60&width=60",
  },
  {
    name: "Emily Watson",
    business: "Sustainable Living Co.",
    rating: 5,
    text: "GreenZone verification has become a key differentiator for our products. Customers trust the badge.",
    avatar: "/placeholder.svg?height=60&width=60",
  },
]

export function WhyItMatters() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4 text-sm font-medium">
            ✅ Benefits & Impact
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">Why It Matters</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Join thousands of sellers who have already benefited from GreenZone verification. See the real impact on
            your business and the environment.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {benefits.map((benefit, index) => (
            <Card key={index} className="text-center border-2 hover:shadow-lg transition-shadow duration-200">
              <CardHeader className="pb-4">
                <div className="flex justify-center mb-4">
                  <div className="bg-gray-50 p-3 rounded-full">{benefit.icon}</div>
                </div>
                <CardTitle className="text-xl font-semibold">{benefit.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Testimonials Carousel */}
        <div className="bg-gray-50 rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-center text-gray-900 mb-8">What Sellers Are Saying</h3>

          <div className="relative max-w-4xl mx-auto">
            <Card className="border-0 shadow-lg">
              <CardContent className="p-8">
                <div className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-6">
                  <div className="flex-shrink-0">
                    <img
                      src={testimonials[currentTestimonial].avatar || "/placeholder.svg"}
                      alt={`${testimonials[currentTestimonial].name} avatar`}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                  </div>
                  <div className="flex-1 text-center md:text-left">
                    <div className="flex justify-center md:justify-start mb-3">
                      {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <p className="text-lg text-gray-700 mb-4 italic">"{testimonials[currentTestimonial].text}"</p>
                    <div>
                      <p className="font-semibold text-gray-900">{testimonials[currentTestimonial].name}</p>
                      <p className="text-gray-600 text-sm">{testimonials[currentTestimonial].business}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Navigation */}
            <div className="flex justify-center space-x-4 mt-6">
              <Button variant="outline" size="sm" onClick={prevTestimonial} aria-label="Previous testimonial">
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <div className="flex space-x-2 items-center">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentTestimonial(index)}
                    className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                      index === currentTestimonial ? "bg-green-600" : "bg-gray-300"
                    }`}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>
              <Button variant="outline" size="sm" onClick={nextTestimonial} aria-label="Next testimonial">
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
