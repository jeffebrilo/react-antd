import { configureStore } from '@reduxjs/toolkit'
import boardReducer from './components/Lab/slice';

export default configureStore({
  reducer: {
    board: boardReducer
  },
})