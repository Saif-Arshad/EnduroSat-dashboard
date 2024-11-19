"use client"

import React, { useState } from 'react';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer
} from 'recharts';
import data from '../../../../../constants/MySat-1_Beacon_data_sample.json';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const MyLineChart = () => {
    const pageSize = 45;
    const [pageIndex, setPageIndex] = useState(0);
    const numberOfPages = Math.ceil(data.length / pageSize);

    const slicedData = data.slice(pageIndex * pageSize, (pageIndex + 1) * pageSize);

    const navigatePages = (direction: any) => {
        setPageIndex(prev =>
            direction === 'prev'
                ? Math.max(0, prev - 1)
                : Math.min(prev + 1, numberOfPages - 1)
        );
    };

    return (
        <Card className='my-6 shadow-lg rounded-lg overflow-hidden'>
            <CardHeader className="flex items-center justify-between border-b p-4 bg-transparent">
                <div className="flex flex-1 flex-col justify-center gap-1">
                    <CardTitle className="text-xl font-semibold">Voltage and Temperature Trends by Cycle</CardTitle>
                    <CardDescription className="text-gray-600">
                        Tracking Voltage Fluctuations and Temperature Changes Across Usage Cycles
                    </CardDescription>
                </div>
                <div className="flex items-center space-x-2">
                    <button
                        onClick={() => navigatePages('prev')}
                        disabled={pageIndex === 0}
                        className={`text-white bg-blue-500 hover:bg-blue-600 transition-transform duration-200 rounded-full p-2 ${pageIndex === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'
                            }`}
                    >
                        <ChevronLeft />
                    </button>
                    <button
                        onClick={() => navigatePages('next')}
                        disabled={pageIndex === numberOfPages - 1}
                        className={`text-white bg-blue-500 hover:bg-blue-600 transition-transform duration-200 rounded-full p-2 ${pageIndex === numberOfPages - 1 ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'
                            }`}
                    >
                        <ChevronRight />
                    </button>
                </div>
            </CardHeader>
            <ResponsiveContainer width="100%" height={450}>
                <LineChart data={slicedData} margin={{ top: 20, right: 30, left: 20, bottom: 50 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                        dataKey="Timestamp"
                        angle={-45}
                        textAnchor="end"
                        interval={Math.floor(slicedData.length / 10)}
                        height={60}
                        tick={{ fontSize: 12 }}
                    />
                    <YAxis
                        yAxisId="left"
                        label={{ value: 'Voltage (V)', angle: -90, position: 'insideLeft', offset: 10 }}
                        tick={{ fontSize: 12 }}
                    />
                    <YAxis
                        yAxisId="right"
                        orientation="right"
                        label={{ value: 'Temperature (°C)', angle: 90, position: 'insideRight', offset: 10 }}
                        tick={{ fontSize: 12 }}
                    />
                    <Tooltip />
                    <Legend verticalAlign="top" height={36} />
                    {/* Voltage Line */}
                    <Line
                        yAxisId="left"
                        type="monotone"
                        dataKey="Vbatt"
                        stroke="#8884d8"
                        strokeWidth={2}
                        dot={false}
                        name="Battery Voltage"
                    />
                    {/* Temperature Lines */}
                    <Line
                        yAxisId="right"
                        type="monotone"
                        dataKey="OBC_temp"
                        stroke="#82ca9d"
                        strokeWidth={2}
                        dot={false}
                        name="OBC Temp"
                    />
                    <Line
                        yAxisId="right"
                        type="monotone"
                        dataKey="OBC_DB_temp"
                        stroke="#ffc658"
                        strokeWidth={2}
                        dot={false}
                        name="OBC DB Temp"
                    />
                    <Line
                        yAxisId="right"
                        type="monotone"
                        dataKey="EPS_battery_temp"
                        stroke="#ff7300"
                        strokeWidth={2}
                        dot={false}
                        name="EPS Battery Temp"
                    />
                    <Line
                        yAxisId="right"
                        type="monotone"
                        dataKey="EPS_boost1_temp"
                        stroke="#387908"
                        strokeWidth={2}
                        dot={false}
                        name="EPS Boost1 Temp"
                    />
                    <Line
                        yAxisId="right"
                        type="monotone"
                        dataKey="ANTS_temp"
                        stroke="#a832a5"
                        strokeWidth={2}
                        dot={false}
                        name="ANTS Temp"
                    />
                    <Line
                        yAxisId="right"
                        type="monotone"
                        dataKey="TRXVU_temp"
                        stroke="#33a1fd"
                        strokeWidth={2}
                        dot={false}
                        name="TRXVU Temp"
                    />
                    <Line
                        yAxisId="right"
                        type="monotone"
                        dataKey="ADCS_temp"
                        stroke="#ff33f6"
                        strokeWidth={2}
                        dot={false}
                        name="ADCS Temp"
                    />
                </LineChart>
            </ResponsiveContainer>
            <div className="text-center text-sm text-gray-500 p-4">
                Page {pageIndex + 1} of {numberOfPages}
            </div>
        </Card>
    );
};

export default MyLineChart;

