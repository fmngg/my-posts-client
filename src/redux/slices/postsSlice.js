import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

export const getPosts = createAsyncThunk("posts/getPosts", async () => {
  const { data } = await axios.get("/posts");
  return data;
});

export const getTags = createAsyncThunk("posts/getTags", async () => {
  const { data } = await axios.get("/posts/tags");
  return data;
});

export const deletePost = createAsyncThunk("posts/deletePost", async (id) => {
  await axios.delete(`/posts/${id}`);
});

const initialState = {
  posts: {
    items: [],
    loading: true,
  },
  tags: {
    items: [],
    loading: true,
  },
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: {
    [getPosts.pending]: (state, action) => {
      state.posts.items = [];
      state.posts.loading = true;
    },
    [getPosts.fulfilled]: (state, action) => {
      state.posts.items = action.payload;
      state.posts.loading = false;
    },
    [getPosts.rejected]: (state, action) => {
      state.posts.items = [];
      state.posts.loading = false;
    },
    [getTags.pending]: (state, action) => {
      state.tags.items = [];
      state.posts.loading = true;
    },
    [getTags.fulfilled]: (state, action) => {
      state.tags.items = action.payload;
      state.posts.loading = false;
    },
    [getTags.rejected]: (state, action) => {
      state.tags.items = [];
      state.posts.loading = false;
    },
    [deletePost.pending]: (state, action) => {
      state.posts.items = state.posts.items.filter(
        (obj) => obj._id !== action.meta.arg
      );
    },
  },
});

export const postsReducer = postsSlice.reducer;
