import styled from "styled-components"
import { useEffect, useState } from 'react';
import bg_map from "./images/map2.jpg";
import flamingo from "./images/flamingo4.svg";
import Bird from './components/bird';
import Container from './components/container';
import GameBox from './components/map';
import Obstacle from './components/obstacle';
import Scoretable2 from './components/scoretable2'

const BIRD_SIZE = 60;
const GAME_WIDTH = 500;
const GAME_HEIGHT = 500;
const GRAVITY = 6
const JUMP_HEIGHT = 50;
const OBSTACLE_HEIGHT = 0
const OBSTACLE_WIDTH = 40
const OBSTACLE_LEFT = 0
const gap = 200

let timeId;
function Flappyflamingo() {
  const [birdposition, setBirdposition] = useState(250)
  const [gameStarted, setGameStarted] = useState(250)

  const [obstacle_height, setObstacle_height] = useState(100)
  const [obstacle_width, setObstacle_width] = useState(0)
  const [obstacle_left, setObstacle_left] = useState(GAME_WIDTH - OBSTACLE_WIDTH)
  const [counter, setCounter] = useState(0)
  const [set, setSet] = useState(0)

  const [speed, setSpeed] = useState(10)

  const [score, setScore] = useState(0)

  const bottom_obstacle_height = GAME_HEIGHT - gap - obstacle_height
  //console.log("bg_map -->", bg_map)
 
  const jump = () =>{
    let newbird_position = birdposition - JUMP_HEIGHT
    if(!gameStarted){
        setGameStarted(true)
        setScore(0)
        setBirdposition(250)
    }
    else if(newbird_position < 0){
      setBirdposition(0)
    }else{
      setBirdposition(newbird_position)
    }


    setBirdposition(newbird_position)
  }

  const handler = (e)=> {
    if (e.isComposing || e.keyCode === 32) {
      jump()
    }
  };


  useEffect(() => {
      let current_count = setInterval(() => {

        console.log("current speed ->", speed)
        setSpeed(speed => speed + 5)

    }, 5000);

    return() =>{
      clearInterval(current_count)
    }
  }, [counter])
  

  useEffect(() => {

    const hascollided_top_obstacle = birdposition >= 0 && birdposition < obstacle_height

    const hascollided_bottom_obstacle = birdposition <= GAME_HEIGHT && birdposition >= GAME_HEIGHT - bottom_obstacle_height

    if(obstacle_left >= 0 && 
      obstacle_left <= OBSTACLE_WIDTH && 
      (hascollided_top_obstacle || hascollided_bottom_obstacle)){
        console.log("inside set game false")
        setGameStarted(false)
        setSpeed(5)
  }}, [birdposition, obstacle_height, bottom_obstacle_height, obstacle_left])
  
  
  useEffect(() => {
      let obstacleId;
      if(gameStarted && obstacle_left >= - OBSTACLE_WIDTH){
        obstacleId = setInterval(() => {
            setObstacle_left(obstacle_left => obstacle_left - speed)
        }, 30);
        return() =>{
          clearInterval(obstacleId)
        }
      }
      else{
        setObstacle_left(GAME_WIDTH - OBSTACLE_WIDTH)
        setObstacle_height(Math.floor(Math.random() * (GAME_HEIGHT - gap)))
        setScore((score) => score + 5)
      }
  }, [gameStarted, obstacle_left])
  
  useEffect(() => {
    window.addEventListener('keydown', handler, false);

    if(gameStarted && birdposition < GAME_HEIGHT - BIRD_SIZE){
      timeId = setInterval(() => {
        setBirdposition((birdposition) => birdposition + GRAVITY)
      }, 30);
    }

    return () =>{
      
      window.removeEventListener('keydown', handler, false)
      clearInterval(timeId)
    }
  }, [gameStarted, birdposition])
  
  return (
    <>
      <div className="ContainerGame">
          <div className="Gamebox">
     
            
            <Obstacle
            top={0}
            width={OBSTACLE_WIDTH}
            height={obstacle_height}
            left={obstacle_left}
            />

            <Obstacle
            top={GAME_HEIGHT - (obstacle_height + bottom_obstacle_height)}
            width={OBSTACLE_WIDTH}
            height={bottom_obstacle_height}
            left={obstacle_left}
            />

            <Bird size ={BIRD_SIZE} top={birdposition} image={flamingo}/>
          </div>
          <Scoretable2 score ={score}/> 
      </div>

    
     
  
    </>
  );
}

export default Flappyflamingo;
