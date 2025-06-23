"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"
import {
  Crown,
  Medal,
  Award,
  Leaf,
  TreePine,
  Coins,
  MapPin,
  Filter,
  Recycle,
  ShoppingBag,
  Zap,
  Car,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface User {
  id: number
  name: string
  city: string
  profilePicture: string
  saplingCoins: number
  co2Saved: number
  rank: number
  region: string
  ecoCategory: string
  isCurrentUser?: boolean
}

const leaderboardData: User[] = [
  {
    id: 1,
    name: "Hardik Aswal",
    city: "Mumbai",
    profilePicture: "https://th.bing.com/th/id/R.f718331f6b563dc71919be7707e366b9?rik=z%2f%2bsAc9Lip%2bCzQ&pid=ImgRaw&r=0",
    saplingCoins: 2850,
    co2Saved: 145.2,
    rank: 1,
    region: "West",
    ecoCategory: "Transport",
  },
  {
    id: 2,
    name: "Prasanna Bhavana",
    city: "Bangalore",
    profilePicture: "https://th.bing.com/th/id/OIP.J2-edlDSDjePIeunOo62QQAAAA?r=0&rs=1&pid=ImgDetMain",
    saplingCoins: 2720,
    co2Saved: 138.7,
    rank: 2,
    region: "South",
    ecoCategory: "Energy",
  },
  {
    id: 3,
    name: "Rohit Arora",
    city: "Delhi",
    profilePicture: "https://thumbs.dreamstime.com/b/happy-young-boy-teenager-head-character-happy-young-boy-teenager-head-character-vector-illustration-design-182236378.jpg",
    saplingCoins: 2650,
    co2Saved: 132.4,
    rank: 3,
    region: "North",
    ecoCategory: "Shopping",
  },
  {
    id: 4,
    name: "Archita Goel",
    city: "Pune",
    profilePicture: "https://th.bing.com/th/id/R.62d17ebf426ce5e527f3ecfe421dce38?rik=g3OktdH%2bnTR6oA&pid=ImgRaw&r=0",
    saplingCoins: 2480,
    co2Saved: 125.8,
    rank: 4,
    region: "West",
    ecoCategory: "Recycling",
  },
  {
    id: 5,
    name: "Vikram Sharma",
    city: "Hyderabad",
    profilePicture: "https://th.bing.com/th/id/OIP.01SfV54_RXChWWsGwAisngHaHa?r=0&o=7rm=3&rs=1&pid=ImgDetMain",
    saplingCoins: 2350,
    co2Saved: 119.3,
    rank: 5,
    region: "South",
    ecoCategory: "Energy",
  },
  {
    id: 6,
    name: "Priya Patel",
    city: "Ahmedabad",
    profilePicture: "https://cdn4.vectorstock.com/i/1000x1000/87/18/beautiful-and-young-woman-character-vector-15448718.jpg",
    saplingCoins: 2280,
    co2Saved: 115.6,
    rank: 6,
    region: "West",
    ecoCategory: "Transport",
  },
  {
    id: 7,
    name: "Sujal",
    city: "Chennai",
    profilePicture: "https://th.bing.com/th/id/OIP.pTTKlGvqOq7Ia7fJyOnx8gHaHa?r=0&rs=1&pid=ImgDetMain",
    saplingCoins: 2150,
    co2Saved: 109.2,
    rank: 7,
    region: "South",
    ecoCategory: "Shopping",
    isCurrentUser: true,
  },
  {
    id: 8,
    name: "Ankit Gupta",
    city: "Kolkata",
    profilePicture: "https://th.bing.com/th/id/OIP.NtgRAoZOmptiqAb1eQGDAAHaHa?r=0&pid=ImgDet&w=184&h=184&c=7&dpr=1,3",
    saplingCoins: 2080,
    co2Saved: 105.4,
    rank: 8,
    region: "East",
    ecoCategory: "Recycling",
  },
  {
    id: 9,
    name: "Neha Singh",
    city: "Jaipur",
    profilePicture: "https://thumbs.dreamstime.com/b/face-expressions-woman-blue-blouse-face-expression-woman-blue-blouse-happy-female-emotion-beautiful-cartoon-character-139161557.jpg",
    saplingCoins: 1950,
    co2Saved: 98.7,
    rank: 9,
    region: "North",
    ecoCategory: "Energy",
  },
  {
    id: 10,
    name: "Rajesh Kumar",
    city: "Lucknow",
    profilePicture: "https://img.freepik.com/premium-psd/3d-young-boy-character-isolated-transparent-background_1150372-26321.jpg",
    saplingCoins: 1820,
    co2Saved: 92.1,
    rank: 10,
    region: "North",
    ecoCategory: "Transport",
  },
]

const EcoLeaderboard = () => {
  const [users, setUsers] = useState(leaderboardData)
  const [selectedRegion, setSelectedRegion] = useState("all")
  const [selectedPeriod, setSelectedPeriod] = useState("monthly")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [animatedCoins, setAnimatedCoins] = useState<{ [key: number]: number }>({})

  useEffect(() => {
    // Initialize animated coins
    const initialCoins: { [key: number]: number } = {}
    users.forEach((user) => {
      initialCoins[user.id] = user.saplingCoins
    })
    setAnimatedCoins(initialCoins)

    // Simulate real-time updates
    const interval = setInterval(() => {
      setUsers((prevUsers) =>
        prevUsers.map((user) => ({
          ...user,
          saplingCoins: user.saplingCoins + Math.floor(Math.random() * 10),
          co2Saved: user.co2Saved + Math.random() * 2,
        })),
      )
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    // Animate coin updates
    users.forEach((user) => {
      if (animatedCoins[user.id] !== user.saplingCoins) {
        const startValue = animatedCoins[user.id] || user.saplingCoins
        const endValue = user.saplingCoins
        const duration = 1000
        const startTime = Date.now()

        const animate = () => {
          const elapsed = Date.now() - startTime
          const progress = Math.min(elapsed / duration, 1)
          const currentValue = Math.floor(startValue + (endValue - startValue) * progress)

          setAnimatedCoins((prev) => ({
            ...prev,
            [user.id]: currentValue,
          }))

          if (progress < 1) {
            requestAnimationFrame(animate)
          }
        }

        requestAnimationFrame(animate)
      }
    })
  }, [users, animatedCoins])

  const filteredUsers = users.filter((user) => {
    if (selectedRegion !== "all" && user.region !== selectedRegion) return false
    if (selectedCategory !== "all" && user.ecoCategory !== selectedCategory) return false
    return true
  })

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="h-6 w-6 text-yellow-500" />
      case 2:
        return <Medal className="h-6 w-6 text-gray-400" />
      case 3:
        return <Award className="h-6 w-6 text-amber-600" />
      default:
        return null
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Transport":
        return <Car className="h-4 w-4" />
      case "Energy":
        return <Zap className="h-4 w-4" />
      case "Shopping":
        return <ShoppingBag className="h-4 w-4" />
      case "Recycling":
        return <Recycle className="h-4 w-4" />
      default:
        return <Leaf className="h-4 w-4" />
    }
  }

  const currentUser = users.find((user) => user.isCurrentUser)

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <TreePine className="h-8 w-8 text-green-600" />
            <h1 className="text-4xl font-bold text-green-800">GreenZone</h1>
          </div>
          <p className="text-xl text-green-700 mb-2">Eco-Impact Leaderboard</p>
          <p className="text-green-600">Making sustainability rewarding, one purchase at a time</p>
        </div>

        {/* Filters */}
        <Card className="mb-8 shadow-lg border-green-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-800">
              <Filter className="h-5 w-5" />
              Filters
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-sm font-medium text-green-700 mb-2 block">Region</label>
                <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                  <SelectTrigger className="border-green-300">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Regions</SelectItem>
                    <SelectItem value="North">North</SelectItem>
                    <SelectItem value="South">South</SelectItem>
                    <SelectItem value="East">East</SelectItem>
                    <SelectItem value="West">West</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium text-green-700 mb-2 block">Time Period</label>
                <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                  <SelectTrigger className="border-green-300">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium text-green-700 mb-2 block">Eco Category</label>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="border-green-300">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="Transport">Transport</SelectItem>
                    <SelectItem value="Energy">Energy</SelectItem>
                    <SelectItem value="Shopping">Shopping</SelectItem>
                    <SelectItem value="Recycling">Recycling</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Top 3 Podium */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {filteredUsers.slice(0, 3).map((user, index) => (
            <motion.div
              key={user.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`relative ${index === 0 ? "md:order-2" : index === 1 ? "md:order-1" : "md:order-3"}`}
            >
              <Card
                className={`shadow-xl border-2 ${
                  user.rank === 1
                    ? "border-yellow-400 bg-gradient-to-br from-yellow-50 to-yellow-100"
                    : user.rank === 2
                      ? "border-gray-400 bg-gradient-to-br from-gray-50 to-gray-100"
                      : "border-amber-400 bg-gradient-to-br from-amber-50 to-amber-100"
                }`}
              >
                <CardContent className="p-6 text-center">
                  <div className="relative mb-4">
                    <img
                      src={user.profilePicture || "/placeholder.svg"}
                      alt={user.name}
                      className="w-20 h-20 rounded-full mx-auto border-4 border-white shadow-lg"
                    />
                    <div className="absolute -top-2 -right-2">{getRankIcon(user.rank)}</div>
                  </div>
                  <h3 className="font-bold text-lg text-gray-800 mb-1">{user.name}</h3>
                  <div className="flex items-center justify-center gap-1 text-green-600 mb-3">
                    <MapPin className="h-4 w-4" />
                    <span className="text-sm">{user.city}</span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-center gap-2 text-green-700">
                      <Coins className="h-5 w-5" />
                      <span className="font-bold text-xl">{animatedCoins[user.id] || user.saplingCoins}</span>
                    </div>
                    <div className="flex items-center justify-center gap-2 text-green-600">
                      <Leaf className="h-4 w-4" />
                      <span className="text-sm">{user.co2Saved.toFixed(1)} kg CO₂ saved</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Current User Highlight (if not in top 3) */}
        {currentUser && currentUser.rank > 3 && (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="mb-6">
            <Card className="shadow-lg border-2 border-green-400 bg-gradient-to-r from-green-50 to-emerald-50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <img
                        src={currentUser.profilePicture || "/placeholder.svg"}
                        alt={currentUser.name}
                        className="w-12 h-12 rounded-full border-2 border-green-400"
                      />
                      <Badge className="absolute -top-1 -right-1 bg-green-500 text-white text-xs px-1">YOU</Badge>
                    </div>
                    <div>
                      <h4 className="font-bold text-green-800">{currentUser.name}</h4>
                      <div className="flex items-center gap-1 text-green-600">
                        <MapPin className="h-3 w-3" />
                        <span className="text-sm">{currentUser.city}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-green-700">#{currentUser.rank}</div>
                    <div className="flex items-center gap-2 text-green-600">
                      <Coins className="h-4 w-4" />
                      <span className="font-semibold">{animatedCoins[currentUser.id] || currentUser.saplingCoins}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Main Leaderboard */}
        <Card className="shadow-xl border-green-200">
          <CardHeader>
            <CardTitle className="text-green-800">Regional Rankings</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-green-50 border-b border-green-200">
                  <tr>
                    <th className="text-left p-4 font-semibold text-green-800">Rank</th>
                    <th className="text-left p-4 font-semibold text-green-800">User</th>
                    <th className="text-left p-4 font-semibold text-green-800">Sapling Coins</th>
                    <th className="text-left p-4 font-semibold text-green-800">CO₂ Saved</th>
                    <th className="text-left p-4 font-semibold text-green-800">Category</th>
                  </tr>
                </thead>
                <tbody>
                  <AnimatePresence>
                    {filteredUsers.map((user, index) => (
                      <motion.tr
                        key={user.id}
                        layoutId={`user-${user.id}`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className={`border-b border-green-100 hover:bg-green-50 transition-colors ${
                          user.isCurrentUser ? "bg-green-50 border-green-300" : ""
                        }`}
                      >
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <span
                              className={`font-bold text-lg ${user.rank <= 3 ? "text-green-600" : "text-gray-600"}`}
                            >
                              #{user.rank}
                            </span>
                            {user.rank <= 3 && getRankIcon(user.rank)}
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <div className="relative">
                              <img
                                src={user.profilePicture || "/placeholder.svg"}
                                alt={user.name}
                                className="w-10 h-10 rounded-full border-2 border-green-200"
                              />
                              {user.isCurrentUser && (
                                <Badge className="absolute -top-1 -right-1 bg-green-500 text-white text-xs px-1">
                                  YOU
                                </Badge>
                              )}
                            </div>
                            <div>
                              <div
                                className={`font-semibold ${user.isCurrentUser ? "text-green-800" : "text-gray-800"}`}
                              >
                                {user.name}
                              </div>
                              <div className="flex items-center gap-1 text-green-600">
                                <MapPin className="h-3 w-3" />
                                <span className="text-sm">{user.city}</span>
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="p-4">
                          <motion.div
                            key={animatedCoins[user.id]}
                            initial={{ scale: 1.2, color: "#16a34a" }}
                            animate={{ scale: 1, color: "#374151" }}
                            className="flex items-center gap-2"
                          >
                            <Coins className="h-5 w-5 text-green-600" />
                            <span className="font-bold text-lg">{animatedCoins[user.id] || user.saplingCoins}</span>
                          </motion.div>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-2 text-green-700">
                            <Leaf className="h-4 w-4" />
                            <span className="font-semibold">{user.co2Saved.toFixed(1)} kg</span>
                          </div>
                        </td>
                        <td className="p-4">
                          <Badge variant="outline" className="border-green-300 text-green-700">
                            <div className="flex items-center gap-1">
                              {getCategoryIcon(user.ecoCategory)}
                              <span>{user.ecoCategory}</span>
                            </div>
                          </Badge>
                        </td>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Footer Stats */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="shadow-lg border-green-200">
            <CardContent className="p-6 text-center">
              <TreePine className="h-12 w-12 text-green-600 mx-auto mb-3" />
              <div className="text-2xl font-bold text-green-800">12,450</div>
              <div className="text-green-600">Total Trees Planted</div>
            </CardContent>
          </Card>
          <Card className="shadow-lg border-green-200">
            <CardContent className="p-6 text-center">
              <Leaf className="h-12 w-12 text-green-600 mx-auto mb-3" />
              <div className="text-2xl font-bold text-green-800">2,847 kg</div>
              <div className="text-green-600">Total CO₂ Saved</div>
            </CardContent>
          </Card>
          <Card className="shadow-lg border-green-200">
            <CardContent className="p-6 text-center">
              <Coins className="h-12 w-12 text-green-600 mx-auto mb-3" />
              <div className="text-2xl font-bold text-green-800">45,230</div>
              <div className="text-green-600">Total Sapling Coins</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default EcoLeaderboard
