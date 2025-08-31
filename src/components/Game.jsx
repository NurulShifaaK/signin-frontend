import React from 'react'
import Square from './Square'

const Game = ({ board ,handleclick}) => {

   
  return (
    
      <div className='grid grid-cols-3 gap-2 w-[300px]'>
        {board.map((val, i) => (
            <Square key={i} value={val} i={i}
            onClick={()=> handleclick(i)}
            />
        
        ))}
      </div>
    
  )
}

export default Game
