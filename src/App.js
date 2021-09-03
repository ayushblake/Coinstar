import React, { useEffect } from "react";
import './App.css';
import { BrowserRouter, Route } from "react-router-dom";
import CoinSummaryPage from "./Pages/CoinSummaryPage";
import CoinDetailPage from './Pages/CoinDetailPage';
import Header from './Components/Header'
import { WatchListContextProvider } from "./Context/watchListContext";

function App() {

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker
          .register('./serviceWorker.js')
          .then(res => console.log('Service worker successfuly registered'))
          .catch(err => console.log(err))
      })
    }
  })

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
