import React, { useRef, useEffect, useState } from "react";
import { Chart, registerables } from "chart.js";
import { historyOptions } from "../chartConfigs/chartConfigs";

function HistoryChart({ data, curr }) {

    const chartRef = useRef();
    const { day, week, year, detail } = data;
    const [timeFormat, setTimeFormat] = useState("24h");
    Chart.register(...registerables);


    const determineTimeFormat = () => {
        // console.log("called")
        switch (timeFormat) {
            case "24h": {
                return day;
            }

            case "7d":
                {
                    return week;
                }

            case "1y":
                {
                    return year;
                }
            default: {
                return day;
            }

        }
    }

    useEffect(() => {
        // console.log(chartRef.current)
        // var chartInstance;
        // console.log(day)
        // console.log(historyOptions)
        if (chartRef && chartRef.current && detail) {
            Chart.register(...registerables);
            var chartInstance = new Chart(chartRef.current, {
                type: 'line',
                data: {
                    labels: day.map(ele => ""),
                    datasets: [{
                        label: `${detail.name} price`,
                        data: determineTimeFormat(),
                        backgroundColor: "rgba(0, 0, 255, 0.8)",
                        borderColor: "rgba(0, 0, 0, 0.4)",
                        pointRadius: 0
                    }]
                },
                options: {
                    ...historyOptions
                }
            });
        }

        return () => {
            if (chartInstance)
                chartInstance.destroy()
        }
    })

    useEffect(() => {
        // console.log(timeFormat)
    })
    const renderPrice = () => {
        if (detail) {
            return (
                <>
                    <p className="my-0">{curr}: {detail.current_price.toFixed(2)}</p>
                    <p
                        className={detail.price_change_percentage_24h < 0 ? "text-danger my-0" : "text-success my-0"}>{detail.price_change_percentage_24h.toFixed(2)}%</p>
                </>
            )
        }
    }

    return (
        <div className="bg-white border mt-2 rounded p-3">
            <div>
                {renderPrice()}
            </div>
            <div>
                <canvas ref={chartRef} id="mychart" width="250" height="250"></canvas>
            </div>
            <div className="chart-button mt-1">
                <button onClick={() => setTimeFormat("24h")} className="btn btn-outline-secondary btn-sm">24h</button>
                <button onClick={() => setTimeFormat("7d")} className="btn btn-outline-secondary btn-sm mx-1">7d</button>
                <button onClick={() => setTimeFormat("1y")} className="btn btn-outline-secondary btn-sm">1y</button>
            </div>

        </div>
    );
}

export default HistoryChart;