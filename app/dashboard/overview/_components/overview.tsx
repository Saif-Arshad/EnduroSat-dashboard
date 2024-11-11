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
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateChange = (date: any) => {
    setSelectedDate(date);
    // onFilterChange(date);
  };

  return (
    <PageContainer scrollable>
      <div className="py-5 ">
        <div className="flex items-center justify-between space-y-2 mb-6">
          <h2 className="text-2xl font-bold tracking-tight">
            Hi, Welcome 👋
          </h2>
          <div className='flex items-center'>
            Filters
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">Select Date</label>
              <DatePicker
                selected={selectedDate}
                onChange={handleDateChange}
                dateFormat="dd/MM/yyyy"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                placeholderText="Select day, month, year"
              />
            </div>
          </div>
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
