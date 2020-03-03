import React from 'react'
import styled from 'styled-components';

export const Transaction = (props) => {
    console.log(props.ticker)
    const {ticker, price, quantity} = props

    const StyledCard = styled.div`
    display: inline-block;
  /* align-content: flex-end; */
  border: 1px solid dimgrey ;
  width: 500px;
  height: 110px;
  text-align: center;
`
    const StyledP = styled.p`
  text-transform: uppercase;
	font-family: 'Open Sans Condensed', sans-serif;
	color: #797979;
	font-size: 18px;
	font-weight: 100;
	padding: 20px;
	
  text-align: center;

`
    return (
        <StyledCard>
            <StyledP>Stock: {ticker} -- Price: ${price} --Quantity: {quantity}</StyledP>
        </StyledCard>
    )
}
export default Transaction