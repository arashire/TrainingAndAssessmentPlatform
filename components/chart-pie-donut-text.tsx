"use client"

import * as React from "react"
import { Label, Pie, PieChart } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"

export const description = "A donut chart with text"

type StudentOptionData = Record<string, unknown>

type PieChartDatum = {
  optionKey: string
  name: string
  visitors: number
  fill: string
}

export function ChartPieDonutText({
  title,
  data,
}: {
  title: string
  data: StudentOptionData
}) {
  const chartData = React.useMemo<PieChartDatum[]>(() => {
    return Object.entries(data)
      .filter(
        ([key, value]) =>
          key.toLowerCase().includes("option") &&
          typeof value === "object" &&
          value !== null
      )
      .flatMap(([optionKey, value], index) => {
        const option = value as Record<string, unknown>
        const name = typeof option.name === "string" ? option.name : null
        const count = typeof option.count === "number" ? option.count : null

        if (!name || count === null || !Number.isFinite(count) || count < 0) {
          return []
        }

        return [
          {
            optionKey,
            name,
            visitors: count,
            fill: `var(--chart-${(index % 5) + 1})`,
          },
        ]
      })
  }, [data])

  const chartConfig = React.useMemo<ChartConfig>(() => {
    return {
      visitors: {
        label: "Count",
      },
      ...Object.fromEntries(
        chartData.map(({ optionKey, name, fill }) => [
          optionKey,
          { label: name, color: fill },
        ])
      ),
    }
  }, [chartData])

  const totalVisitors = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.visitors, 0)
  }, [chartData])

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>{title}</CardTitle>
        <CardDescription>Poll option counts</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        {chartData.length === 0 ? (
          <p className="py-8 text-center text-muted-foreground">
            No poll option counts available.
          </p>
        ) : (
          <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-square max-h-[250px]"
          >
            <PieChart>
              <ChartTooltip
                cursor={false}
                content={
                  <ChartTooltipContent hideLabel nameKey="optionKey" />
                }
              />
              <Pie
                data={chartData}
                dataKey="visitors"
                nameKey="name"
                innerRadius={60}
                strokeWidth={5}
              >
                <Label
                  content={({ viewBox }) => {
                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                      return (
                        <text
                          x={viewBox.cx}
                          y={viewBox.cy}
                          textAnchor="middle"
                          dominantBaseline="middle"
                        >
                          <tspan
                            x={viewBox.cx}
                            y={viewBox.cy}
                            className="fill-foreground text-3xl font-bold"
                          >
                            {totalVisitors.toLocaleString()}
                          </tspan>
                          <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) + 24}
                            className="fill-muted-foreground"
                          >
                            Count
                          </tspan>
                        </text>
                      )
                    }
                  }}
                />
              </Pie>
            </PieChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  )
}
