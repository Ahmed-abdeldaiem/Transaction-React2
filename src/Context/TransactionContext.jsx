import React from 'react'
import { createContext, useState } from "react";
import axios from 'axios';



export let TransactionContext=  createContext()


export default function TransactionContextProvider(props) {

    const Base_URL = 'https://host-api-1.vercel.app/db.json';

    const [totalTrans, setTotalTrans] = useState([])
    const [totalAmount, setTotalAmount] = useState(0)
    function getAllTrans(){
      // console.log('show context');
        return axios.get(`${Base_URL}/transactions`)
        .then((data)=>{
            // console.log(data);
            return data
        })
        .catch((error)=>{
            console.log(error);
          
        })
    }
    
    function getSpecificTrans(customerId){

        return axios.get(`${Base_URL}/transactions?customer_id=${customerId}`)
        .then((data)=>{
            // console.log(data.data);
            
            let counter=0;
            let total =data.data.map((trans)=>{
                counter+=Number(trans.amount)
            })
            
            return counter
        })
        .catch((error)=>{
            console.log(error);
          
        })

    }
    function getAllSpecificTrans(customerId){

        return axios.get(`${Base_URL}/transactions?customer_id=${customerId}`)
        .then((trans)=>{
            // console.log(trans.data);
            
          
            let allTrans =trans?.data?.filter((trans)=>trans.customer_id==customerId)
            
            return allTrans
        })
        .catch((error)=>{
            console.log(error);
          
        })

    }


    function addTransaction(transaction){
        return axios.post(`${Base_URL}/transactions`,transaction)
        .then((trans)=>{
            
          
           
        })
        .catch((error)=>{
            console.log(error);
          
        })
    }
    function deleteTransaction(id) {
        return axios.delete(`${Base_URL}/transactions/${id}`)
            .then((trans) => {
                // console.log('Transaction deleted:', trans);
               
            })
            .catch((error) => {
                console.log( error);
               
            });
    }
   

  return (
    <TransactionContext.Provider value={{getAllTrans,getSpecificTrans,getAllSpecificTrans,addTransaction,deleteTransaction}} >
    {props.children}
    </TransactionContext.Provider>
  )
}














