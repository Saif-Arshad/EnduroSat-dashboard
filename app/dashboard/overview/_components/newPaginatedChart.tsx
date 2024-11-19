"use client";

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
import data from '../../../../constants/MySat-1_Beacon_data_sample.json';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { format, parse } from 'date-fns';

interface BeaconData {
    ID: number;
    Timestamp: string;
    OBC_reset_counter: number;
    OBC_uptime: number;
    EPS_battery_mode: number;
    OBC_time: string;
    OBC_temp: number;
    OBC_DB_temp: number;
    EPS_battery_temp: number;
    EPS_boost1_temp: number;
    ANTS_temp: number;
    TRXVU_temp: number;
    ADCS_temp: number;
    VTRXVU: number;
    Vbatt: number;
    formattedTimestamp?: string;
}

const OBCUptimeChart: React.FC = () => {
    const pageSize: number = 45;
    const [pageIndex, setPageIndex] = useState<number>(0);
    const numberOfPages: number = Math.ceil((data as BeaconData[]).length / pageSize);

    // Format the Timestamp for better readability
    const formattedData: BeaconData[] = (data as BeaconData[]).map(item => ({
        ...item,
        formattedTimestamp: format(parse(item.Timestamp, 'M/d/yyyy H:mm:ss', new Date()), 'MMM d, HH:mm')
    }));

    // Slice the data for pagination
    const slicedData: BeaconData[] = formattedData.slice(pageIndex * pageSize, (pageIndex + 1) * pageSize);

    const navigatePages = (direction: 'prev' | 'next') => {
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
                    <CardTitle className="text-xl font-semibold">OBC Uptime and Reset Counter Over Time</CardTitle>
                    <CardDescription className="text-gray-600">
                        Monitoring the uptime and number of resets of the On-Board Computer across cycles
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
                        dataKey="formattedTimestamp" // Use formatted timestamp
                        angle={-45}
                        textAnchor="end"
                        interval={Math.floor(slicedData.length / 10)}
                        height={60}
                        tick={{ fontSize: 12 }}
                    />
                    <YAxis
                        yAxisId="left"
                        label={{ value: 'OBC Uptime (s)', angle: -90, position: 'insideLeft', offset: 10 }}
                        tick={{ fontSize: 12 }}
                    />
                    <YAxis
                        yAxisId="right"
                        orientation="right"
                        label={{ value: 'Reset Counter', angle: 90, position: 'insideRight', offset: 10 }}
                        tick={{ fontSize: 12 }}
                    />
                    <Tooltip />
                    <Legend verticalAlign="top" height={36} />
                    {/* OBC Uptime Line */}
                    <Line
                        yAxisId="left"
                        type="monotone"
                        dataKey="OBC_uptime"
                        stroke="#8884d8"
                        strokeWidth={2}
                        dot={false}
                        name="OBC Uptime"
                    />
                    {/* Reset Counter Line */}
                    <Line
                        yAxisId="right"
                        type="monotone"
                        dataKey="OBC_reset_counter"
                        stroke="#82ca9d"
                        strokeWidth={2}
                        dot={false}
                        name="Reset Counter"
                    />
                </LineChart>
            </ResponsiveContainer>
            <div className="text-center text-sm text-gray-500 p-4">
                Page {pageIndex + 1} of {numberOfPages}
            </div>
        </Card>
    );
};

export default OBCUptimeChart;
