import { createSlice } from "@reduxjs/toolkit";
import loginServices from "../services/login";
import blogServices from "../services/blogs";
import { showNotification } from "./notificationReducer";
const userSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    setUser(state, action) {
      return action.payload;
    },

    clearUser(state, action) {
      return null;
    },
  },
});

export const loginWith = (username, password) => {
  return async (dispatch) => {
    try {
      const user = await loginServices.login({ username, password });
      dispatch(setUser(user));
      window.localStorage.setItem("blogAppUser", JSON.stringify(user));
      blogServices.setToken(user.token);
    } catch (exception) {
      dispatch(
        showNotification({
          type: "error",
          content: "invalid username or password",
        })
      );
    }
  };
};

export const logout = () => {
  return (dispatch) => {
    window.localStorage.removeItem("blogAppUser");
    dispatch(clearUser());
  };
};

export const initializeUser = () => {
  return async (dispatch) => {
    const userJSON = window.localStorage.getItem("blogAppUser");
    if (userJSON) {
      const user = JSON.parse(userJSON);
      dispatch(setUser(user));
      blogServices.setToken(user.token);
    }
  };
};

export default userSlice.reducer;
export const { setUser, clearUser } = userSlice.actions;
