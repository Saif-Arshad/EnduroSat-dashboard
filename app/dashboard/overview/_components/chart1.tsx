"use client"

import React from 'react';
import Chart from 'react-apexcharts';

const PacketChart = () => {
    const options = {
        chart: {
            type: 'area',
            height: 350,
            background: '#2e2e2e',
            foreColor: '#CCCCCC',
            toolbar: {
                show: true,
            },
        },
        colors: ['#4CAF50', '#FFC107'],
        dataLabels: { enabled: false },
        stroke: { curve: 'smooth', width: 2 },
        fill: {
            type: 'gradient',
            gradient: {
                shadeIntensity: 1,
                opacityFrom: 0.4,
                opacityTo: 0.8,
                stops: [0, 90, 100],
            },
        },
        markers: { size: 0 },
        xaxis: {
            type: 'datetime',
            categories: [
                '2024-11-13T07:00:00',
                '2024-11-13T12:00:00',
                '2024-11-13T17:00:00',
                '2024-11-13T22:00:00',
                '2024-11-14T03:00:00',
            ],
            labels: { format: 'HH:mm' },
        },
        yaxis: {
            min: -200,
            max: 200,
            tickAmount: 8,
            labels: { formatter: (val: any) => `${val} kpps` },
        },
        legend: {
            position: 'top',
            horizontalAlign: 'left',
            labels: { colors: ['#4CAF50', '#FFC107'] },
        },
        tooltip: { shared: true, intersect: false },
        grid: { borderColor: '#555', row: { colors: ['#333', 'transparent'], opacity: 0.1 } },
    };

    const series = [
        {
            name: 'IN',
            data: [20.9, 50, 80, 150, 99.2],
        },
        {
            name: 'OUT',
            data: [-30.2, -70, -100, -150, -175.3],
        },
    ];

    return (
        <div className="chart-container dark:text-black rounded-2xl">
            {/* @ts-ignore */}
            <Chart options={options} series={series} type="area" height={350} />
        </div>
    );
};

export default PacketChart;
