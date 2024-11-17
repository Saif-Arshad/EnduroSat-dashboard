"use client";

import React, { useState, useRef } from 'react';
import dynamic from 'next/dynamic';
import { Button } from '@/components/ui/button'; // Assuming you have a Button component

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
    const initialData = generateDummyData();
    const chartRef = useRef(null);

    // State to manage zoom levels
    const [zoomStack, setZoomStack] = useState([]);
    const [currentData, setCurrentData] = useState(initialData);

    // Helper function to get the current zoom range
    const getCurrentRange = () => {
        if (zoomStack.length === 0) {
            return { start: 0, end: initialData.length - 1 };
        } else {
            return zoomStack[zoomStack.length - 1];
        }
    };

    // Handler to perform zoom based on clicked data point
    const handleZoom = (dataPointIndex: any) => {
        const currentRange = getCurrentRange();
        const totalPoints = currentRange.end - currentRange.start + 1;

        // Define the zoom window size (e.g., 50% of current range)
        const zoomFactor = 0.5;
        const newWindowSize = Math.max(1, Math.floor(totalPoints * zoomFactor));

        // Calculate new start and end indices centered around the clicked point
        let newStart = currentRange.start + dataPointIndex - Math.floor(newWindowSize / 2);
        let newEnd = currentRange.start + dataPointIndex + Math.ceil(newWindowSize / 2) - 1;

        // Adjust if out of bounds
        if (newStart < 0) {
            newStart = 0;
            newEnd = newWindowSize - 1;
        }
        if (newEnd >= initialData.length) {
            newEnd = initialData.length - 1;
            newStart = Math.max(0, newEnd - newWindowSize + 1);
        }

        // Push the new zoom range onto the stack
        const newZoomStack = [...zoomStack, { start: newStart, end: newEnd }];
        // @ts-ignore
        setZoomStack(newZoomStack);

        // Update current data based on the new zoom range
        const zoomedData = initialData.slice(newStart, newEnd + 1);
        setCurrentData(zoomedData);
    };

    // Handler to zoom out one level
    const handleZoomOut = () => {
        if (zoomStack.length > 0) {
            const newZoomStack = zoomStack.slice(0, zoomStack.length - 1);
            setZoomStack(newZoomStack);

            if (newZoomStack.length === 0) {
                setCurrentData(initialData);
            } else {
                const lastRange = newZoomStack[newZoomStack.length - 1];
                // @ts-ignore
                const zoomedData = initialData.slice(lastRange.start, lastRange.end + 1);
                setCurrentData(zoomedData);
            }
        }
    };

    // Handler to reset all zoom levels
    const handleResetZoom = () => {
        setZoomStack([]);
        setCurrentData(initialData);
    };

    // Prepare the data in the format required by ApexCharts
    const chartData = {
        options: {
            chart: {
                type: 'line', // Overall type; each series can override
                height: 350,
                toolbar: { show: true },
                background: '#2e2e2e',
                foreColor: '#CCCCCC',
                zoom: {
                    enabled: false, // Disable default zooming
                },
                events: {
                    // Handle click events on the chart
                    click: (event: any, chartContext: any, config: any) => {
                        if (config.dataPointIndex !== -1) {
                            handleZoom(config.dataPointIndex);
                        }
                    },
                },
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
                type: 'datetime',
                categories: currentData.map((item) => item.Timestamp),
                labels: { format: 'HH:mm' },
                tickAmount: Math.min(currentData.length, 10),
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
                data: currentData.map((item) => item.Vbatt),
            },
            {
                name: 'OUT',
                type: 'line', // Line type for line chart
                data: currentData.map((item) => item.VTRXVU),
            },
        ],
    };

    return (
        <div className="px-4 py-4 dark:text-black">
            {/* Zoom Controls */}

            {
                zoomStack.length > 0 &&
                <div className="mb-4 flex space-x-2">
                    <Button
                        onClick={handleResetZoom}
                        disabled={zoomStack.length === 0}
                        className="bg-blue-500 hover:bg-blue-600"
                    >
                        Reset Zoom
                    </Button>
                    <Button
                        onClick={handleZoomOut}
                        disabled={zoomStack.length === 0}
                        className="bg-gray-500 hover:bg-gray-600"
                    >
                        Zoom Out
                    </Button>
                </div>
            }

            {currentData.length > 0 ? (
                <Chart
                    ref={chartRef}
                    // @ts-ignore
                    options={chartData.options}
                    series={chartData.series}
                    type="line" // The type here is overridden by series types
                    height={350}
                />
            ) : (
                <p className="text-center text-gray-500">No data available</p>
            )}
        </div>
    );
};

export default MyStyledMixedChart;
