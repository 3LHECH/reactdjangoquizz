import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface UserCreateUpdate {
    id?:number;
    email?: string;
    password?: string;          
    first_name?: string;
    last_name?: string;
    profession?: string;
    bio?: string;               
    birth_date?: string;        
    profile_picture?: File;     

}
export interface User {
    id:number;
    email: string;
    password: string;          
    first_name: string;
    last_name: string;
    profession: string;
    bio?: string;               
    birth_date?: string;        
    profile_picture?: string;     

}
export interface LoginUser {
    email: string;
    password: string;
}
export interface UserToken {
    refresh: string;
    access: userName;
}
export interface UserRefreshToken {
    access: string;
}
export interface ErrorMessage {
    data:backendErrorMessage ;
    status : string ;
}
interface backendErrorMessage{
    detail:string;
}
interface refresh{
    refresh: string;
}
export interface userName{
    first_name:string ;
}

export const signApiSlice = createApi({
    reducerPath: 'sign',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://127.0.0.1:8000/user/',
    }),
    endpoints: (builder) => ({
        createUser: builder.mutation<UserCreateUpdate, User>({
            query: (user: User) => {
                const formData = new FormData();
                formData.append('email', user.email);
                formData.append('password', user.password);
                formData.append('first_name', user.first_name);
                formData.append('last_name', user.last_name);
                formData.append('profession', user.profession);
        
                if (user.bio) formData.append('bio', user.bio);
                if (user.birth_date) formData.append('birth_date', user.birth_date);
                if (user.profile_picture) formData.append('profile_picture', user.profile_picture);
        
                return {
                    url: "/users/",
                    method: "POST",
                    body: formData,
                };
            },
        }),
        updateUserToken:builder.mutation<UserToken,refresh>({
            query: (refresh: refresh) => ({
                url: "/api/token/refresh/",
                method: "POST",
                body: refresh,
            }) ,
        }),
        verifyUser:builder.mutation<UserRefreshToken ,string>({
            query: (access: string) => ({
                url: "/api/token/verify/",
                method: "POST",
                body: access,
            }) ,
        }),
        loginUser : builder.mutation<UserToken,LoginUser>({
            query: (email: LoginUser) => ({
                url: "/api/token/",
                method: "POST",
                body: email,

            }),
        }),
        getOneUser : builder.mutation<User,number>({
            query: (id:number) => ({
                url: `/users/${id}/`,
                method: "GET",
            }),
        }),
        updateUser: builder.mutation<User, UserCreateUpdate>({
            query: (user: UserCreateUpdate) => {
                const formData = new FormData();
                formData.append('email', user.email);
                formData.append('password', user.password);
                formData.append('first_name', user.first_name);
                formData.append('last_name', user.last_name);
                formData.append('profession', user.profession);
        
                if (user.bio) formData.append('bio', user.bio);
                if (user.birth_date) formData.append('birth_date', user.birth_date);
                if (user.profile_picture) formData.append('profile_picture', user.profile_picture);
        
                return {
                    url: `/users/${user.id}/`,  
                    method: "PATCH",            
                    body: formData,
                };
            },
        }),
    }),

});

export const { useCreateUserMutation,useGetOneUserMutation,useUpdateUserMutation , useLoginUserMutation ,useUpdateUserTokenMutation ,useVerifyUserMutation} = signApiSlice;
