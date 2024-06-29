import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ChatState, Conversation, Feedback, Message } from 'types'

const initialState: ChatState = {
  conversations: [],
  currentConversation: null
}

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    startConversation: (state) => {
      state.currentConversation = { messages: [], feedback: null }
    },
    addMessage: (state, action: PayloadAction<Message>) => {
      state.currentConversation?.messages.push(action.payload)
    },
    endConversation: (state, action: PayloadAction<Feedback>) => {
      if (state.currentConversation) {
        state.currentConversation.feedback = action.payload
        state.conversations.push(state.currentConversation)
        state.currentConversation = null
      }
    },
    setConversations: (state, action: PayloadAction<Conversation[]>) => {
      state.conversations = action.payload
    }
  }
})

export const {
  startConversation,
  addMessage,
  endConversation,
  setConversations
} = chatSlice.actions

export default chatSlice.reducer
