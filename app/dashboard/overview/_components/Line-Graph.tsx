"use client"

import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import data from '../../../../constants/MySat-1_Beacon_data_sample.json';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const MyBarChart = () => {
    const pageSize = 45;
    const [pageIndex, setPageIndex] = useState(0);
    const [chartColor, setChartColor] = useState('#8884d8');
    const numberOfPages = Math.ceil(data.length / pageSize);

    const slicedData = data.slice(pageIndex * pageSize, (pageIndex + 1) * pageSize);

    const navigatePages = (direction: any) => {
        setPageIndex(prev => direction === 'prev' ? Math.max(0, prev - 1) : Math.min(prev + 1, numberOfPages - 1));
        setChartColor(prev => (prev === '#8884d8' ? '#82ca9d' : '#8884d8'));
    };

    return (
        <Card className='my-6'>
            <CardHeader className="flex  items-center justify-between space-y-0 border-b p-0 sm:flex-row">
                <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
                    <CardTitle>Voltage trends by cycle</CardTitle>
                    <CardDescription>
                        Tracking Voltage Fluctuations Across Usage Cycles
                    </CardDescription>
                </div>
                <div className="flex justify-between items-center pr-4">
                    <div>
                        <button
                            onClick={() => navigatePages('prev')}
                            className="text-white bg-blue-500 hover:bg-blue-600 hover:scale-105 transition-all duration-200 rounded-full  p-2 mr-2"
                        >
                            <ChevronLeft />
                        </button>
                        <button
                            onClick={() => navigatePages('next')}
                            className="text-white bg-blue-500 hover:bg-blue-600 hover:scale-105 transition-all duration-200 rounded-full  p-2"

                        >
                            <ChevronRight />
                        </button>
                    </div>
                </div>
            </CardHeader>
            <ResponsiveContainer width="100%" height={400}>
                <BarChart data={slicedData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="Timestamp" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="Vbatt" fill={chartColor} />
                </BarChart>
            </ResponsiveContainer>
            <div className="text-center text-sm text-gray-500 m-4">
                Page {pageIndex + 1} of {numberOfPages}
            </div>
        </Card>
    );
};

export default MyBarChart;
