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

export default function SignUpPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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

    if (!formData.name.trim()) {
      newErrors.name = "Enter your name";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Enter your email";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Enter a valid email address";
    }

    if (!formData.password) {
      newErrors.password = "Enter your password";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Re-enter your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
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
      console.log("Account created:", formData);
    } catch (error) {
      console.error("Sign up error:", error);
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
              <h1 className="text-2xl font-normal">Create account</h1>
            </CardHeader>
            <CardContent className="space-y-4">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1">
                  <Label htmlFor="name" className="text-sm font-bold">
                    Your name
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={`h-8 text-sm ${errors.name ? "border-red-500 focus:border-red-500" : ""}`}
                    placeholder="First and last name"
                  />
                  {errors.name && (
                    <Alert className="py-1 px-2 border-red-200 bg-red-50">
                      <AlertCircle className="h-3 w-3 text-red-500" />
                      <AlertDescription className="text-xs text-red-600 ml-1">{errors.name}</AlertDescription>
                    </Alert>
                  )}
                </div>

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
                      placeholder="At least 6 characters"
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
                  <p className="text-xs text-gray-600">
                    <i>Passwords must be at least 6 characters.</i>
                  </p>
                </div>

                <div className="space-y-1">
                  <Label htmlFor="confirmPassword" className="text-sm font-bold">
                    Re-enter password
                  </Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      className={`h-8 text-sm pr-10 ${
                        errors.confirmPassword ? "border-red-500 focus:border-red-500" : ""
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <Alert className="py-1 px-2 border-red-200 bg-red-50">
                      <AlertCircle className="h-3 w-3 text-red-500" />
                      <AlertDescription className="text-xs text-red-600 ml-1">
                        {errors.confirmPassword}
                      </AlertDescription>
                    </Alert>
                  )}
                </div>

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-8 bg-yellow-400 hover:bg-yellow-500 text-black text-sm font-normal border border-yellow-600"
                >
                  {isLoading ? "Creating account..." : "Create your Amazon account"}
                </Button>
              </form>

              <div className="text-xs text-gray-600 leading-4">
                By creating an account, you agree to Amazon's{" "}
                <Link href="#" className="text-blue-600 hover:underline">
                  Conditions of Use
                </Link>{" "}
                and{" "}
                <Link href="#" className="text-blue-600 hover:underline">
                  Privacy Notice
                </Link>
                .
              </div>

              <Separator className="my-4" />

              <div className="text-center">
                <p className="text-sm font-bold mb-2">Buying for work?</p>
                <Link
                  href="https://www.amazon.com/business/register/org/landing"
                  className="text-sm text-blue-600 hover:underline hover:text-orange-600 transition-colors"
                >
                  Create a free business account
                </Link>
              </div>

              <Separator className="my-4" />

              <div className="text-center text-sm">
                <span className="text-gray-600">Already have an account? </span>
                <Link
                  href="/auth/signin"
                  className="text-blue-600 hover:underline hover:text-orange-600 transition-colors"
                >
                  Sign in
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
