import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import CategoryService from '../../services/category';

type CategoryState = {
    items: any[];
    error: any;
    getting: boolean;
    removing: boolean;
    page: number;
    qty: number;
    order: 'alfabetica' | 'alfabetica-desc';
};

const initialState: CategoryState = {
    items: [],
    error: null,
    getting: false,
    removing: false,
    page: 1,
    qty: 25,
    order: 'alfabetica',
};

export const getAll = createAsyncThunk('category/getAll', async (payload: undefined, thunkAPI: any) => {
    try {
        const { page, qty, order } = thunkAPI.getState().category;
        const { data } = await CategoryService.getAll(page, qty, order);
        return data;
    } catch (e) {
        return thunkAPI.rejectWithValue(e.response && e.response.data ? e.response.data : e);
    }
});

export const search = createAsyncThunk('category/search', async (term: string, thunkAPI: any) => {
    try {
        const { page, qty, order } = thunkAPI.getState().category;
        const { data } = await CategoryService.search(term, page, qty, order);
        return data;
    } catch (e) {
        return thunkAPI.rejectWithValue(e.response && e.response.data ? e.response.data : e);
    }
});

export const remove = createAsyncThunk('category/remove', async (id: string | number, thunkAPI: any) => {
    try {
        const res = await CategoryService.remove(id);
        return id;
    } catch (e) {
        return thunkAPI.rejectWithValue(e.response && e.response.data ? e.response.data : e);
    }
});

export const slice = createSlice({
    name: 'category',
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
            })
            // SEARCH
            .addCase(search.pending, (state) => {
                state.getting = true;
                state.error = null;
            })
            .addCase(search.fulfilled, (state, action: PayloadAction<any>) => {
                state.getting = false;
                console.log(action.payload.data);
                state.items = action.payload.data;
            })
            .addCase(search.rejected, (state, action: PayloadAction<any>) => {
                state.getting = false;
                state.error = action.payload.error;
            })
            .addCase(remove.pending, (state) => {
                state.removing = true;
                state.error = null;
            })
            .addCase(remove.fulfilled, (state, action: PayloadAction<number | string>) => {
                state.removing = false;
                state.items = state.items.filter((e) => e.id !== action.payload);
            })
            .addCase(remove.rejected, (state, action: PayloadAction<any>) => {
                state.removing = false;
                state.error = action.payload.error;
            });
    },
});

export const { setPage, setQty, setOrder } = slice.actions;

export default slice.reducer;
