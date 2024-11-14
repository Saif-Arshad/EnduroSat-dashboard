"use client"
import { Card, CardTitle } from '@/components/ui/card';
import React from 'react';
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

// Dummy data for the chart
const data = Array.from({ length: 30 }, (_, i) => ({
    time: `3/${22 + i} 00:00`,
    min: Math.random() * 20,
    max: Math.random() * 40 + 20,
    avg: Math.random() * 30 + 10,
    current: Math.random() * 40 + 10
}));

export default function ApparentWindSpeedChart() {
    return (
        <Card>
            <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
                <CardTitle>Apparent  Speed</CardTitle>
            </div>
            <div className="w-full h-">
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#555" />
                        <XAxis dataKey="time" tick={{ fill: '#aaa', fontSize: 10 }} />
                        <YAxis tick={{ fill: '#aaa', fontSize: 10 }} />
                        <Tooltip
                            contentStyle={{ backgroundColor: '#333', borderColor: '#444' }}
                            labelStyle={{ color: '#ddd' }}
                        />
                        <Legend wrapperStyle={{ color: '#ddd', fontSize: 12 }} />
                        <Line type="monotone" dataKey="min" stroke="#82ca9d" strokeWidth={1} dot={false} name="Min" />
                        <Line type="monotone" dataKey="avg" stroke="#ffc658" strokeWidth={1} dot={false} name="Avg" />
                        <Line type="monotone" dataKey="max" stroke="#8884d8" strokeWidth={1} dot={false} name="Max" />
                        <Line type="monotone" dataKey="current" stroke="#ff7300" strokeWidth={1} dot={false} name="Current" />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </Card>
    );
}
