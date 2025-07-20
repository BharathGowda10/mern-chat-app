import { create } from "zustand";
import { axiosInstance } from "../service/axios";
import { toast } from "react-toastify";
import { useAuthStore } from "./useAuthStore";

export const useMessageStore = create((set, get) => ({
  isUserLoading: false,
  isMessageLoading: false,
  users: [],
  messages: [],
  selectedUser: null,
  setSelectedUser: (selectedUser) => set({ selectedUser }),

  getUser: async () => {
    try {
      const res = await axiosInstance.get("/message/users");
      set({ users: res.data.user });
    } catch (error) {
      toast.error("Failed to fetch Users");
      console.error("Error fetching user data:", error);
    }
  },
  getMessages: async (userId) => {
    try {
      const res = await axiosInstance.get(`/message/${userId}`);
      set({ messages: res.data.messages });
    } catch (error) {
      toast.error("Failed to fetch Messages");
      console.error("Error fetching message data:", error);
    }
  },
  sendMessage: async (messageData, receiverId) => {
    const { messages } = get();
    try {
      const res = await axiosInstance.post(
        `/message/send/${receiverId}`,
        messageData
      );
      set({ messages: [...messages, res.data.message] });
    } catch (error) {
      toast.error("Failed to send message");
      console.error("Error sending message:", error);
    }
  },
  subscribeToMessage: () => {
    const socket = useAuthStore.getState().socket;
    if (!get().selectedUser) return;
    socket.on("newMessage", (newMessage) => {
      set({ messages: [...get().messages, newMessage] });
    });
  },
  unSubscribeMessage: () => {
    const socket = useAuthStore.getState().socket;
    socket.off("newMessage");
  },
}));
