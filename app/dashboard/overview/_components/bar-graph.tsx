"use client";

import React, { useState, useMemo } from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { saveAs } from "file-saver";
import { parse } from "date-fns";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  ChartConfig,
} from "@/components/ui/chart";

import data from "../../../../constants/MySat-1_Beacon_data_sample.json";

// Choose which date field to parse: 'Timestamp' or 'OBC_time'
const DATE_FIELD = "Timestamp"; // Change to "OBC_time" if needed

// Preprocess the data to include the chosen date field as milliseconds since epoch
const processedData = data
  .map((item, index) => {
    const dateString = item[DATE_FIELD];
    const parsedDate = parse(dateString, "M/d/yyyy H:mm:ss", new Date());

    // Validate date parsing
    if (isNaN(parsedDate.getTime())) {
      console.error(`Invalid date at index ${index}: ${dateString}`);
      return null; // Exclude this item from processedData
    }

    // Parse temperature fields and ensure they are numbers
    // @ts-ignore
    const OBC_temp = parseFloat(item.OBC_temp);
    // @ts-ignore
    const EPS_battery_temp = parseFloat(item.EPS_battery_temp);

    if (isNaN(OBC_temp) || isNaN(EPS_battery_temp)) {

      return null; // Exclude this item from processedData
    }

    return {
      ...item,
      date: parsedDate.getTime(), // Convert Date to timestamp
      OBC_temp,
      EPS_battery_temp,
    };
  })
  .filter((item) => item !== null); // Remove invalid items


const chartConfig = {
  views: {
    label: "Satellite Data",
  },
  OBC_temp: {
    label: "OBC Temperature",
    color: "#ff7300",
  },
  EPS_battery_temp: {
    label: "Battery Temperature",
    color: "#ff7300",
  },
} satisfies ChartConfig;

export function SatelliteLineChart() {
  const [activeChart, setActiveChart] = useState<keyof typeof chartConfig>(
    "OBC_temp"
  );
  const [selectedMonth, setSelectedMonth] = useState<string>(() => {
    // @ts-ignore
    if (processedData.length > 0) {
      // @ts-ignore
      const date = new Date(processedData[0].date);
      // @ts-ignore
      const year = date.getFullYear();
      // @ts-ignore
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      // @ts-ignore
      return `${year}-${month}`;
    }
    return "";
  });

  // Memoize the filtered data for performance
  const filteredData = useMemo(() => {
    if (!selectedMonth) return [];

    const [year, month] = selectedMonth.split("-").map(Number);

    // @ts-ignore
    const result = processedData
      // @ts-ignore
      .filter((item) => {
        // @ts-ignore
        const date = new Date(item.date); // Convert timestamp back to Date for comparison
        // @ts-ignore
        const yearMatch = date.getFullYear() === year;
        // @ts-ignore
        const monthMatch = date.getMonth() + 1 === month;
        // @ts-ignore
        return yearMatch && monthMatch;
        // @ts-ignore
      })
      // @ts-ignore
      .sort((a, b) => a.date - b.date); // Sort by date ascending


    // Log first 5 entries
    return result;
  }, [selectedMonth]);

  const handleMonthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedMonth(e.target.value);
  };

  const exportToCSV = () => {
    if (filteredData.length === 0) {
      alert("No data to export for the selected month.");
      return;
    }

    const csvContent = [
      ["Date", "OBC Temperature", "Battery Temperature"],
      ...filteredData.map((row: any) => [
        new Date(row.date).toISOString().split("T")[0],
        row.OBC_temp,
        row.EPS_battery_temp,
      ]),
    ]
      .map((e) => e.join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, `satellite_data_${selectedMonth}.csv`);
  };

  return (
    <Card>
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle>Satellite Data Chart</CardTitle>
          <CardDescription>
            Temperature data with customizable date filters.
          </CardDescription>
        </div>
        <div className="flex space-x-2 px-6 py-4">
          {Object.keys(chartConfig)
            .filter((key) => key !== "views")
            .map((key) => {
              const chart = key as keyof typeof chartConfig;
              return (
                <button
                  key={chart}
                  data-active={activeChart === chart}
                  className={`px-4 py-2 rounded-lg ${activeChart === chart
                    ? "bg-blue-500 text-white dark:bg-blue-800"
                    : "bg-gray-200 text-gray-700 dark:bg-gray-600 dark:text-white"
                    }`}
                  onClick={() => setActiveChart(chart)}
                >
                  {chartConfig[chart].label}
                </button>
              );
            })}
        </div>
      </CardHeader>
      <CardContent className="px-4 sm:p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 space-y-2 sm:space-y-0">
          <div className="flex items-center space-x-4">
            <label className="flex items-center">
              Select Month:
              <input
                type="month"
                value={selectedMonth}
                onChange={handleMonthChange}
                className="ml-2 p-1 border rounded"
              />
            </label>
          </div>
          <button
            onClick={exportToCSV}
            className="px-4 py-2 bg-green-500 rounded-lg text-white text-sm hover:bg-green-600"
          >
            Export to CSV
          </button>
        </div>
        {filteredData.length === 0 ? (
          <p>No data available for the selected month.</p>
        ) : (
          <div className="dark:text-black">
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={filteredData}>
                <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                <XAxis
                  dataKey="date"
                  tickFormatter={(timestamp) =>
                    new Date(timestamp).toLocaleDateString()
                  }
                  type="number"
                  domain={["dataMin", "dataMax"]}
                  scale="time"
                />
                <YAxis
                  label={{
                    value: "Temperature (°C)",
                    angle: -90,
                    position: "insideLeft",
                  }}
                />
                <Tooltip
                  labelFormatter={(value) =>
                    new Date(value).toLocaleDateString()
                  }
                />
                <Line
                  type="monotone"
                  dataKey={activeChart}
                  // @ts-ignore
                  stroke={chartConfig[activeChart].color}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
