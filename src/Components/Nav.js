import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import userActions from '../redux/actions';
import styled from 'styled-components';
const TopNav = styled.nav`
  overflow: hidden;
  background-color: #333;
  `
  const NavBar = styled(Link)`
  overflow: hidden;
  
  float: left;
  font-size: 30px;
  color:dimgrey;
  text-align: center;
  font: bolder;
  padding: 8px 8px;
  text-decoration: none;
  background: rgb(201, 199, 198) ;
  height: 35px;
  margin-top: 10px;
  border-color: #1DB954 ;
   `

export const Nav = () => {
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(userActions.logoutUser());

  };

  //Styled Components
  

  return (
    <TopNav style={{ display: 'flex', justifyContent: 'left' }}>
      <NavBar to="/">Portfolio</NavBar>
      {/* <NavBar to="/signup">Signup</NavBar> */}
      <NavBar to="/login">Login</NavBar>
    </TopNav>
  );
};

export const NavLog = () => {
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(userActions.logoutUser());
    window.location.reload();
  };

  //Styled Components
  

  return (
    <TopNav style={{ display: 'flex', justifyContent: 'left' }}>
      <NavBar to="/">Portfolio</NavBar>
      <NavBar to="/transactions">Transactions</NavBar>
      <NavBar to="/" onClick={handleLogout}>
        Logout
      </NavBar>
    </TopNav>
  );
};

export default {Nav, NavLog};

