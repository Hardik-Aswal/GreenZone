"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { heroBanners } from "../data/mockData";

export default function HeroBanner() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroBanners.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroBanners.length) % heroBanners.length);
  };
  //   console.log(heroBanners);

  return (
    <>
      <div className="relative h-96 bg-gradient-to-r from-blue-400 to-blue-600 overflow-hidden">
        <div className="absolute inset-0">
          <Image src={heroBanners[currentSlide].image} alt="Hero Banner" fill className="object-cover" priority />
        </div>

        <div className="relative z-10 h-full flex items-center justify-between px-8">
          <button onClick={prevSlide} className="bg-white/20 hover:bg-white/30 rounded-full p-2 transition-colors">
            <ChevronLeft className="h-8 w-8 text-white" />
          </button>

          <div className="text-center text-black">
            <h1 className="text-4xl md:text-6xl font-bold mb-2">{heroBanners[currentSlide].title}</h1>
            <p className="text-xl md:text-2xl">{heroBanners[currentSlide].subtitle}</p>

            <div className="mt-8 bg-white/90 text-gray-900 px-6 py-3 rounded-lg inline-block">
              <div className="flex items-center space-x-2">
                <div className="bg-orange-500 text-white px-2 py-1 rounded text-sm font-bold">WIDE SELECTION</div>
                <div className="bg-orange-500 text-white px-2 py-1 rounded text-sm font-bold">GREAT PRICES</div>
              </div>
              <div className="mt-2 text-sm">
                <strong>Unlimited 5% cashback*</strong>
                <br />
                with Amazon Pay ICICI Bank Credit Card
              </div>
            </div>
          </div>

          <button onClick={nextSlide} className="bg-white/20 hover:bg-white/30 rounded-full p-2 transition-colors">
            <ChevronRight className="h-8 w-8 text-white" />
          </button>
        </div>

        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {heroBanners.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentSlide ? "bg-white" : "bg-white/50"
              }`}
            />
          ))}
        </div>
      </div>
    </>
  );
}
