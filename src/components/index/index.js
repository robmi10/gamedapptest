import React from 'react'
import Menu from '../Menu/menu'
import { useMoralis, useERC20Balances, useNativeBalance} from "react-moralis";
import { useState, useEffect } from 'react';
import "./index.css"
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import {Gtm_address, Game_address} from "../../address/address";
import Login from '../Account/login';
import User from '../Account/user';

const Index = () => {
    const { web3, enableWeb3, authenticate, Moralis, isAuthenticated, isWeb3Enabled, user, logout, isAuthenticating, isWeb3EnableLoading } = useMoralis()
    const { getBalances, data: balance, nativeToken } = useNativeBalance({ chain : "bsc testnet" });
    const [balance_, setBalance] = useState(null)
    const [game_balance_, setGame_balance_] = useState(null)

    const [address, setAddress] = useState(null)
    const [currency, setCurrency] = useState(null)

    const [game_currency, setGame_currency] = useState(null)
    const [on, setOn] = useState(false)
  
  

    const enableandauthenticate = async () =>{
      await enableWeb3()
      await authenticate()
      setOn(true)
    }
  

  return (
    <>
 

   
    </>
  )
}

export default Index