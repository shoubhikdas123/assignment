"use client"

import { Pie, PieChart } from "recharts"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

// Chart data (only two slices)

interface types {
  answered: number
  
}
export function PieC({answered}:types) {

  const chartData = [
    { name: "Answered", value: answered, fill: "#4285F4" }, // Uses CSS variable for blue
    { name: "Unanswered", value: 15 - answered, fill: "#D3E3FD" }, // Light blue
  ]
  
  // Chart config (for ChartContainer)
  const chartConfig = {
    total: {
      label: "Total",
    },
    answered: {
      label: "Answered",
      color: "#4285F4",
    },
    unanswered: {
      label: "Unanswered",
      color: "#D3E3FD",
    },
  }


  return (
    <div className="flex flex-col">
     

      <CardContent className="flex-1 relative pb-0">
        {/* Center Icon */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <span className="text-3xl">🎯</span>
        </div>

        {/* Donut Chart with ChartContainer */}
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={0}
              stroke="none"
            />
          </PieChart>
        </ChartContainer>
      </CardContent>


    </div>
  )
}
