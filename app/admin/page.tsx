import { Plane, Users } from 'lucide-react'

import { Card, CardContent } from "@/components/ui/card"

const stats = [
  {
    name: "Total Deals",
    value: "156",
    icon: Plane,
  },
  {
    name: "Total Registered Users",
    value: "2,845",
    icon: Users,
  },
  {
    name: "New Users Today",
    value: "24",
    icon: Users,
  },
]

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Dashboard</h1>
      <div className="grid gap-6 md:grid-cols-3">
        {stats.map((stat) => (
          <Card key={stat.name}>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="rounded-lg bg-gray-100 p-2">
                  <stat.icon className="h-5 w-5 text-gray-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">{stat.name}</p>
                  <h3 className="text-2xl font-semibold">{stat.value}</h3>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

