import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Play, Clock, TrendingUp } from "lucide-react"

export function TutorialVideos() {
  const videos = [
    {
      id: "complete-form",
      title: "Complete Your First Eco Form",
      duration: "2 min",
      description: "Step-by-step walkthrough of filling out your eco-audit form",
      thumbnail: "/placeholder.svg?height=200&width=300",
    },
    {
      id: "understand-score",
      title: "Understanding Your Provisional EcoScore",
      duration: "3 min",
      description: "Learn how your EcoScore is calculated and what it means",
      thumbnail: "/placeholder.svg?height=200&width=300",
    },
    {
      id: "improve-score",
      title: "How to Improve Your Score",
      duration: "4 min",
      description: "Tips and strategies to enhance your product's environmental rating",
      thumbnail: "/placeholder.svg?height=200&width=300",
    },
  ]

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4 text-sm font-medium">
            🎥 Learn by Watching
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">Tutorial Videos</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Watch our comprehensive video guides to master the GreenZone audit process and maximize your product's
            eco-friendly potential.
          </p>
        </div>

        <Tabs defaultValue="complete-form" className="max-w-4xl mx-auto">
          <TabsList className="grid w-full grid-cols-1 md:grid-cols-3 mb-8">
            {videos.map((video) => (
              <TabsTrigger
                key={video.id}
                value={video.id}
                className="text-sm font-medium data-[state=active]:bg-green-600 data-[state=active]:text-white"
              >
                {video.title}
              </TabsTrigger>
            ))}
          </TabsList>

          {videos.map((video) => (
            <TabsContent key={video.id} value={video.id}>
              <Card>
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
                    <div className="relative">
                      <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden">
                        <img
                          src={video.thumbnail || "/placeholder.svg"}
                          alt={`${video.title} video thumbnail`}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 hover:bg-opacity-40 transition-all duration-200 cursor-pointer">
                          <div className="bg-white rounded-full p-4 shadow-lg">
                            <Play className="h-8 w-8 text-green-600 ml-1" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center space-x-2 mb-3">
                        <Clock className="h-4 w-4 text-gray-500" />
                        <span className="text-sm text-gray-500">{video.duration}</span>
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-4">{video.title}</h3>
                      <p className="text-gray-600 leading-relaxed mb-6">{video.description}</p>
                      <div className="flex items-center space-x-2">
                        <TrendingUp className="h-4 w-4 text-green-600" />
                        <span className="text-sm text-green-600 font-medium">Recommended for beginners</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  )
}
