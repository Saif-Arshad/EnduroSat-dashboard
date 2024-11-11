"use client"
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { AreaGraph } from './area-graph';
import { SatelliteLineChart } from './bar-graph';
import MyInteractiveBarChart from './Line-Graph';
import { PieGraph } from './pie-graph';
import PageContainer from '@/components/layout/page-container';


export default function OverViewPage() {


  return (
    <PageContainer scrollable>
      <div className="py-5 ">
        <div className="flex items-center justify-between space-y-2 mb-6">
          <h2 className="text-2xl font-bold tracking-tight">
            Hi, Welcome 👋
          </h2>

        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-7">
          <div className="col-span-8">
            <SatelliteLineChart />
          </div>

          <div className="col-span-8 md:col-span-4">
            <AreaGraph />
          </div>
          <div className="col-span-8 md:col-span-4">
            <PieGraph />
          </div>
          <div className="col-span-8">

            <MyInteractiveBarChart />
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
