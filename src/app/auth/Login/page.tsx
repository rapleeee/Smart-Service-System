'use client'

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { IconBrain } from "@tabler/icons-react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Simulate login - replace with actual auth
      await new Promise(resolve => setTimeout(resolve, 1000))
      toast.success("Login berhasil!")
      router.push("/")
    } catch (error) {
      toast.error("Username atau password salah")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-50">
      <div className="w-full max-w-md p-4">
        <Card className="border-neutral-200 shadow-lg">
          <CardHeader className="space-y-1 text-center">
            <div className="flex justify-center mb-4">
              <div className="p-3 rounded-full bg-primary/10">
                <IconBrain className="w-10 h-10 text-primary" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold">Smart Service System</CardTitle>
            <CardDescription>
              Masuk untuk mengakses layanan
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input 
                  id="username"
                  placeholder="Masukkan username" 
                  type="text"
                  required
                  disabled={isLoading}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input 
                  id="password"
                  placeholder="Masukkan password" 
                  type="password"
                  required
                  disabled={isLoading}
                />
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <Button 
                type="submit" 
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? "Memproses..." : "Login"}
              </Button>
              <div className="text-sm text-center text-muted-foreground">
                Butuh bantuan? Hubungi administrator
              </div>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  )
}