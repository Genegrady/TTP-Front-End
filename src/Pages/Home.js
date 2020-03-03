import React from 'react';
import { useSelector } from 'react-redux';
import { Fragment, useState, useEffect } from 'react';
import PurchaseStocks from '../Components/PurchaseStocks'
import Portfolio from '../Pages/Portfolio'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import styled from 'styled-components';


const Home = (props) => {
  
  //Grab the state of the user from redux
  const user = props.user;
  const[state, setState] = useState({
    
  })

//   const portfolioBalance = props.transactions.reduce(function(accumulator, currentValue,currentIndex, array){
//     console.log(currentValue.price, accumulator)
//     return accumulator + Math.trunc(currentValue.price)
// }, 0)

  console.log(state)

  //Styled Components
  
  
  const StyledBoxContainer = styled.div`
      display:table;
    `
  const StyledBoxRow = styled.div`
    display:table-row;
  `
  const StyledBoxCell = styled.div`
    display:table-cell; 
    width:50%; 
    padding:10px;
  `
  const StyledBoxCellOne = styled.div`
    display:table-cell; 
    width:50%; 
    padding-top:50px;
    padding:100px;
  `
  const StyledHOne = styled.h1`
  
	text-transform: uppercase;
	font-family: 'Open Sans Condensed', sans-serif;
	color: #797979;
	font-size: 30px;
	font-weight: 100;
	padding: 20px;
	
  text-align: center;
  `
  const WelcomeHOne = styled(StyledHOne)`
    padding-top: 400px;
  `
  
  
  
  

  // Ternary to make sure user is logged in or else gives link to login or sign up page
  const homePage = user && localStorage.token ? (
    
    <StyledBoxRow>
       <StyledBoxCellOne>
        <Portfolio {...user}/>
        </StyledBoxCellOne>
        <StyledBoxCell>
      <StyledHOne>Welcome back {props.user.user.name}!</StyledHOne>
        <PurchaseStocks {...user}/>
        </StyledBoxCell>
       
    </StyledBoxRow>
    
    
    
   ) : (
  <WelcomeHOne>Welcome to Stonkify! Please <Link to="/signup" >Signup</Link> or <Link to="/login" >Login</Link> if you have an account </WelcomeHOne>
  );
  return <StyledBoxContainer>{homePage}</StyledBoxContainer>;
};

// export default Home;
const mapStateToProps = state => {
  return { user: state.user };
};
export default connect(mapStateToProps)(Home);