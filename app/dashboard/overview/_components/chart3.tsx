"use client";

import React, { useState, useRef } from 'react';
import Chart from 'react-apexcharts';

const HistogramChart = () => {
    const chartRef = useRef(null);

    // Initial categories and data
    const initialCategories = [
        '2023-03-22T00:00:00', '2023-03-23T00:00:00', '2023-03-24T00:00:00',
        '2023-03-25T00:00:00', '2023-03-26T00:00:00', '2023-03-27T00:00:00',
        '2023-03-28T00:00:00'
    ];

    const initialSeriesData = [10, 20, 30, 40, 10, 50, 25];

    // Stack to keep track of zoom levels
    const [zoomStack, setZoomStack] = useState([]);

    // Current view based on zoom
    const getCurrentRange = () => {
        if (zoomStack.length === 0) {
            return { start: 0, end: initialCategories.length - 1 };
        } else {
            return zoomStack[zoomStack.length - 1];
        }
    };

    const [currentCategories, setCurrentCategories] = useState(initialCategories);
    const [currentSeriesData, setCurrentSeriesData] = useState(initialSeriesData);

    // Chart options
    const options = {
        chart: {
            type: 'bar',
            height: 350,
            toolbar: {
                show: true
            },
            zoom: {
                enabled: false // Disable default zooming
            },
            events: {
                click: (event: any, chartContext: any, config: any) => {
                    if (config.dataPointIndex !== -1) {
                        handleZoom(config.dataPointIndex);
                    }
                }
            }
        },
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: '80%',
                endingShape: 'flat'
            }
        },
        dataLabels: {
            enabled: false
        },
        xaxis: {
            type: 'datetime',
            categories: currentCategories,
            labels: {
                rotate: -45,
                rotateAlways: true
            }
        },
        yaxis: {
            title: {
                text: 'Values'
            }
        },
        fill: {
            colors: ['#1E90FF'], // Dark blue color
            opacity: 1
        },
        grid: {
            borderColor: '#f1f1f1'
        }
    };

    // Handler to perform zoom based on clicked data point
    const handleZoom = (dataPointIndex: any) => {
        const currentRange = getCurrentRange();
        const totalPoints = currentRange.end - currentRange.start + 1;

        // Define the zoom window size (e.g., 50% of current range)
        const zoomFactor = 0.5;
        const newWindowSize = Math.max(1, Math.floor(totalPoints * zoomFactor));

        // Map clicked index to the initial data index
        const initialDataIndex = currentRange.start + dataPointIndex;

        // Calculate new start and end indices centered around the clicked point
        let newStart = initialDataIndex - Math.floor(newWindowSize / 2);
        let newEnd = initialDataIndex + Math.ceil(newWindowSize / 2) - 1;

        // Adjust if out of bounds
        if (newStart < 0) {
            newStart = 0;
            newEnd = newWindowSize - 1;
        }
        if (newEnd >= initialCategories.length) {
            newEnd = initialCategories.length - 1;
            newStart = Math.max(0, newEnd - newWindowSize + 1);
        }

        // Push the new zoom range onto the stack
        const newZoomStack = [...zoomStack, { start: newStart, end: newEnd }];
        // @ts-ignore
        setZoomStack(newZoomStack);

        // Update current categories and data based on the new zoom range
        const newCategories = initialCategories.slice(newStart, newEnd + 1);
        const newData = initialSeriesData.slice(newStart, newEnd + 1);

        setCurrentCategories(newCategories);
        setCurrentSeriesData(newData);
    };

    // Handler to reset all zoom levels
    const handleResetZoom = () => {
        setZoomStack([]);
        setCurrentCategories(initialCategories);
        setCurrentSeriesData(initialSeriesData);
    };

    // Handler to zoom out one level
    const handleZoomOut = () => {
        if (zoomStack.length > 0) {
            const newZoomStack = zoomStack.slice(0, zoomStack.length - 1);
            setZoomStack(newZoomStack);

            if (newZoomStack.length === 0) {
                setCurrentCategories(initialCategories);
                setCurrentSeriesData(initialSeriesData);
            } else {
                const lastRange = newZoomStack[newZoomStack.length - 1];
                // @ts-ignore
                const newCategories = initialCategories.slice(lastRange.start, lastRange.end + 1);
                // @ts-ignore
                const newData = initialSeriesData.slice(lastRange.start, lastRange.end + 1);
                setCurrentCategories(newCategories);
                setCurrentSeriesData(newData);
            }
        }
    };

    return (
        <div>
            {/* Zoom Controls */}
            <div style={{ marginBottom: '10px' }}>
                <button
                    onClick={handleResetZoom}
                    style={{
                        marginRight: '10px',
                        padding: '8px 16px',
                        backgroundColor: '#1E90FF',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer'
                    }}
                >
                    Reset Zoom
                </button>
                {zoomStack.length > 0 && (
                    <button
                        onClick={handleZoomOut}
                        style={{
                            padding: '8px 16px',
                            backgroundColor: '#696969',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer'
                        }}
                    >
                        Zoom Out
                    </button>
                )}
            </div>
            <div className='dark:text-black'>
                <Chart
                    ref={chartRef}
                    // @ts-ignore
                    options={options}
                    series={[{ name: 'HCT-SAT1', data: currentSeriesData }]}
                    type="bar"
                    height={350}
                />
            </div>
        </div>
    );
};

export default HistogramChart;
