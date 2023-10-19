import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
};

export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    listUsers: (state, action) => {
      //  state.data.push(action.payload);
      state.data = action.payload;
      //  console.log("what is state",state);
      // return action.payload;
    },

    updateUser: (state, action) => {
      const { id, ...userData } = action.payload;
      state.data = state.data.map((user) => {
        if (user.id === id) {
          return { ...user, ...userData };
        }
        return user;
      });
    },

    deleteUser: (state, action) => {
      const { id } = action.payload;
      state.data = state.data.filter((ele) => ele.id !== id);
    },
  },
});

export const { updateUser, listUsers, deleteUser } = userSlice.actions;

export default userSlice.reducer;
