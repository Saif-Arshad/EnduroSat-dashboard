"use client";

import React from 'react';
import dynamic from 'next/dynamic';

// Dynamically import ApexCharts to support SSR with Next.js
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

const dummyData = {
    windSpeed: {
        title: "Wind Speed",
        value: "8 kn",
        data: [5, 6, 7, 8, 7, 6, 8, 9, 7, 6, 8, 9, 10, 7, 6, 8]
    },
    windAngle: {
        title: "Wind Angle",
        value: "-2°",
        data: [-1, 0, -2, -1, -2, 0, -2, -3, 0, -1, -2, -3, -1, 0, -2, -3]
    },
    outsideTemp: {
        title: "Outside Temp",
        value: "52°F",
        data: [50, 52, 53, 51, 52, 53, 52, 54, 53, 51, 52, 54, 53, 52, 50, 51]
    },
    dewPoint: {
        title: "Dewpoint",
        value: "44°F",
        data: [42, 43, 44, 45, 44, 43, 44, 46, 44, 45, 43, 42, 43, 44, 45, 44]
    },
    barometricPressure: {
        title: "Barometric Pressure",
        value: "29.95\" Hg",
        data: [29.8, 29.9, 30, 29.95, 29.9, 29.85, 29.95, 30.1, 29.9, 29.8, 30, 29.95, 30.1, 29.9, 29.85, 29.95]
    },
    insideTemp: {
        title: "Inside Temp",
        value: "58°F",
        data: [57, 58, 59, 57, 58, 59, 58, 60, 59, 58, 57, 58, 60, 59, 57, 58]
    },
    insideHumidity: {
        title: "Inside Humidity",
        value: "59%",
        data: [60, 59, 58, 59, 60, 59, 58, 61, 59, 60, 58, 59, 61, 60, 58, 59]
    },
    engineRoomTemp: {
        title: "Engine Room",
        value: "51°F",
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
    <div className='bg-[#1e1e1e] rounded-xl p-6 flex flex-col items-start text-white w-60' >
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
    <div className='flex items-start justify-center gap-3 flex-wrap w-full'>
        <MetricCard title={dummyData.windSpeed.title} value={dummyData.windSpeed.value} data={dummyData.windSpeed.data} />
        <MetricCard title={dummyData.windAngle.title} value={dummyData.windAngle.value} data={dummyData.windAngle.data} />
        <MetricCard title={dummyData.outsideTemp.title} value={dummyData.outsideTemp.value} data={dummyData.outsideTemp.data} />
        <MetricCard title={dummyData.dewPoint.title} value={dummyData.dewPoint.value} data={dummyData.dewPoint.data} />
        <MetricCard title={dummyData.barometricPressure.title} value={dummyData.barometricPressure.value} data={dummyData.barometricPressure.data} />
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
