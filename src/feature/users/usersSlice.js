import { 
    createSlice, 
    createAsyncThunk,
    createEntityAdapter,
} from '@reduxjs/toolkit'
import {client } from '../../api/client'

const usersAdapter = createEntityAdapter()

const initialState = userAdapter.getInitialState()

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
    const res = await client.get('/fakeApi/users')
    return res.users
})
const usersSlice = createSlice({
    name : 'users',
    initialState,
    reducers : {},
    extraReducers:{
        [fetchUsers.fulfilled]: userAdapter.setAll
        }
    }
})

export default usersSlice.reducer

export const {
    selectAll : selectAllUsers,
    selectById : selectUserById
} = usersAdapter.getSelectors(state => state.users)