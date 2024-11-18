import React from 'react';
import Chart from 'react-apexcharts';

const WindSpeedChart = () => {
    const options = {
        chart: {
            type: 'area',
            stacked: false,
            height: 350,
            zoom: {
                type: 'x',
                enabled: true,
                autoScaleYaxis: true
            },
            toolbar: {
                autoSelected: 'zoom'
            }
        },
        dataLabels: {
            enabled: false
        },
        markers: {
            size: 4,
            colors: ['#FFD700', '#FF6347'],
            strokeColors: '#fff',
            strokeWidth: 2,
        },
        fill: {
            type: 'gradient',
            gradient: {
                shadeIntensity: 1,
                inverseColors: false,
                opacityFrom: 0.5,
                opacityTo: 0.0,
                stops: [0, 90, 100]
            }
        },
        yaxis: {
            labels: {
                formatter: function (val: any) {
                    return val.toFixed(0);
                }
            },
            title: {
                text: 'Wind Speed (km/h)'
            },
        },
        xaxis: {
            type: 'datetime',
            labels: {
                format: 'dd MMM',
            },
            title: {
                text: 'Date'
            }
        },
        tooltip: {
            shared: true,
            y: {
                formatter: function (val: any) {
                    return `${val.toFixed(2)} km/h`;
                }
            }
        },
        theme: {
            mode: 'dark'
        },
        colors: ['#FFD700', '#FF6347'], // Gold and Tomato colors
        legend: {
            position: 'top',
            horizontalAlign: 'center'
        },
        grid: {
            borderColor: '#2c3e50',
            strokeDashArray: 4,
        }
    };

    const series = [
        {
            name: 'Mean Wind Speed',
            data: [
                { x: new Date('2023-03-22').getTime(), y: 10 },
                { x: new Date('2023-03-23').getTime(), y: 20 },
                { x: new Date('2023-03-24').getTime(), y: 15 },
                { x: new Date('2023-03-25').getTime(), y: 25 },
                { x: new Date('2023-03-26').getTime(), y: 18 },
                { x: new Date('2023-03-27').getTime(), y: 20 },
                { x: new Date('2023-03-28').getTime(), y: 17 },
                { x: new Date('2023-03-29').getTime(), y: 21 }
            ]
        },
        {
            name: 'Current Wind Speed',
            data: [
                { x: new Date('2023-03-22').getTime(), y: 15 },
                { x: new Date('2023-03-23').getTime(), y: 25 },
                { x: new Date('2023-03-24').getTime(), y: 18 },
                { x: new Date('2023-03-25').getTime(), y: 30 },
                { x: new Date('2023-03-26').getTime(), y: 22 },
                { x: new Date('2023-03-27').getTime(), y: 24 },
                { x: new Date('2023-03-28').getTime(), y: 19 },
                { x: new Date('2023-03-29').getTime(), y: 23 }
            ]
        }
    ];

    return (
        <>
            {
                // @ts-ignore
                <Chart options={options} series={series} type="area" height={350} />
            }
        </>
    );
};

export default WindSpeedChart;
