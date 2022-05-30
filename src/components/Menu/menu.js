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
import InsideMenu from './insidemenu';

const Menu = () => {
  
//console.log("Game_contract->",Game_contract)

const { web3, enableWeb3, authenticate, Moralis, isAuthenticated, isWeb3Enabled, user, logout, isAuthenticating, isWeb3EnableLoading } = useMoralis()
const {status_function} = useContext(Context);
const {startGame, playState} = usePlay(Game_address)
const {current_game, setCurrent_game} = useContext(Context);

const {fruit_play, setFruit_play} = useContext(Context);
const {flamingo_play, setFlamingo_play} = useContext(Context);




const [tabvalue, setTabvalue] = useState("1")

const handleChange = (event, newValue) => {
  setTabvalue(newValue);
};

const history = useNavigate();
const RouteFruitCrush= () =>{ 
  setCurrent_game("fruitcrush")
  startGame("fruitcrush")
 
}

const RouteFlappyFlamingo = () =>{ 
  setCurrent_game("flappyflamingo")
  console.log("RouteFlappyFlamingo current game ->", current_game)
  startGame("flappyflamingo")
}

useEffect(() => {
  Aos.init({duration: 2000});
  console.log("status_function change route ->",status_function)
  if(status_function){
    console.log("inside change route menu")
    
  }
  
}, [status_function])


  return (
    <> 
                <TabContext value={tabvalue}>
                  <div className="OutContainer">
                    <div style={{ marginLeft: "35%"}}>
                    <TabList onChange={handleChange} aria-label="lab API tabs example">
                          <Tab label="PLAY" value="1" />
                          <Tab label="PROFILE" value="2" /> 
                    </TabList>
                    </div>
                    <TabPanel value="1"><div className="MenuContainer" data-aos ="fade-right"> 
                    {fruit_play == "mining" ? <button className="ButtonDes" 
                      ><CircularProgress/></button> : <button className="ButtonDes" onClick={() => {RouteFruitCrush()}}>
                      FRUIT CRUSH</button>}

                      {flamingo_play == "mining" ? <button className="ButtonDes" 
                      ><CircularProgress/></button> : <button className="ButtonDes" onClick={() => {RouteFlappyFlamingo()}}>
                      FLAPPY FLAMINGO</button>}

                      </div></TabPanel>
                      <TabPanel value="2"><InsideMenu/> </TabPanel>
                </div>
               
                </TabContext>
              
    </>
  )
}

export default Menu