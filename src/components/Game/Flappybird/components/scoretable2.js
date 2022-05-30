import "./board2.css"
import { useMoralis, useWeb3ExecuteFunction } from 'react-moralis'
import { useState, useContext, useEffect } from 'react'
import { Context } from "../../../Context/context";
import { useExitGame } from "../../../Functions/useExitGame";
import {Gtm_address, Game_address} from "../../../../address/address"
import { CircularProgress } from '@mui/material';
import { Link, useNavigate  } from "react-router-dom";


export default function Scoretable2({score}){

    const {user, isWeb3Enabled} = useMoralis()
    const {score_point, setScore_point} = useContext(Context);
    const {status_function_exit, setStatus_function_exit} = useContext(Context);
    const {game_status, setGame_status} = useContext(Context);

    const {gmt_token_won, setGmt_token_won} = useContext(Context);

    
    const {award_token, setAmount_stake} = useContext(Context);

    const {exitGame} = useExitGame(Game_address)
    const curr_score = score / 86
    
    const history = useNavigate();
   
    useEffect(() => {
        console.log("current isWeb3Enabled -->", isWeb3Enabled)
        console.log("current user -->", user)
        console.log("current user address-->", user.attributes.accounts)
        setGame_status(true)
        setGmt_token_won(curr_score )
        setScore_point(score)

        if(status_function_exit){
            console.log("go back to menu")
            //setGame_status(false)
            //history(-1)
        }

    }, [score])
    
    return(
        <div className="ScoreContainer">
            <h1>{score} P</h1>

            <h3> {curr_score.toString().substr(0, 4)} GTM</h3>



           {status_function_exit == "mining" ? <button className="CashOutButton" onClick={() =>{
                exitGame()
            }}> <CircularProgress/> </button> :<button className="CashOutButton" onClick={() =>{
                exitGame()
            }}>CASHOUT</button>}
        </div>

    )

}