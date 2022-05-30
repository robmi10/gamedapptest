import React, {useEffect} from 'react'
import { useState, useContext } from 'react'
import { Context } from '../../Context/context'
import { useMoralis, useERC20Balances, useNativeBalance} from "react-moralis";

const Rate_count = () => {
  const { web3, enableWeb3, authenticate, Moralis } = useMoralis()
    const {status_function, setStatus_function} = useContext(Context);
    const {rate_stake, setRate_stake} = useContext(Context);
    const {current_timestamp, setCurrent_timestamp} = useContext(Context);

    const {stake_set, setStake_set} = useContext(Context);
    const {score_point, setScore_point} = useContext(Context);

    const {award_token, setAward_token} = useContext(Context);

    
    const {amount_stake, setAmount_stake} = useContext(Context);

    console.log("inside rate count")

    const timestake = current_timestamp;

    const staked_amount = Moralis.Units.FromWei(parseInt(amount_stake._hex, 16).toString())
   
    const calculate = () =>{
      

     //console.log("current_timestamp -->", current_timestamp)
      const current_time = Math.round((new Date()).getTime() / 1000);
      //console.log("inside calculate function !!", current_timestamp)
      
      console.log("stake_set ->", stake_set)

      console.log("current time -->", parseInt(timestake, 16) )

      const time_diff = current_time - parseInt(timestake, 16) 
      const calc = time_diff * 1 /100000 
      const award_now = calc * staked_amount
      
      console.log("current award_now -->", award_now)

      console.log("current staked_amount -->", staked_amount)

      setRate_stake(calc)
      setAward_token(award_now)
      console.log("award now --->", award_now)

      if(stake_set == true){
       

      }else{
        console.log("inside rate_count stake set false")

        const time_diff = current_time - parseInt(timestake, 16) 
        const calc = time_diff * 1 /100000
        setRate_stake(calc)
        setAward_token(calc)
      }
      
    }

    useEffect(() => {
      let Time_interval = setInterval(() => {
         // calculate()
      }, 1000);

      return () =>{
        clearInterval(Time_interval)}
    }, [current_timestamp])
    
  
  return (
    <>


    </>
  )
}

export default Rate_count