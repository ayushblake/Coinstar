import React from "react";
import './App.css';
import { BrowserRouter, Route } from "react-router-dom";
import CoinSummaryPage from "./Pages/CoinSummaryPage";
import CoinDetailPage from './Pages/CoinDetailPage';
import Header from './Components/Header'
import { WatchListContext, WatchListContextProvider } from "./Context/watchListContext";

function App() {
  return (
    <div className="container">
      <WatchListContextProvider>
        <BrowserRouter>
          <Header />
          <Route exact path="/" component={CoinSummaryPage} />
          <Route path="/coins/:id" component={CoinDetailPage} />
        </BrowserRouter>
      </WatchListContextProvider>
    </div>
  );
}

export default App;
