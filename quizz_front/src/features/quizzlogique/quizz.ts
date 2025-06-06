import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Quizz {
    id: number;
    creator: number;  
    title: string;
    created_at: string; 
}


export const quizzApiSlice = createApi({
    reducerPath: 'Quizz',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://127.0.0.1:8000/quizz/',
        prepareHeaders: (headers) => {
            const token = JSON.parse(localStorage.getItem('authTokens') || "").access;
            if (token) {
                headers.set('authorization', `Bearer ${token}`);
            }
            return headers;
        }
    }),
    tagTypes: ['Quizzes'],
    endpoints: (builder) => ({
        getQuizzes: builder.query<Quizz[], void>({
            query: () => 'quizzes/',
            providesTags: ['Quizzes']
        }),
        createQuizz: builder.mutation<Quizz, Partial<Quizz>>({
            query: (quizz) => ({
                url: 'quizzes/',
                method: 'POST',
                body: quizz,
            }),
            invalidatesTags: ['Quizzes']
        }),
        updateQuizz: builder.mutation<Quizz, { id: number; quizz: Partial<Quizz> }>({
            query: ({ id, quizz }) => ({
                url: `quizzes/${id}/`,
                method: 'PATCH',
                body: quizz,
            }),
            invalidatesTags: ['Quizzes']
        }),
        deleteQuizz: builder.mutation<{ success: boolean }, number>({
            query: (id) => ({
                url: `quizzes/${id}/`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Quizzes']
        }),
    })
});

export const {
    useGetQuizzesQuery,
    useCreateQuizzMutation,
    useUpdateQuizzMutation,
    useDeleteQuizzMutation
} = quizzApiSlice;
