"use client"

import { TrendingUp } from 'lucide-react';
import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from '@/components/ui/chart';

// Updated chart data to reflect satellite metrics
const chartData = [
  { month: 'January', bandwidth: 186, solarEnergy: 80 },
  { month: 'February', bandwidth: 305, solarEnergy: 200 },
  { month: 'March', bandwidth: 237, solarEnergy: 120 },
  { month: 'April', bandwidth: 73, solarEnergy: 190 },
  { month: 'May', bandwidth: 209, solarEnergy: 130 },
  { month: 'June', bandwidth: 214, solarEnergy: 140 }
];

const chartConfig = {
  bandwidth: {
    label: 'Bandwidth Usage (Gbps)',
    color: 'hsl(var(--chart-1))'
  },
  solarEnergy: {
    label: 'Solar Energy Collected (kWh)',
    color: 'hsl(var(--chart-2))'
  }
} satisfies ChartConfig;

export function AreaGraph() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Monthly Satellite Metrics</CardTitle>
        <CardDescription>
          Monthly tracking of bandwidth and solar energy collection
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[310px] w-full"
        >
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" />}
            />
            <Area
              dataKey="solarEnergy"
              type="natural"
              fill="var(--color-solarEnergy)"
              fillOpacity={0.4}
              stroke="var(--color-solarEnergy)"
              stackId="a"
            />
            <Area
              dataKey="bandwidth"
              type="natural"
              fill="var(--color-bandwidth)"
              fillOpacity={0.4}
              stroke="var(--color-bandwidth)"
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none">
              Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
            </div>
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              January - June 2024
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
