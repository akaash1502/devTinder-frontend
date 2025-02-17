import { createSlice } from "@reduxjs/toolkit";

const requestSlice = createSlice({
    name: "request",
    initialState: null,
    reducers: {
        addRequests: (state, action) => action.payload,
        removeRequests: (state, action) => {
            //action will be request id
            const newArray = state.filter((request) => request._id !== action.payload); 
            return newArray;
        },
    },
});

export const { addRequests,removeRequests } = requestSlice.actions;
export default requestSlice.reducer;