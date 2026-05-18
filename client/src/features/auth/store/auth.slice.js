import {createSlice} from '@reduxjs/toolkit';

const AuthSlice = createSlice({
    name: "auth",

    initialState: {
        user: null,
        isAuthenticated: false,
        loading: true
    },

    reducers: {
        setUser: (state, action)=>{
            state.user = action.payload;
            state.isAuthenticated = action.payload
        }
    }
});

export const {setUser} = AuthSlice.actions;
export default AuthSlice.reducer;