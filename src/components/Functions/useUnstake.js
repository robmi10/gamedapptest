import React, { useEffect } from 'react'
import { useMoralis, useWeb3ExecuteFunction } from 'react-moralis'
import Game from "../../chain-info/deployments/97/0xfA933122A287535b772Bf590F9B2f75fc103DbBA.json"
import Weth_token from "../../chain-info/deployments/97/0x067ab44441df377648667A2C9FCc4d35A6a9a35b.json"

import GMT_token from "../../chain-info/deployments/97/0x163FBbFAc25F0eADDD9C29dCa957aeCb8169eD31.json"
import { useState, useContext } from 'react'
import { Context } from '../Context/context'
import { Link, useNavigate  } from "react-router-dom";
import {Gtm_address, Game_address, Weth_address} from "../../address/address"


export const useUnstake = (input_amount) => {
  const {Moralis} = useMoralis()
  const {abi} = Game
  const Weth_token_abi =  Weth_token.abi
  
  /* console.log("Weth_token object ->", Weth_token)
  console.log("Weth_token_abi ->", Weth_token_abi) */
  const {status_function, setStatus_function} = useContext(Context);

  const {alert_status_exit, setAlert_status_exit} = useContext(Context);
  const {stake_amount, setStake_amount} = useContext(Context);
  const {unstake_status, setUnstake_status} = useContext(Context);

  
  const {stake_set, setStake_set} = useContext(Context);

 /*  console.log("stake_address ->", stake_address)

  console.log("Game address ->", Game)

  console.log("stake_amount ->", stake_amount) */

  useEffect(() => {
      console.log("Inside usestake", stake_amount)
  }, [stake_amount])
  

  const history = useNavigate();

  const stake_options = {abi, contractAddress: Game_address, functionName: "unstake", 
    params: {_token_address: Weth_address},
  };

    const unstake = async () =>{  
     console.log("inside stake function now")

     const _staking = await Moralis.executeFunction(stake_options)
     setUnstake_status("mining")
     console.log("called staking function -->", _staking)
    
    const stake_confirmation = await _staking.wait().then((status) =>{
        console.log("status stake_confirmation----->", status)
        setStake_set(false)
        setUnstake_status(true)
        
      }).catch((e) =>{
        console.log("error -->", e) 
      })
    console.log("stake_confirmation ->", stake_confirmation)  

  
  }
  return{unstake}
}
