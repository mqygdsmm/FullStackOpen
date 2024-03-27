import { createSlice } from "@reduxjs/toolkit";
import blogServices from "../services/blogs";

const blogSlice = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    appendBlog(state, action) {
      state.push(action.payload);
    },

    setBlogs(state, action) {
      return action.payload;
    },
  },
});

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogServices.getAll();
    dispatch(setBlogs(blogs));
  };
};

export const createBlog = (newObject) => {
  return async (dispatch) => {
    const blog = await blogServices.create(newObject);
    dispatch(appendBlog(blog));
  };
};

export default blogSlice.reducer;
export const { appendBlog, setBlogs } = blogSlice.actions;
