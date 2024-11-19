"use client";

import React, { useState, useEffect } from 'react';
import Chart from 'react-apexcharts';
import data from '../../../../constants/MySat-1_Beacon_data_sample.json';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { format, parse } from 'date-fns';

const LineChartNew = () => {
    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 50; 
    const totalPages = Math.ceil(data.length / pageSize);

    // Chart state
    const [chartOptions, setChartOptions] = useState({});
    const [chartSeries, setChartSeries] = useState([]);

    // Current page data
    const [currentData, setCurrentData] = useState([]);

    // Function to process data for the current page
    const processData = (page) => {
        const startIndex = (page - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        const paginatedData = data.slice(startIndex, endIndex);

        const categories = paginatedData.map((item) => item.Timestamp);

        const series = [
            {
                name: 'OBC Temp',
                data: paginatedData.map((item) => item.OBC_temp || 0),
            },
            {
                name: 'OBC DB Temp',
                data: paginatedData.map((item) => item.OBC_DB_temp || 0),
            },
            {
                name: 'EPS Battery Temp',
                data: paginatedData.map((item) => item.EPS_battery_temp || 0),
            },
            {
                name: 'EPS Boost1 Temp',
                data: paginatedData.map((item) => item.EPS_boost1_temp || 0),
            },
            {
                name: 'ANTS Temp',
                data: paginatedData.map((item) => item.ANTS_temp || 0),
            },
            {
                name: 'TRXVU Temp',
                data: paginatedData.map((item) => item.TRXVU_temp || 0),
            },
            {
                name: 'ADCS Temp',
                data: paginatedData.map((item) => item.ADCS_temp || 0),
            },
        ];

        return { categories, series, paginatedData };
    };

    useEffect(() => {
        // Process data for the current page
        const { categories, series, paginatedData } = processData(currentPage);

        // Update current data for the table
        setCurrentData(paginatedData);

        // Set chart options and series
        setChartOptions({
            chart: {
                id: 'line-chart',
                zoom: { enabled: false }, // Disable zoom
                toolbar: { show: true },
                background: '#262626', // Dark background
            },
            xaxis: {
                categories: categories.map((timestamp) => {
                    // Format the timestamp for better readability
                    const parsedDate = parse(timestamp, 'M/d/yyyy H:mm:ss', new Date());
                    return format(parsedDate, 'MMM d, HH:mm');
                }),
                labels: {
                    rotate: -45,
                    rotateAlways: true,
                    hideOverlappingLabels: true,
                    showDuplicates: false,
                    trim: true,
                    minHeight: 100,
                    style: {
                        colors: '#d1d5db', // Light gray text
                        fontSize: '12px',
                    },
                },
                title: {
                    text: 'Timestamp',
                    style: {
                        color: '#d1d5db',
                        fontSize: '14px',
                        fontWeight: 'bold',
                    },
                },
            },
            stroke: { curve: 'smooth' },
            colors: ['#4C8CFF', '#5ADB77', '#FFC74C', '#F77777', '#B37DFF', '#00D1E0', '#FF77C7'],
            legend: {
                position: 'top',
                labels: {
                    colors: '#d1d5db', // Light gray text
                },
            },
            dataLabels: { enabled: false },
            tooltip: {
                theme: 'dark',
                x: {
                    format: 'MMM d, HH:mm',
                },
                style: {
                    fontSize: '12px',
                },
            },
            grid: {
                borderColor: '#374151', // Dark gray grid lines
                yaxis: {
                    lines: {
                        show: true,
                    },
                },
                xaxis: {
                    lines: {
                        show: false,
                    },
                },
            },
            markers: {
                size: 0, // Remove markers for a cleaner look
            },
            yaxis: {
                labels: {
                    style: {
                        colors: '#d1d5db',
                        fontSize: '12px',
                    },
                },
                title: {
                    text: 'Temperature (°C)',
                    style: {
                        color: '#d1d5db',
                        fontSize: '14px',
                        fontWeight: 'bold',
                    },
                },
            },
        });

        setChartSeries(series);
    }, [currentPage]);

    // Handlers for pagination
    const handlePrevPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    return (
        <div className=' p-6 rounded-3xl shadow-xl dark:bg-gray-800'>
            <h2 className='text-2xl font-bold text-white mb-6 text-center'>Temperature Trends Over Time</h2>

            {/* Chart Container */}
            <div className='bg-neutral-800 p-4 rounded-xl'>
                {chartSeries.length > 0 ? (
                    <Chart options={chartOptions} series={chartSeries} type="line" height={350} />
                ) : (
                    <p className='text-center text-gray-400'>Loading chart...</p>
                )}
            </div>

            {/* Pagination Controls */}
            <div className="flex justify-center items-center mt-6 space-x-4">
                <button
                    onClick={handlePrevPage}
                    disabled={currentPage === 1}
                    className={`flex items-center px-4 py-2 bg-blue-600 text-white rounded-md 
                    ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700 transition'}
                    `}
                >
                    <ChevronLeft className="w-4 h-4 mr-2" />
                    Previous
                </button>
                <span className="text-white">
                    Page <span className="font-semibold">{currentPage}</span> of <span className="font-semibold">{totalPages}</span>
                </span>
                <button
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                    className={`flex items-center px-4 py-2 bg-blue-600 text-white rounded-md 
                    ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700 transition'}
                    `}
                >
                    Next
                    <ChevronRight className="w-4 h-4 ml-2" />
                </button>
            </div>

            {/* Data Table */}
            {/* <div className="mt-8 overflow-x-auto">
                <table className="min-w-full bg-gray-700 text-white rounded-lg overflow-hidden">
                    <thead>
                        <tr>
                            <th className="py-3 px-6 bg-gray-800">ID</th>
                            <th className="py-3 px-6 bg-gray-800">Timestamp</th>
                            <th className="py-3 px-6 bg-gray-800">OBC Uptime</th>
                            <th className="py-3 px-6 bg-gray-800">Reset Counter</th>
                            <th className="py-3 px-6 bg-gray-800">Battery Mode</th>
                            <th className="py-3 px-6 bg-gray-800">OBC Temp</th>
                            <th className="py-3 px-6 bg-gray-800">OBC DB Temp</th>
                            <th className="py-3 px-6 bg-gray-800">EPS Battery Temp</th>
                            <th className="py-3 px-6 bg-gray-800">EPS Boost1 Temp</th>
                            <th className="py-3 px-6 bg-gray-800">ANTS Temp</th>
                            <th className="py-3 px-6 bg-gray-800">TRXVU Temp</th>
                            <th className="py-3 px-6 bg-gray-800">ADCS Temp</th>
                            <th className="py-3 px-6 bg-gray-800">VTRXVU</th>
                            <th className="py-3 px-6 bg-gray-800">Vbatt</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentData.map((item) => (
                            <tr key={item.ID} className="border-b border-gray-600 hover:bg-gray-600 transition">
                                <td className="py-2 px-6">{item.ID}</td>
                                <td className="py-2 px-6">{item.Timestamp}</td>
                                <td className="py-2 px-6">{item.OBC_uptime}</td>
                                <td className="py-2 px-6">{item.OBC_reset_counter}</td>
                                <td className="py-2 px-6">{item.EPS_battery_mode}</td>
                                <td className="py-2 px-6">{item.OBC_temp}</td>
                                <td className="py-2 px-6">{item.OBC_DB_temp}</td>
                                <td className="py-2 px-6">{item.EPS_battery_temp}</td>
                                <td className="py-2 px-6">{item.EPS_boost1_temp}</td>
                                <td className="py-2 px-6">{item.ANTS_temp}</td>
                                <td className="py-2 px-6">{item.TRXVU_temp}</td>
                                <td className="py-2 px-6">{item.ADCS_temp}</td>
                                <td className="py-2 px-6">{item.VTRXVU}</td>
                                <td className="py-2 px-6">{item.Vbatt}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div> */}
        </div>
    );

};

export default LineChartNew;
