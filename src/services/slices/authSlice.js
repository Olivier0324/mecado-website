//creating authslice
import { createSlice } from "@reduxjs/toolkit";
//saving user and token in state and also localstate
const initialState = {
    token: localStorage.getItem("token") || null
}
const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {
            state.loading = false;
            state.user = action.payload.user;
            state.token = action.payload.token;
            // localStorage.setItem("user", JSON.stringify(action.payload.user));
            localStorage.setItem("token", action.payload.token);
        },
        logout: (state) => {
            state.user = null;
            state.token = null;
            localStorage.removeItem("user");
            localStorage.removeItem("token");
        }
    }
});
export const { login, logout } = authSlice.actions;
export default authSlice.reducer;

