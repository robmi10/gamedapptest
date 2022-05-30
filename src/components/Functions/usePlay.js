import React from 'react'
import { useMoralis, useWeb3ExecuteFunction } from 'react-moralis'
import Game from "../../chain-info/deployments/97/0xfA933122A287535b772Bf590F9B2f75fc103DbBA.json"
import Weth_token from "../../chain-info/deployments/97/0x067ab44441df377648667A2C9FCc4d35A6a9a35b.json"

import GMT_token from "../../chain-info/deployments/97/0x163FBbFAc25F0eADDD9C29dCa957aeCb8169eD31.json"
import { useState, useContext } from 'react'
import { Context } from '../Context/context'
import { Link, useNavigate  } from "react-router-dom";

export const usePlay = (gamecontractAddress) => {
  const {Moralis} = useMoralis()
  const {abi} = Game
  const [playState, setPlaystate] = useState({status: null})
  const history = useNavigate();
    const {status_function, setStatus_function} = useContext(Context);

    const {fruit_play, setFruit_play} = useContext(Context);
    const {flamingo_play, setFlamingo_play} = useContext(Context);

    const {status_function_exit, setStatus_function_exit} = useContext(Context);
    const {data, error, fetch, isFetching, isLoading} = useWeb3ExecuteFunction();
    
    const {alert_status_play, setAlert_status_play} = useContext(Context);

    const {current_game, setCurrent_game} = useContext(Context);

    const options = {abi, contractAddress: gamecontractAddress, functionName: "play", 
      msgValue: Moralis.Units.ETH("0.01"), 
    };
  
    const startGame = async (current_game_input) =>{

    
    const play_game = await Moralis.executeFunction(options)

    if (current_game_input == "fruitcrush"){
      setFruit_play("mining")
    }else{
      setFlamingo_play("mining")
    }
    

    const play_game_confirmation = await play_game.wait().then((status) =>{
      console.log("status ----->", status)

      console.log("current_game_input -->", current_game_input)

      setStatus_function_exit(false) 
      
      setFruit_play(true)
      setFlamingo_play(true)

      setStatus_function(true)
      setAlert_status_play(true)

      if(current_game_input == "fruitcrush"){
      history('/fruitcrush');
      }
      else if (current_game_input == "flappyflamingo"){
        history('/flappyflamingo');
      }

    }).catch((e) =>{
      console.log("error -->", e) 
    })
    console.log("play_game_confirmation ->", play_game_confirmation)
  
  }
  return{startGame}
}
