import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter,
  Router,
  Routes,
  Route,
} from "react-router-dom";
import { ContextProvider } from './components/Context/context';
import Board from "./components/Game/Fruitcrush/board"
import Menu from './components/Menu/menu';
import Login from './components/Account/login';
import "./components/index/index.css"
import Index from './components/index';
import { Context } from './components/Context/context';
import { useContext } from 'react';
import { CircularProgress, Alert  } from '@mui/material';
import Flappyflamingo from './components/Game/Flappybird/Flappyflamingo';
function App() { 
  const {game_status, setGame_status} = useContext(Context);  
  const {status_function, setStatus_function} = useContext(Context);

  return (
    <div className="App">

          {game_status ?  null : <div className="GameFirstContainer"> 
              <Login/>
          </div>}

          
        
          <Routes>
            <Route exact path="/" element={<Index />}/>   
            <Route exact path="/fruitcrush" element={<Board />}/>
            <Route exact path="/flappyflamingo" element={<Flappyflamingo/>}/>
          </Routes>

          


    </div>
  );
}


export default App;
