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
    // Reducer to start a new conversation
    startConversation(state, action: PayloadAction<string>) {
      const newConversation: Conversation = {
        id: action.payload,
        name: null,
        messages: [],
        feedback: null
      }
      state.currentConversation = newConversation
    },
    deleteConversation(state, action: PayloadAction<string>) {
      console.log({ action })
      state.conversations = state.conversations.filter(
        (conv) => conv.id !== action.payload
      )
    },
    // Reducer to select an existing conversation
    selectConversation(state, action: PayloadAction<string>) {
      state.currentConversation =
        state.conversations.find((conv) => conv.id === action.payload) || null
    },
    // Reducer to add a message to the current conversation
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
    // Reducer to end the current conversation
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
    },
    // Reducer to like a message in the current conversation
    likeMessage(state, action: PayloadAction<number>) {
      const message = state.currentConversation?.messages[action.payload]
      if (!message?.ai) return // Only allow liking AI messages
      if (state.currentConversation?.messages[action.payload]) {
        state.currentConversation.messages[action.payload].liked = true
        state.currentConversation.messages[action.payload].disliked = false

        const existingCurrentConversation = state.conversations.find(
          (conv) => conv.id === state.currentConversation?.id
        )
        if (existingCurrentConversation) {
          existingCurrentConversation.messages =
            state.currentConversation.messages
        }
      }
    },
    // Reducer to dislike a message in the current conversation
    dislikeMessage(state, action: PayloadAction<number>) {
      const message = state.currentConversation?.messages[action.payload]
      if (!message?.ai) return // Only allow disliking AI messages
      if (state.currentConversation?.messages[action.payload]) {
        state.currentConversation.messages[action.payload].liked = false
        state.currentConversation.messages[action.payload].disliked = true

        const existingCurrentConversation = state.conversations.find(
          (conv) => conv.id === state.currentConversation?.id
        )
        if (existingCurrentConversation) {
          existingCurrentConversation.messages =
            state.currentConversation.messages
        }
      }
    }
  }
})

// Export the actions to be used in the application
export const {
  startConversation,
  deleteConversation,
  selectConversation,
  addMessage,
  endConversation,
  likeMessage,
  dislikeMessage
} = chatSlice.actions

// Export the reducer to be used in the store
export default chatSlice.reducer
