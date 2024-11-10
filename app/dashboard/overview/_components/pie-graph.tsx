"use client"

import * as React from 'react';
import { TrendingUp } from 'lucide-react';
import { Label, Pie, PieChart } from 'recharts';

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

const chartData = [
  { satellite: 'Communications', quantity: 1200, fill: 'var(--color-comm)' },
  { satellite: 'Weather', quantity: 300, fill: 'var(--color-weather)' },
  { satellite: 'Navigation', quantity: 400, fill: 'var(--color-nav)' },
  { satellite: 'Scientific', quantity: 250, fill: 'var(--color-sci)' },
  { satellite: 'Military', quantity: 350, fill: 'var(--color-mil)' }
];

const chartConfig = {
  quantity: {
    label: 'Quantity'
  },
  comm: {
    label: 'Communications',
    color: 'hsl(var(--chart-1))'
  },
  weather: {
    label: 'Weather',
    color: 'hsl(var(--chart-2))'
  },
  nav: {
    label: 'Navigation',
    color: 'hsl(var(--chart-3))'
  },
  sci: {
    label: 'Scientific',
    color: 'hsl(var(--chart-4))'
  },
  mil: {
    label: 'Military',
    color: 'hsl(var(--chart-5))'
  }
} satisfies ChartConfig;

export function PieGraph() {
  const totalSatellites = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.quantity, 0);
  }, []);

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Satellite Distribution</CardTitle>
        <CardDescription>Types and quantity of operational satellites</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[360px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="quantity"
              nameKey="satellite"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
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
                          {totalSatellites.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Satellites
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Updated monthly <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Tracking a wide array of satellite types
        </div>
      </CardFooter>
    </Card>
  );

}
