"use client";

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

// Dynamically import ApexCharts to support SSR with Next.js
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

// Static Dummy Data for Testing
const generateDummyData = () => {
    const data = [];
    let date = new Date('2024-11-13T07:00:00');
    for (let i = 0; i < 50; i++) {
        data.push({
            Timestamp: date.toISOString(),
            Vbatt: Math.floor(Math.random() * 150) + 50, // Random IN values between 50 and 200
            VTRXVU: Math.floor(Math.random() * -150) - 50, // Random OUT values between -50 and -200
        });
        date.setHours(date.getHours() + 1); // Increment each data point by 1 hour
    }
    return data;
};

const MyStyledMixedChart = () => {
    const data = generateDummyData();
    const pageSize = 50;
    const [pageIndex, setPageIndex] = useState(0);
    const numberOfPages = Math.ceil(data.length / pageSize);

    const slicedData = data.slice(pageIndex * pageSize, (pageIndex + 1) * pageSize);

    const navigatePages = (direction: any) => {
        setPageIndex((prev) =>
            direction === 'prev' ? Math.max(0, prev - 1) : Math.min(prev + 1, numberOfPages - 1)
        );
    };

    // Prepare the data in the format required by ApexCharts
    const chartData = {
        options: {
            chart: {
                type: 'line', // This is the overall type, but each series can override it
                height: 350,
                toolbar: { show: true },
                background: '#2e2e2e',
                foreColor: '#CCCCCC',
            },
            colors: ['#4CAF50', '#FFEB3B'], // Colors for IN and OUT
            dataLabels: { enabled: false },
            stroke: { curve: 'smooth', width: 2 },
            fill: {
                type: 'gradient',
                gradient: { shadeIntensity: 1, opacityFrom: 0.4, opacityTo: 0.8 },
            },
            markers: { size: 0 },
            xaxis: {
                categories: slicedData.map((item) => item.Timestamp),
                labels: { format: 'HH:mm' },
            },
            yaxis: {
                min: -200,
                max: 200,
                tickAmount: 8,
                labels: { formatter: (val: any) => `${val} kpps` },
            },
            legend: {
                position: 'top',
                horizontalAlign: 'left',
                labels: { colors: ['#4CAF50', '#FFEB3B'] },
            },
            tooltip: { shared: true, intersect: false },
            grid: { borderColor: '#555', row: { colors: ['#333', 'transparent'], opacity: 0.1 } },
        },
        series: [
            {
                name: 'IN',
                type: 'column', // Column type for bar chart
                data: slicedData.map((item) => item.Vbatt),
            },
            {
                name: 'OUT',
                type: 'line', // Line type for line chart
                data: slicedData.map((item) => item.VTRXVU),
            },
        ],
    };

    return (
        <>

            <div className="px-4 py-4 dark:text-black">
                {slicedData.length > 0 ? (
                    <Chart
                        // @ts-ignore
                        options={chartData.options}
                        series={chartData.series}
                        type="line"
                        height={350}
                    />
                ) : (
                    <p className="text-center text-gray-500">No data available</p>
                )}
            </div>

        </>

    );
};

export default MyStyledMixedChart;
