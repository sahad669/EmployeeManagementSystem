import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstants from "../axiosInstants";
import toast from "react-hot-toast";

//  Fetch all messages 
export const fetchMessages = createAsyncThunk("messages/fetchMessages", async () => {
  const res = await axiosInstants.get("/contact");
  return res.data.messages;
});

// Send a new message 
export const sendMessage = createAsyncThunk("messages/sendMessage", async (data) => {
  const res = await axiosInstants.post("/contact", data);
  if (res.data.success) {
    toast.success(res.data.message || "Message sent successfully!");
  } else {
    toast.error(res.data.error || "Failed to send message");
  }
  return res.data;
});

export const deleteMessage = createAsyncThunk("messages/deleteMessage",async(id)=>{
  try {
      let res = await axiosInstants.delete(`/contact/${id}`)
      toast.success(res.data.message)
      return id
  } catch (error) {
    const message = error.response?.data?.message;
      toast.error(message)
  }
})

const messageSlice = createSlice({
  name: "messages",
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder

      //  Fetch messages
      .addCase(fetchMessages.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
        state.error = null;
      })
      .addCase(fetchMessages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      //  Send message
      .addCase(sendMessage.pending, (state) => {
        state.loading = true;
      })
      .addCase(sendMessage.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(sendMessage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      //delete message
      .addCase(deleteMessage.pending,(state)=>{
        state.loading = true
        state.error = null
      })
      .addCase(deleteMessage.fulfilled,(state,action)=>{
        state.loading = false
        state.list = state.list.filter(
          (msg)=> msg._id !== action.payload
        )
      })
      .addCase(deleteMessage.rejected,(state,action)=>{
        state.loading =false
        state.error = action.payload
      })
  },
});

export default messageSlice.reducer;
