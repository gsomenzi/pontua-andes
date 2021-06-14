import { createSlice } from '@reduxjs/toolkit';

type AuthState = {
    authenticating: boolean;
    access_token: string | null;
    refresh_token: string | null;
    error: any;
};

const initialState: AuthState = {
    access_token: null,
    refresh_token: null,
    error: null,
    authenticating: false,
};

export const slice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        getLocalAccessToken: state => {
            const token = localStorage.getItem('access_token') ? localStorage.getItem('access_token') : null
            state.access_token = token
        }
    },
    extraReducers: builder => {
        // builder
        //     // SIGNIN
        //     .addCase(signIn.pending, state => {
        //         state.authenticating = true;
        //         state.erro = null;
        //     });
    },
});

export const { getLocalAccessToken } = slice.actions

export default slice.reducer;
