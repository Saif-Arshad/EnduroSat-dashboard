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
        <div className=' grid grid-cols-6 mb-12 gap-x-7'>

          <div className='flex items-center flex-col gap-3 bg-neutral-800 rounded-3xl row-span-2 col-span-2'>
            <div className='flex items-center  p-4 rounded-2xl'>
              <img
                src="/static\Images\sattelite_image.png"
                alt='ah'
              />
              <div className='flex flex-col ml-3 '>
                <h2 className='text-5xl font-bold capitalize'>
                  hct-sat1
                </h2>
                <h3 className='text-2xl font-semibold capitalize'>
                  Space Satellite
                </h3>
              </div>
            </div>
            <GaugeChart />
          </div>
          <div className='flex items-center flex-col bg-neutral-800 rounded-3xl row-span-4 col-span-4'>
            <LineChart />
            <GaugeChart2 />
          </div>
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
