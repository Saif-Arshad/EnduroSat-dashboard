"use client";

import React, { useState } from 'react';
import Plot from 'react-plotly.js';
import stats from "../../../../constants/MySat-1_Beacon_data_sample.json";

const BarChart = () => {
    const slicedData = stats.slice(0, 30);

    // Prepare data
    const x = ['VTRXVU', 'Vbatt']; // Categories
    const y = [slicedData[0]?.VTRXVU || 0, slicedData[0]?.Vbatt || 0]; // Values

    // Layout state for persistent zoom
    const [layout, setLayout] = useState({
        title: {
            text: 'Battery Metrics',
            font: { color: '#ffffff' },
        },
        xaxis: {
            title: 'Metrics',
        },
        yaxis: {
            title: 'Values',
        },
        paper_bgcolor: '#1f1f1f', // Dark mode background
        plot_bgcolor: '#1f1f1f', // Dark mode plot area
        font: { color: '#ffffff' },
        barmode: 'group', // Grouped bars
    });

    return (
        <div>
            <Plot
                data={[
                    {
                        x: x,
                        y: y,
                        type: 'bar',
                        marker: {
                            color: ['#636efa', '#ef553b'], // Custom bar colors
                        },
                    },
                ]}
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

export default BarChart;
