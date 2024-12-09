'use client'

import { useState } from 'react'
import Image from "next/image"
import { useRouter } from 'next/navigation'
import { Navbar } from "@/components/ui/navbar"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { PhoneIcon as WhatsappIcon, ShoppingCart } from 'lucide-react'
import Link from 'next/link'

const products = [
  {
    id: 0,
    name: "دجاج كاملة  1200-700 جم",
    category: "طازج",
    price: 3.25,
  },
  {
    id: 1,
    name: "اجنحة دجاج",
    category: "طازج",
    price: 3.25,
  },
  {
    id: 2,
    name: "فخذ دجاج كامل",
    category: "طازج",
    price: 5.5,
  },
  {
    id: 3,
    name: "صدر دجاج كامل",
    category: "طازج",
    price: 4.75,
  },
  {
    id: 4,
    name: "كبدة دجاج كاملة 700 جم",
    category: "طازج",
    price: 3.5,
  },



]

export default function ProductsPage() {
  const [cart, setCart] = useState<{ id: number, quantity: number }[]>([])
  const router = useRouter()

  const handleAddToCart = (productId: number) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === productId)
      if (existingItem) {
        return prevCart.map(item =>
          item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
        )
      } else {
        return [...prevCart, { id: productId, quantity: 1 }]
      }
    })
  }

  const handleWhatsAppOrder = (productName: string) => {
    const message = `مرحباً، أود طلب ${productName}`
    const whatsappUrl = `https://wa.me/+96500000000?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, '_blank')
  }

  const handleCheckout = () => {
    localStorage.setItem('cart', JSON.stringify(cart))
    router.push('/checkout')
  }

  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <Navbar />

      <main className="container mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-12">
          <h1 className="text-4xl font-bold text-[#002B5C]">المنتجات الطازجة</h1>

          <Link href="/checkout">   <Button onClick={handleCheckout} className="bg-[#002B5C] hover:bg-[#001F43] text-white">
            <ShoppingCart className="ml-2" />
            السلة ({cartItemCount})
          </Button></Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <Card key={product.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="p-6">
                <div className="aspect-square relative mb-6">
                  <img
                    src={`_${product.id}.jpg`}
                    alt={product.name}
                    className="object-contain"
                  />
                </div>
                <div className="text-center">
                  <h2 className="text-xl font-bold mb-2">{product.name}</h2>
                  <p className="text-gray-500 mb-2">{product.category}</p>
                  <p className="text-lg font-semibold mb-4">{product.price.toFixed(2)} د.ك</p>
                  <div className="flex space-x-2 space-x-reverse">
                    <Button
                      onClick={() => handleAddToCart(product.id)}
                      className="flex-1 bg-[#002B5C] hover:bg-[#001F43] text-white font-semibold py-2 px-4 rounded-md"
                    >
                      أضف إلى السلة
                    </Button>
                    <Button
                      onClick={() => handleWhatsAppOrder(product.name)}
                      className="flex-1 bg-[#25D366] hover:bg-[#128C7E] text-white font-semibold py-2 px-4 rounded-md flex items-center justify-center"
                    >
                      <svg
                        className="w-5 h-5 ml-2"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                      </svg>
                      اطلب الآن
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
            <Link href="/checkout">   <Button onClick={handleCheckout} className="w-full bg-[#002B5C] hover:bg-[#001F43] text-white">
            <ShoppingCart className="ml-2" />
            السلة ({cartItemCount})
          </Button></Link>
        </div>
      </main>
    </div>
  )
}
