import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { mockMessages } from "../constants/mockMessages";
import { Message } from "../types/message";

interface ChatState {
  messages: Message[];
  replyMessage?: Message;
}

const initialState: ChatState = {
  messages: mockMessages,
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {

    setReply(state, action: PayloadAction<Message | undefined>) {
      state.replyMessage = action.payload;
    },

    addReaction(state, action: PayloadAction<{ id: string; emoji: string }>) {
      const msg = state.messages.find(m => m.id === action.payload.id);
      if (msg) {
        msg.reaction = action.payload.emoji;
      }
    },

    setFeedback(
      state,
      action: PayloadAction<{
        id: string;
        type: 'liked' | 'disliked';
      }>
    ) {
      const msg = state.messages.find(m => m.id === action.payload.id);
      if (msg) {
        msg.feedbackType = action.payload.type;
      }
    },

    addMessage(state, action: PayloadAction<Message>) {
      state.messages.push(action.payload);
    },

    clearChat(state) {
      state.messages = [];
    }

  },
});

export const {
  setReply,
  addReaction,
  setFeedback,
  addMessage,
  clearChat
} = chatSlice.actions;

export default chatSlice.reducer;