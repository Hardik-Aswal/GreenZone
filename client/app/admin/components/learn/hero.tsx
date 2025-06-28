import { Button } from "@/components/ui/button"
import { ArrowRight, Leaf } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-green-50 to-emerald-100 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <div className="bg-green-600 p-3 rounded-full">
              <Leaf className="h-8 w-8 text-white" aria-hidden="true" />
            </div>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            Build Trust. Earn Impact. <span className="text-green-600">Get Verified.</span>
          </h1>
          <p className="text-xl sm:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Understand how GreenZone Audit works and how to submit eco-friendly product details with confidence.
          </p>
          <Button
            size="lg"
            className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
            aria-label="Start your eco-friendly product audit"
          >
            Start Your Eco-Self Audit
            <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
          </Button>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-10 left-10 opacity-20">
        <div className="w-20 h-20 bg-green-300 rounded-full"></div>
      </div>
      <div className="absolute bottom-10 right-10 opacity-20">
        <div className="w-16 h-16 bg-emerald-300 rounded-full"></div>
      </div>
    </section>
  )
}
