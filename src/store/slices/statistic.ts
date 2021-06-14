import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import StatisticService from '../../services/statistic';

type StatisticState = {
    loading: boolean;
    data: any;
    error: any;
};

const initialState: StatisticState = {
    data: null,
    error: null,
    loading: false,
};

export const signIn = createAsyncThunk('statistic/signIn', async (payload: any, { rejectWithValue }) => {
    try {
        const { email, password } = payload;
        const { data } = await StatisticService.getAll(email, password);
        AuthService.saveLocalToken(data.access_token);
        return data;
    } catch (e) {
        return rejectWithValue(e.response && e.response.data ? e.response.data : e);
    }
});

export const slice = createSlice({
    name: 'statistic',
    initialState,
    reducers: {},
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
