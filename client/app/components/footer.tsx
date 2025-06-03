"use client";

import Link from "next/link";
import Image from "next/image";
import { ChevronUp } from "lucide-react";

interface FooterCategory {
  title: string;
  links: {
    label: string;
    href: string;
  }[];
}

const footerCategories: FooterCategory[] = [
  {
    title: "Get to Know Us",
    links: [
      { label: "About Us", href: "#" },
      { label: "Careers", href: "#" },
      { label: "Press Releases", href: "#" },
      { label: "Amazon Science", href: "#" },
    ],
  },
  {
    title: "Connect with Us",
    links: [
      { label: "Facebook", href: "#" },
      { label: "Twitter", href: "#" },
      { label: "Instagram", href: "#" },
    ],
  },
  {
    title: "Make Money with Us",
    links: [
      { label: "Sell on Amazon", href: "#" },
      { label: "Sell under Amazon Accelerator", href: "#" },
      { label: "Amazon Global Selling", href: "#" },
      { label: "Become an Affiliate", href: "#" },
      { label: "Fulfilment by Amazon", href: "#" },
      { label: "Advertise Your Products", href: "#" },
      { label: "Amazon Pay on Merchants", href: "#" },
    ],
  },
  {
    title: "Let Us Help You",
    links: [
      { label: "COVID-19 and Amazon", href: "#" },
      { label: "Your Account", href: "#" },
      { label: "Returns Centre", href: "#" },
      { label: "100% Purchase Protection", href: "#" },
      { label: "Amazon App Download", href: "#" },
      { label: "Help", href: "#" },
    ],
  },
];

const countries = [
  "Australia",
  "Brazil",
  "Canada",
  "China",
  "France",
  "Germany",
  "Italy",
  "Japan",
  "Mexico",
  "Netherlands",
  "Poland",
  "Singapore",
  "Spain",
  "Turkey",
  "United Arab Emirates",
  "United Kingdom",
  "United States",
];

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="mt-auto">
      <button
        onClick={scrollToTop}
        className="w-full bg-gray-700 hover:bg-gray-600 text-white py-4 text-sm font-medium flex items-center justify-center transition-colors"
      >
        <ChevronUp className="h-4 w-4 mr-2" />
        Back to top
      </button>

      <div className="bg-gray-800 py-10">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {footerCategories.map((category) => (
            <div key={category.title}>
              <h3 className="text-white font-bold mb-3 text-sm">{category.title}</h3>
              <ul className="space-y-2">
                {category.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-gray-300 hover:text-white text-xs hover:underline transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gray-800 border-t border-gray-700 py-8">
        <div className="max-w-7xl mx-auto px-4 flex flex-col items-center">
          <div className="mb-4">
            <Image
              src="/images/Amazon.png?height=30&width=100"
              alt="Amazon"
              width={100}
              height={30}
              className="h-8 w-auto"
            />
          </div>

          <div className="flex flex-wrap justify-center gap-2 mb-4">
            {countries.map((country) => (
              <Link key={country} href="#" className="text-xs text-gray-300 hover:text-white hover:underline px-2 py-1">
                {country}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-gray-900 py-6">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col gap-2 items-center">
            <div className="space-y-2">
              <div className="flex flex-col md:flex-row md:space-x-4 justify-center md:justify-start">
                <Link href="#" className="text-xs text-gray-300 hover:text-white hover:underline">
                  Conditions of Use & Sale
                </Link>
                <Link href="#" className="text-xs text-gray-300 hover:text-white hover:underline">
                  Privacy Notice
                </Link>
                <Link href="#" className="text-xs text-gray-300 hover:text-white hover:underline">
                  Interest-Based Ads
                </Link>
              </div>
            </div>
            <div className="text-xs text-gray-300">
              © 1996-{new Date().getFullYear()}, Amazon.com, Inc. or its affiliates
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
