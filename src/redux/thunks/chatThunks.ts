import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { Conversation } from 'types'

export const saveConversation = createAsyncThunk(
  'chat/saveConversation',
  async (conversation: Conversation, { rejectWithValue }) => {
    try {
      const response = await axios.post('/api/saveConversation', conversation)
      return response.data
    } catch (error) {
      return rejectWithValue('Failed to save conversation')
    }
  }
)
