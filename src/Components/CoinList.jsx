import React, { useEffect, useState, useContext } from "react";
import coinGeckoApi from "../apis/coinGecko"
import { WatchListContext } from "../Context/watchListContext";
import Coin from './../Components/Coin';

function CoinList() {

    const [coins, setCoins] = useState([]);
    const [isLoading, setIsLoading] = useState(false)
    const { watchList, deleteCoin, currency } = useContext(WatchListContext)


    useEffect(() => {
        console.log(currency)
        const fetchData = async () => {
            setIsLoading(true)
            const response = await coinGeckoApi.get("/coins/markets", {
                params: {
                    vs_currency: currency,
                    ids: watchList.join(','),
                }
            })

            setCoins(response.data)
            setIsLoading(false)
        }
        if (watchList.length > 0) {
            fetchData()
        }
        else {
            setCoins([])
        }

    }, [watchList, currency])


    const renderCoins = () => {

        console.log(coins)
        if (isLoading)
            return <div>Loading....</div>
        return (
            <ul className="coinlist list-group mt-2">
                {coins.map(coin => {
                    return <Coin key={coin.id} coin={coin} deleteCoin={deleteCoin} />
                })}
            </ul>
        )

    }

    return (
        <div className="CoinList">
            {renderCoins()}
        </div>
    );
}

export default CoinList;
