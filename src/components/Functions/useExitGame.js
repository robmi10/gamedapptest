import React from 'react'
import { useMoralis, useWeb3ExecuteFunction } from 'react-moralis'
import Game from "../../chain-info/deployments/97/0xfA933122A287535b772Bf590F9B2f75fc103DbBA.json"
import Weth_token from "../../chain-info/deployments/97/0x067ab44441df377648667A2C9FCc4d35A6a9a35b.json"

import GMT_token from "../../chain-info/deployments/97/0x163FBbFAc25F0eADDD9C29dCa957aeCb8169eD31.json"
import { useState, useContext } from 'react'
import { Context } from '../Context/context'
import { Link, useNavigate  } from "react-router-dom";
import { Gtm_address } from '../../address/address'



export const useExitGame = (gamecontractAddress) => {
  const {Moralis} = useMoralis()
  const {abi} = Game
  const {status_function, setStatus_function} = useContext(Context);
  const {status_function_exit, setStatus_function_exit} = useContext(Context);
  const {game_status, setGame_status} = useContext(Context);

  const {alert_status_exit, setAlert_status_exit} = useContext(Context);
  const history = useNavigate();

  const {score_point, setScore_point} = useContext(Context);

  const {award_token, setAward_token} = useContext(Context);

  const {rate_stake, setRate_stake} = useContext(Context);

  const {amount_stake, setAmount_stake} = useContext(Context);

  const staked_amount = Moralis.Units.FromWei(parseInt(amount_stake._hex, 16).toString())

  console.log("current amount_stake -->", staked_amount)

  console.log("current rate_stake -->", rate_stake)

  console.log("current award token -->", award_token) 

  console.log("current calc reward inside exitgame -->", score_point/100 * award_token)

  console.log("current score_point -->", score_point)

  const options = {abi, contractAddress: gamecontractAddress, functionName: "payout_amount", 
    params: {_score: score_point, _gmttoken: Gtm_address, _token_address: Gtm_address},
  };
  
  const exitGame = async () =>{
    console.log("inside exitGame", options)
    const exit_game = await Moralis.executeFunction(options)
    setStatus_function_exit("mining")
    
    const exit_game_confirmation = await exit_game.wait().then((status) =>{
        console.log("status ----->", status)
        

        //setStatus_function_exit(true)
        
        history(-1)
        setAlert_status_exit(true)
        setGame_status(false)
       
        
      }).catch((e) =>{
        console.log("error -->", e) 
      })
    console.log("exit_game_confirmation ->", exit_game_confirmation) 

  
  }
  return{exitGame}
}
