"use client";

import React, { useState } from 'react';
import Plot from 'react-plotly.js';
import stats from "../../../../constants/MySat-1_Beacon_data_sample.json";

const ScatterChart = () => {
    const slicedData = stats.slice(0, 30);

    // Prepare data
    const x = slicedData.map((d, i) => `Data ${i + 1}`); // X-axis labels
    const y = slicedData.map((d) => d.ADCS_temp || 0); // Y-axis values

    // Layout state for persistent zoom
    const [layout, setLayout] = useState({
        title: {
            text: 'ADCS Over Time',
            font: { color: '#ffffff' },
        },
        xaxis: { title: 'Data Points' },
        yaxis: { title: 'ADCS Temp' },
        paper_bgcolor: '#1f1f1f', // Dark mode background
        plot_bgcolor: '#1f1f1f', // Dark mode plot area
        font: { color: '#ffffff' },
    });

    return (
        <div>
            <Plot
                data={[
                    {
                        x: x,
                        y: y,
                        type: 'scatter',
                        mode: 'lines+markers',
                        marker: { color: '#00cc96' },
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

export default ScatterChart;
