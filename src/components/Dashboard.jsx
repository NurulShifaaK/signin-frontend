import React, { useEffect } from 'react'
import { useState } from 'react'
import Score from './Score';
import Game from './Game';

import { checkwinner } from './utils/winner';
import { getAIMoveFromOpenRouter } from './utils/aiOpenRouter';


const Dashboard = () => {
    
        //state for the board 3X3 (9 cells)
    
    const[board,setboard]=useState(Array(9).fill(null));
    
    //Is it a Player Turn?
    const[playerturn,setplayerturn]=useState(true);
    
    //who won the match?("X" for human,("O") for ai,("Draw"))
    
    const [winner,setwinner]=useState(null);
    
    //score tracking
    const[score,setscore]=useState({X:0,O:0})

    //When a player click a square

    const handleclick=(i)=>{
       if(!playerturn || board[i] || winner)return;

       const newBoard =[...board];

       newBoard[i] = "X";

       setboard(newBoard)
      
       setplayerturn(false);
    
      
    }
  useEffect(()=>{

    if(winner) return //prevent double scoring

    //check if someone has won

    const result = checkwinner(board);
       

         if(result?.winner){
              setwinner(result.winner);
              if(result?.winner === "X" || result.winner === "O"){
      
        setscore((prev)=>({  
            ...prev,
            [result.winner]:prev[result.winner]+1
        }))

        return;
    }
         }


  
    // check if it's a AI's turn and game not over

    if(!playerturn && !winner){
        const aiturn = async()=>{

    const move= await getAIMoveFromOpenRouter(board);
  
    if(move != null && board[move]===null){
        const newBoard = [...board];
        newBoard[move]="O";
        setboard(newBoard);
        setplayerturn(true);

    }
  }

  const timeout = setTimeout(aiturn,600);
  return ()=> clearTimeout(timeout);
     }


  },[board,playerturn,winner])  

  //restart the game

  const restartgame = ()=>{
    setboard(Array(9).fill(null));
    setplayerturn(true);
    setwinner(null);
  }
  return (
   <>
   <div className='min-h-screen bg-[#0F172A] text-white flex flex-col items-center justify-center'>
    <h1 className='text-3xl font-bold mb-4'>Tic Tac T<span className='text-amber-500'>AI</span></h1>
  <Score score={score} />
  
  <Game board={board} handleclick={handleclick}/>

  {winner&& (
    <div className='mt-4 text-xl'>
        {winner === "Draw" ? "it's a draw" : `${winner} wins!`}
        <button className='ml-4 px-4 py-2 bg-blue-400 rounded-2xl text-black hover:bg-fuchsia-400' onClick={restartgame}>
            Play Again
        </button>
    </div>
  )}
  
   </div>
   </>
  )
}

export default Dashboard