//creating slice for persisting theme in localstorage
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    theme: localStorage.getItem("theme") || "light"
}

const themeSlice = createSlice({
    name: "theme",
    initialState,
    reducers: {
        setTheme: (state) => {
            state.theme = state.theme == 'dark' ? 'light' : 'dark';
            localStorage.setItem("theme", state.theme);
        }
    }
}
);
export const { setTheme } = themeSlice.actions;
export default themeSlice.reducer;