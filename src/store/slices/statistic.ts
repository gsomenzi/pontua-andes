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

export const getAll = createAsyncThunk('statistic/getAll', async (payload: undefined, { rejectWithValue }) => {
    try {
        const { data } = await StatisticService.getAll();
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
            .addCase(getAll.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAll.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(getAll.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.error = action.payload.error;
            });
    },
});

// export const { getLocalAccessToken, signOut } = slice.actions;

export default slice.reducer;
