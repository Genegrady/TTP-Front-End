import React from 'react'
import axios from 'axios'
import {useSelector, useDispatch} from 'react-redux'
import { useState, useEffect } from 'react'
import {IEX_CLOUD_API_BASE_URL, API_KEY, USERS_URL, TRANSACTION_URL } from '../redux/actions'
import userActions from '../redux/actions';
import { connect } from 'react-redux';
import styled from 'styled-components';

// Styled Components for Purchasing stocks

const StyledForm = styled.form`
font-family: 'Open Sans Condensed', arial, sans;
	width: 500px;
	padding: 30px;
	background: #FFFFFF;
	margin: 50px auto;
	box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.22);
	-moz-box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.22);
	-webkit-box-shadow:  0px 0px 15px rgba(0, 0, 0, 0.22);
`
const StyledInput = styled.input`
  box-sizing: border-box;
	-webkit-box-sizing: border-box;
	-moz-box-sizing: border-box;
	outline: none;
	display: block;
	width: 100%;
	padding: 7px;
	border: none;
	border-bottom: 1px solid #ddd;
	background: transparent;
	margin-bottom: 10px;
	font: 16px Arial, Helvetica, sans-serif;
	height: 45px;
  `
  const StyledSubmit = styled(StyledInput)`
  	background:linear-gradient(to bottom, #1DB954 5%, #30C9C9 100%);
	  background-color:#1DB954;
  `
  const StyledHThree = styled.h3`
    display: box;
    width: 500px;
    margin: 50px auto;
	text-transform: uppercase;
	font-family: 'Open Sans Condensed', sans-serif;
	color: #797979;
	font-size: 18px;
	font-weight: 100;
	padding: 20px;
  text-align: center;
  ox-shadow: 0px 0px 15px rgba(0, 0, 0, 0.22);
	-moz-box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.22);
	-webkit-box-shadow:  0px 0px 15px rgba(0, 0, 0, 0.22)
  `
  const StyledHTwo = styled.h2`
  text-transform: uppercase;
	font-family: 'Open Sans Condensed', sans-serif;
	color: #797979;
	font-size: 18px;
	font-weight: 100;
  text-align: center;
  `
  


export const PurchaseStocks = (props) => {
    const dispatch = useDispatch()
    //Set states for transactions and user
    const [stockForm, setStockForm] = useState({
        ticker: '',
        quantity: 0,
        price: 0
    })
    // const [newPortfolio, setNewPortfolio] = useState({
    //     portfolio: {ticker: '',
    //     quantity: 0}
    // })
    const [user, setUser] = useState(props.user)
    useEffect(() => {
        setUser(props.user)
    },[props]
    )
   
    const [transactionRender, setTransactionRender] = useState({
        transactions: []
    })
    const { ticker, quantity,  price } = stockForm;

    const portfolioBalance = props.transactions.reduce(function(accumulator, currentValue,currentIndex, array){
    console.log(currentValue.price, accumulator)
    return accumulator + Math.trunc(currentValue.price)
}, 0)

    // const user = userState
    const balance =(props.user.balance - portfolioBalance).toFixed(2);

    

    const handleClick= (e) => {
        e.preventDefault();
        fetchTicker();
    }
    const fetchTicker = async () => {
        if(quantity !== 0){
            let url = IEX_CLOUD_API_BASE_URL + `${ticker}`+ API_KEY
            let results = await axios(
                url
            )
            // console.log
          setStockForm({
              ticker: ticker,
              quantity: quantity,
              price: (Math.round(results.data.latestPrice) * quantity)
          })
        }else{
            alert('Quantity must be at least 1')
        }
    }
    console.log(props)

    const handleTransactionSubmit = async () => {
        let user_id = props.user.id
        let url =  USERS_URL+ `${user_id}` + TRANSACTION_URL
        let userUrl = USERS_URL+ `${user_id}`
        let params = {
            ticker: ticker,
            quantity: quantity,
            price: price,
            user_id: user_id
        }
        let userParams ={
          user:{
            balance: props.user.balance - price
          }
        }
        if(price < balance && quantity != 0){
            let results = await axios.post(
                url, params
            );setTransactionRender(results.data)
            // debugger
            let userResults = await axios.patch(
                userUrl, userParams
            );setUser(...user, userResults.data);
            console.log(userResults)
            // debugger
        }
        else{
            alert('Please Fix Errors')
        }
        
    }
    

    const handleCancel = () => {
    setStockForm({
        ticker: '',
        quantity: 0,
        price: 0
    })
}


    
    

const handleTickerChange = e =>
    setStockForm({ ...stockForm, [e.target.name]: e.target.value.toUpperCase()});

const handleQuantityChange = e =>
    setStockForm({ ...stockForm, [e.target.name]: Math.round(e.target.value)});

console.log("ticker", ticker)
console.log("quantity", quantity)
console.log(props.user.balance - portfolioBalance)


    return (
    <div>
    <StyledHTwo>Cash Balance is: ${parseFloat(balance).toFixed(2)}</StyledHTwo>
    <StyledHThree>Find A Stock Quote</StyledHThree>
     <StyledForm onSubmit={handleClick}>
        <StyledInput
          type="text"
          name="ticker"
          value={ticker}
          onChange={handleTickerChange}
          placeholder="Ticker"
        />
        <StyledInput
          type="number"
          name="quantity"
          min="0"
          value={quantity}
          onChange={handleQuantityChange}
          placeholder="Quantity"
        />
        <StyledSubmit type="submit" value='Get Quote'/>
      </StyledForm>
      <StyledHThree>Purchase a Stock</StyledHThree>
        <StyledForm 
        onSubmit={handleTransactionSubmit}
        >
        <StyledInput
          type="text"
          name="ticker"
          value={ticker}
          onChange={handleTickerChange}
          placeholder="Ticker"
        />
        <StyledInput
          type="number"
          name="quantity"
          min="0"
          value={quantity}
          onChange={handleQuantityChange}
          placeholder="Quantity"
        />
        <StyledInput
          type="number"
          name="price"
          // min="0"
          value={price}
          onChange={handleQuantityChange}
          placeholder="Price"
        />
        <StyledSubmit type="submit" value='Purchase Stocks'/>
        <StyledSubmit type="button" value="Cancel"onClick={handleCancel}/>
      </StyledForm>
    </div>
      
    )
}

const mapStateToProps = state => {
  return { portfolio: state.newPortfolio };
};
export default connect(mapStateToProps)(PurchaseStocks);
