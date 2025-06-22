"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Search, MapPin, ShoppingCart, Menu, Globe } from "lucide-react";
import { navigationItems } from "../data/mockData";
import ToggleWrapper from "./toggle";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { selectMode } from "../store/modeSlice";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { useAppDispatch } from "../store/hooks";
import { logout } from "../store/userSlice";
import Link from "next/link";

export default function Header() {
  const [searchQuery, setSearchQuery] = useState("");
  const mode = useAppSelector(selectMode) as "green" | "home";
  const user = useAppSelector((state) => state.user.user);
  const dispatch = useAppDispatch();

  const dispatch = useAppDispatch();
  const totalItems = useAppSelector((s) => s.cart.totalItems);

  return (
    <header className={`${mode == "home" ? "bg-gray-900" : "bg-green-700"}  text-white`}>
      <div className={`${mode == "home" ? "bg-gray-900" : "bg-green-700"} px-4 py-2`}>
        <div className="flex items-center justify-between px-2 mx-auto">
          <div className="flex items-center space-x-4">
            <div className="flex items-start mt-3">
              <Image
                src="/images/Amazon.png?height=30&width=100"
                alt="Amazon"
                width={100}
                height={30}
                className="h-8 w-auto"
              />
              <span className="text-sm">.in</span>
            </div>

            <div className="hidden md:flex items-center text-sm">
              <MapPin className="h-4 w-4 mr-1" />
              <div>
                <div className="text-xs text-gray-300">Delivering to Mumbai 400001</div>
                <div className="font-bold">Update location</div>
              </div>
            </div>
          </div>

          <div className="flex-1 max-w-2xl mx-4">
            <div className="flex">
              <select className="bg-gray-200 text-gray-900 px-3 py-2 rounded-l-md border-r border-gray-300 text-sm">
                <option>All</option>
              </select>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search Amazon.in"
                className="flex-1 px-4 py-2 bg-white text-gray-900 focus:outline-none"
              />
              <button className="bg-orange-400 hover:bg-orange-500 px-4 py-2 rounded-r-md">
                <Search className="h-5 w-5 text-gray-900" />
              </button>
            </div>
          </div>

          <div className="flex items-center space-x-6">
            <div className="hidden md:flex items-center text-sm">
              <Globe className="h-4 w-4 mr-1" />
              <span>EN</span>
            </div>

            <div className="hidden md:block text-sm">
              <button className="text-xs cursor-pointer">
                {
                  user ? <div>
                     <p onClick={
                      ()=>{dispatch(logout())}
                     }> Welcome { user.name }</p> 
                     
                  </div> :
                  <Link href="/auth/signin" className="text-white hover:text-orange-400">
                Sign In
                </Link>
                }
                
              </button>
              <div className="font-bold">Account & Lists</div>
            </div>

            <div className="hidden md:block text-sm">
              <div className="text-xs">Returns</div>
              <div className="font-bold">& Orders</div>
            </div>

            <Link href="/cart" className="flex items-center relative">
              <ShoppingCart className="h-6 w-6" />
              <span className="ml-1 font-bold">Cart</span>
              {totalItems > 0 && (
                <Badge className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs min-w-[20px] h-5 flex items-center justify-center rounded-full">
                  {totalItems > 99 ? "99+" : totalItems}
                </Badge>
              )}
            </Link>
          </div>
        </div>
      </div>

      <div className={`${mode == "home" ? "bg-gray-800" : "bg-green-800"}  px-4 py-2 flex justify-between`}>
        <div className="flex items-center space-x-6  overflow-x-auto">
          <button className="flex items-center text-sm whitespace-nowrap">
            <Menu className="h-4 w-4 mr-2" />
            All
          </button>
          {navigationItems.slice(1).map((item) => (
            <a
              key={item.id}
              href={item.href}
              className="text-sm whitespace-nowrap hover:text-orange-400 transition-colors"
            >
              {item.label}
            </a>
          ))}
        </div>
        <ToggleWrapper />
      </div>
    </header>
  );
}
