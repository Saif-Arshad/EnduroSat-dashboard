"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import React from 'react';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from 'recharts';

const data = [
    { value: 30 }, { value: 20 }, { value: 50 }, { value: 80 }, { value: 60 },
    { value: 90 }, { value: 70 }, { value: 40 }, { value: 100 }, { value: 50 },
    { value: 30 }, { value: 20 }, { value: 60 }, { value: 40 }, { value: 70 },
    { value: 50 }, { value: 90 }, { value: 30 }, { value: 80 }, { value: 40 }
];
export default function ChartCard({ title, value, chartData }: any) {
    return (
        <Card>
            <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
                <CardTitle>{title}</CardTitle>
                <CardDescription>
                    {value}
                </CardDescription>
            </div>
            <div className="w-full h-24">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#555" /> {/* Dashed grid */}
                        <XAxis dataKey="name" hide /> {/* Hide X-axis labels */}
                        <YAxis hide /> {/* Hide Y-axis labels */}
                        <Tooltip contentStyle={{ backgroundColor: '#333', borderColor: '#444' }} />
                        <Line
                            type="monotone"
                            dataKey="value"
                            stroke="#8884d8"
                            dot={false}
                            strokeWidth={1}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </Card>
    );
}
