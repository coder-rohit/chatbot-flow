import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

interface position {
    x: number;
    y: number;
}
interface data {
    label: string;
}

export interface NodeInterface {
    id: string,
    type: string,
    position: position,
    data: data
}

const initialState: NodeInterface[] = [
    {
        id: "a",
        type: "input",
        position: { x: 0, y: 0 },
        data: { label: "wixsre" },
    },
]

export const nodeSlice = createSlice({
    name: 'node',
    initialState,
    reducers: {
        addNewNode: (state, action: PayloadAction<NodeInterface>) => {
            console.log(action.payload)
            console.log(initialState)
        },
    },
})

// Action creators are generated for each case reducer function
export const { addNewNode } = nodeSlice.actions

export default nodeSlice.reducer