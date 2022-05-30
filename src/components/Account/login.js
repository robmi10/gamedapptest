import React, {useContext} from 'react'
import Menu from '../Menu/menu'
import { useMoralis, useERC20Balances, useNativeBalance} from "react-moralis";
import { useState, useEffect } from 'react';
import "../index/index.css"
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import {Gtm_address, Game_address} from "../../address/address"
import { Link, useNavigate  } from "react-router-dom";
import User from '../Account/user';
import { Context } from '../Context/context';
import { CircularProgress, Alert, Snackbar} from '@mui/material';
import { useStakeStatus } from '../Functions/useGetStakeStatus';

const Login = () => {
    const { web3, enableWeb3, authenticate, Moralis, isAuthenticated, isWeb3Enabled, user, logout, isAuthenticating, isWeb3EnableLoading } = useMoralis()
    const { getBalances, data: balance, nativeToken } = useNativeBalance({ chain : "bsc testnet" });


    const [balance_, setBalance] = useState(null)
    const [game_balance_, setGame_balance_] = useState(null)

    const [address, setAddress] = useState(null)
    const [currency, setCurrency] = useState(null)
    const {gmt_token_won, setGmt_token_won} = useContext(Context);
    const [game_currency, setGame_currency] = useState(null)
    const [on, setOn] = useState(false)

    const {game_status, setGame_status} = useContext(Context);
    const {status_function} = useContext(Context);
    const {alert_status_exit, setAlert_status_exit} = useContext(Context);  

    const {stake_set, setStake_set} = useContext(Context);

    const {get_stake_status} = useStakeStatus()

    const history = useNavigate();
  

    const enableandauthenticate = async () =>{
      
      await enableWeb3()
      await authenticate()
      get_stake_status()
      setOn(true)
    }
  
       
      const set_balance = async() =>{
        const options = { chain: 'bsc testnet', address: user.attributes.accounts }

        const balances = await Moralis.Web3API.account.getTokenBalances(options);

        const bnb_balances = await Moralis.Web3API.account.getNativeBalance(options);

        console.log("balances heree -->", balances[0].balance)

        const tokenValue = Moralis.Units.FromWei(bnb_balances.balance)
        console.log("tokenValue --->", tokenValue)
        
        setGame_balance_(Moralis.Units.FromWei(balances[0].balance))
        setBalance(tokenValue.toString().substr(0, 4))
        setCurrency("BNB")
        setGame_currency("GTM")
        } 
   
      
      
      useEffect(() => {
        if(isWeb3Enabled && user && !isWeb3EnableLoading || isAuthenticating){
          setAddress(user.attributes.accounts.toString().substr(0, 10))
          set_balance()
          //history('/menu')
          }

        }, [user, game_status]) 
  return (
    <>

        
        <div className="GameContainer">
                <h1>GAME</h1>
                <User/>
        
                
                <button className ="ConnectButton" onClick={() =>{ 
                if(!isWeb3Enabled || !isAuthenticated){
                    enableandauthenticate()
                }else{
                    setStake_set(null)
                    logout()
                }
                }} > {isAuthenticating || isWeb3EnableLoading ? <div> LOADING </div> : !isWeb3Enabled || stake_set === null ? <div>CONNECT WALLET</div> : <div>LOGOUT</div>}</button>
      
                      { isWeb3Enabled && user && stake_set !== null ? <Menu balance ={balance_} address={address}/> : null}
        </div>

        <Snackbar
              open={alert_status_exit}
              autoHideDuration={3000}
              onClose={() => {
                setAlert_status_exit(false);
              }}
            >
              <Alert severity="success">Congratulation you won {gmt_token_won} GMT!</Alert>
            </Snackbar>
    
    </>
  )
}

export default Login