import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Question {
    id: number;
    quizz: number;  // the quiz ID it belongs to
    type: "DS" | "IOT" | "CL" | "Gl";
    text: string;
    created_at: string;
}

export const questionApiSlice = createApi({
    reducerPath: 'Question',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://127.0.0.1:8000/quizz/',
        prepareHeaders: (headers) => {
            const token = JSON.parse(localStorage.getItem('authTokens') || "{}")?.access;
            if (token) {
                headers.set('authorization', `Bearer ${token}`);
            }
            return headers;
        }
    }),
    tagTypes: ['Questions'],
    endpoints: (builder) => ({
        getQuestions: builder.query<Question[], void>({
            query: () => 'questions/',
            providesTags: ['Questions']
        }),
        createQuestion: builder.mutation<Question, Partial<Question>>({
            query: (question) => ({
                url: 'questions/',
                method: 'POST',
                body: question,
            }),
            invalidatesTags: ['Questions']
        }),
        updateQuestion: builder.mutation<Question, { id: number; question: Partial<Question> }>({
            query: ({ id, question }) => ({
                url: `questions/${id}/`,
                method: 'PATCH',
                body: question,
            }),
            invalidatesTags: ['Questions']
        }),
        deleteQuestion: builder.mutation<{ success: boolean }, number>({
            query: (id) => ({
                url: `questions/${id}/`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Questions']
        }),
    })
});

export const {
    useGetQuestionsQuery,
    useCreateQuestionMutation,
    useUpdateQuestionMutation,
    useDeleteQuestionMutation
} = questionApiSlice;
