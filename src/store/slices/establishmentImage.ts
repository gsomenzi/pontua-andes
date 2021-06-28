import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import ImageService from '../../services/establishmentImage';

// const CREATE_FIELDS = ['nome', 'email', 'senha', 'estabelecimentos_id', 'funcoes_estabelecimentos_id'];
// const UPDATE_FIELDS = ['nome', 'email', 'senha', 'estabelecimentos_id', 'funcoes_estabelecimentos_id'];

type EstablishmentImageState = {
    items: any[];
    error: any;
    uploading: boolean;
    updating: boolean;
    getting: boolean;
    removing: boolean;
    order: 'alfabetica' | 'alfabetica-desc';
};

const initialState: EstablishmentImageState = {
    items: [],
    error: null,
    uploading: false,
    updating: false,
    getting: false,
    removing: false,
    order: 'alfabetica',
};

export const getAllByEstablishment = createAsyncThunk(
    'establishmentImage/getAllByEstablishment',
    async (id: number | string, thunkAPI: any) => {
        try {
            const { data } = await ImageService.getAllByEstablishment(id);
            return data;
        } catch (e) {
            return thunkAPI.rejectWithValue(e.response && e.response.data ? e.response.data : e);
        }
    }
);

export const upload = createAsyncThunk('establishmentImage/upload', async (payload: any, thunkAPI: any) => {
    try {
        const { id, file } = payload;
        const { data } = await ImageService.upload(id, file);
        return data;
    } catch (e) {
        return thunkAPI.rejectWithValue(e.response && e.response.data ? e.response.data : e);
    }
});

// export const create = createAsyncThunk('establishmentAdmin/create', async (payload: any, thunkAPI: any) => {
//     try {
//         const createPayload = parseTrustedFields(CREATE_FIELDS, payload);
//         const { data } = await AdminService.create(createPayload);
//         return data;
//     } catch (e) {
//         return thunkAPI.rejectWithValue(e.response && e.response.data ? e.response.data : e);
//     }
// });

// export const update = createAsyncThunk('establishmentAdmin/update', async (payload: any, thunkAPI: any) => {
//     try {
//         const { id } = payload;
//         const updatePayload = parseTrustedFields(UPDATE_FIELDS, payload);
//         const { data } = await AdminService.update(id, updatePayload);
//         return data;
//     } catch (e) {
//         return thunkAPI.rejectWithValue(e.response && e.response.data ? e.response.data : e);
//     }
// });

export const remove = createAsyncThunk('establishmentImage/remove', async (id: string | number, thunkAPI: any) => {
    try {
        const res = await ImageService.remove(id);
        return id;
    } catch (e) {
        return thunkAPI.rejectWithValue(e.response && e.response.data ? e.response.data : e);
    }
});

export const slice = createSlice({
    name: 'establishmentImage',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // GETALL
            .addCase(getAllByEstablishment.pending, (state) => {
                state.getting = true;
                state.error = null;
                state.items = [];
            })
            .addCase(getAllByEstablishment.fulfilled, (state, action: PayloadAction<any>) => {
                state.getting = false;
                state.items = action.payload;
            })
            .addCase(getAllByEstablishment.rejected, (state, action: PayloadAction<any>) => {
                state.getting = false;
                state.error = action.payload.error;
            })
            // UPLOAD
            .addCase(upload.pending, (state) => {
                state.uploading = true;
                state.error = null;
            })
            .addCase(upload.fulfilled, (state, action: PayloadAction<any>) => {
                console.log('UPLOAD OK', action.payload);
                state.uploading = false;
                state.items.splice(0, 0, action.payload);
            })
            .addCase(upload.rejected, (state, action: PayloadAction<any>) => {
                console.log('UPLOAD FAIL', action.payload);
                state.uploading = false;
                state.error = action.payload.error;
            })
            // UPDATE
            // .addCase(update.pending, (state) => {
            //     state.updating = true;
            //     state.error = null;
            // })
            // .addCase(update.fulfilled, (state, action: PayloadAction<any>) => {
            //     state.updating = false;
            //     const { data } = action.payload;
            //     const INDEX = state.items.findIndex((e) => e.id === data.id);
            //     state.items.splice(INDEX, 1, data);
            // })
            // .addCase(update.rejected, (state, action: PayloadAction<any>) => {
            //     state.updating = false;
            //     state.error = action.payload.error;
            // })
            // REMOVE
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

// export const { setPage, setQty, setOrder } = slice.actions;

export default slice.reducer;
