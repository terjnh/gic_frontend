import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';


const initialState = {
    value: [],
    status: 'init'
}


export const employeeSlice = createSlice ({
    name: 'employeeList',
    initialState,
    reducers: {
        testAdd: (state) => {
            state.value = {
                "name": "sampleName",
                "age": "sampleAge"
            }
        }
    }
});

export const { testAdd } = employeeSlice.actions;

export default employeeSlice.reducer;
