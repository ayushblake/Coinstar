import React, { useState, useContext } from "react";
import { WatchListContext } from "../Context/watchListContext";

function AddCoin() {
    const [isActive, setIsActive] = useState(false);
    const { addCoin } = useContext(WatchListContext)

    const availableCoins = [
        "bitcoin",
        "ethereum",
        "ripple",
        "tether",
        "bitcoin-cash",
        "litecoin",
        "eos",
        "okb",
        "tezos",
        "cardano",
    ];

    const handleClick = (coinId) => {
        addCoin(coinId)
        setIsActive(!isActive)
    }

    return (
        <div class="dropdown">
            <button class="btn btn-primary dropdown-toggle" type="button" onClick={() => setIsActive(!isActive)}>
                Add Coin
            </button>
            <ul class={isActive ? "dropdown-menu show" : "dropdown-menu"}>
                {availableCoins.map(ele => <li><a onClick={() => handleClick(ele)} class="dropdown-item" href="#">{ele}</a></li>)}
            </ul>
        </div>
    );
}

export default AddCoin;
