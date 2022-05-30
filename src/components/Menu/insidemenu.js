import React from 'react'
import "./menu.css"
import "aos/dist/aos.css"
import Aos from 'aos'
import { useState, useEffect, useContext } from 'react';
import { Link, useNavigate  } from "react-router-dom";
import {usePlay} from '../Functions/usePlay'
import Game_contract from "../../chain-info/contracts/Game.json"
import { Context } from '../Context/context';
import {Gtm_address, Game_address} from "../../address/address"
import { useMoralis, useERC20Balances, useNativeBalance} from "react-moralis";
import { CircularProgress, Alert  } from '@mui/material';
import User from '../Account/user';
import Login from '../Account/login';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import { useStake } from '../Functions/useStake';
import { useApprove } from '../Functions/useApprove';

import Game from "../../chain-info/deployments/97/0xfA933122A287535b772Bf590F9B2f75fc103DbBA.json"
import Weth_token from "../../chain-info/deployments/97/0x067ab44441df377648667A2C9FCc4d35A6a9a35b.json"

import GMT_token from "../../chain-info/deployments/97/0x163FBbFAc25F0eADDD9C29dCa957aeCb8169eD31.json"
import { useUnstake } from '../Functions/useUnstake';
const InsideMenu = () => {
  
//console.log("Game_contract->",Game_contract)

const { web3, enableWeb3, authenticate, Moralis, isAuthenticated, isWeb3Enabled, user, logout, isAuthenticating, isWeb3EnableLoading } = useMoralis()
const {status_function} = useContext(Context);

const {stake} = useStake()
const {unstake} = useUnstake()

const {approve} = useApprove()

const [tabvalue, setTabvalue] = useState("1")

const [input_amount, setInput_amount] = useState(0)
const {stake_amount, setStake_amount} = useContext(Context);
const {stake_address, setStake_address} = useContext(Context);

const {game_abi, setGame_abi} = useContext(Context);

const {rate_stake, setRate_stake} = useContext(Context);

const {stake_set, setStake_set} = useContext(Context);

const {amount_stake, setAmount_stake} = useContext(Context);

const {current_timestamp, setCurrent_timestamp} = useContext(Context);

const {stake_status, setStake_status} = useContext(Context);
const {unstake_status, setUnstake_status} = useContext(Context);


const {award_token, setAward_token} = useContext(Context);

const staked_amount = Moralis.Units.FromWei(parseInt(amount_stake._hex, 16).toString())

//console.log("current_timestamp -->", parseInt(current_timestamp, 16))

const handleChange = (event, newValue) => {
  setTabvalue(newValue);
};
const {abi} = Game

const Start_staking = () =>{
  console.log("input_amount Start_staking ->", input_amount)
  setStake_amount(input_amount)
  setStake_address(input_amount)
  //console.log("input_amount -->",input_amount)
  setGame_abi(abi)

  approve(input_amount).then(() =>{
    stake(input_amount)
  })
  
}

const Unstake = () =>{
  console.log("inside unstake function")  
  unstake()
}

useEffect(() => {
  
  Aos.init({duration: 2000});
  console.log("status_function change route ->",status_function)
  if(status_function){
    console.log("inside change route menu")

    console.log("amount_stake._isBigNumber ->", amount_stake._hex)
    
  }
  
}, [status_function, stake_set])


  return (
    <> 
                <TabContext value={tabvalue}>
                  <div className="InsideContainer" >
                    <div style={{ marginLeft: "35%", color: "white"}}>
                      <TabList onChange={handleChange} style={{color: "white"}}aria-label="lab API tabs example">
                            <Tab label="STAKE" value="1" />
                            <Tab label="RATE" value="2" /> 
                      </TabList>
                    </div>

                    <TabPanel value="1"><div className="MenuContainer2" data-aos ="fade-right"> 
                        <span>
                        <h1 style={{ marginTop: "-30px"}}> BNB TOKEN</h1>
                        {stake_set ? 
                        <div>
                        <h1>{staked_amount}</h1>

                        {unstake_status == "mining" ? <button className="ButtonDes"  style={{ marginTop: "20px", width: "60%"}}><CircularProgress/></button> :
                        <button className="ButtonDes"  style={{ marginTop: "20px", width: "60%"}} onClick={() =>{Unstake()}}>UNSTAKE</button>
                        }

                        </div>
                        : 
                        <div>
                        <Input
                        value={input_amount}
                        onChange={e => setInput_amount(e.target.value)}
                        />
                        {stake_status == "mining" ? <button className="ButtonDes"  style={{ marginTop: "20px"}}><CircularProgress/></button>: 
                        <button className="ButtonDes"  style={{ marginTop: "20px"}} onClick={() =>{Start_staking()}}>STAKE</button>}
                        </div> 
                        }
                        
                        </span>
                        </div>
                      </TabPanel>
                      
                     { stake_set ? <TabPanel value="2"><h1>{rate_stake}</h1> <h2>{amount_stake._hex}</h2> <h3>Status here: {stake_set}</h3></TabPanel> :
                     <TabPanel value="2"><h1>0</h1> <h3>Status here: {stake_set}</h3></TabPanel> }
                </div>
               
                </TabContext>
              
    </>
  )
}

export default InsideMenu