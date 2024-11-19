"use client"
import React, { useEffect, useState, memo } from 'react';
import dynamic from 'next/dynamic';
import PageContainer from '@/components/layout/page-container';
import Card from './cards';
const SatelliteLineChart = dynamic(() => import('./bar-graph'), { ssr: false });
const MyInteractiveBarChart = dynamic(() => import('./Line-Graph'), { ssr: false });
const ApparentWindSpeedChart = dynamic(() => import('./chart1'), { ssr: false });
const WindSpeedChart = dynamic(() => import('./chart2'), { ssr: false });
const HistogramChart = dynamic(() => import('./chart3'), { ssr: false });
const GaugeChart2 = dynamic(() => import('./mainChart3'), { ssr: false });
const LineChart = dynamic(() => import('./mainChart'), { ssr: false });
const GaugeChart = dynamic(() => import('./doughuntChart'), { ssr: false });
const MyBarChart = dynamic(() => import('./_charts/paginatedChart'), { ssr: false });
// const MyNewLineChart = dynamic(() => import('./newPaginatedChart'), { ssr: false });
const OBCUptimeChart = dynamic(() => import('./newPaginatedChart'), { ssr: false });


const MemoizedSatelliteLineChart = memo(SatelliteLineChart);
const MemoizedMyBarChart = memo(MyBarChart);
const MemoizedOBCUptimeChart = memo(OBCUptimeChart);
const MemoizedHistogramChart = memo(HistogramChart);
const MemoizedApparentWindSpeedChart = memo(ApparentWindSpeedChart);
const MemoizedMyInteractiveBarChart = memo(MyInteractiveBarChart);
const MemoizedWindSpeedChart = memo(WindSpeedChart);
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
                  <h4 className="text-xl font-bold">EnduroSat</h4>
                  <p className="text-sm mt-3">
                    Lat/Long: <span className="text-gray-300">54.34076, -1.43523</span>
                  </p>
                  <p className="text-sm mt-3">
                    Last Seen: <span className="text-gray-300">30th May 2020</span>
                  </p>
                </div>
              </div>
              <div className="h-48 rounded-xl overflow-hidden">
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13084027.934413005!2d-129.93406215977416!3d36.81030569411795!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808fb9fe5f285e3d%3A0x8b5109a227086f55!2sCalifornia%2C%20USA!5e0!3m2!1sen!2s!4v1731991113552!5m2!1sen!2s" width="600" height="450" loading="lazy" ></iframe>
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
            <MemoizedSatelliteLineChart />
          </div>
          <div className="col-span-8 2xl:col-span-4">
            <MemoizedMyBarChart />

          </div>
          <div className="col-span-8 2xl:col-span-4">
            {/* <LineChartNew /> */}
            <MemoizedOBCUptimeChart />


          </div>

          <div className="col-span-4 rounded-2xl overflow-hidden">
            <MemoizedHistogramChart />

          </div>
          <div className="col-span-4 rounded-2xl overflow-hidden">
            <MemoizedApparentWindSpeedChart />

          </div>

          <div className="col-span-4 rounded-2xl overflow-hidden">

            <MemoizedMyInteractiveBarChart />
          </div>
          <div className="col-span-4 rounded-2xl overflow-hidden">

            <MemoizedWindSpeedChart />
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
