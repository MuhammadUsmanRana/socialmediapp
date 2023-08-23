import { createSlice } from "@reduxjs/toolkit";

export const madiaApp = createSlice({
  name: "app",
  initialState: {
    socialApp: [],
  },
  reducers: {
    addItem: (state, action) => {
      state.socialApp.push(action.payload);
      return state;
    },

    getItem: (state, action) => {
      state.socialApp = action.payload;
    },

    deleteItem: (state, action) => {
      const product = action.payload;
      const productDelete = state.socialApp.filter((item) => {
        return item._id !== product;
      });
      state.socialApp = productDelete;
    },

    editItem: (state, action) => {
      const editProduct = action.payload;
      console.log(editProduct," payload")
      console.log(action.payload);
      const index = state.socialApp.find((item) => {
        console.log(item);
        return item._id == editProduct._id;
      });
      if (index) {
        Object.assign(index, editProduct);
      }
    },
  },
});

export const { addItem, getItem, deleteItem, editItem } = madiaApp.actions;

export default madiaApp.reducer;
