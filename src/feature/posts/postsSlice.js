import {createAsyncThunk, createSlice, nanoid, createSelector} from '@reduxjs/toolkit'
import {client} from '../../api/client'

const initialState ={
    posts : [],
    status : 'idle',
    error : null
}

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
    const res = await client.get('/fakeApi/posts')
    return res.posts
})

export const addNewPost = createAsyncThunk(
    'posts/addNewPost',
    async initialPost => {
        const res = await client.post('/fakeApi/posts', {post : initialPost})
        return res.post
    }
)

const  postsSlice = createSlice({
    name : 'posts',
    initialState,
    reducers: {
        postAdded : {
            reducer(state, action){
                state.posts.push(action.payload)
            },
            prepare(title, content, userId){
                return {
                    payload : {
                        id : nanoid(),
                        date : new Date().toISOString(),
                        title,
                        content,
                        user:userId,
                        reactions : {
                            thumbsUp : '0',
                            hooray: '0',
                            heart: '0',
                            rocket: '0',
                            eyes: '0'
                        }
                    }
                }
            }
        },
        postUpdated(state, action){
            const {id ,title, content } = action.payload
            const existingPost = state.posts.find(post => post.id === id)
            if(existingPost){
                existingPost.title = title
                existingPost.content = content
            }
        },
        reactionAdded(state, action){
            const { postId, reaction } = action.payload
            const existingPost = state.posts.find(post => post.id === postId)
            if(existingPost) existingPost.reactions[reaction]++
        }
    },
    extraReducers : {
        [fetchPosts.pending] : (state, action) =>{
            state.status = 'loading'
        },
        [fetchPosts.fulfilled] : (state, action) =>{
            state.status = 'succeeded'
            state.posts = state.posts.concat(action.payload)
        },
        [fetchPosts.rejected] : (state, action) =>{
            state.status = 'failed'
            state.error = action.error.message
        },
        [addNewPost.fulfilled] : (state, action) => {
            state.posts.push(action.payload)
        }
    }
})

export const { postAdded, postUpdated, reactionAdded } = postsSlice.actions

export default postsSlice.reducer

export const selectAllPosts = state => state.posts.posts

export const selectPostById = (state, postId) =>
    state.posts.posts.find(post => post.id === postId)

export const selectPostByUser = createSelector(
    [selectAllPosts, (state, userId) => userId],
    (posts, userId) => posts.filter(post => post.user === userId) 
)