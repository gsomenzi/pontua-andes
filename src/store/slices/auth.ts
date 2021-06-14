import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import AuthService from '../../services/auth';

type AuthState = {
    authenticating: boolean;
    access_token: string | null;
    error: any;
};

const initialState: AuthState = {
    access_token: null,
    error: null,
    authenticating: false,
};

export const signIn = createAsyncThunk('auth/signIn', async (payload: any, { rejectWithValue }) => {
    try {
        const { email, password } = payload;
        const { data } = await AuthService.signIn(email, password);
        AuthService.saveLocalToken(data.access_token);
        return data;
    } catch (e) {
        return rejectWithValue(e.response && e.response.data ? e.response.data : e);
    }
});

export const slice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        getLocalAccessToken: (state) => {
            const token = localStorage.getItem('access_token') ? localStorage.getItem('access_token') : null;
            state.access_token = token;
        },
        signOut: (state) => {
            localStorage.clear();
            state.access_token = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // SIGNIN
            .addCase(signIn.pending, (state) => {
                state.authenticating = true;
                state.error = null;
            })
            .addCase(signIn.fulfilled, (state, action: PayloadAction<any>) => {
                const { access_token, refresh_token } = action.payload;
                state.authenticating = false;
                state.access_token = access_token;
            })
            .addCase(signIn.rejected, (state, action: PayloadAction<any>) => {
                state.authenticating = false;
                state.error = action.payload.error;
            });
    },
});

export const { getLocalAccessToken, signOut } = slice.actions;

export default slice.reducer;
