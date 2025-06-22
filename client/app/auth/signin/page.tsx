"use client";

import type React from "react";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Eye, EyeOff, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function SignInPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.email.trim()) {
      newErrors.email = "Enter your email";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Enter a valid email address";
    }

    if (!formData.password) {
      newErrors.password = "Enter your password";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      // console.log("Sign in:", formData);
      // Redirect to dashboard
    } catch (error) {
      console.error("Sign in error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md">
          <Card className="border border-gray-300 rounded-lg">
            <CardHeader>
              <h1 className="text-2xl font-normal">Sign in</h1>
            </CardHeader>
            <CardContent className="space-y-4">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1">
                  <Label htmlFor="email" className="text-sm font-bold">
                    Email
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`h-8 text-sm ${errors.email ? "border-red-500 focus:border-red-500" : ""}`}
                  />
                  {errors.email && (
                    <Alert className="py-1 px-2 border-red-200 bg-red-50">
                      <AlertCircle className="h-3 w-3 text-red-500" />
                      <AlertDescription className="text-xs text-red-600 ml-1">{errors.email}</AlertDescription>
                    </Alert>
                  )}
                </div>

                <div className="space-y-1">
                  <Label htmlFor="password" className="text-sm font-bold">
                    Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={handleInputChange}
                      className={`h-8 text-sm pr-10 ${errors.password ? "border-red-500 focus:border-red-500" : ""}`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                  {errors.password && (
                    <Alert className="py-1 px-2 border-red-200 bg-red-50">
                      <AlertCircle className="h-3 w-3 text-red-500" />
                      <AlertDescription className="text-xs text-red-600 ml-1">{errors.password}</AlertDescription>
                    </Alert>
                  )}
                </div>

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-8 bg-yellow-400 hover:bg-yellow-500 text-black text-sm font-normal border border-yellow-600"
                >
                  {isLoading ? "Signing in..." : "Sign in"}
                </Button>
              </form>

              <div className="text-xs text-gray-600 leading-4">
                By continuing, you agree to Amazon's{" "}
                <Link href="#" className="text-blue-600 hover:underline">
                  Conditions of Use
                </Link>{" "}
                and{" "}
                <Link href="#" className="text-blue-600 hover:underline">
                  Privacy Notice
                </Link>
                .
              </div>

              <div className="text-center">
                <Link
                  href="#"
                  className="text-sm text-blue-600 hover:underline hover:text-orange-600 transition-colors"
                >
                  Forgot your password?
                </Link>
              </div>

              <Separator className="my-4" />

              <div className="text-center">
                <p className="text-sm font-bold mb-2">Buying for work?</p>
                <Link
                  href="https://business.amazon.in/"
                  className="text-sm text-blue-600 hover:underline hover:text-orange-600 transition-colors"
                >
                  Shop on Amazon Business
                </Link>
              </div>
            </CardContent>
          </Card>

          <div className="mt-6">
            <div className="relative">
              <Separator />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="bg-white px-2 text-xs text-gray-500">New to Amazon?</span>
              </div>
            </div>
            <div className="mt-4">
              <Link href="/auth/signup">
                <Button variant="outline" className="w-full h-8 text-sm font-normal border-gray-400 hover:bg-gray-50">
                  Create your Amazon account
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
