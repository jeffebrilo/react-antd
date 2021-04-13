import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  boardSize: {},
  initialPos: {},
  pos: {},
  checked: [],
  moves: [],
  busy: false,
  visible: false,
};

export const boardSlice = createSlice({
  name: 'board',
  initialState,
   reducers: {
    setBoardSize: (state, action) => {
      state.boardSize = action.payload;
    },
    clearMoves: (state) => {
      state.moves = [];
    },
    setInitialPos: (state, action) => {
      state.initialPos = action.payload;
    },
    setPos: (state, action) => {
      state.pos = action.payload;
    },
    setBusy: (state, action) => {
      state.busy = action.payload;
    },
    setChecked: (state, action) => {
      if (action.payload) {
        if (!state.checked.filter(_pos => JSON.stringify(action.payload) === JSON.stringify(_pos)).length) state.checked.push(action.payload)
      }
      else state.checked = []
    },
    toggleVisible: (state) => {
      state.visible = !state.visible
    },
    moveRandom: (state) => {
      let validMoves = []; // 'Up', 'Down', 'Left', 'Right'
      if (state.pos.y > 0) validMoves.push('Up');
      if (state.pos.y < (state.boardSize.y - 1)) validMoves.push('Down');
      if (state.pos.x > 0) validMoves.push('Left');
      if (state.pos.x < (state.boardSize.x - 1)) validMoves.push('Right');
      const move = validMoves.sort(() => 0.5 - Math.random())[0] //shuffle and get first
      state.moves.push(move);
      if (move === 'Up') state.pos.y -= 1; 
      else if (move === 'Down') state.pos.y += 1; 
      else if (move === 'Left') state.pos.x -= 1;  
      else if (move === 'Right') state.pos.x += 1;  
    }
  },
});

export const { setBoardSize, clearMoves, setInitialPos, setPos, moveRandom, setBusy, setChecked, toggleVisible } = boardSlice.actions;

export const getBoardSize = (state) => state.board.boardSize;
export const getInitialPos = (state) => state.board.initialPos;
export const getPos = (state) => state.board.pos;
export const getMoves = (state) => state.board.moves;
export const getChecked = (state) => state.board.checked;
export const isBusy = (state) => state.board.busy;
export const isVisible = (state) => state.board.visible;

export default boardSlice.reducer;