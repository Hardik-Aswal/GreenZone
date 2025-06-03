"use client"

import * as React from "react"
import { useEffect, useCallback } from "react"

import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel"
import Image from "next/image"

function CarouselDemo() {
  const imageArray = [
    {
      src : "images/amazon1.jpg",
      alt: "Amazon Image 1",
    },
    {
      src : "images/amazon2.jpg",
      alt: "Amazon Image 2",
    },
    {
      src : "images/amazon3.png",
      alt: "Amazon Image 3",
    },
    {
      src : "images/amazon4.jpg",
      alt: "Amazon Image 4",
    },
    {
      src : "images/amazon5.jpg",
      alt: "Amazon Image 5",
    }
  ]
  const [api, setApi] = React.useState<CarouselApi>()

  const scrollNext = useCallback(() => {
    if (api) {
      api.scrollNext()
    }
  }, [api])

  useEffect(() => {
    if (!api) return

    const interval = setInterval(() => {
      scrollNext()
    }, 3000) 

    return () => clearInterval(interval)
  }, [api, scrollNext])

  return (
    <Carousel
      className="w-full h-full relative "
      setApi={setApi}
      opts={{
        align: "start",
        loop: true, 
      }}
    >
      <CarouselContent>
        {imageArray.map((_, index) => (
          <CarouselItem key={index}>
            <div className="">
            
                  <Image  src={_.src} alt={_.alt} width={800} height={400} className="object-cover w-full h-[50vh] object-top"/>


   
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 z-10" />
      <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 z-10" />
    </Carousel>
  )
}

export default CarouselDemo
