import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ChatState, Conversation, Message } from 'types'

const initialState: ChatState = {
  conversations: [],
  currentConversation: null
}

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    startConversation(state, action: PayloadAction<string>) {
      const newConversation: Conversation = {
        id: action.payload,
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
      const existingCurrentConversation = state.conversations.find(
        (conv) => conv.id === state.currentConversation?.id
      )
      if (existingCurrentConversation) {
        existingCurrentConversation.messages.push(action.payload)
      } else {
        state.currentConversation?.messages.push(action.payload)
      }
    },
    endConversation(state, action: PayloadAction<Conversation>) {
      if (state.currentConversation) {
        const existingConversationIndex = state.conversations.findIndex(
          (conv) => conv.id === state.currentConversation!.id
        )

        state.currentConversation.name = action.payload.name
        state.currentConversation.feedback = action.payload.feedback

        if (existingConversationIndex === -1) {
          state.conversations.push(state.currentConversation)
        } else {
          state.conversations[existingConversationIndex] =
            state.currentConversation
        }
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
