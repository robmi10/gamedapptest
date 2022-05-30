import React, { useEffect } from 'react'
import { useMoralis, useWeb3ExecuteFunction } from 'react-moralis'
import Game from "../../chain-info/deployments/97/0xfA933122A287535b772Bf590F9B2f75fc103DbBA.json"
import Weth_token from "../../chain-info/deployments/97/0x067ab44441df377648667A2C9FCc4d35A6a9a35b.json"

import GMT_token from "../../chain-info/deployments/97/0x163FBbFAc25F0eADDD9C29dCa957aeCb8169eD31.json"
import { useState, useContext } from 'react'
import { Context } from '../Context/context'
import { Link, useNavigate  } from "react-router-dom";
import {Gtm_address, Game_address, Weth_address} from "../../address/address"

export const useStakeStatus = () => {
  const {Moralis} = useMoralis()
  const {abi} = Game
  const Weth_token_abi =  Weth_token.abi
  
  //console.log("inside get staking status!!")
  const {status_function, setStatus_function} = useContext(Context);

  const {stake_status, setStake_status} = useContext(Context);
  const {current_stake_status, setCurrent_stake_status} = useContext(Context);
  const {rate_stake, setRate_stake} = useContext(Context);
  const {current_timestamp, setCurrent_timestamp} = useContext(Context);

  const {stake_set, setStake_set} = useContext(Context);

  const {amount_stake, setAmount_stake} = useContext(Context);

  const {time_stamp, setTime_stamp} = useContext(Context);

  
  

  const stake_options = {abi, contractAddress: Game_address, functionName: "get_stake_status", 
  };

     const get_stake_status = async () =>{  
        console.log("inside get staking status function here !!!!")
     const _staking_status = await Moralis.executeFunction(stake_options)

     console.log("_staking_status direct get new hereee! -->", _staking_status)
     
     
     const _staking_status_confirmation = await _staking_status.wait().then((status) =>{
        
        console.log("status stake args----->", status.events[0].args)

        console.log("status stake time----->", status.events[0].args._time_stamp._hex)
        
        console.log("status stake amount----->", status.events[0].args._amount)


        
        console.log("status stake status----->", status.events[0].args._stake_status)
        console.log("status stake rate----->", status.events[0].args._rate)
        console.log("event status ->", status.events)

        
        setStake_status(true)
        

       // {status.events[0].args._amount !== undefined ? setAmount_stake(status.events[0].args._amount) : setAmount_stake("true")}
        setStake_set(status.events[0].args._stake_status)

        setAmount_stake(status.events[0].args._amount)

        setCurrent_timestamp(status.events[0].args._time_stamp._hex)
      }).catch((e) =>{
        console.log("error -->", e) 
      }) 
    console.log("_staking_status_confirmation ->", _staking_status_confirmation)  
    
  
  }
  return{get_stake_status}
}
