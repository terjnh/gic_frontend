import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';


const initialState = {
    value: 0,
    status: 'init'
}


export const employeeSlice = createSlice ({
    name: 'employeeList',
    initialState,
    reducers: {
        testAdd: (state) => {
            state.value += 1;
        }
    }
});

export const { testAdd } = employeeSlice.actions;

export const selectEmployees = (state) => state.employeeList.value;

export default employeeSlice.reducer;
