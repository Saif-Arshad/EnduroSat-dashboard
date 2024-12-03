"use client"
import React, { useEffect, useState, memo } from 'react';
import dynamic from 'next/dynamic';
import PageContainer from '@/components/layout/page-container';
import Card from './cards';
import PieChart from './newChart2.jsx'
import BarChart from './newChart3'
import InteractiveChart from '../../../../components/layout/InteractiveChart'
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
  const [currentData, setCurrentData] = useState<any>(null)
  console.log("🚀 ~ OverViewPage ~ currentData:", currentData)
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

  const getSatelliteData = async (accessToken: any) => {
    console.log("🚀 ~ getSatelliteData ~ accessToken:", accessToken)
    try {
      const response = await fetch(
        "https://api.ground-station.endurosat.com/satellite-passes/06677517-e677-4f7a-9149-4ba645453acb",
        {
          headers: {
            Authorization:
              `Bearer ${accessToken}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log(data);
      setCurrentData(data)
      return data;
    } catch (error) {
      console.error("Error fetching satellite data:", error);
    }
  };
  useEffect(() => {
    const payload: any = {
      username: "hctsat-datauser@hct.ac.ae",
      password: "HCTdatauser@123",
      client_id: "7qgiaitv90g4vmq8e9rpnlgtim",
      refresh_token: "",
      grant_type: "password"
    };

    const getToken = async () => {
      try {
        const formData = new URLSearchParams();
        Object.keys(payload).forEach(key => {
          formData.append(key, payload[key]);
        });

        const response = await fetch("https://api.ground-station.endurosat.com/oauth2/token", {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          body: formData.toString()
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Access Token Response:", data);
        console.log("Access Token Response:", data.access_token);
        return data.access_token
      } catch (error) {
        console.error("Error fetching the token:", error);
      }
    };
    const getAccess = async () => {


      const accessToken = await getToken()
      getSatelliteData(accessToken)
    }
    getAccess()
  }, [])
  return (
    <PageContainer scrollable>
      <div className="py-5 ">
        <div className="grid grid-cols-1 lg:grid-cols-6 xl:grid-cols-10 mb-12 gap-x-7">
          <div className="flex items-center flex-col gap-3 bg-neutral-800 rounded-3xl lg:row-span-2 lg:col-span-2 xl:col-span-3">
            <div className="flex items-center p-4 ">
              {/* <img
                src="/static/Images/sattelite_image.png"
                alt="ah"
                className="h-24 w-24"
              /> */}
              <div className="flex flex-col ml-3">
                <h2 className="text-3xl font-bold capitalize">HCT CubeSat-1</h2>
                <h3 className="text-lg font-semibold capitalize">Satellite</h3>
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
                    Lat/Long: <span className="text-gray-300">42.6603029 N,  23.284007 E</span>
                  </p>
                  <p className="text-sm mt-3">
                    Last Seen: <span className="text-gray-300">30th May 2020</span>
                  </p>
                </div>
              </div>
              <div className="h-60 rounded-xl overflow-hidden">
                <iframe src="https://www.google.com/maps/embed?pb=!1m23!1m12!1m3!1d25678.628924030276!2d23.302563130098882!3d42.69970448884887!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m8!3e0!4m0!4m5!1s0x40aa8682cb317bf5%3A0x400a01269bf5e60!2sSofia%2C%20Bulgaria!3m2!1d42.6977082!2d23.3218675!5e0!3m2!1sen!2s!4v1733226455494!5m2!1sen!2s" width="600" height="450" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                {/* <iframe src="https://www.google.com/maps/embed?pb=!1m28!1m12!1m3!1d81828.0664209456!2d-119.48730146352074!3d36.77938654200673!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m13!3e0!4m5!1s0x808fb9fe5f285e3d%3A0x8b5109a227086f55!2sCalifornia%2C%20USA!3m2!1d36.778261!2d-119.4179324!4m5!1s0x808fb9fe5f285e3d%3A0x8b5109a227086f55!2sCalifornia!3m2!1d36.778261!2d-119.4179324!5e0!3m2!1sen!2s!4v1732383538207!5m2!1sen!2s" width="600" height="450" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe> */}
              </div>

            </div>
            <div className="bg-neutral-800 text-white rounded-2xl p-6 shadow-lg w-full max-w-md">
              <h3 className="text-lg font-semibold mb-4">
                Mission time or clock
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
                  <p className="text-lg font-bold text-yellow-400">{String(time.hours).padStart(2, "0")} KM</p>
                </div>
                <div className="text-center">
                  <h5 className="text-sm text-gray-400">Current Speed</h5>
                  <p className="text-lg font-bold text-yellow-400">{String(time.minutes).padStart(2, "0")}KM</p>
                </div>
                <div className="text-center">
                  <h5 className="text-sm text-gray-400">Sunset in</h5>
                  <p className="text-lg font-bold text-yellow-400"> {String(time.minutes).padStart(2, "0")} MIN</p>
                </div>
                <div className="text-center">
                  <h5 className="text-sm text-gray-400">Next Transmission in</h5>
                  <p className="text-lg font-bold text-yellow-400">{String(time.hours).padStart(2, "0")}  HOUR</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {
          currentData &&
          <div className='bg-neutral-800 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 p-8 rounded-2xl mb-20 gap-y-10'>

            <span className='flex items-center flex-col lg:col-span-2 lg:row-span-2'>
              <h3 className='mb-3 font-semibold capitalize'>
                Satellite
              </h3>
              <h2 className='text-2xl font-bold capitalize'>
                {currentData.satellite}
              </h2>
            </span>
            <span className='flex items-center flex-col lg:col-span-2 lg:row-span-2'>

              <h3 className='mb-3 font-semibold capitalize'>

                AOS
              </h3>
              <h2 className='text-2xl font-bold capitalize'>
                {currentData.aos}
              </h2>
            </span>
            <span className='flex items-center flex-col lg:col-span-2 lg:row-span-2'>

              <h3 className='mb-3 font-semibold capitalize'>

                Ground Station
              </h3>
              <h2 className='text-2xl font-bold capitalize'>
                {currentData.groundStation}
              </h2>
            </span>
            <span className='flex items-center flex-col lg:col-span-2 lg:row-span-2'>

              <h3 className='mb-3 font-semibold capitalize'>

                LOS
              </h3>
              <h2 className='text-2xl font-bold capitalize'>
                {currentData.los}
              </h2>
            </span>
            <span className='flex items-center flex-col lg:col-span-2 lg:row-span-2'>

              <h3 className='mb-3 font-semibold capitalize'>

                Status
              </h3>
              <h2 className='text-2xl font-bold capitalize'>
                {currentData.status}
              </h2>
            </span>
            <span className='flex items-center flex-col lg:col-span-2 lg:row-span-2'>

              <h3 className='mb-3 font-semibold capitalize'>

                Max Elevation
              </h3>
              <h2 className='text-2xl font-bold capitalize'>
                {currentData.maxElevation}
              </h2>
            </span>

          </div>
        }
        {/* <div className='bg-neutral-800 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 p-8 rounded-2xl mb-20 gap-y-10'>

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
        </div> */}


        <Card />

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-7 my-6">
          <div className="col-span-8">
            <MemoizedSatelliteLineChart />
          </div>
          <div className="col-span-8 2xl:col-span-4">

            <InteractiveChart />


          </div>
          <div className="col-span-8 2xl:col-span-4">
            <MemoizedMyBarChart />

          </div>
          <div className="col-span-8 ">

            <MemoizedOBCUptimeChart />


          </div>


          <div className="col-span-4 rounded-2xl overflow-hidden">
            {/* <MemoizedHistogramChart /> */}
            <PieChart />

          </div>
          <div className="col-span-4 rounded-2xl overflow-hidden">
            {/* <MemoizedApparentWindSpeedChart /> */}
            <BarChart />
          </div>

          <div className="col-span-4 rounded-2xl overflow-hidden">

            {/* <MemoizedMyInteractiveBarChart /> */}
          </div>
          <div className="col-span-4 rounded-2xl overflow-hidden">
            {/* <MemoizedWindSpeedChart /> */}
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
