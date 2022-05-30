import React, { useEffect } from 'react'
import { useMoralis, useWeb3ExecuteFunction } from 'react-moralis'
import Game from "../../chain-info/deployments/97/0xfA933122A287535b772Bf590F9B2f75fc103DbBA.json"
import Weth_token from "../../chain-info/deployments/97/0x067ab44441df377648667A2C9FCc4d35A6a9a35b.json"

import GMT_token from "../../chain-info/deployments/97/0x163FBbFAc25F0eADDD9C29dCa957aeCb8169eD31.json"
import {Gtm_address, Game_address, Weth_address} from "../../address/address"
import { useState, useContext } from 'react'
import { Context } from '../Context/context'
import { Link, useNavigate  } from "react-router-dom";


export const useApprove = (input_amount) => {
  const {Moralis} = useMoralis()
  const {abi} = Weth_token
  const Weth_token_abi =  Weth_token.abi
  
  const {game_abi, setGame_abi} = useContext(Context);


  const GMT_token_abi =  GMT_token.abi


  /* console.log("GTM_token ->", abi)

  console.log("Weth_token object ->", Weth_token)
  console.log("Weth_token_abi ->", Weth_token_abi) */
  const {status_function, setStatus_function} = useContext(Context);

  const {alert_status_exit, setAlert_status_exit} = useContext(Context);
  const {stake_amount, setStake_amount} = useContext(Context);
  const {stake_address, setStake_address} = useContext(Context);

  const {stake_status, setStake_status} = useContext(Context);
  const {stake_set, setStake_set} = useContext(Context);


  useEffect(() => {
      console.log("Inside useApprove -->", stake_amount)
  }, [stake_amount])
  
  
  //console.log("input_amount approve now -->", input_amount)

  const history = useNavigate();
  //const input_to_string = input_amount
  

    const approve = async (input_amount) =>{

      const ethInWei = Moralis.Units.ETH(input_amount.toString())

      console.log("ethInWei in approve -->", ethInWei)

      const approve_options = {abi, contractAddress: Weth_address, functionName: "approve", 
        params: {spender: Game_address, amount: ethInWei},
      };

      const _staking_approve_ = await Moralis.executeFunction(approve_options)

      setStake_status("mining")

    const _staking_approve_confirmation = await _staking_approve_.wait().then((status) =>{
        console.log(" _staking_approve_confirmation status ----->", status)
        //setStake_set(true)
      }).catch((e) =>{
        console.log("error -->", e) 
      }) 
    console.log("_staking_approve_confirmation ->", _staking_approve_confirmation) 
  
  }
  return{approve}
}
