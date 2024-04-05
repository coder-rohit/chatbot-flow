import { configureStore } from '@reduxjs/toolkit'
import nodeReducer from './reducer/nodesSlice'


export const store = configureStore({
  reducer: {
    nodeReducer: nodeReducer
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch