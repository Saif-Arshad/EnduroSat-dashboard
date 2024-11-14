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

const MyStyledLineChart = () => {
    const pageSize = 145;
    const [pageIndex, setPageIndex] = useState(0);
    const numberOfPages = Math.ceil(data.length / pageSize);

    const slicedData = data.slice(pageIndex * pageSize, (pageIndex + 1) * pageSize);

    const navigatePages = (direction: any) => {
        setPageIndex((prev) =>
            direction === 'prev' ? Math.max(0, prev - 1) : Math.min(prev + 1, numberOfPages - 1)
        );
    };

    return (
        <Card className='my-6'>
            <CardHeader className="flex items-center justify-between space-y-0 border-b p-0 sm:flex-row">
                <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
                    <CardTitle>Network Packets</CardTitle>
                    <CardDescription>
                        Tracking Inbound and Outbound Packets Over Time
                    </CardDescription>
                </div>
                <div className="flex justify-between items-center pr-4">
                    <button
                        onClick={() => navigatePages('prev')}
                        className="text-white bg-blue-500 hover:bg-blue-600 hover:scale-105 transition-all duration-200 rounded-full p-2 mr-2"
                    >
                        <ChevronLeft />
                    </button>
                    <button
                        onClick={() => navigatePages('next')}
                        className="text-white bg-blue-500 hover:bg-blue-600 hover:scale-105 transition-all duration-200 rounded-full p-2"
                    >
                        <ChevronRight />
                    </button>
                </div>
            </CardHeader>
            <ResponsiveContainer width="100%" height={300} className={"dark:text-black"}>
                {slicedData.length > 0 ? (
                    <LineChart data={slicedData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="Timestamp" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line
                            type="monotone"
                            dataKey="Vbatt"
                            stroke="#4CAF50"
                            strokeWidth={2}
                            dot={false}
                            name="IN"
                        />
                        <Line
                            type="monotone"
                            dataKey="VTRXVU"
                            stroke="#FFEB3B"
                            strokeWidth={2}
                            dot={false}
                            name="OUT"
                        />
                    </LineChart>
                ) : (
                    <p className="text-center text-gray-500">No data available</p>
                )}
            </ResponsiveContainer>
            <div className="text-center text-sm text-gray-500 m-4">
                Page {pageIndex + 1} of {numberOfPages}
            </div>
        </Card>
    );
};

export default MyStyledLineChart;
