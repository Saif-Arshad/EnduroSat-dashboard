"use client";

import React, { useState, useRef } from 'react';
import dynamic from 'next/dynamic';
import { Button } from '@/components/ui/button'; // Adjust based on your project structure
import { ApexOptions } from 'apexcharts';

// Dynamically import ApexCharts to support SSR with Next.js
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

// Define TypeScript interfaces
interface WindDataPoint {
    Timestamp: Date;
    MeanWindSpeed: number;
    CurrentWindSpeed: number;
}

interface ZoomRange {
    start: number;
    end: number;
}

// Function to generate dummy wind data
const generateDummyWindData = (): WindDataPoint[] => {
    const data: WindDataPoint[] = [];
    let date = new Date('2023-03-22T00:00:00');
    for (let i = 0; i < 50; i++) { // Adjust the number of data points as needed
        data.push({
            Timestamp: new Date(date),
            MeanWindSpeed: Math.floor(Math.random() * 100) + 50, // Random between 50 and 150 km/h
            CurrentWindSpeed: Math.floor(Math.random() * 100) + 50, // Random between 50 and 150 km/h
        });
        date.setHours(date.getHours() + 1); // Increment each data point by 1 hour
    }
    return data;
};

const WindSpeedChart: React.FC = () => {
    const initialData: WindDataPoint[] = generateDummyWindData();
    const chartRef = useRef<any>(null);

    // State to manage zoom levels
    const [zoomStack, setZoomStack] = useState<ZoomRange[]>([]);
    const [currentData, setCurrentData] = useState<WindDataPoint[]>(initialData);

    // Helper function to get the current zoom range
    const getCurrentRange = (): ZoomRange => {
        if (zoomStack.length === 0) {
            return { start: 0, end: initialData.length - 1 };
        } else {
            return zoomStack[zoomStack.length - 1];
        }
    };

    // Handler to perform zoom based on clicked data point's xValue
    const handleZoom = (xValue: number) => {
        const indexInInitialData = initialData.findIndex(dp => dp.Timestamp.getTime() === xValue);
        if (indexInInitialData === -1) return; // Data point not found

        const currentRange = getCurrentRange();
        const totalPoints = currentRange.end - currentRange.start + 1;

        // Define the zoom window size (e.g., 50% of current range)
        const zoomFactor = 0.5;
        const newWindowSize = Math.max(1, Math.floor(totalPoints * zoomFactor));

        // Calculate new start and end indices centered around the clicked point
        let newStart = indexInInitialData - Math.floor(newWindowSize / 2);
        let newEnd = indexInInitialData + Math.ceil(newWindowSize / 2) - 1;

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
        const newZoomStack: ZoomRange[] = [...zoomStack, { start: newStart, end: newEnd }];
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

    // Prepare the series data first
    const chartSeries = [
        {
            name: 'Mean Wind Speed',
            type: 'area',
            data: currentData.map((item) => ({
                x: item.Timestamp.getTime(),
                y: item.MeanWindSpeed
            })),
        },
        {
            name: 'Current Wind Speed',
            type: 'line',
            data: currentData.map((item) => ({
                x: item.Timestamp.getTime(),
                y: item.CurrentWindSpeed
            })),
        }
    ];

    // Prepare the chart options
    const chartOptions: ApexOptions = {
        chart: {
            type: 'area',
            stacked: false,
            height: 350,
            zoom: {
                type: 'x',
                enabled: false, // Disable default scroll-based zooming
                autoScaleYaxis: true
            },
            toolbar: {
                show: true // Hide the default toolbar
            },
            events: {
                // Handle click events on data points
                dataPointSelection: (event: MouseEvent, chartContext: any, config: any) => {
                    const dataPointIndex: number = config.dataPointIndex;
                    const seriesIndex: number = config.seriesIndex;

                    if (dataPointIndex !== -1 && seriesIndex !== -1) {
                        // Retrieve the xValue from the clicked data point
                        const series = chartSeries[seriesIndex];
                        const dataPoint = series.data[dataPointIndex];
                        const xValue = dataPoint.x;

                        handleZoom(xValue);
                    }
                },
            },
        },
        dataLabels: {
            enabled: false
        },
        markers: {
            size: 0,
        },
        fill: {
            type: 'gradient',
            gradient: {
                shadeIntensity: 1,
                inverseColors: false,
                opacityFrom: 0.5,
                opacityTo: 0.0,
                stops: [0, 90, 100]
            }
        },
        yaxis: {
            labels: {
                formatter: function (val: number) {
                    return `${val.toFixed(0)} km/h`;
                }
            },
            title: {
                text: 'Wind Speed (km/h)'
            },
            min: 0, // Adjust based on your data
            max: 200, // Adjust based on your data
            tickAmount: 8,
        },
        xaxis: {
            type: 'datetime',
            categories: currentData.map((item) => item.Timestamp.getTime()),
            labels: {
                datetimeUTC: false,
                // @ts-ignore
                formatter: function (value: number, timestamp: number, opts?: any): string {
                    const date = new Date(timestamp);
                    const day = date.getDate();
                    const month = date.getMonth() + 1; // Months are zero-based
                    const hours = date.getHours();
                    const minutes = date.getMinutes();
                    return `${day} ${month < 10 ? '0' + month : month} ${hours}:${minutes < 10 ? '0' + minutes : minutes}`;
                }
            },
            tickAmount: Math.min(currentData.length, 10),
        },
        tooltip: {
            shared: false,
            y: {
                formatter: function (val: number) {
                    return `${val.toFixed(2)} km/h`;
                }
            }
        },
        theme: {
            mode: 'dark'
        },
        colors: ['#FFD700', '#FF6347'], // Gold and Tomato colors
        legend: {
            position: 'top',
            horizontalAlign: 'left',
            labels: {
                colors: ['#FFD700', '#FF6347']
            }
        },
        grid: {
            borderColor: '#555',
            row: {
                colors: ['#333', 'transparent'],
                opacity: 0.1
            }
        },
    };

    return (
        <div className="px-4 py-4 dark:text-black">
            {/* Zoom Controls */}
            {zoomStack.length > 0 && (
                <div className="mb-4 flex space-x-2">
                    <Button
                        onClick={handleResetZoom}
                        disabled={zoomStack.length === 0}
                        className={`bg-blue-500 hover:bg-blue-600 ${zoomStack.length === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        Reset Zoom
                    </Button>
                    <Button
                        onClick={handleZoomOut}
                        disabled={zoomStack.length === 0}
                        className={`bg-gray-500 hover:bg-gray-600 ${zoomStack.length === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        Zoom Out
                    </Button>
                </div>
            )}

            {currentData.length > 0 ? (
                <Chart
                    ref={chartRef}
                    options={chartOptions}
                    series={chartSeries}
                    type="area" // The type here is overridden by series types
                    height={350}
                />
            ) : (
                <p className="text-center text-gray-500">No data available</p>
            )}
        </div>
    );
};

export default WindSpeedChart;
