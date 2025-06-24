"use client"

import { useState, useEffect, SetStateAction, Dispatch, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Leaf, TreePine, Award, TrendingUp, MapPin, Calendar, Share2, Sparkles, Wind, Sun, Download } from "lucide-react"

// Tree data with Indian species and locations
const treeData = [
  {
    id: 1,
    name: "Banyan Tree",
    scientificName: "Ficus benghalensis",
    location: "Mumbai, Maharashtra",
    plantedDate: "2024-01-15",
    co2Absorbed: 48,
    image: "https://th.bing.com/th/id/OIP.SUtkIrlLsRrYLIFz7OosswHaEK?r=0&o=7rm=3&rs=1&pid=ImgDetMain",
    description:
      "The majestic Banyan tree is India's national tree, known for its extensive canopy and aerial roots. It can live for hundreds of years and provides shelter to countless species.",
    benefits: ["Absorbs 48kg CO₂ annually", "Provides oxygen for 2 people", "Supports 1000+ species"],
  },
  {
    id: 2,
    name: "Neem Tree",
    scientificName: "Azadirachta indica",
    location: "Jaipur, Rajasthan",
    plantedDate: "2024-02-20",
    co2Absorbed: 35,
    image: "https://neemaus.com.au/wp-content/uploads/2017/08/Neem-rosser-Pk-1.jpg",
    description:
      "Known as the 'Village Pharmacy', Neem trees have incredible medicinal properties and are excellent air purifiers in urban environments.",
    benefits: ["Natural air purifier", "Medicinal properties", "Pest control"],
  },
  {
    id: 3,
    name: "Peepal Tree",
    scientificName: "Ficus religiosa",
    location: "Varanasi, Uttar Pradesh",
    plantedDate: "2024-03-10",
    co2Absorbed: 52,
    image: "https://i.etsystatic.com/20247897/r/il/652d45/2003567321/il_fullxfull.2003567321_1tsc.jpg",
    description:
      "Sacred in Hindu tradition, the Peepal tree is unique as it releases oxygen even at night, making it invaluable for air quality.",
    benefits: ["24/7 oxygen production", "Sacred significance", "Longevity up to 2500 years"],
  },
  {
    id: 4,
    name: "Gulmohar Tree",
    scientificName: "Delonix regia",
    location: "Bangalore, Karnataka",
    plantedDate: "2024-04-05",
    co2Absorbed: 28,
    image: "https://th.bing.com/th/id/OIP.ztbRF4gHRI_TlnJFgR9RRwHaHe?r=0&rs=1&pid=ImgDetMain",
    description:
      "Famous for its vibrant red-orange flowers, Gulmohar trees are excellent shade providers and add beauty to urban landscapes.",
    benefits: ["Beautiful flowering", "Excellent shade", "Urban cooling"],
  },
  {
    id: 5,
    name: "Mango Tree",
    scientificName: "Mangifera indica",
    location: "Lucknow, Uttar Pradesh",
    plantedDate: "2024-05-12",
    co2Absorbed: 42,
    image: "https://th.bing.com/th/id/OIP.S9yszaMO9nl8VRRxfTEXWAHaEJ?r=0&rs=1&pid=ImgDetMain",
    description:
      "India's national fruit tree, Mango trees are not only economically valuable but also excellent carbon absorbers and biodiversity supporters.",
    benefits: ["Fruit production", "Carbon sequestration", "Economic value"],
  },
]

const userStats = {
  saplingCoins: 3750,
  nextMilestone: 4000,
  totalCO2Saved: 205,
  greenActions: 47,
  treesPlanted: 5,
  totalRewards: 12,
}

const TreeComponent = ({ tree, index, setShowCertificate }: { tree: (typeof treeData)[0]; index: number, setShowCertificate : Dispatch<SetStateAction<boolean>> }) => (
  <Dialog>
    <DialogTrigger asChild>
      <div
        className={`relative cursor-pointer transform transition-all duration-300 hover:scale-110 ${
          index % 2 === 0 ? "animate-pulse" : ""
        }`}
        style={{
          animationDelay: `${index * 0.5}s`,
          animationDuration: "3s",
        }}
      >
        <TreePine className="w-8 h-8 md:w-12 md:h-12 text-green-600 hover:text-green-700 drop-shadow-lg" />
        <div className="absolute -top-2 -right-2 w-4 h-4 bg-green-500 rounded-full animate-ping"></div>
        <Badge className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs bg-green-100 text-green-800 border-green-300">
          {tree.co2Absorbed}kg CO₂
        </Badge>
      </div>
    </DialogTrigger>
    <DialogContent className="max-w-2xl">
      <DialogHeader>
        <DialogTitle className="flex items-center gap-2 text-green-800">
          <TreePine className="w-6 h-6" />
          {tree.name}
        </DialogTitle>
      </DialogHeader>
      <div className="space-y-4">
        <img src={tree.image || "/placeholder.svg"} alt={tree.name} className="w-full h-48 object-cover rounded-lg" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-semibold text-green-800 mb-2">Tree Details</h4>
            <div className="space-y-2 text-sm">
              <p>
                <span className="font-medium">Scientific Name:</span> <em>{tree.scientificName}</em>
              </p>
              <p className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                {tree.location}
              </p>
              <p className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                Planted: {new Date(tree.plantedDate).toLocaleDateString()}
              </p>
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-green-800 mb-2">Environmental Benefits</h4>
            <ul className="space-y-1 text-sm">
              {tree.benefits.map((benefit, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <Leaf className="w-3 h-3 text-green-600" />
                  {benefit}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <p className="text-gray-700 text-sm leading-relaxed">{tree.description}</p>
        <Button onClick={() => setShowCertificate(true)} className="w-full bg-green-600 hover:bg-green-700">
          <Share2 className="w-4 h-4 mr-2" />
          Generate Certificate
        </Button>
      </div>
    </DialogContent>
  </Dialog>
)

export default function GreenForestDashboard() {
  const [selectedTree, setSelectedTree] = useState<(typeof treeData)[0] | null>(null)
  const [showCelebration, setShowCelebration] = useState(false)
  const [showCertificate, setShowCertificate] = useState(false)
  const [animateCoins, setAnimateCoins] = useState(false)
  const certificateRef = useRef<HTMLDivElement>(null)
  const progressPercentage = (userStats.saplingCoins / userStats.nextMilestone) * 100

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimateCoins(true)
      setTimeout(() => setAnimateCoins(false), 1000)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const handleDownloadPDF = () => {
    if (certificateRef.current) {
      // Create a new window for printing
      const printWindow = window.open('', '_blank')
      if (printWindow) {
        const certificateContent = certificateRef.current.innerHTML
        
        printWindow.document.write(`
          <!DOCTYPE html>
          <html>
          <head>
            <title>Tree Planting Certificate</title>
            <style>
              body {
                font-family: Arial, sans-serif;
                margin: 0;
                padding: 20px;
                background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%);
              }
              .certificate-container {
                max-width: 800px;
                margin: 0 auto;
                background: white;
                border: 3px solid #16a34a;
                border-radius: 12px;
                padding: 40px;
                box-shadow: 0 10px 30px rgba(0,0,0,0.1);
              }
              .certificate-header {
                text-align: center;
                margin-bottom: 30px;
              }
              .certificate-title {
                font-size: 28px;
                font-weight: bold;
                color: #166534;
                margin: 15px 0;
              }
              .certificate-content {
                text-align: center;
                line-height: 1.8;
              }
              .recipient-name {
                font-size: 24px;
                font-weight: bold;
                color: #166534;
                margin: 20px 0;
              }
              .tree-count {
                font-size: 36px;
                font-weight: bold;
                color: #166534;
                margin: 15px 0;
              }
              .details-grid {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 20px;
                margin: 30px 0;
                text-align: left;
              }
              .detail-item {
                padding: 10px;
                background: #f0fdf4;
                border-radius: 8px;
              }
              .detail-label {
                font-weight: bold;
                color: #166534;
                font-size: 14px;
              }
              .detail-value {
                color: #166534;
                font-size: 16px;
              }
              .certificate-footer {
                margin-top: 40px;
                text-align: center;
                font-size: 14px;
                color: #166534;
              }
              @media print {
                body { background: white; }
                .certificate-container { box-shadow: none; }
              }
            </style>
          </head>
          <body>
            <div class="certificate-container">
              <div class="certificate-header">
                <div style="font-size: 48px;">🏆</div>
                <h1 class="certificate-title">Certificate of Environmental Impact</h1>
              </div>
              
              <div class="certificate-content">
                <p style="font-size: 18px; color: #166534;">
                  This certifies that <span class="recipient-name">Green Warrior</span> has successfully planted
                </p>
                <div class="tree-count">1 Tree</div>
                <p style="font-size: 16px; color: #166534; margin: 20px 0;">
                  Contributing to a greener planet and sustainable future
                </p>
                
                <div class="details-grid">
                  <div class="detail-item">
                    <div class="detail-label">Date Planted</div>
                    <div class="detail-value">${new Date().toLocaleDateString()}</div>
                  </div>
                  <div class="detail-item">
                    <div class="detail-label">Estimated CO₂ Absorption</div>
                    <div class="detail-value">35kg annually</div>
                  </div>
                  <div class="detail-item">
                    <div class="detail-label">Certificate ID</div>
                    <div class="detail-value">GF-${Date.now()}</div>
                  </div>
                  <div class="detail-item">
                    <div class="detail-label">Organization</div>
                    <div class="detail-value">Amazon GreenForest</div>
                  </div>
                </div>
                
                <div class="certificate-footer">
                  <p>🌱 Together, we're building a greener tomorrow 🌱</p>
                  <p>This certificate represents your commitment to environmental sustainability</p>
                </div>
              </div>
            </div>
          </body>
          </html>
        `)
        
        printWindow.document.close()
        
        // Wait for content to load, then print
        setTimeout(() => {
          printWindow.print()
          printWindow.close()
        }, 500)
      }
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 p-4">
      <div className="max-w-7xl mx-auto h-screen overflow-hidden">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl md:text-4xl font-bold text-green-800 flex items-center gap-3">
            <Leaf className="w-8 h-8 text-green-600" />
            Amazon GreenForest
            <Sparkles className="w-6 h-6 text-yellow-500 animate-pulse" />
          </h1>
          <p className="text-green-700 mt-2">Your journey towards a greener planet</p>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-12 grid-rows-6 gap-4 h-[calc(100vh-120px)]">
          {/* Sapling Coins - Top Left */}
          <Card className="col-span-12 md:col-span-3 row-span-1 bg-gradient-to-r from-green-400 to-emerald-500 text-white border-0">
            <CardContent className="p-4 h-full flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm">Sapling Coins</p>
                <p className={`text-2xl font-bold ${animateCoins ? "animate-bounce" : ""}`}>
                  {userStats.saplingCoins.toLocaleString()}
                </p>
              </div>
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <Leaf className="w-6 h-6" />
              </div>
            </CardContent>
          </Card>

          {/* Progress to Next Tree - Top Center */}
          <Card className="col-span-12 md:col-span-6 row-span-1 border-green-200">
            <CardContent className="p-4 h-full flex flex-col justify-center">
              <div className="flex justify-between items-center mb-2">
                <p className="text-sm font-medium text-green-800">Next Tree Milestone</p>
                <Badge variant="outline" className="text-green-700 border-green-300">
                  {userStats.nextMilestone - userStats.saplingCoins} coins to go
                </Badge>
              </div>
              <Progress value={progressPercentage} className="h-3 bg-green-100" />
              <p className="text-xs text-green-600 mt-1">
                {userStats.saplingCoins} / {userStats.nextMilestone} coins
              </p>
            </CardContent>
          </Card>

          {/* Quick Stats - Top Right */}
          <Card className="col-span-12 md:col-span-3 row-span-1 border-green-200">
            <CardContent className="p-4 h-full flex items-center justify-between">
              <div>
                <p className="text-green-700 text-sm">Trees Planted</p>
                <p className="text-2xl font-bold text-green-800">{userStats.treesPlanted}</p>
              </div>
              <Award className="w-8 h-8 text-green-600" />
            </CardContent>
          </Card>

          {/* Digital Forest - Main Center */}
          <Card className="col-span-12 md:col-span-8 row-span-4 border-green-200 bg-gradient-to-b from-sky-100 to-green-100">
            <CardHeader className="pb-2">
              <CardTitle className="text-green-800 flex items-center gap-2">
                <TreePine className="w-5 h-5" />
                Your Digital Forest
              </CardTitle>
            </CardHeader>
            <CardContent className="h-full pb-6">
              <div className="relative h-full bg-gradient-to-b from-blue-50 to-green-200 rounded-lg p-6 overflow-hidden">
                {/* Sky and clouds */}
                <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-blue-100 to-transparent">
                  <div className="absolute top-4 left-8 w-12 h-6 bg-white rounded-full opacity-70"></div>
                  <div className="absolute top-6 right-12 w-8 h-4 bg-white rounded-full opacity-50"></div>
                </div>

                {/* Sun */}
                <Sun className="absolute top-4 right-4 w-8 h-8 text-yellow-400 animate-pulse" />

                {/* Trees arranged in a natural pattern */}
                <div className="absolute bottom-8 left-8">
                  <TreeComponent tree={treeData[0]} index={0} setShowCertificate={setShowCertificate} />
                </div>
                <div className="absolute bottom-12 left-24">
                  <TreeComponent tree={treeData[1]} index={1} setShowCertificate={setShowCertificate} />
                </div>
                <div className="absolute bottom-6 left-40">
                  <TreeComponent tree={treeData[2]} index={2} setShowCertificate={setShowCertificate} />
                </div>
                <div className="absolute bottom-16 right-32">
                  <TreeComponent tree={treeData[3]} index={3} setShowCertificate={setShowCertificate} />
                </div>
                <div className="absolute bottom-8 right-16">
                  <TreeComponent tree={treeData[4]} index={4} setShowCertificate={setShowCertificate} />
                </div>

                {/* Ground */}
                <div className="absolute bottom-0 left-0 w-full h-8 bg-gradient-to-t from-green-400 to-green-300 rounded-b-lg"></div>

                {/* Floating particles */}
                <div className="absolute top-1/2 left-1/4 w-2 h-2 bg-green-400 rounded-full animate-ping opacity-60"></div>
                <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-yellow-400 rounded-full animate-pulse"></div>
              </div>
            </CardContent>
          </Card>

          {/* Eco Impact Stats - Right Side */}
          <div className="col-span-12 md:col-span-4 row-span-4 space-y-4">
            {/* CO2 Saved */}
            <Card className="border-green-200 bg-gradient-to-r from-blue-50 to-cyan-50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-blue-700">CO₂ Saved</p>
                    <p className="text-2xl font-bold text-blue-800">{userStats.totalCO2Saved}kg</p>
                  </div>
                  <Wind className="w-8 h-8 text-blue-600" />
                </div>
                <div className="mt-2 flex items-center text-xs text-blue-600">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  +15kg this month
                </div>
              </CardContent>
            </Card>

            {/* Green Actions */}
            <Card className="border-green-200 bg-gradient-to-r from-emerald-50 to-green-50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-emerald-700">Green Actions</p>
                    <p className="text-2xl font-bold text-emerald-800">{userStats.greenActions}</p>
                  </div>
                  <Leaf className="w-8 h-8 text-emerald-600" />
                </div>
                <div className="mt-2 flex items-center text-xs text-emerald-600">
                  <Sparkles className="w-3 h-3 mr-1" />
                  +8 this week
                </div>
              </CardContent>
            </Card>

            {/* Recent Achievement */}
            <Card className="border-green-200 bg-gradient-to-r from-yellow-50 to-orange-50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-orange-700">Latest Achievement</p>
                    <p className="text-sm font-semibold text-orange-800">Tree Planter Badge</p>
                  </div>
                  <Award className="w-8 h-8 text-orange-600" />
                </div>
                <Badge className="mt-2 bg-orange-100 text-orange-800 border-orange-300">5 Trees Planted</Badge>
              </CardContent>
            </Card>

            {/* Plant New Tree Button */}
            <Button
              onClick={() => setShowCelebration(true)}
              className="w-full bg-green-600 hover:bg-green-700 h-12 text-lg font-semibold"
            >
              <TreePine className="w-5 h-5 mr-2" />
              Plant New Tree
            </Button>
          </div>
        </div>
      </div>

      {/* Celebration Modal */}
      <Dialog open={showCelebration} onOpenChange={setShowCelebration}>
        <DialogContent className="max-w-md text-center">
          <DialogHeader>
            <DialogTitle className="text-2xl text-green-800 flex items-center justify-center gap-2">
              <Sparkles className="w-8 h-8 text-yellow-500 animate-spin" />
              Congratulations!
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="text-6xl animate-bounce">🌳</div>
            <p className="text-lg text-green-700">You've planted a new tree in your digital forest!</p>
            <div className="bg-green-50 p-4 rounded-lg">
              <p className="text-sm text-green-800">
                <strong>+250 Sapling Coins earned!</strong>
              </p>
              <p className="text-xs text-green-600 mt-1">Your tree will absorb approximately 35kg of CO₂ annually</p>
            </div>
            <Button
              onClick={() => {
                setShowCelebration(false)
                setShowCertificate(true)
              }}
              className="w-full bg-green-600 hover:bg-green-700"
            >
              Get Your Certificate
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Certificate Modal */}
      <Dialog open={showCertificate} onOpenChange={setShowCertificate}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-green-800">Tree Planting Certificate</DialogTitle>
          </DialogHeader>
          <div ref={certificateRef} className="bg-gradient-to-br from-green-50 to-emerald-50 p-8 rounded-lg border-2 border-green-200">
            <div className="text-center space-y-4">
              <div className="text-4xl">🏆</div>
              <h2 className="text-2xl font-bold text-green-800">Certificate of Environmental Impact</h2>
              <div className="border-t border-b border-green-300 py-4 my-4">
                <p className="text-lg text-green-700">
                  This certifies that <strong>Green Warrior</strong> has successfully planted
                </p>
                <p className="text-3xl font-bold text-green-800 my-2">1 Tree</p>
                <p className="text-green-700">Contributing to a greener planet and sustainable future</p>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-green-600">Date Planted</p>
                  <p className="font-semibold">{new Date().toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-green-600">Estimated CO₂ Absorption</p>
                  <p className="font-semibold">35kg annually</p>
                </div>
              </div>
              <div className="flex gap-2 mt-6">
                <Button className="flex-1 bg-green-600 hover:bg-green-700">
                  <Share2 className="w-4 h-4 mr-2" />
                  Share Certificate
                </Button>
                <Button 
                  variant="outline" 
                  className="flex-1 border-green-300 text-green-700 hover:bg-green-50" 
                  onClick={handleDownloadPDF}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download PDF
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}