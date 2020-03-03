import React from 'react'
import Transaction from '../Components/Transaction.js'
import { useState, useEffect } from 'react'
import {useSelector, useDispatch} from 'react-redux'
import axios from 'axios'
import {USERS_URL, TRANSACTION_URL } from '../redux/actions'
// import { connect } from 'react-redux';
import uuid from 'uuid';



export const Transactions = (props) => {

// const [allTransactions, setAllTransactions] = useState({
//     transactions: []
// })
const userState = useSelector(state => state.user);
const[user, setUser] = useState({
    user: userState
})
// useEffect(() => {
//     setUserState(user)
// },[user]
// )

// const fetchTransactions = async () => {
//     let url = USERS_URL + `${props.id}` + TRANSACTION_URL
//     if(localStorage.token){
//         const result = await axios(
//             url
//         );setAllTransactions({
//             transactions: result.data
//         })
//     }
// }
// useEffect(() => {
//     fetchTransactions()
    
// },[props.id]

// )
// let id = uuid;
const getTransactions = () => {
    if(userState){

    
    return userState.transactions.map((transaction, i) =>
    <Transaction {...transaction} key ={i} user_id ={user.id}/>)
    }
}

// console.log(allTransactions.transactions)
console.log(userState)
// const {id, balance} = props.user

    return (
        
        <div>
           {getTransactions()}
        </div>
    )
}
export default Transactions
