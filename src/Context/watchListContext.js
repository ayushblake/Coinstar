import React, { useEffect, useState, createContext } from "react";

export const WatchListContext = createContext();

export const WatchListContextProvider = (props) => {
    const getInitialCoinsState = () => {
        if (localStorage.getItem('watchList'))
            return localStorage.getItem('watchList').split(',')
        return ["bitcoin", "ethereum", "ripple"]
    }

    const [watchList, setWatchList] = useState(getInitialCoinsState);
    const [currency, setCurrency] = useState(localStorage.getItem('currency') || "usd")


    const deleteCoin = (coinId) => {
        setWatchList(watchList.filter(el => el !== coinId))
    }
    const addCoin = (coinId) => {
        if (watchList.indexOf(coinId) === -1)
            setWatchList([...watchList, coinId])
    }

    const changeCurrency = (currency) => {
        setCurrency(currency);
    }

    useEffect(() => {
        localStorage.setItem('watchList', watchList)
    }, [watchList])

    useEffect(() => {
        localStorage.setItem('currency', currency)
    }, [currency])


    return (
        <WatchListContext.Provider value={{ watchList, deleteCoin, addCoin, currency, changeCurrency }}>
            {props.children}
        </WatchListContext.Provider>
    )
} 