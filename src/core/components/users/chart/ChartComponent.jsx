import React, { useState, useEffect } from "react";
import { Chart } from "primereact/chart";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartLine } from "@fortawesome/free-solid-svg-icons";
import "./chartComponent.scss";

const ChartComponent = ({ title, height }) => {
    const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState({});

    useEffect(() => {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue("--text-color") || "#333";
        const textColorSecondary = documentStyle.getPropertyValue("--text-color-secondary") || "#888";
        const surfaceBorder = documentStyle.getPropertyValue("--surface-border") || "#ddd";

        // Dummy data for 6 months
        const data = {
            labels: ["May", "Jun", "Jul", "Aug", "Sep", "Oct"],
            datasets: [
                {
                    label: "Logins",
                    data: [7, 8, 6, 5, 9, 10],
                    fill: true,
                    borderColor: "rgba(33,150,243,1)",
                    backgroundColor: "rgba(33,150,243,0.2)",
                    tension: 0.4,
                },
                {
                    label: "Activity Time (hrs)",
                    data: [15, 18, 12, 14, 20, 17],
                    fill: true,
                    borderColor: "rgba(34,197,94,1)",
                    backgroundColor: "rgba(34,197,94,0.2)",
                    tension: 0.4,
                },
                {
                    label: "Used Hours",
                    data: [12, 14, 10, 13, 15, 12],
                    fill: true,
                    borderColor: "rgba(251,191,36,1)",
                    backgroundColor: "rgba(251,191,36,0.2)",
                    tension: 0.4,
                },
                {
                    label: "Updates",
                    data: [2, 3, 1, 2, 4, 3],
                    fill: true,
                    borderColor: "rgba(239,68,68,1)",
                    backgroundColor: "rgba(239,68,68,0.2)",
                    tension: 0.4,
                },
            ],
        };

        const options = {
            maintainAspectRatio: false,
            plugins: {
                legend: { labels: { color: textColor } },
            },
            scales: {
                x: {
                    ticks: { color: textColorSecondary },
                    grid: { color: surfaceBorder },
                    title: { display: true, text: "Month", color: textColor, font: { weight: "600" } },
                },
                y: {
                    ticks: { color: textColorSecondary, stepSize: 2 },
                    grid: { color: surfaceBorder },
                    title: { display: true, text: "Activity Count / Hours", color: textColor, font: { weight: "600" } },
                    beginAtZero: true,
                },
            },
        };

        setChartData(data);
        setChartOptions(options);
    }, []);

    return (
        <div className="chart card">
            <div className="title">
                <FontAwesomeIcon icon={faChartLine} /> {title || "User Activity (Last 6 Months)"}
            </div>
            <Chart
                type="line"
                data={chartData}
                options={chartOptions}
                style={{ width: "100%", height: height || "350px" }}
            />
        </div>
    );
};

export default ChartComponent;
