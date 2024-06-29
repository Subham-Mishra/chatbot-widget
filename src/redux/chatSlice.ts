import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ChatState, Conversation, Message } from 'types'
import { nanoid } from 'nanoid'

const initialState: ChatState = {
  conversations: [],
  currentConversation: null
}

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    startConversation(state) {
      const newConversation: Conversation = {
        id: nanoid(6),
        name: null,
        messages: [],
        feedback: null
      }
      state.currentConversation = newConversation
    },
    selectConversation(state, action: PayloadAction<string>) {
      state.currentConversation =
        state.conversations.find((conv) => conv.id === action.payload) || null
    },
    addMessage(state, action: PayloadAction<Message>) {
      state.currentConversation?.messages.push(action.payload)
    },
    endConversation(state, action: PayloadAction<Conversation>) {
      if (state.currentConversation) {
        state.currentConversation.name = action.payload.name
        state.currentConversation.feedback = action.payload.feedback
        state.conversations.push(state.currentConversation)
      }
    }
  }
})

export const {
  startConversation,
  selectConversation,
  addMessage,
  endConversation
} = chatSlice.actions

export default chatSlice.reducer
