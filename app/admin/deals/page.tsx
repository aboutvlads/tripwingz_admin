"use client"

import { Plus } from 'lucide-react'
import { useState, useEffect } from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { CreateDealDialog } from "./create-deal-dialog"
import { DealsTable } from "./deals-table"

interface Deal {
  id: string
  destination: string
  imageUrl: string
  price: string
  originalPrice: string
  travelDate: string
  stops: string
  from: string
  class: string
  airline: string
  departureTime: string
  arrivalTime: string
  duration: string
  baggage: string
  hotDeal: boolean
  hashtags: string
  addedAt: Date
}

const initialDeals: Deal[] = [
  {
    id: "1",
    destination: "Paris, France 🇫🇷",
    imageUrl: "https://example.com/paris.jpg",
    price: "€214",
    originalPrice: "€389",
    travelDate: "May-Jun",
    stops: "non-stop",
    from: "London",
    class: "economy",
    airline: "Air France",
    departureTime: "10:00 AM",
    arrivalTime: "12:30 PM",
    duration: "2h 30m",
    baggage: "1 carry-on, 1 checked bag",
    hotDeal: true,
    hashtags: "#paris #france #eiffeltower",
    addedAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
  },
  {
    id: "2",
    destination: "Barcelona, Spain 🇪🇸",
    imageUrl: "https://example.com/barcelona.jpg",
    price: "€199",
    originalPrice: "€299",
    travelDate: "Jun-Jul",
    stops: "1-stop",
    from: "Berlin",
    class: "economy",
    airline: "Iberia",
    departureTime: "2:00 PM",
    arrivalTime: "6:30 PM",
    duration: "4h 30m",
    baggage: "1 carry-on",
    hotDeal: false,
    hashtags: "#barcelona #spain #sagradafamilia",
    addedAt: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 hours ago
  },
]

export default function DealsPage() {
  console.log('DealsPage component rendering');
  const [open, setOpen] = useState(false)
  const [deals, setDeals] = useState<Deal[]>(initialDeals)

  useEffect(() => {
    console.log('DealsPage useEffect running');
    console.log('Initial deals:', initialDeals);
  }, []);

  const handleDeleteDeal = (id: string) => {
    setDeals(deals.filter(deal => deal.id !== id))
  }

  const handleEditDeal = (id: string, data: Partial<Deal>) => {
    setDeals(deals.map(deal => deal.id === id ? { ...deal, ...data } : deal))
  }

  const handleCreateDeal = (newDeal: Omit<Deal, 'id' | 'addedAt'>) => {
    const deal: Deal = {
      ...newDeal,
      id: (deals.length + 1).toString(),
      addedAt: new Date(),
    }
    setDeals([...deals, deal])
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Input
          placeholder="Search deals..."
          className="max-w-sm"
        />
        <Button className="ml-auto" onClick={() => setOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Deal
        </Button>
      </div>
      <DealsTable 
        deals={deals} 
        onDeleteDeal={handleDeleteDeal} 
        onEditDeal={handleEditDeal} 
      />
      <CreateDealDialog 
        open={open} 
        onOpenChange={setOpen}
        onCreateDeal={handleCreateDeal}
      />
    </div>
  )
}

