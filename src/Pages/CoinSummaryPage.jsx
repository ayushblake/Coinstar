import React, { useEffect } from "react";
import AddCoin from "../Components/AddCoin";
import CoinList from "../Components/CoinList";
import CurrencyPicker from "../Components/CurrencyPicker";

function CoinSummaryPage() {

    return (
        <div className="coinsummary shadow border p-2 rounded mt-2 bg-light" style={{ overflow: "hidden" }}>
            <span style={{ display: "inline-block" }}> <AddCoin /></span>
            <span style={{ display: "inline-block", marginLeft: 15 }}><CurrencyPicker /></span>
            <CoinList />
        </div>
    );
}

export default CoinSummaryPage;
