import React, { useState, useEffect, useContext } from 'react';
import './Coin.css';
import { useParams } from 'react-router-dom';
import { CoinContext } from '../../context/CoinContext';
import LineChart from '../../components/LineChart/LineChart';

const Coin = () => {
  const { coinId } = useParams();
  const [coinData, setCoinData] = useState();
  const [historicalData, setHistoricalData] = useState();
  const { currency } = useContext(CoinContext);

  const fetchCoinData = async () => {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        'x-cg-demo-api-key': 'CG-MFWcXmyozQLQX8iYNQqZ5E6F'
      }
    };

    try {
      const response = await fetch(`https://api.coingecko.com/api/v3/coins/${coinId}`, options);
      const data = await response.json();
      console.log('coinData.market_data:', data.market_data); // Debug log
      setCoinData(data);
    } catch (error) {
      console.error('Failed to fetch coin data:', error);
    }
  };

  const fetchHistoricalData = async () => {
    try {
      const response = await fetch(
        `https://api.allorigins.win/raw?url=${encodeURIComponent(
          `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=${currency.name}&days=10&interval=daily`
        )}`
      );
      const data = await response.json();
      setHistoricalData(data);
    } catch (error) {
      console.error('Failed to fetch historical data:', error);
    }
  };

  const getFormattedPrice = (obj) => {
    const value = obj?.[currency.name];
    return typeof value === 'number' ? value.toLocaleString() : 'N/A';
  };

  useEffect(() => {
    fetchCoinData();
    fetchHistoricalData();
  }, [currency]);

  if (coinData && historicalData) {
    return (
      <div className='coin'>
        <div className="coin-header">
          <img src={coinData.image?.large} alt='' />
          <p><b>{coinData.name} ({coinData.symbol?.toLowerCase()})</b></p>
        </div>

        <div className="coin-chart">
          <LineChart historicalData={historicalData} />
        </div>

        <div className="coin-info">
          <ul>
            <li>Crypto Market Rank</li>
            <li>{coinData.market_cap_rank || 'N/A'}</li>
          </ul>

          <ul>
            <li>Current Price</li>
            <li>{currency.symbol} {getFormattedPrice(coinData?.market_data?.current_price)}</li>
          </ul>

          <ul>
            <li>Market Cap</li>
            <li>{currency.symbol} {getFormattedPrice(coinData?.market_data?.market_cap)}</li>
          </ul>

          <ul>
            <li>24 Hour High</li>
            <li>{currency.symbol} {getFormattedPrice(coinData?.market_data?.high_24h)}</li>
          </ul>

          <ul>
            <li>24 Hour Low</li>
            <li>{currency.symbol} {getFormattedPrice(coinData?.market_data?.low_24h)}</li>
          </ul>
        </div>
      </div>
    );
  } else {
    return (
      <div className="spinner">
        <div className="spin"></div>
      </div>
    );
  }
};

export default Coin;
