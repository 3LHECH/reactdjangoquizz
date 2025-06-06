import { configureStore } from "@reduxjs/toolkit";
import { signApiSlice } from "../features/userLogique/signUp";
import userReducer from '../features/userLogique/userCridentials';
import { quizzApiSlice } from "../features/quizzlogique/quizz";
import { questionApiSlice } from "../features/quizzlogique/question";
export const store = configureStore({
    reducer: {
        user: userReducer,
        [signApiSlice.reducerPath]: signApiSlice.reducer,
        [quizzApiSlice.reducerPath]:quizzApiSlice.reducer,
        [questionApiSlice.reducerPath]:questionApiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware().concat(signApiSlice.middleware,quizzApiSlice.middleware,questionApiSlice.middleware),
});

export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;
