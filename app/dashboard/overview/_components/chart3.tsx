"use client"

import React from 'react';
import Chart from 'react-apexcharts';

const HistogramChart = () => {
    const options = {
        chart: {
            type: 'bar',
            height: 350,
            toolbar: {
                show: false
            }
        },
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: '80%',
                endingShape: 'flat'
            }
        },
        dataLabels: {
            enabled: false
        },
        xaxis: {
            type: 'datetime',
            categories: [
                '2023-03-22T00:00:00', '2023-03-23T00:00:00', '2023-03-24T00:00:00',
                '2023-03-25T00:00:00', '2023-03-26T00:00:00', '2023-03-27T00:00:00',
                '2023-03-28T00:00:00'
            ],
            labels: {
                rotate: -45,
                rotateAlways: true
            }
        },
        yaxis: {
            title: {
                text: 'Values'
            }
        },
        fill: {
            colors: ['#1E90FF'], // Dark blue color
            opacity: 1
        },
        grid: {
            borderColor: '#f1f1f1'
        }
    };

    const series = [{
        name: 'Series 1',
        data: [10, 20, 30, 40, 10, 50, 25]
    }];

    return (
        // @ts-ignore
        <Chart options={options} series={series} type="bar" height={350} />
    );
};

export default HistogramChart;
