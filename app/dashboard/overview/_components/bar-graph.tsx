"use client"

import * as React from 'react';
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from '@/components/ui/chart';

export const description = 'An interactive bar chart';

const chartData = [
  { date: '2024-01', Acrimsat: 5, RohiniRS_D1: 3 },
  { date: '2024-02', Acrimsat: 2, RohiniRS_D1: 4 },
  { date: '2024-03', Acrimsat: 6, RohiniRS_D1: 2 },
  { date: '2024-04', Acrimsat: 7, RohiniRS_D1: 5 },
  { date: '2024-05', Acrimsat: 8, RohiniRS_D1: 3 },
  { date: '2024-06', Acrimsat: 4, RohiniRS_D1: 6 },
  { date: '2024-07', Acrimsat: 3, RohiniRS_D1: 5 },
  { date: '2024-08', Acrimsat: 7, RohiniRS_D1: 4 },
  { date: '2024-09', Acrimsat: 8, RohiniRS_D1: 3 },
  { date: '2024-10', Acrimsat: 5, RohiniRS_D1: 7 },
  { date: '2024-11', Acrimsat: 6, RohiniRS_D1: 2 },
  { date: '2024-12', Acrimsat: 4, RohiniRS_D1: 6 },
  { date: '2025-01', Acrimsat: 5, RohiniRS_D1: 4 },
  { date: '2025-02', Acrimsat: 3, RohiniRS_D1: 5 },
  { date: '2025-03', Acrimsat: 7, RohiniRS_D1: 3 },
  { date: '2025-04', Acrimsat: 8, RohiniRS_D1: 6 },
  { date: '2025-05', Acrimsat: 4, RohiniRS_D1: 5 },
  { date: '2025-06', Acrimsat: 3, RohiniRS_D1: 4 },
  { date: '2025-07', Acrimsat: 6, RohiniRS_D1: 7 },
  { date: '2025-08', Acrimsat: 8, RohiniRS_D1: 2 },
  { date: '2025-09', Acrimsat: 5, RohiniRS_D1: 3 },
  { date: '2025-10', Acrimsat: 7, RohiniRS_D1: 6 },
  { date: '2025-11', Acrimsat: 3, RohiniRS_D1: 5 },
  { date: '2025-12', Acrimsat: 8, RohiniRS_D1: 4 }
];


const chartConfig = {
  views: {
    label: 'Satellite Launches'
  },
  Acrimsat: {
    label: 'Acrimsat Launches',
    color: 'hsl(var(--chart-1))'
  },
  RohiniRS_D1: {
    label: 'Rohini RS-D1 Launches',
    color: 'hsl(var(--chart-2))'
  }
} satisfies ChartConfig;

export function BarGraph() {
  const [activeChart, setActiveChart] = React.useState<keyof typeof chartConfig>('Acrimsat');

  const total = React.useMemo(() => ({
    Acrimsat: chartData.reduce((acc, curr) => acc + curr.Acrimsat, 0),
    RohiniRS_D1: chartData.reduce((acc, curr) => acc + curr.RohiniRS_D1, 0)
  }),
    []
  );

  return (
    <Card>
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle>Kompsat-3A - Sputnik 1</CardTitle>
          <CardDescription>
            Density of high atmospheric layers
          </CardDescription>
        </div>
        <div className="flex">
          {['Acrimsat', 'RohiniRS_D1'].map((key) => {
            const chart = key as keyof typeof chartConfig;
            return (
              <button
                key={chart}
                data-active={activeChart === chart}
                className="relative flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
                onClick={() => setActiveChart(chart)}
              >
                <span className="text-xs text-muted-foreground">
                  {chartConfig[chart].label}
                </span>
                <span className="text-lg font-bold leading-none sm:text-3xl">
                  {total[key as keyof typeof total].toLocaleString()}
                </span>
              </button>
            );
          })}
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[280px] w-full"
        >
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.substring(5)}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  nameKey="views"
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    });
                  }}
                />
              }
            />
            <Bar dataKey={activeChart} fill={`var(--color-${activeChart})`} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
