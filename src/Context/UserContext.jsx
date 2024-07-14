import React from 'react'
import { createContext, useState } from "react";
import axios from 'axios';



export let UserContext=  createContext()

export default function UserContextProvider(props) {

     const Base_URL = 'https://host-api-1.vercel.app/db.json';
    function getAllUsers(){
      
        return axios.get(`${Base_URL}/customers`)
        .then((data)=>{
            // console.log(data);
            return data
        })
        .catch((error)=>{
            console.log(error);
          
        })
    }
    
    function getCustomerById(id){
     
        return axios.get(`${Base_URL}/customers/${id}`)
        .then((data)=>{
            // console.log(data);
            return data
        })
        .catch((error)=>{
            console.log(error);
          
        })
    }
    
    function addCustomer(cstdata){

      return axios.post(`${Base_URL}/customers`,cstdata)
      .then((trans)=>{
          console.log('cst added successfully ',trans.data);
        
         
      })
      .catch((error)=>{
          console.log(error);
        
      })
    }


    function getTransForSpecifcUser(customerId){

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
   

  return (
    <UserContext.Provider value={{getAllUsers,getTransForSpecifcUser,getCustomerById,addCustomer}} >
    {props.children}
    </UserContext.Provider>
  )
}














