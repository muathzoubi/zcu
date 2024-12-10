"use client"

import { CreditCard, Wallet, Building } from 'lucide-react'
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Card, CardContent } from "@/components/ui/card"
import React from 'react'

export function PaymentMethodSelector(props:{setPm:any}) {
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardContent className="pt-6">
        <RadioGroup defaultValue="credit-card">
          <div className="flex items-center space-x-2 mb-4">
            <RadioGroupItem value="visa" id="credit-card"  onClick={()=>{props.setPm('visa')}}/>
            <label htmlFor="credit-card" className="flex items-center cursor-pointer">
              <CreditCard className="mr-2 h-4 w-4" />
              Credit Card
            </label>
          </div>
          <div className="flex items-center space-x-2 mb-4">
            <RadioGroupItem value="K-Net" id="K-Net"  onClick={()=>{props.setPm('knet')}}/>
            <label htmlFor="K-Net" className="flex items-center cursor-pointer">
              <Wallet className="mr-2 h-4 w-4" />
              K-Net
            </label>
          </div>
        </RadioGroup>
      </CardContent>
    </Card>
  )
}

