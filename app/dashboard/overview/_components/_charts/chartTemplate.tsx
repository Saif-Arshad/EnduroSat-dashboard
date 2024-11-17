import React, { useState } from 'react';
import Chart from 'react-apexcharts';

const ChartTemplate = ({ seriesData, fieldName, title }: any) => {
    const [zoomStack, setZoomStack] = useState([]);
    const [currentData, setCurrentData] = useState(seriesData);

    const getCurrentRange = () => {
        if (zoomStack.length === 0) {
            return { start: 0, end: seriesData.length - 1 };
        } else {
            return zoomStack[zoomStack.length - 1];
        }
    };

    const handleZoom = (dataPointIndex: number) => {
        const currentRange = getCurrentRange();
        const totalPoints = currentRange.end - currentRange.start + 1;

        const zoomFactor = 0.5;
        const newWindowSize = Math.max(1, Math.floor(totalPoints * zoomFactor));

        let newStart = currentRange.start + dataPointIndex - Math.floor(newWindowSize / 2);
        let newEnd = currentRange.start + dataPointIndex + Math.ceil(newWindowSize / 2) - 1;

        if (newStart < 0) {
            newStart = 0;
            newEnd = newWindowSize - 1;
        }
        if (newEnd >= seriesData.length) {
            newEnd = seriesData.length - 1;
            newStart = Math.max(0, newEnd - newWindowSize + 1);
        }

        const newZoomStack = [...zoomStack, { start: newStart, end: newEnd }];
        {/* @ts-ignore */ }
        setZoomStack(newZoomStack);

        const zoomedData = seriesData.slice(newStart, newEnd + 1);
        setCurrentData(zoomedData);
    };

    const handleZoomOut = () => {
        if (zoomStack.length > 0) {
            const newZoomStack = zoomStack.slice(0, zoomStack.length - 1);
            setZoomStack(newZoomStack);

            if (newZoomStack.length === 0) {
                setCurrentData(seriesData);
            } else {
                const lastRange = newZoomStack[newZoomStack.length - 1];
                {/* @ts-ignore */ }
                const zoomedData = seriesData.slice(lastRange.start, lastRange.end + 1);
                setCurrentData(zoomedData);
            }
        }
    };

    const handleResetZoom = () => {
        setZoomStack([]);
        setCurrentData(seriesData);
    };

    const options = {
        chart: {
            id: fieldName,
            type: 'line',
            zoom: {
                enabled: false, // Disable default zoom
            },
            events: {
                click: (event: any, chartContext: any, config: any) => {
                    if (config.dataPointIndex !== -1) {
                        handleZoom(config.dataPointIndex);
                    }
                },
            },
        },
        xaxis: {
            categories: currentData.map((_: any, index: any) => index + 1),
            title: {
                text: 'Data Point',
            },
        },
        yaxis: {
            title: {
                text: title,
            },
        },
        title: {
            text: title,
            align: 'left',
        },
    };

    const series = [
        {
            name: title,
            data: currentData,
        },
    ];

    return (
        <div className="chart bg-neutral-800 p-2 rounded-2xl dark:text-black">
            {/* Zoom Controls */}
            <div className="mb-4 flex space-x-2 mt-6">
                <button
                    onClick={handleResetZoom}
                    disabled={zoomStack.length === 0}
                    className="bg-blue-500 text-white py-2 px-4 rounded"
                >
                    Reset Zoom
                </button>
                <button
                    onClick={handleZoomOut}
                    disabled={zoomStack.length === 0}
                    className="bg-gray-500 text-white py-2 px-4 rounded"
                >
                    Zoom Out
                </button>
            </div>
            {/* @ts-ignore */}
            <Chart options={options} series={series} type="line" height={350} />
        </div>
    );
};

export default ChartTemplate;
