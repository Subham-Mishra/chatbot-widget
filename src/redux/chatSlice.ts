import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ChatState, Conversation, Message } from 'types'
import axios from 'axios'

const initialState: ChatState = {
  conversations: [],
  currentConversation: null
}

// Async thunk for saving a conversation to the database
export const saveConversation = createAsyncThunk(
  'chat/saveConversation',
  async (conversation: Conversation, { rejectWithValue }) => {
    try {
      const response = await axios.post('/api/saveConversation', conversation)
      return response.data
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)
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
    },
    likeMessage(state, action: PayloadAction<number>) {
      const message = state.currentConversation?.messages[action.payload]
      if (!message?.ai) return
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
    dislikeMessage(state, action: PayloadAction<number>) {
      const message = state.currentConversation?.messages[action.payload]
      if (!message?.ai) return
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

export const {
  startConversation,
  selectConversation,
  addMessage,
  endConversation,
  likeMessage,
  dislikeMessage
} = chatSlice.actions

export default chatSlice.reducer
