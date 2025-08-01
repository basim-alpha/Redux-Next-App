import { createSlice, nanoid, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit"
import {sub} from "date-fns";
import axios from "axios";

const POSTS_URL = 'https://jsonplaceholder.typicode.com/posts';


interface Post {
    id: string;
    title: string;
    content: string;
    userId: string;
    date: string;
    reactions?: {
        thumbsUp: number;
        wow: number;
        heart: number;    
        rocket: number;
        coffee: number;
    }
}

const initialState = {
    posts: [] as Post[],
    status: 'idle', //'idle' | 'loading' | 'succeeded' | 'failed'
    error: null
    
}

// const initialState: Post[] = [
//     {
//         id: '0' , 
//         title: "First Post", 
//         content: "This is the content of the first post.", 
//         userId: '', 
//         date: sub(new Date(), {minutes: 10}).toISOString(),
//         reactions: {
//             thumbsUp: 0,
//             wow: 0,
//             heart: 0,
//             rocket: 0,
//             coffee: 0
//         }
//     },
//     {
//         id: '1' , 
//         title: "Second Post", 
//         content: "This is the content of the second post.", 
//         userId: '', 
//         date: sub(new Date(), {minutes: 5}).toISOString(),
//         reactions: {
//             thumbsUp: 0,
//             wow: 0,
//             heart: 0,
//             rocket: 0,
//             coffee: 0
//         }
//     },
// ]

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
    const response = await axios.get(POSTS_URL);
    return response.data
})

export const addNewPost: any = createAsyncThunk('posts/addNewPost', async (initialPost) => {
    const response = await axios.post(POSTS_URL, initialPost)
    return response.data
})

const postsSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {
        postAdded: {
            reducer:(state, action: PayloadAction<Post>) => {
            state.posts.push(action.payload);
            },
            prepare: (title:string, content:string, userId: string): {payload: Post} => {
                return {
                    payload: {
                        id: nanoid(),
                        title,
                        content,
                        userId,
                        date: new Date().toISOString(),
                        reactions: {
                            thumbsUp: 0,
                            wow: 0,
                            heart: 0,
                            rocket: 0,
                            coffee: 0
                        }
                    }
                }
            },
        },
        reactionAdded: (state, action) => {
            const { postId, reaction } = action.payload
            const existingPost: any = state.posts.find(post => post.id === postId)
            if (existingPost) {
                existingPost.reactions[reaction]++
            }
        }      
    },
    extraReducers(builder: any) {
                builder
                .addCase(fetchPosts.pending, (state: { status: string; }, action: any) => {
                    state.status = 'loading';
                })
                .addCase(fetchPosts.fulfilled, (state: {status:string; posts:Post[];}, action: any) => {
                    state.status = 'succeeded';
                    let min = 1;
                    const loadedPosts = action.payload.map((post: any) => {
                        post.date = sub(new Date(), {minutes: min++}).toISOString();
                        post.reactions = {
                            thumbsUp: 0,
                            wow: 0,
                            heart: 0,
                            rocket: 0,
                            coffee: 0
                        }
                        return post;
                    });

                    state.posts = state.posts.concat(loadedPosts);
                })
                .addCase(fetchPosts.rejected, (state: { status: string; error: any; }, action: any) => {
                    state.status = 'failed';
                    state.error = action.error.message;
                })
                .addCase(addNewPost.fulfilled, (state: { posts: any[]; }, action: { payload: { id: any; userId: number; date: string; reactions: { thumbsUp: number; wow: number; heart: number; rocket: number; eyes: number; }; }; }) => {
                // Fix for API post IDs:
                // Creating sortedPosts & assigning the id 
                // would be not be needed if the fake API 
                // returned accurate new post IDs
                const sortedPosts = state.posts.sort((a, b) => {
                    if (a.id > b.id) return 1
                    if (a.id < b.id) return -1
                    return 0
                })
                action.payload.id = sortedPosts[sortedPosts.length - 1].id + 1;
                // End fix for fake API post IDs 

                action.payload.userId = Number(action.payload.userId)
                action.payload.date = new Date().toISOString();
                action.payload.reactions = {
                    thumbsUp: 0,
                    wow: 0,
                    heart: 0,
                    rocket: 0,
                    eyes: 0
                }
                console.log(action.payload)
                state.posts.push(action.payload)
            })
            }
})

export const selectAllPosts = (state: any) => state.posts.posts;
export const getPostsStatus = (state: any) => state.posts.status;
export const getPostsError = (state: any) => state.posts.error;
export const selectPostById = (state: any, postId: number | string) =>
    state.posts.posts.find((post: Post) => post.id === postId);

export const { postAdded, reactionAdded } = postsSlice.actions;

export default postsSlice.reducer