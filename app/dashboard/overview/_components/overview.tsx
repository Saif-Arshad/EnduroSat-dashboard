"use client"
import React, { useEffect, useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { SatelliteLineChart } from './bar-graph';
import MyInteractiveBarChart from './Line-Graph';
import PageContainer from '@/components/layout/page-container';
import Card from './cards';
import ApparentWindSpeedChart from './chart1';
import WindSpeedChart from './chart2';
import HistogramChart from './chart3';
import GaugeChart2 from './mainChart3';
import LineChart from './mainChart';
import GaugeChart from './doughuntChart';
import { getFirst400 } from '@/lib/getFirstData';
import ChartTemplate from './_charts/chartTemplate';
import LineChartComponent from './newChart';
import LineChartNew from './newChart';


export default function OverViewPage() {
  const [time, setTime] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setTime({
        hours: now.getHours(),
        minutes: now.getMinutes(),
        seconds: now.getSeconds(),
      });
    }, 1000);

    return () => clearInterval(interval); // Clean up on component unmount
  }, []);
  const data = getFirst400();
  const charts = [
    {
      seriesData: data.map(item => item.OBC_reset_counter),
      fieldName: "OBC_reset_counter",
      title: "OBC Reset Counter"
    },
    {
      seriesData: data.map(item => item.OBC_uptime),
      fieldName: "OBC_uptime",
      title: "OBC Uptime"
    },
    {
      seriesData: data.map(item => item.EPS_battery_mode),
      fieldName: "EPS_battery_mode",
      title: "EPS Battery Mode"
    },
    {
      seriesData: data.map(item => item.Vbatt),
      fieldName: "Vbatt",
      title: "Battery Voltage (Vbatt)"
    },
    {
      seriesData: data.map(item => item.VTRXVU),
      fieldName: "VTRXVU",
      title: "VTRXVU Voltage"
    },
    {
      seriesData: data.map(item => item.ADCS_temp),
      fieldName: "ADCS_temp",
      title: "ADCS Temperature"
    },
    {
      seriesData: data.map(item => item.TRXVU_temp),
      fieldName: "TRXVU_temp",
      title: "TRXVU Temperature"
    },
    {
      seriesData: data.map(item => item.ANTS_temp),
      fieldName: "ANTS_temp",
      title: "ANTS Temperature"
    },
    {
      seriesData: data.map(item => item.EPS_boost1_temp),
      fieldName: "EPS_boost1_temp",
      title: "EPS Boost1 Temperature"
    },
    {
      seriesData: data.map(item => item.EPS_battery_temp),
      fieldName: "EPS_battery_temp",
      title: "EPS Battery Temperature"
    },
    {
      seriesData: data.map(item => item.OBC_temp),
      fieldName: "OBC_DB_temp",
      title: "OBC DB Temperature"
    },
  ];
  return (
    <PageContainer scrollable>
      <div className="py-5 ">
        <div className="grid grid-cols-1 lg:grid-cols-6 xl:grid-cols-10 mb-12 gap-x-7">
          <div className="flex items-center flex-col gap-3 bg-neutral-800 rounded-3xl lg:row-span-2 lg:col-span-2 xl:col-span-3">
            <div className="flex items-center p-4 rounded-2xl">
              <img
                src="/static/Images/sattelite_image.png"
                alt="ah"
                className="h-24 w-24"
              />
              <div className="flex flex-col ml-3">
                <h2 className="text-3xl font-bold capitalize">HCT CubeSat-1</h2>
                <h3 className="text-lg font-semibold capitalize">Space Satellite</h3>
              </div>
            </div>
            <GaugeChart />
          </div>
          <div className="flex items-center flex-col bg-neutral-800 rounded-3xl overflow-hidden lg:row-span-4 lg:col-span-4 xl:col-span-4">
            <LineChart />
            <GaugeChart2 />
          </div>
          <div className="flex items-center flex-col gap-3 bg-neutral-800 rounded-3xl lg:row-span-2 lg:col-span-2 xl:col-span-3">
            <div className="bg-neutral-800 text-white rounded-2xl p-6 shadow-lg w-full max-w-md">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Ground Station</h3>
              </div>
              <div className="flex items-center mb-4">
                <img
                  src="/static/Images/sattelite.png"
                  alt="Satellite"
                  className="h-16 w-16 mr-4"
                />
                <div>
                  <h4 className="text-xl font-bold">ambasense01</h4>
                  <p className="text-sm mt-3">
                    Lat/Long: <span className="text-gray-300">54.34076, -1.43523</span>
                  </p>
                  <p className="text-sm mt-3">
                    Last Seen: <span className="text-gray-300">30th May 2020</span>
                  </p>
                </div>
              </div>
              <div className="h-48 rounded-xl overflow-hidden">
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d72539.24429526621!2d-3.5470563886641595!3d55.37804981298806!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x25a3b1142c791a9%3A0xc4f8a0433288257a!2sUnited%20Kingdom!5e0!3m2!1sen!2s!4v1731958960658!5m2!1sen!2s" width="600" height="450" loading="lazy" ></iframe>
              </div>

            </div>
            <div className="bg-neutral-800 text-white rounded-2xl p-6 shadow-lg w-full max-w-md">
              <h3 className="text-lg font-semibold mb-4">
                Mission Clock/Countdown Clock
              </h3>
              <div className="text-center mb-6">
                <h4 className="text-sm text-gray-400 mb-2">Countdown</h4>
                <div className="text-4xl font-mono font-bold">
                  {String(time.hours).padStart(2, "0")} :{" "}
                  {String(time.minutes).padStart(2, "0")} :{" "}
                  {String(time.seconds).padStart(2, "0")}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <h5 className="text-sm text-gray-400">Distance</h5>
                  <p className="text-lg font-bold text-yellow-400">0KM</p>
                </div>
                <div className="text-center">
                  <h5 className="text-sm text-gray-400">Current Speed</h5>
                  <p className="text-lg font-bold text-yellow-400">0KM</p>
                </div>
                <div className="text-center">
                  <h5 className="text-sm text-gray-400">Sunset in</h5>
                  <p className="text-lg font-bold text-yellow-400">MIN5</p>
                </div>
                <div className="text-center">
                  <h5 className="text-sm text-gray-400">Next Transmission in</h5>
                  <p className="text-lg font-bold text-yellow-400">0 HOUR</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='bg-neutral-800 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 p-8 rounded-2xl mb-20 gap-y-10'>

          <span className='flex items-center flex-col'>
            <h3 className='mb-3 font-semibold capitalize'>
              Space Satellite
            </h3>
            <h2 className='text-2xl font-bold capitalize'>
              HCT CubeSat-1
            </h2>
          </span>
          <span className='flex items-center flex-col'>
            <h3 className='mb-3 font-semibold capitalize'>

              Frame Count
            </h3>
            <h2 className='text-2xl font-bold capitalize'>
              1322 Frames
            </h2>
          </span>
          <span className='flex items-center flex-col'>
            <h3 className='mb-3 font-semibold capitalize'>

              Last Frame RCVD at
            </h3>
            <h2 className='text-2xl font-bold capitalize'>
              22-11-02 14:52:28
            </h2>
          </span>
          <span className='flex items-center flex-col'>
            <h3 className='mb-3 font-semibold capitalize'>

              Last Frame RCVD by
            </h3>
            <h2 className='text-2xl font-bold capitalize'>
              MAUSYAGI-FN32IG
            </h2>
          </span>
          <span className='flex items-center flex-col'>
            <h3 className='mb-3 font-semibold capitalize'>

              UpTime
            </h3>
            <h2 className='text-2xl font-bold capitalize'>
              1 Week, 1 Day, 11 Hours
            </h2>
          </span>
          <span className='flex items-center flex-col'>
            <h3 className='mb-3 font-semibold capitalize'>

              OBC Clock
            </h3>
            <h2 className='text-2xl font-bold capitalize'>
              2019-07-26 01:17:33
            </h2>
          </span>
        </div>


        <Card />

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-7 my-6">
          <div className="col-span-8">
            <SatelliteLineChart />
          </div>
          <div className="col-span-8">
            <LineChartNew />

          </div>
          <div className="col-span-4 rounded-2xl overflow-hidden">
            <HistogramChart />

          </div>
          <div className="col-span-4 rounded-2xl overflow-hidden">
            <ApparentWindSpeedChart />

          </div>

          <div className="col-span-4 rounded-2xl overflow-hidden">

            <MyInteractiveBarChart />
          </div>
          <div className="col-span-4 rounded-2xl overflow-hidden">

            <WindSpeedChart />
          </div>


        </div>
        <div className="gap-y-10  w-full grid grid-cols-1 xl:grid-cols-2 gap-10">
          {/* {charts.map((chart) => (
            <ChartTemplate
              key={chart.fieldName}
              seriesData={chart.seriesData}
              fieldName={chart.fieldName}
              title={chart.title}
            />
          ))} */}
        </div>
      </div>
    </PageContainer >
  );
}
