import { getFirst400 } from '@/lib/getFirstData'; // Ensure this fetches your data correctly
import React, { useState, useEffect } from 'react';
import Chart from 'react-apexcharts';
import data from '../../../../constants/MySat-1_Beacon_data_sample.json';

const LineChartNew = () => {
    const [chartOptions, setChartOptions] = useState({});
    const [chartSeries, setChartSeries] = useState([]);

    // Process the data to extract temperature values for each type
    const processData = (data) => {
        const categories = data.map((item) => item.Timestamp); // Use Timestamp as x-axis categories

        const series = [
            {
                name: 'OBC_temp',
                data: data.map((item) => item.OBC_temp || 0), // Fallback to 0 if undefined
            },
            {
                name: 'OBC_DB_temp',
                data: data.map((item) => item.OBC_DB_temp || 0),
            },
            {
                name: 'EPS_battery_temp',
                data: data.map((item) => item.EPS_battery_temp || 0),
            },
            {
                name: 'EPS_boost1_temp',
                data: data.map((item) => item.EPS_boost1_temp || 0),
            },
            {
                name: 'ANTS_temp',
                data: data.map((item) => item.ANTS_temp || 0),
            },
            {
                name: 'TRXVU_temp',
                data: data.map((item) => item.TRXVU_temp || 0),
            },
            {
                name: 'ADCS_temp',
                data: data.map((item) => item.ADCS_temp || 0),
            },
        ];

        return { categories, series };
    };

    useEffect(() => {
        // Fetch data and process it
        const fetchData = async () => {
            const data = await getFirst400(); // Ensure this returns the correct data
            const { categories, series } = processData(data);

            // Set chart options and series
            setChartOptions({
                chart: {
                    id: 'line-chart',
                    zoom: { enabled: false }, // Disable zoom
                },
                xaxis: { categories }, // Dynamically set categories from the data
                stroke: { curve: 'smooth' },
                colors: ['#4C8CFF', '#5ADB77', '#FFC74C', '#F77777', '#B37DFF', '#00D1E0', '#FF77C7'],
                legend: { position: 'top' },
            });
            setChartSeries(series);
        };

        fetchData();
    }, []);

    return (
        <div className='bg-neutral-800  p-5 rounded-2xl dark:text-black'>
            {chartSeries.length > 0 && (
                <Chart options={chartOptions} series={chartSeries} type="line" height={350} />
            )}
        </div>
    );
};

export default LineChartNew;
