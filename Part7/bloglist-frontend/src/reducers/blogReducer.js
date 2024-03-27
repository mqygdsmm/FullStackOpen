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

    updateBlog(state, action) {
      const newBlog = action.payload;
      return state.map((blog) => (blog.id === newBlog.id ? newBlog : blog));
    },

    removeBlog(state, action) {
      const id = action.payload;
      return state.filter((blog) => blog.id !== id);
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

export const updateBlogData = (newObject) => {
  return async (dispatch) => {
    const blog = await blogServices.update(newObject.id, newObject);
    dispatch(updateBlog(blog));
  };
};

export const deleteBlog = (id) => {
  return async (dispatch) => {
    await blogServices.remove(id);
    dispatch(removeBlog(id));
  };
};

export default blogSlice.reducer;
export const { appendBlog, setBlogs, updateBlog, removeBlog } =
  blogSlice.actions;
