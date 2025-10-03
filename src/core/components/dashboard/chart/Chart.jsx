import React, { useState, useEffect } from "react";
import { Chart } from "primereact/chart";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartLine } from "@fortawesome/free-solid-svg-icons";
import "./chart.scss";

const ChartComponent = ({ title, height }) => {
    const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState({});

    useEffect(() => {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue("--text-color");
        const textColorSecondary =
            documentStyle.getPropertyValue("--text-color-secondary");
        const surfaceBorder = documentStyle.getPropertyValue("--surface-border");

        const data = {
            labels: ["January", "February", "March", "April", "May", "June"],
            datasets: [
                {
                    label: "Sales",
                    data: [4000, 3000, 2000, 2780, 1890, 2390],
                    fill: true,
                    borderColor: documentStyle.getPropertyValue("--blue-500"),
                    tension: 0.4,
                    backgroundColor: "rgba(33, 150, 243, 0.2)",
                },
                {
                    label: "Orders",
                    data: [2400, 1398, 9800, 3908, 4800, 3800],
                    fill: false,
                    borderDash: [5, 5],
                    borderColor: documentStyle.getPropertyValue("--green-500"),
                    tension: 0.4,
                },
                {
                    label: "Earnings",
                    data: [2200, 3000, 2500, 2100, 2900, 3300],
                    fill: false,
                    borderColor: documentStyle.getPropertyValue("--orange-500"),
                    tension: 0.4,
                },
            ],
        };

        const options = {
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    labels: {
                        color: textColor,
                    },
                },
            },
            scales: {
                x: {
                    ticks: { color: textColorSecondary },
                    grid: { color: surfaceBorder },
                },
                y: {
                    ticks: { color: textColorSecondary },
                    grid: { color: surfaceBorder },
                },
            },
        };

        setChartData(data);
        setChartOptions(options);
    }, []);

    return (
        <div className="chart card">
            <div className="title">
                <FontAwesomeIcon icon={faChartLine} /> {title}
            </div>
            <Chart
                type="line"
                data={chartData}
                options={chartOptions}
                style={{ width: "100%", height: height || "300px" }}
            />
        </div>
    );
};

export default ChartComponent;
