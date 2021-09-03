import React, { useEffect, useState, useContext } from "react";
import coinGecko from "../apis/coinGecko";
import { WatchListContext } from "../Context/watchListContext";

function CurrencyPicker() {
    const [currencyList, setCurrencyList] = useState([]);
    const { currency, changeCurrency } = useContext(WatchListContext)
    useEffect(() => {
        const fetchData = async () => {
            const response = await coinGecko.request('/simple/supported_vs_currencies')
            setCurrencyList(response.data.slice(0, 25))
        }
        fetchData()
    }, [])
    return (
        <div class="input-group mb-3">
            <label class="input-group-text" >Currency</label>
            <select class="form-select" onChange={(event) => changeCurrency(event.target.value)} >
                {currencyList.map(curr => {
                    // console.log(currency + curr)
                    if (curr === currency)
                        return <option selected value={curr}>{curr}</option>
                    return <option value={curr}>{curr}</option>
                })}
            </select>
        </div>
    );
}

export default CurrencyPicker;
