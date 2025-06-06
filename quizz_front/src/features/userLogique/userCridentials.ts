import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { jwtDecode ,type UserIDJwtPayload} from 'jwt-decode';

export interface UserState {
    id:number
    first_name: string;
    email : string;
    profile_picture: string;
    exist: boolean;
}

export const initialState: UserState = {
    id:-1,
    first_name: "",
    email : "",
    profile_picture: "",
    exist: false
};

declare module "jwt-decode" {
    export interface UserIDJwtPayload {
        id:number,
        first_name: string;
        email : string;
        profile_picture: string;
    }
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        userExist(state, action: PayloadAction<string>) {
            state.first_name = action.payload;
            state.exist = true;
        },
        userVanished(state) {
            state.id = -1;
            state.first_name = "";
            state.email ="";
            state.profile_picture ="";
            state.exist = false;
        },
        userGetUser(state) {
            const authTokens = localStorage.getItem('authTokens');
            if (authTokens) {
                const token: UserIDJwtPayload = jwtDecode(JSON.parse(authTokens).access);
                state.id = token.id;
                state.first_name = token.first_name;
                state.email = token.email;
                state.profile_picture = "http://127.0.0.1:8000/"+token.profile_picture;
                state.exist = true;
            } else {
                state.id = -1;
                state.first_name = "";
                state.email ="";
                state.profile_picture ="";
                state.exist = false;
            }
        },
        logOut(state) {
            if (localStorage.getItem('authTokens')) {
                localStorage.removeItem('authTokens');
            }
            state.id = -1;
            state.first_name = "";
            state.email ="";
            state.profile_picture ="";
            state.exist = false;
        }
    }
});

export const { userExist, userVanished, userGetUser, logOut } = userSlice.actions;

export default userSlice.reducer;
