import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MessageCircle, HelpCircle, Mail, Phone } from "lucide-react"

export function SupportSection() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4 text-sm font-medium">
            💬 Get Help
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">Still Have Questions?</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            We're here to help you succeed with your eco-friendly product verification. Choose the support option that
            works best for you.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="text-center hover:shadow-lg transition-shadow duration-200">
            <CardHeader className="pb-4">
              <div className="flex justify-center mb-4">
                <div className="bg-blue-100 p-3 rounded-full">
                  <HelpCircle className="h-6 w-6 text-blue-600" />
                </div>
              </div>
              <CardTitle className="text-lg font-semibold">FAQ</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-sm mb-4">Find answers to common questions about the audit process</p>
              <Button variant="outline" size="sm" className="w-full bg-transparent">
                Browse FAQ
              </Button>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow duration-200">
            <CardHeader className="pb-4">
              <div className="flex justify-center mb-4">
                <div className="bg-green-100 p-3 rounded-full">
                  <MessageCircle className="h-6 w-6 text-green-600" />
                </div>
              </div>
              <CardTitle className="text-lg font-semibold">Live Chat</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-sm mb-4">Chat with our support team in real-time</p>
              <Button variant="outline" size="sm" className="w-full bg-transparent">
                Start Chat
              </Button>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow duration-200">
            <CardHeader className="pb-4">
              <div className="flex justify-center mb-4">
                <div className="bg-purple-100 p-3 rounded-full">
                  <Mail className="h-6 w-6 text-purple-600" />
                </div>
              </div>
              <CardTitle className="text-lg font-semibold">Email Support</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-sm mb-4">Send us a detailed message and we'll respond within 24 hours</p>
              <Button variant="outline" size="sm" className="w-full bg-transparent">
                Send Email
              </Button>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow duration-200">
            <CardHeader className="pb-4">
              <div className="flex justify-center mb-4">
                <div className="bg-orange-100 p-3 rounded-full">
                  <Phone className="h-6 w-6 text-orange-600" />
                </div>
              </div>
              <CardTitle className="text-lg font-semibold">Phone Support</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-sm mb-4">Speak directly with our experts</p>
              <Button variant="outline" size="sm" className="w-full bg-transparent">
                Call Now
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <Card className="max-w-2xl mx-auto bg-gradient-to-r from-green-600 to-emerald-600 text-white border-0">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4">Ready to Get Started?</h3>
              <p className="text-green-100 mb-6">
                Join thousands of sellers who have already verified their eco-friendly products and are seeing real
                results.
              </p>
              <Button size="lg" className="bg-white text-green-600 hover:bg-gray-100 font-semibold">
                Start Your Eco-Self Audit Now
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
