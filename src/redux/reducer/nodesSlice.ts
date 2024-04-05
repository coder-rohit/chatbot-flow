import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface T {
    showSettingPanel: boolean,
    nodeID: string,
    nodeName: string
}

const initialState: T = {
    showSettingPanel: false,
    nodeID: "",
    nodeName: ""
}

export const nodeSlice = createSlice({
    name: 'node',
    initialState,
    reducers: {
        changeData: (state:any, action: PayloadAction<any>) => {
            state.showSettingPanel = action.payload.showSettingPanel
            state.nodeID = action.payload.nodeID
            state.nodeName = action.payload.nodeName
        },
    },
})

export const { changeData } = nodeSlice.actions

export default nodeSlice.reducer