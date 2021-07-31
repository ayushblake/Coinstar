import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import Coin from "../Components/Coin";
import HistoryChart from "../Components/HistoryChart";
import CoinData from "../Components/CoinData"
import coinGecko from "../apis/coinGecko";
import { WatchListContext } from "../Context/watchListContext";

function CoinDetailPage() {
    const { id } = useParams();
    const [coinData, setCoinData] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const { currency } = useContext(WatchListContext);

    const formatData = (data) => {
        return data.map((el) => {
            return {
                x: el[0],
                y: Number(el[1].toFixed(2))
            }
        })
    }

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);

            const [day, week, year, detail] = await Promise.all([
                coinGecko.request(`/coins/${id}/market_chart`, {
                    params: {
                        vs_currency: currency,
                        days: "1"
                    }
                }),
                coinGecko.request(`/coins/${id}/market_chart`, {
                    params: {
                        vs_currency: currency,
                        days: "7"
                    }
                }),
                coinGecko.request(`/coins/${id}/market_chart`, {
                    params: {
                        vs_currency: currency,
                        days: "365"
                    }
                }),
                coinGecko.get("/coins/markets", {
                    params: {
                        vs_currency: currency,
                        ids: id,
                    }
                })
            ]);

            setCoinData({
                day: formatData(day.data.prices),
                week: formatData(week.data.prices),
                year: formatData(year.data.prices),
                detail: detail.data[0]
            })

            setIsLoading(false);

        }

        fetchData();
    }, [])

    const renderData = () => {

        if (isLoading)
            return <div>Loading......</div>
        return (
            <div className="coinlist">
                <HistoryChart data={coinData} curr={currency} />
                <CoinData data={coinData.detail} />
            </div>
        )
    }

    return renderData();
}

export default CoinDetailPage;
