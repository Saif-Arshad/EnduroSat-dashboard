import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const GaugeChart = () => {
    const data = {
        datasets: [
            {
                data: [40, 20, 40],
                backgroundColor: ['#f85652', '#adc558', '#3ecb5b'],
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

    return (
        <div className=" text-white rounded-lg p-4 ">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">System & Inertia</h3>
                {/* <button className="text-blue-400 hover:underline text-sm">More</button> */}
            </div>
            <div className="relative h-36 mb-3">
                <Doughnut data={data} options={options} />
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <p className="text-lg font-semibold text-white">70%</p>
                    <p className="text-sm text-gray-400">Power</p>
                </div>
            </div>
            <div className="text-sm">
                <div className="flex justify-between mb-2">
                    <span>Accelerometer</span>
                    <span>: 10x, 20y, 3z</span>
                </div>
                <div className="flex justify-between mb-2">
                    <span>Magnetometer</span>
                    <span>: 5x, 10y, 10z</span>
                </div>
                <div className="flex justify-between mb-2">
                    <span>Gyroscope</span>
                    <span>: 20x, 20y, 20z</span>
                </div>
                <div className="flex justify-between">
                    <span>RSSI</span>
                    <span>: 11dB</span>
                </div>
            </div>
        </div>
    );
};

export default GaugeChart;
