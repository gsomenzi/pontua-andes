import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import UserService from '../../services/user';

type UserState = {
    items: any[];
    error: any;
    getting: boolean;
    page: number;
    qty: number;
    order:
        | 'alfabetica'
        | 'alfabetica-desc'
        | 'escolaridade'
        | 'escolaridade-desc'
        | 'sexo'
        | 'sexo-desc'
        | 'data_nascimento'
        | 'data_nascimento-desc'
        | 'pontos'
        | 'pontos-desc'
        | 'vezes'
        | 'vezes-desc';
};

const initialState: UserState = {
    items: [],
    error: null,
    getting: false,
    page: 1,
    qty: 25,
    order: 'alfabetica',
};

export const getAll = createAsyncThunk('user/getAll', async (payload: undefined, thunkAPI: any) => {
    try {
        const { page, qty, order } = thunkAPI.getState().user;
        const { data } = await UserService.getAll(page, qty, order);
        return data;
    } catch (e) {
        return thunkAPI.rejectWithValue(e.response && e.response.data ? e.response.data : e);
    }
});

export const slice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setPage: (state, action) => {
            state.page = action.payload;
        },
        setQty: (state, action) => {
            state.qty = action.payload;
        },
        setOrder: (state, action) => {
            state.order = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            // GETALL
            .addCase(getAll.pending, (state) => {
                state.getting = true;
                state.error = null;
            })
            .addCase(getAll.fulfilled, (state, action: PayloadAction<any>) => {
                state.getting = false;
                state.items = action.payload.data;
            })
            .addCase(getAll.rejected, (state, action: PayloadAction<any>) => {
                state.getting = false;
                state.error = action.payload.error;
            });
    },
});

export const { setPage, setQty, setOrder } = slice.actions;

export default slice.reducer;
