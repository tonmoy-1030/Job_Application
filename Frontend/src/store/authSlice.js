import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    authenticated: false,
    userData: null,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login(state, action) {
            state.authenticated = true
            state.userData = action.payload.userData
        },
        logout(state) {
            state.authenticated = false;
            state.userData = null;
        }
    }
})

export const { login, logout } = authSlice.actions
export const authReducer = authSlice.reducer;