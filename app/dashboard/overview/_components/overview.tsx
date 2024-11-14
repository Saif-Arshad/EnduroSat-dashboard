"use client"
import React from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { AreaGraph } from './area-graph';
import { SatelliteLineChart } from './bar-graph';
import MyInteractiveBarChart from './Line-Graph';
import { PieGraph } from './pie-graph';
import PageContainer from '@/components/layout/page-container';
import Card from './cards';
import ApparentWindSpeedChart from './chart1';


export default function OverViewPage() {
  const cardsData = [
    {
      title: "Wind Speed",
      value: "8 kn",
      chartData: [5, 8, 6, 10, 7, 9, 6, 8, 9, 7, 10, 11, 8, 9, 6, 10, 9, 8, 7, 10]
    },
    {
      title: "Wind Angle",
      value: "-2°",
      chartData: [1, -2, -1, 2, 34, 5, 6, 78, 9, 10, 10, -3, -2, 10, -1, -2, 8, 15, -1, 6]
    },
    {
      title: "Outside Temp",
      value: "52°F",
      chartData: [50, 52, 51, 53, 52, 52, 51, 50, 54, 52, 53, 51, 52, 50, 53, 52, 51, 50]
    },
    {
      title: "Dewpoint",
      value: "44°F",
      chartData: [43, 44, 43, 45, 44, 44, 43, 44, 46, 43, 45, 44, 43, 46, 44, 45, 43, 44]
    },
    {
      title: "Barometric Pressure",
      value: "29.95\"Hg",
      chartData: [29.9, 29.95, 29.94, 29.96, 29.95, 29.95, 29.94, 29.97, 29.93, 29.95, 29.96, 29.95, 29.94]
    },
    {
      title: "Inside Temp",
      value: "58°F",
      chartData: [57, 58, 58, 59, 58, 58, 57, 59, 57, 58, 59, 57, 58, 59, 58, 57]
    },
    {
      title: "Inside Humidity",
      value: "59%",
      chartData: [58, 59, 59, 60, 59, 59, 58, 60, 59, 58, 60, 59, 58, 59, 59, 60]
    },
    {
      title: "Engine Room",
      value: "51°F",
      chartData: [50, 51, 51, 52, 51, 51, 50, 52, 50, 51, 52, 50, 51, 51, 52]
    }
  ];



  return (
    <PageContainer scrollable>
      <div className="py-5 ">


        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-col-3 xl:grid-col-4 2xl:grid-col-5 gap-4">
          {cardsData.map((item, index) => (
            <Card key={index} title={item.title} value={item.value} chartData={item.chartData} />
          ))}
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-7 my-6">
          <div className="col-span-8">
            <SatelliteLineChart />
          </div>
          <div className="col-span-8 md:col-span-4">
            <AreaGraph />
          </div>
          <div className="col-span-8 md:col-span-4">
            <PieGraph />
          </div>

          <div className="col-span-4">

            <MyInteractiveBarChart />
          </div>
          <div className="col-span-8 md:col-span-4">
            <ApparentWindSpeedChart />
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
