
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import userActions from '../redux/actions';
import {IEX_CLOUD_API_BASE_URL, API_KEY, USERS_URL, TRANSACTION_URL } from '../redux/actions'
import axios from 'axios'
import styled from 'styled-components';

export const Stock = (props) => {
    // const dispatch = useDispatch()
    console.log(props)
    
const [stock, setStock] = useState({
    ticker: props.ticker,
    quantity: props.quantity,
    latestPrice: 0,
    open: 0
  });

  const { ticker, latestPrice, open, quantity } = stock;

  const fetchStockPrices = async () => {
      let url = IEX_CLOUD_API_BASE_URL + `${props.ticker}`+ API_KEY
      let results = await axios(
                url
    );setStock({
        ...stock,
        latestPrice: results.data.latestPrice || 0, 
        open: stock.latestPrice || results.data.open
    })
  }

  useEffect(() => {
      fetchStockPrices()
  },[props.ticker]
  )
  
  const stockColor = () => {
    if (open > latestPrice) {
      return "red"
    } else if (open < latestPrice) {
      return "green"
    } else {
      return "gray"
    }
  }

    const shares = (quantity) => {
     return props.quantity <= 1 ? "Share" : "Shares"
    }
    //Styled COmponent for Text Color
    
    const StyledText = styled.div`
        color: ${stockColor()};
        text-transform: uppercase;
	    font-family: 'Open Sans Condensed', sans-serif;
	    font-size: 18px;
	    font-weight: 100;
	    padding: 20px;
        text-align: center;
    `
    return (
        <StyledText>
            {ticker}--{quantity} {shares(quantity)} –– ${parseFloat(latestPrice * quantity).toFixed(2)}
        </StyledText>
    )
}
export default Stock