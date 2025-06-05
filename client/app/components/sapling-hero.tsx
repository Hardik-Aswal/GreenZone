import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Leaf, Gift, Award, ArrowRight } from "lucide-react"
import { useRouter } from "next/navigation"
export default function SaplingHero() {
  const router = useRouter()
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 py-16 md:py-24 lg:py-32">

      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,_theme(colors.green.400)_1px,_transparent_0)] bg-[size:24px_24px]" />
      </div>

      <div className="container relative mx-auto px-4 md:px-6">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-center">

          <div className="flex flex-col justify-center space-y-6">
            <div className="space-y-4">
              <Badge variant="outline" className="w-fit bg-green-100 text-green-800 border-green-300">
                <Leaf className="w-3 h-3 mr-1" />
                New Currency Launch
              </Badge>

              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl lg:text-7xl">
                Introducing{" "}
                <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                  Sapling
                </span>
              </h1>

              <p className="text-xl text-gray-600 md:text-2xl max-w-2xl">
                The revolutionary eco-currency powered by your{" "}
                <span className="font-semibold text-green-700">EcoScore</span>. Earn Saplings through sustainable
                actions and redeem them for exclusive offers and vouchers.
              </p>
            </div>

 
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="flex items-center space-x-3 p-4 bg-white/60 rounded-lg border border-green-100">
                <div className="flex-shrink-0 w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <Award className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">EcoScore Based</h3>
                  <p className="text-sm text-gray-600">Earn through sustainable actions</p>
                </div>
              </div>

              <div className="flex items-center space-x-3 p-4 bg-white/60 rounded-lg border border-green-100">
                <div className="flex-shrink-0 w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <Gift className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Redeem Rewards</h3>
                  <p className="text-sm text-gray-600">Exchange for offers & vouchers</p>
                </div>
              </div>
            </div>

     
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white"
              onClick={()=> router.push('/dashboard')}
              >
                Start Earning Saplings
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button variant="outline" size="lg" className="border-green-300 text-green-700 hover:bg-green-50">
                Learn More
              </Button>
            </div>

      
            <div className="flex flex-wrap gap-8 pt-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">100%</div>
                <div className="text-sm text-gray-600">Eco-Friendly</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">500+</div>
                <div className="text-sm text-gray-600">Partner Brands</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">∞</div>
                <div className="text-sm text-gray-600">Earning Potential</div>
              </div>
            </div>
          </div>

   
          <div className="flex justify-center lg:justify-end">
            <div className="relative">
       
              <div className="absolute inset-0 bg-green-400/20 rounded-full blur-3xl scale-110" />

       
              <div className="relative">
                <Image
                  src="/images/sapling.png"
                  alt="Sapling Coin - Eco-friendly digital currency"
                  width={400}
                  height={400}
                  className="w-80 h-80 md:w-96 md:h-96 lg:w-[400px] lg:h-[400px] object-contain drop-shadow-2xl"
                  priority
                />

         
                <div className="absolute -top-4 -right-4 w-16 h-16 bg-green-100 rounded-full flex items-center justify-center animate-bounce">
                  <Leaf className="w-8 h-8 text-green-600" />
                </div>

                <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center animate-pulse">
                  <Gift className="w-6 h-6 text-emerald-600" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
