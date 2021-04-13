import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setBoardSize, clearMoves, setInitialPos, setPos, moveRandom, getMoves, isBusy, setBusy, setChecked, getChecked, isVisible, toggleVisible } from './Lab/slice';

import Tile from './Lab/Tile';
import './Lab/Lab.css'; 
import './Lab/arrows.scss'; 

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

const boardSize = {
  x: 3, 
  y: 3,
}; 

function getRandomPos() {
  return {
    x: getRandomInt(boardSize.x), 
    y: getRandomInt(boardSize.y),
  }
}

const board = [];

for (const [y] of [...Array(boardSize.y).keys()].map(item => parseInt(item)).entries()) {
    //const row = [];
    for (const [x] of [...Array(boardSize.x).keys()].map(item => parseInt(item)).entries()) {
      let id = x.toString() + '-' + y.toString();
      board.push(<Tile key={id} x={x} y={y} />)
      //row.push(<Tile key={id} x={x} y={y} />)
    }
    //board.push(<div className="row" key={y} title={y}>{row}</div>)
}




function Lab() {

    const dispatch = useDispatch();
    
    const setRNGPos = () => {
      let pos = getRandomPos();
      dispatch(clearMoves());
      dispatch(setInitialPos(pos));
      dispatch(setPos(pos));
      dispatch(setChecked());
    }

    useEffect(() => {
      dispatch(setBoardSize(boardSize));    
      //setRNGPos();    
    }, []); // eslint-disable-line react-hooks/exhaustive-deps
 
    const moves = useSelector(getMoves)
    
    const show = useSelector(isVisible)

    return (
      <>
      <label> 
        
        <input
          name="show"
          type="checkbox"
          checked={show}
          onChange={() => dispatch(toggleVisible())} 
        /> show
      </label>


      <div className={`tiles ${useSelector(getChecked).length || show ? 'show' : ''}`}>
        {board}
      </div>

      <button
          disabled={useSelector(isBusy)}
          onClick={() => {
            dispatch(setBusy(true));
            setRNGPos();
            let step = 0;
            let intervalID = setInterval(() => {
              dispatch(moveRandom());
              if (++step === 10) {
                clearInterval(intervalID);
                dispatch(setBusy(false));
              }
            }, 1000);
          }}
        >
      Start
      </button>

      <div className="moves">
        {moves.map((move, index) => <div key={`move-${index}`} className={`move icon-arrow-${move.toLowerCase()}`} ></div>)}
      </div>

      </>
    );
  
}

  
export default Lab;