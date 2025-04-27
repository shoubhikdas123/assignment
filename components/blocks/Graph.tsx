"use client"

import { CartesianGrid, LabelList, Line, LineChart, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import type { ChartConfig } from "@/components/ui/chart"

const chartData = [
  { per: 0, students: 2 },
  { per: 10, students: 5 },
  { per: 20, students: 10 },
  { per: 30, students: 20 },
  { per: 40, students: 50 },
  { per: 50, students: 80 },
  { per: 60, students: 60 },
  { per: 70, students: 40 },
  { per: 80, students: 20 },
  { per: 90, students: 4 },
  { per: 100, students: 2 },
]

// chartConfig needs to exist
const chartConfig = {
  students: {
    label: "Students",
    color: "hsl(var(--chart-1))", // Assuming --chart-1 is a purple color
  },
} satisfies ChartConfig
 interface types {
  percentile: number
}
export default function Chart({percentile}:types) {
  return (
    <ChartContainer config={chartConfig}>
      <LineChart
        data={chartData}
        margin={{
          top: 20,
          left: 12,
          right: 12,
          bottom: 20,
        }}
      >
        <CartesianGrid vertical={false} strokeDasharray="3 3" />
        <XAxis dataKey="per" tickLine={false} axisLine={false} tickMargin={8} />
        <YAxis hide />

        <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="line" />} />

        <Line
          type="natural"
          dataKey="students"
          stroke="black" // matches config
          strokeWidth={2}
          dot={({ cx, cy, payload ,index}) => {
            if (payload.per === 90) {
              return (
                <circle   key={`dot-${index}`} cx={cx} cy={cy} r={6} fill="var(--color-students)" stroke="black" strokeWidth={2} />
              )
            }
            return (
              <circle  key={`dot-${index}`} cx={cx} cy={cy} r={3} fill="var(--color-students)" />
            )
          }}
          activeDot={false}
        >
          <LabelList
            dataKey="per"
            position="top"
            formatter={(value: number) => value === percentile ? "your percentile" : ""}
            content={({ x, y, value }) => {
              if (value === percentile) {
                return (
                  <text x={x} y={y - 10} fill="gray" fontSize={12}>
                    your percentile
                  </text>
                )
              }
              return null
            }}
          />
        </Line>
      </LineChart>
    </ChartContainer>
  )
}
