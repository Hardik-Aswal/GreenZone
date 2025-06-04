"use client"

import * as React from "react"
import { useEffect, useCallback } from "react"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel"
import Image from "next/image"
import { imageGreenArray, imageHomeArray } from "../data/imagedata"
import { useAppSelector } from "../store/hooks"
import { selectMode } from "../store/modeSlice"

function CarouselDemo() {
  const imageArray : any = imageHomeArray;
  const greenArray = imageGreenArray;
  const [api, setApi] = React.useState<CarouselApi>()
  const mode = useAppSelector(selectMode) as "green" | "home";
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
        {
        mode == "home" ? 
        imageArray.map((_:any, index:number) => (
          <CarouselItem key={index}>
            <div className="">
            
                  <Image  src={_.src} alt={_.alt} width={800} height={400} className="object-cover w-full h-[50vh] object-top"/>


   
            </div>
          </CarouselItem>
        ))
        :
        greenArray.map((_:any, index:number) => (
          <CarouselItem key={index}>
            <div className="">
            
                  <Image  src={_.src} alt={_.alt} width={800} height={400} className="object-cover w-full h-[50vh] object-top"/>
                  </div>
          </CarouselItem>))
      }
      </CarouselContent>
      <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 z-10" />
      <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 z-10" />
    </Carousel>
  )
}

export default CarouselDemo
