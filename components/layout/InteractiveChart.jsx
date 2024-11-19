"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import stats from "../../constants/MySat-1_Beacon_data_sample.json";

// Dynamically import Plotly to prevent SSR issues
const Plot = dynamic(() => import("react-plotly.js"), { ssr: false });

const InteractiveChart = () => {
    const [chartType, setChartType] = useState("bar"); // Default to line chart (scatter mode)
    const data = stats.slice(0, 250); // Limiting data for demo purposes
    const [zoomedData, setZoomedData] = useState(null); // Store zoomed data

    // Extract temperature fields for plotting
    const tempFields = [
        { key: "OBC_temp", name: "OBC Temperature", color: "#1f77b4" }, // Fixed color
        { key: "OBC_DB_temp", name: "OBC DB Temperature", color: "#ff7f0e" }, // Fixed color
        { key: "EPS_battery_temp", name: "EPS Battery Temperature", color: "#2ca02c" }, // Fixed color
        { key: "EPS_boost1_temp", name: "EPS Boost1 Temperature", color: "#d62728" }, // Fixed color
        { key: "ANTS_temp", name: "ANTS Temperature", color: "#9467bd" }, // Fixed color
        { key: "TRXVU_temp", name: "TRXVU Temperature", color: "#8c564b" }, // Fixed color
        { key: "ADCS_temp", name: "ADCS Temperature", color: "#e377c2" }, // Fixed color
    ];

    // Prepare data for chart
    const timestamps = data.map((item) => new Date(item.Timestamp));
    const chartData = (zoomedData || data).map((item) => ({
        ...item,
        Timestamp: new Date(item.Timestamp),
    }));

    const plotData = tempFields.map((field) => ({
        x: chartData.map((item) => item.Timestamp),
        y: chartData.map((item) => item[field.key]),
        type: chartType,
        mode: chartType === "scatter" ? "lines+markers" : undefined,
        name: field.name,
        marker: {
            color: field.color, // Use fixed color
        },
        line: {
            color: field.color, // Use fixed color for lines
        },
    }));

    // Handle chart type change
    const handleChartTypeChange = (e) => {
        setChartType(e.target.value);
    };

    // Handle zoom relayout event
    const handleRelayout = (event) => {
        if (event["xaxis.range[0]"] && event["xaxis.range[1]"]) {
            const start = new Date(event["xaxis.range[0]"]);
            const end = new Date(event["xaxis.range[1]"]);

            // Filter data within zoomed range
            const zoomed = data.filter((item) => {
                const timestamp = new Date(item.Timestamp);
                return timestamp >= start && timestamp <= end;
            });

            setZoomedData(zoomed);
        } else {
            setZoomedData(null); // Reset zoom
        }
    };

    return (
        <div className="bg-[#656262] p-4 rounded-2xl">
            <h2 style={{ color: "#ffffff", textAlign: "center" }}>Temperature Chart</h2>
            <div style={{ marginBottom: "10px", textAlign: "center" }}>
                <label htmlFor="chartType" style={{ color: "#ffffff", marginRight: "10px" }}>
                    Select Chart Type:
                </label>
                <select id="chartType" value={chartType} onChange={handleChartTypeChange}>
                    <option value="scatter">Line Chart</option>
                    <option value="bar">Bar Chart</option>
                </select>
            </div>
            <Plot
                data={plotData}
                layout={{
                    title: {
                        text: `Temperature Comparison Over Time`,
                        font: { color: "#ffffff" },
                    },
                    plot_bgcolor: "#1a1a1a",
                    paper_bgcolor: "#1a1a1a",
                    xaxis: {
                        title: {
                            text: "Timestamp",
                            font: { color: "#ffffff" },
                        },
                        showgrid: true,
                        gridcolor: "#444",
                        color: "#ffffff",
                    },
                    yaxis: {
                        title: {
                            text: "Temperature (°C)",
                            font: { color: "#ffffff" },
                        },
                        showgrid: true,
                        gridcolor: "#444",
                        color: "#ffffff",
                    },
                    dragmode: "zoom", // Enable zoom functionality
                    legend: {
                        font: { color: "#ffffff" },
                        bgcolor: "#1a1a1a",
                    },
                }}
                config={{ responsive: true }}
                style={{ width: "100%", height: "600px" }}
                onRelayout={handleRelayout} // Handle zoom events
            />
        </div>
    );
};

export default InteractiveChart;
