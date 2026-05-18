import { configureStore } from "@reduxjs/toolkit";
import AuthStore from "../features/auth/store/auth.slice.js";

const store = configureStore({
    reducer: AuthStore
});

export default store;