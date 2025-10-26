import { configureStore } from "@reduxjs/toolkit";
import postsReducer from "../reducer/postsSlice";

export const store = configureStore({
    reducer: {
        posts: postsReducer,
    },
});

export default store;
