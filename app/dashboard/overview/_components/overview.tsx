"use client"
import React from 'react';
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


export default function OverViewPage() {




  return (
    <PageContainer scrollable>
      <div className="py-5 ">
        <div className=' grid grid-cols-1 lg:grid-cols-6 xl:grid-col-8 mb-12 gap-x-7'>

          <div className='flex items-center flex-col gap-3 bg-neutral-800 rounded-3xl lg:row-span-2 lg:col-span-2'>
            <div className='flex items-center  p-4 rounded-2xl'>
              <img
                src="/static\Images\sattelite_image.png"
                alt='ah'
                className='h-24 w-24'
              />
              <div className='flex flex-col ml-3 '>
                <h2 className='text-3xl font-bold capitalize'>
                  hct-sat1
                </h2>
                <h3 className='text-lg font-semibold capitalize'>
                  Space Satellite
                </h3>
              </div>
            </div>
            <GaugeChart />
          </div>
          <div className='flex items-center flex-col bg-neutral-800 rounded-3xl lg:row-span-4 lg:col-span-4'>
            <LineChart />
            <GaugeChart2 />
          </div>
        </div>
        <div className='bg-neutral-800 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 p-8 rounded-2xl mb-20 gap-y-10'>

          <span className='flex items-center flex-col'>
            <h3 className='mb-3 font-semibold capitalize'>
              Space Satellite
            </h3>
            <h2 className='text-2xl font-bold capitalize'>
              hct-sat1
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
          <div className="col-span-8 rounded-2xl overflow-hidden">
            <HistogramChart />

          </div>

          <div className="col-span-4 rounded-2xl overflow-hidden">

            <MyInteractiveBarChart />
          </div>
          <div className="col-span-4 rounded-2xl overflow-hidden">

            <WindSpeedChart />
          </div>
          <div className="col-span-8 rounded-2xl overflow-hidden">
            <ApparentWindSpeedChart />
          </div>
        </div>
      </div>
    </PageContainer >
  );
}
