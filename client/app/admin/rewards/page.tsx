"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Coins, Gift, Leaf, ShoppingBag, Clock, Star, TreePine, Award, CreditCard, Crown } from "lucide-react"
import { useAppDispatch, useAppSelector } from "@/app/store/hooks"
import { decrementByValue } from "@/app/store/saplingSlice"

interface Reward {
  id: string
  title: string
  description: string
  coinCost: number
  category: "digital" | "donation" | "merchandise"
  image: string
  badge?: string
  limitedTime?: boolean
}

const rewards: Reward[] = [
  {
    id: "1",
    title: "1% less commission",
    description: "1% less commission on all sales for 1 week",
    coinCost: 2500,
    category: "digital",
    image: "https://media.istockphoto.com/id/2166696135/vector/fitness-health-gym-trendy-icons-on-circles.jpg?s=612x612&w=0&k=20&c=phk4MZF5DM6Jf9JKGDeQ3jlZFDGQbpWfxdvXP4vImA4=",
    badge: "Popular",
  },
  {
    id: "2",
    title: "Waived Shipping Fees",
    description: "200 Rs off on shipping fees for your next order",
    coinCost: 1000,
    category: "donation",
    image: "https://cdn.prod.website-files.com/5ef27cb65411b70949a151e9/615d889cb3ba1b55b8cf9bf6_FLagship.png",
    badge: "Impact",
  },
 
]

const redemptionHistory = [
  {
    id: "1",
    title: "Amazon Gift Card ($10)",
    date: "2024-01-15",
    coins: 1000,
    status: "completed",
  },
  {
    id: "2",
    title: "Plant 5 Trees",
    date: "2024-01-10",
    coins: 500,
    status: "completed",
  },
  {
    id: "3",
    title: "GreenZone Explorer Badge",
    date: "2024-01-05",
    coins: 250,
    status: "completed",
  },
]

const limitedOffers = [

]

export default function SaplingRewards() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [showRedeemModal, setShowRedeemModal] = useState(false)
  const [selectedReward, setSelectedReward] = useState<Reward | null>(null)
  const coinBalance = useAppSelector((state) => state.sapling.value)
  const dispatch = useAppDispatch()

  const filteredRewards =
    selectedCategory === "all" ? rewards : rewards.filter((reward) => reward.category === selectedCategory)

  const handleRedeem = (reward: Reward) => {
    setSelectedReward(reward)
    setShowRedeemModal(true)
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "digital":
        return <CreditCard className="w-4 h-4" />
      case "donation":
        return <TreePine className="w-4 h-4" />
      case "merchandise":
        return <ShoppingBag className="w-4 h-4" />
      default:
        return <Gift className="w-4 h-4" />
    }
  }

  const getBadgeColor = (badge?: string) => {
    switch (badge) {
      case "Popular":
        return "bg-blue-100 text-blue-800"
      case "Impact":
        return "bg-green-100 text-green-800"
      case "Premium":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2">
              <Leaf className="w-8 h-8 text-green-600" />
              <h1 className="text-2xl font-bold text-gray-900">Sapling Rewards</h1>
            </div>
            <div className="flex items-center space-x-4">
            
              <Button variant="outline" size="sm">
                <Award className="w-4 h-4 mr-2" />
                My Profile
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Limited Time Offers */}
        <div className="">
          <div className="flex ">
            {/* <Clock className="w-5 h-5 text-orange-500 mr-2" /> */}
            {/* <h2 className="text-xl font-bold text-gray-900">Limited Time Offers</h2> */}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {limitedOffers.map((offer) => (
              <Card key={offer.id} className="overflow-hidden border-orange-200">
                <CardContent className="p-0">
                  <div className="flex">
                    <img src={offer.image || "/placeholder.svg"} alt={offer.title} className="w-32 h-24 object-cover" />
                    <div className="p-4 flex-1">
                      <h3 className="font-semibold text-gray-900">{offer.title}</h3>
                      <p className="text-sm text-gray-600 mt-1">{offer.description}</p>
                      <div className="flex items-center justify-between mt-2">
                        <Badge variant="secondary" className="bg-orange-100 text-orange-800">
                          {offer.timeLeft}
                        </Badge>
                        <Button size="sm" className="bg-orange-600 hover:bg-orange-700">
                          View Offer
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="rewards" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 max-w-md">
            <TabsTrigger value="rewards">Available Rewards</TabsTrigger>
            <TabsTrigger value="history">Redemption History</TabsTrigger>
          </TabsList>

          <TabsContent value="rewards" className="space-y-6">
            {/* Category Filters */}
            <div className="flex flex-wrap gap-2">
              <Button
                variant={selectedCategory === "all" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory("all")}
                className="bg-green-600 hover:bg-green-700"
              >
                <Gift className="w-4 h-4 mr-2" />
                All Rewards
              </Button>
              <Button
                variant={selectedCategory === "digital" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory("digital")}
                className={selectedCategory === "digital" ? "bg-green-600 hover:bg-green-700" : ""}
              >
                {getCategoryIcon("digital")}
                <span className="ml-2">Digital</span>
              </Button>
              <Button
                variant={selectedCategory === "donation" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory("donation")}
                className={selectedCategory === "donation" ? "bg-green-600 hover:bg-green-700" : ""}
              >
                {getCategoryIcon("donation")}
                <span className="ml-2">Donations</span>
              </Button>
              <Button
                variant={selectedCategory === "merchandise" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory("merchandise")}
                className={selectedCategory === "merchandise" ? "bg-green-600 hover:bg-green-700" : ""}
              >
                {getCategoryIcon("merchandise")}
                <span className="ml-2">Merchandise</span>
              </Button>
            </div>

            {/* Rewards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredRewards.map((reward) => (
                <Card key={reward.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative">
                    <img
                      src={reward.image || "/placeholder.svg"}
                      alt={reward.title}
                      className="w-full h-48 object-cover"
                    />
                    {reward.limitedTime && (
                      <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">
                        <Clock className="w-3 h-3 mr-1" />
                        Limited
                      </Badge>
                    )}
                    {reward.badge && (
                      <Badge className={`absolute top-2 right-2 ${getBadgeColor(reward.badge)}`}>
                        <Star className="w-3 h-3 mr-1" />
                        {reward.badge}
                      </Badge>
                    )}
                  </div>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">{reward.title}</CardTitle>
                    <CardDescription>{reward.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-1">
                        <Coins className="w-4 h-4 text-green-600" />
                        <span className="font-bold text-green-800">{reward.coinCost.toLocaleString()}</span>
                      </div>
                      <Button
                        size="sm"
                        onClick={() => handleRedeem(reward)}
                        disabled={coinBalance < reward.coinCost}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        Redeem
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="history">
            <Card>
              <CardHeader>
                <CardTitle>Redemption History</CardTitle>
                <CardDescription>Track your past reward redemptions</CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-64">
                  <div className="space-y-4">
                    {redemptionHistory.map((item, index) => (
                      <div key={item.id}>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">{item.title}</p>
                            <p className="text-sm text-gray-500">{item.date}</p>
                          </div>
                          <div className="text-right">
                            <div className="flex items-center text-green-600">
                              <Coins className="w-4 h-4 mr-1" />
                              <span className="font-semibold">{item.coins}</span>
                            </div>
                            <Badge variant="outline" className="mt-1">
                              {item.status}
                            </Badge>
                          </div>
                        </div>
                        {index < redemptionHistory.length - 1 && <Separator className="mt-4" />}
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Redemption Success Modal */}
      <Dialog open={showRedeemModal} onOpenChange={setShowRedeemModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <Crown className="w-5 h-5 text-green-600 mr-2" />
              Confirm Redemption
            </DialogTitle>
            <DialogDescription>You're about to redeem the following reward:</DialogDescription>
          </DialogHeader>
          {selectedReward && (
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <img
                  src={selectedReward.image || "/placeholder.svg"}
                  alt={selectedReward.title}
                  className="w-16 h-16 object-cover rounded"
                />
                <div className="flex-1">
                  <h3 className="font-semibold">{selectedReward.title}</h3>
                  <p className="text-sm text-gray-600">{selectedReward.description}</p>
                </div>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <div className="flex items-center justify-between">
                  <span>Cost:</span>
                  <div className="flex items-center text-green-800 font-bold">
                    <Coins className="w-4 h-4 mr-1" />
                    {selectedReward.coinCost.toLocaleString()} Coins
                  </div>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <span>Remaining Balance:</span>
                  <div className="flex items-center text-green-800 font-bold">
                    <Coins className="w-4 h-4 mr-1" />
                    {(coinBalance - selectedReward.coinCost).toLocaleString()} Coins
                  </div>
                </div>
              </div>
            </div>
          )}
          <DialogFooter className="sm:justify-start">
            <Button type="button" variant="outline" onClick={() => setShowRedeemModal(false)}>
              Cancel
            </Button>
            <Button
              type="button"
              className="bg-green-600 hover:bg-green-700"
              onClick={() => {
                setShowRedeemModal(false)
                dispatch(decrementByValue(selectedReward?.coinCost || 0))
                // Handle redemption logic here
              }}
            >
              Confirm Redemption
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
