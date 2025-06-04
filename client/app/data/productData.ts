import type { ProductDetail, Review } from "../types/product";

export const productData: Record<string, ProductDetail> = {
  B0BK1KS6ZD: {
    id: "B0BK1KS6ZD",
    title: "Daikin 1.5 Ton 5 Star Inverter Split AC (Copper, 2023 Model, MTKL50U, White)",
    brand: "Daikin",
    rating: 4.3,
    reviewCount: 1247,
    price: 42990,
    originalPrice: 55000,
    discount: "22% off",
    images: [
      "/images/placeholder.jpg?height=500&width=500",
      "/images/placeholder.jpg?height=500&width=500",
      "/images/placeholder.jpg?height=500&width=500",
      "/images/placeholder.jpg?height=500&width=500",
    ],
    description:
      "Experience superior cooling with Daikin's 1.5 Ton 5 Star Inverter Split AC. This energy-efficient air conditioner features advanced inverter technology, copper condenser coils for better heat transfer, and smart connectivity options.",
    features: [
      "5 Star Energy Rating for maximum efficiency",
      "Inverter Technology for consistent cooling",
      "Copper Condenser Coil for better heat transfer",
      "PM 2.5 Filter for cleaner air",
      "Daikin App Control via Wi-Fi",
      "Stabilizer Free Operation",
      "Anti-Microbial Filter",
      "Self Diagnosis Function",
    ],
    specifications: {
      Capacity: "1.5 Ton (5100 Watts)",
      "Energy Rating": "5 Star",
      "Annual Energy Consumption": "960 Units",
      "Compressor Type": "Inverter",
      Refrigerant: "R32",
      "Coil Material": "Copper",
      "Room Size": "Up to 180 sq ft",
      "Noise Level": "Indoor: 37 dB, Outdoor: 48 dB",
      "Operating Temperature": "-10°C to 50°C",
      "Dimensions (Indoor)": "870 x 295 x 206 mm",
      Weight: "Indoor: 9.5 kg, Outdoor: 34 kg",
    },
    inStock: true,
    delivery: {
      standard: "FREE delivery by 8 Jan",
      express: "Same day delivery available",
    },
    seller: "Daikin India Official Store",
    warranty: "1 Year Comprehensive + 4 Years on Compressor",
  },
};

export const reviewsData: Record<string, Review[]> = {
  B0BK1KS6ZD: [
    {
      id: "1",
      userName: "Rajesh Kumar",
      rating: 5,
      title: "Excellent cooling performance",
      content:
        "Bought this AC 3 months ago and it's been fantastic. The cooling is very efficient and the inverter technology really helps with electricity bills. Installation was smooth and the Daikin service team was professional.",
      date: "15 December 2024",
      verified: true,
      helpful: 23,
    },
    {
      id: "2",
      userName: "Priya Sharma",
      rating: 4,
      title: "Good value for money",
      content:
        "The AC works well and the app control is convenient. Only issue is that it takes a bit longer to cool large rooms, but overall satisfied with the purchase. The copper coil seems durable.",
      date: "8 December 2024",
      verified: true,
      helpful: 15,
    },
    {
      id: "3",
      userName: "Amit Patel",
      rating: 5,
      title: "Energy efficient and quiet",
      content:
        "Very impressed with the energy efficiency. My electricity bill has actually reduced compared to my old AC. The unit runs very quietly, which is great for bedroom use.",
      date: "2 December 2024",
      verified: true,
      helpful: 31,
    },
  ],
};
