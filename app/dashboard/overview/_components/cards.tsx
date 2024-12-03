"use client";

import React from 'react';
import dynamic from 'next/dynamic';

// Dynamically import ApexCharts to support SSR with Next.js
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

const dummyData = {

    windAngle: {
        title: "OBC Uptime",
        value: "445440",
        data: [-1, 0, -2, -1, -2, 0, -2, -3, 0, -1, -2, -3, -1, 0, -2, -3]
    },
    outsideTemp: {
        title: "OBC Temp",
        value: "5°C",
        data: [50, 52, 53, 51, 52, 53, 52, 54, 53, 51, 52, 54, 53, 52, 50, 51]
    },
    dewPoint: {
        title: "EPS Battery Temp",
        value: "2°C",
        data: [42, 43, 44, 45, 44, 43, 44, 46, 44, 45, 43, 42, 43, 44, 45, 44]
    },
    insideTemp: {
        title: "ANTS Temp",
        value: "-14°C",
        data: [57, 58, 59, 57, 58, 59, 58, 60, 59, 58, 57, 58, 60, 59, 57, 58]
    },
    insideHumidity: {
        title: "EPS Battery Temp",
        value: "2°C",
        data: [60, 59, 58, 59, 60, 59, 58, 61, 59, 60, 58, 59, 61, 60, 58, 59]
    },
    engineRoomTemp: {
        title: "Vbatt",
        value: "8.1",
        data: [50, 51, 52, 51, 50, 51, 52, 53, 51, 50, 52, 51, 53, 52, 50, 51]
    },
};


const chartOptions = {
    chart: {
        type: 'line' as "line",
        height: 50,
        sparkline: { enabled: true },
    },
    stroke: { width: 2, curve: 'smooth' },
    tooltip: { enabled: false },
    colors: ['#455c70'], // Change this color as needed
};

const MetricCard = ({ title, value, data }: any) => (
    <div className='bg-[#1e1e1e] rounded-xl p-6 flex flex-col items-start text-white w-full' >
        <div className='flex flex-col items-center mb-4'>
            <span style={styles.title}>{title}</span>
            <span style={styles.value}>{value}</span>
        </div>
        {
            // @ts-ignore
            <Chart options={chartOptions} series={[{ data }]} type="line" height={50} />
        }
    </div>
);

const Dashboard = () => (
    <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 w-full'>
        <MetricCard title={dummyData.windAngle.title} value={dummyData.windAngle.value} data={dummyData.windAngle.data} />
        <MetricCard title={dummyData.outsideTemp.title} value={dummyData.outsideTemp.value} data={dummyData.outsideTemp.data} />
        <MetricCard title={dummyData.dewPoint.title} value={dummyData.dewPoint.value} data={dummyData.dewPoint.data} />
        <MetricCard title={dummyData.insideTemp.title} value={dummyData.insideTemp.value} data={dummyData.insideTemp.data} />
        <MetricCard title={dummyData.insideHumidity.title} value={dummyData.insideHumidity.value} data={dummyData.insideHumidity.data} />
        <MetricCard title={dummyData.engineRoomTemp.title} value={dummyData.engineRoomTemp.value} data={dummyData.engineRoomTemp.data} />
    </div>
);

export default Dashboard;

const styles = {

    header: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom: '8px',
    },
    title: {
        fontSize: '0.875rem',
        color: '#B0B0B0', // Lighter color for the title
    },
    value: {
        fontSize: '1.25rem',
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
};
