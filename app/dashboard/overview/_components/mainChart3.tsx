import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const GaugeChart2 = () => {
    const data = {
        datasets: [
            {
                data: [21, 79],
                backgroundColor: ['#3ecb5b', '#3d4248'],
                borderWidth: 0,
                cutout: '75%',
                rotation: 225,
                circumference: 270,
            },
        ],
    };

    const options = {
        plugins: {
            tooltip: { enabled: false },
        },
        responsive: true,
        maintainAspectRatio: false,
    };
    const data2 = {
        datasets: [
            {
                data: [55, 45],
                backgroundColor: ['#3ecb5b', '#3d4248'],
                borderWidth: 0,
                cutout: '75%',
                rotation: 225,
                circumference: 270,
            },
        ],
    };

    const options2 = {
        plugins: {
            tooltip: { enabled: false },
        },
        responsive: true,
        maintainAspectRatio: false,
    };

    return (
        <div className="   text-white flex flex-col gap-14 2xl:flex-row">

            <div className="relative h-56">
                <Doughnut data={data} options={options} />
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <p className="text-2xl font-semibold text-white">21</p>
                    <p className="text-lg text-gray-400">Temperture</p>
                </div>
            </div>

        </div>
    );
};

export default GaugeChart2;
