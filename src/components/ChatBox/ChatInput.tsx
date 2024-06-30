import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { persistor } from '../../redux/store'
import { addMessage } from '../../redux/chatSlice'
import { TextField, Button, Stack } from '@mui/material'
import { ChatInputProps } from 'types'

const ChatInput = ({
  currentConversation,
  handleEndConversation
}: ChatInputProps) => {
  const dispatch = useDispatch()
  const [message, setMessage] = useState('')

  const handleSendMessage = () => {
    if (message.trim() === '') return // Sanitize input, prevent empty messages
    dispatch(addMessage({ text: message, ai: false }))
    // Mock AI response
    setTimeout(() => {
      dispatch(addMessage({ text: 'AI Response', ai: true }))
    }, 500)
    persistor.persist()
    setMessage('')
  }

  const handleKeyPress = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <Stack spacing={0.8} justifyContent="end" className="h-[20vh]  px-4 py-2">
      <TextField
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyPress}
        variant="outlined"
        fullWidth
        multiline
        maxRows={3}
        autoFocus
        placeholder="Type your message..."
        className="w-4/5"
      />
      <Stack direction="row-reverse" spacing={1} justifyContent="end">
        <Button
          variant="contained"
          color="primary"
          onClick={handleSendMessage}
          className="mr-2"
        >
          Send
        </Button>
        {currentConversation.messages.length > 0 && (
          <Button
            variant="outlined"
            sx={{ color: '#cb2432', borderColor: '#cb2432' }}
            onClick={handleEndConversation}
          >
            End
          </Button>
        )}
      </Stack>
    </Stack>
  )
}

export default ChatInput
