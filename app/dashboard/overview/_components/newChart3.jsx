"use client";

import React, { useState } from 'react';
import Plot from 'react-plotly.js';
import stats from "../../../../constants/MySat-1_Beacon_data_sample.json";

const LineChart = () => {
    const slicedData = stats.slice(0, 50);

    // Prepare data for multiple lines
    const data = [
        {
            x: Array.from({ length: slicedData.length }, (_, i) => `Data ${i + 1}`), // Dynamic x-axis labels
            y: slicedData.map((item) => item.VTRXVU || 0), // First metric
            type: 'scatter',
            mode: 'lines+markers',
            name: 'VTRXVU', // Legend label
            line: {
                color: '#636efa', // Line color
            },
        },
        {
            x: Array.from({ length: slicedData.length }, (_, i) => `Data ${i + 1}`), // Dynamic x-axis labels
            y: slicedData.map((item) => item.TRXVU_temp || 0), // Second metric
            type: 'scatter',
            mode: 'lines+markers',
            name: 'TRXVU', // Legend label
            line: {
                color: '#ef553b', // Line color
            },
        },
    ];

    // Layout state for persistent zoom
    const [layout, setLayout] = useState({
        title: {
            text: 'Battery Metrics',
            font: { color: '#ffffff' },
        },
        xaxis: {
            title: 'Data Points',
        },
        yaxis: {
            title: 'Values',
        },
        paper_bgcolor: '#1f1f1f', // Dark mode background
        plot_bgcolor: '#1f1f1f', // Dark mode plot area
        font: { color: '#ffffff' },
    });

    return (
        <div>
            <Plot
                data={data} // Pass multiple datasets
                layout={layout}
                config={{
                    responsive: true,
                    scrollZoom: true, // Enable zooming
                }}
                onRelayout={(newLayout) => {
                    // Persist layout changes (e.g., zoom)
                    setLayout((prevLayout) => ({
                        ...prevLayout,
                        ...newLayout,
                    }));
                }}
                style={{ width: '100%', height: '400px' }}
            />
        </div>
    );
};

export default LineChart;
