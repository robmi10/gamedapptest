import React, { useContext } from 'react'
import Menu from '../Menu/menu'
import { useMoralis, useERC20Balances, useNativeBalance} from "react-moralis";
import { useState, useEffect } from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import {Gtm_address, Game_address} from "../../address/address";
import "../../index.css"
import { Context } from '../Context/context';
import "aos/dist/aos.css"
import Aos from 'aos'
import { useStakeStatus } from '../Functions/useGetStakeStatus';
import Rate_count from '../Functions/Timer/rate_count';

const User = () => {
    const { web3, enableWeb3, authenticate, Moralis, isAuthenticated, isWeb3Enabled, user, logout, isAuthenticating, isWeb3EnableLoading } = useMoralis()
    const [balance_, setBalance] = useState(null)
    const [game_balance_, setGame_balance_] = useState(null)
    const {game_status, setGame_status} = useContext(Context);
    const {current_timestamp, setCurrent_timestamp} = useContext(Context);

    const [address, setAddress] = useState(null)
    const [currency, setCurrency] = useState(null)

    const [game_currency, setGame_currency] = useState(null)
    const [on, setOn] = useState(false)
    const {status_function, setStatus_function} = useContext(Context);
    const {status_function_exit, setStatus_function_exit} = useContext(Context);

    const {get_stake_status} = useStakeStatus()
    const {stake_set, setStake_set} = useContext(Context);
   

    const enableandauthenticate = async () =>{
      await enableWeb3()
      await authenticate()
      
      setOn(true)
    }
  
       
        const set_balance = async() =>{
          const options = { chain: 'bsc testnet', address: user.attributes.accounts }

          const balances = await Moralis.Web3API.account.getTokenBalances(options);
  
          const bnb_balances = await Moralis.Web3API.account.getNativeBalance(options);

          console.log("ALL balances heree -->", balances)

          console.log(" bnb_balances --->", bnb_balances)
  
          console.log("balances heree -->", balances[0].balance)
  
          const tokenValue = Moralis.Units.FromWei(bnb_balances.balance)
          console.log("tokenValue --->", tokenValue)
          
          setGame_balance_(Moralis.Units.FromWei(balances[5].balance))
          setBalance(tokenValue.toString().substr(0, 4))
          setCurrency("BNB")
          setGame_currency("GTM")

        } 
   
      useEffect(() => {
        Aos.init({duration: 2000});
        if(isWeb3Enabled && !isWeb3EnableLoading || isAuthenticating){
          setAddress(user.attributes.accounts.toString().substr(0, 10))
          set_balance()
          //get_stake_status()
          }
        }, [user, game_status])
  return (
    <>
        
    { isWeb3Enabled && user && address != null && balance_ != null && stake_set !== null ? <div className="AccountBox" data-aos ="fade-left">
                    <AccountCircleIcon/>
                    <p>USER: {address}</p>
                    <p>BALANCE: {balance_} BNB</p> 
                    <p>{game_balance_} GTM</p>
                    <Rate_count/>
            </div> : null}
        
    </>
  )
}

export default User