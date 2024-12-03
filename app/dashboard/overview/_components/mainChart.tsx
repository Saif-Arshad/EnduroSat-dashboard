import React from 'react';
import { Chart as ChartJS, LineElement, PointElement, LinearScale, Title, Tooltip, Legend, CategoryScale } from 'chart.js';
import { Line } from 'react-chartjs-2';
import { defaults } from "chart.js/auto";

ChartJS.register(LineElement, PointElement, LinearScale, Title, Tooltip, Legend, CategoryScale);


defaults.maintainAspectRatio = false;
defaults.responsive = true;
const LineChart = () => {
    const data = {
        labels: ['29.May', '12:00', '30.May'], // X-axis labels
        datasets: [
            {
                label: 'Temperature (in °C)',
                data: [24, 24, 20], // Y-axis data points
                borderColor: '#00BFFF',
                backgroundColor: '#00BFFF',
                tension: 0.3, // Smooth curve
                fill: false,
                pointRadius: 5,
                pointHoverRadius: 8,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: false, // Hides the legend
            },
        },
        scales: {
            x: {
                grid: {
                    color: '#333333', // Grid color for X-axis
                },
                ticks: {
                    color: '#ffffff', // Text color for X-axis
                },
            },
            y: {
                min: 20,
                max: 26,
                grid: {
                    color: '#333333', // Grid color for Y-axis
                },
                ticks: {
                    color: '#ffffff', // Text color for Y-axis
                },
            },
        },
    };

    return (
        <div className="bg-neutral-800 text-white rounded-lg p-4 w-full">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Sensor 01-Humidity </h3>
                {/* <button className="text-blue-400 hover:underline text-sm">More</button> */}
            </div>
            <div className="h-48">
                <Line data={data} options={options} />
            </div>
        </div>
    );
};

export default LineChart;
