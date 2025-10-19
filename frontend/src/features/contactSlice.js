
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstants from "../axiosInstants";
import emailjs from "@emailjs/browser";
import { toast } from "react-hot-toast";

// ✅ Create a message (send via EmailJS + save to DB)
export const createMessage = createAsyncThunk(
  "message/createMessage",
  async (data) => {
    try {
      // 1️⃣ Send email via EmailJS
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          from_name: data.name,
          from_email: data.email,
          message: data.message,
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );

      // 2️⃣ Save to backend
      const res = await axiosInstants.post("/contact/addMessage", data)
      if (res.data.success) {
        toast.success(res.data.message || "Message sent successfully!");
      } else {
        toast.error(res.data.error || "Failed to send message");
      }

      return res.data;
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong while sending message");
      return null; // simply return null on error
    }
  }
);

// ✅ Fetch all messages (for admin)
export const fetchMessages = createAsyncThunk("message/fetchMessages", async () => {
  const res = await axiosInstants.get("/contact/allMessage");
  return res.data.messages;
});

// ✅ Delete a message
export const deleteMessage = createAsyncThunk("message/deleteMessage", async (id) => {
  const res = await axiosInstants.delete(`/contact/delete/${id}`);
  toast.success(res.data.message);
  return id;
});

const contactSlice = createSlice({
  name: "contact",
  initialState: {
    messages: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Create message
      .addCase(createMessage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createMessage.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload?.newMessage) {
          state.messages.push(action.payload.newMessage);
        }
      })
      .addCase(createMessage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message
      })

      // Fetch messages
      .addCase(fetchMessages.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        state.loading = false;
        state.messages = action.payload;
      })
      .addCase(fetchMessages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message   
     })

      // Delete message
      .addCase(deleteMessage.fulfilled, (state, action) => {
        state.messages = state.messages.filter((msg) => msg._id !== action.payload);
      });
  },
});

export default contactSlice.reducer;