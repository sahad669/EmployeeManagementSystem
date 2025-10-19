import contactModel from "../models/contactModel.js";

export const createMessage = async (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ message: "Fill all the fields" });
  }

  try {
    const newMessage = await contactModel.create({ name, email, message });
    res.status(201).json({
      success: true,
      message: "Message send successfully",
      newMessage,
    });
  } catch (error) {
    console.error("Error saving message:", error);
    res.status(500).json({ error: "Failed to save message" });
  }
};


// Get all messages 

export const getAllMessages = async (req, res) => {
  try {
    const messages = await contactModel.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, messages });
  } catch (error) {
    console.error("Error fetching messages:", error);
    res.status(500).json({ error: "Failed to fetch messages" });
  }
};
export const deleteMessage = async (req, res) => {
  try {
    const id = req.params.id;
    const deletedMesage = await contactModel.findByIdAndDelete(id);
    if (!deletedMesage) {
      return res.status(404).json({ message: "Message Not Found" });
    }
    res.json({ success: true, message: "Message Deleted Successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
