import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../redux/store'
import {
  startConversation,
  addMessage,
  endConversation
} from '../redux/chatSlice'
import {
  Button,
  TextField,
  IconButton,
  Rating,
  Box,
  Avatar,
  Select,
  MenuItem,
  Modal,
  Typography,
  styled,
  Stack
} from '@mui/material'
import { HandThumbUpIcon, HandThumbDownIcon } from '@heroicons/react/24/outline'

const StyledBox = styled(Box)(() => ({
  position: 'relative',
  '&:hover .feedback-icons': {
    display: 'flex'
  }
}))

const FeedbackIcons = styled(Box)(({ theme }) => ({
  display: 'none',
  position: 'absolute',
  top: '-35%',
  left: '10%',
  transform: 'translate(-50%, -50%)',
  gap: theme.spacing(1)
}))

const ChatBox = () => {
  const dispatch = useDispatch()
  const chat = useSelector((state: RootState) => state.chat.currentConversation)
  const [message, setMessage] = useState<string>('')
  const [feedback, setFeedback] = useState<{ rating: number; comment: string }>(
    { rating: 0, comment: '' }
  )
  const [modalOpen, setModalOpen] = useState(false)

  useEffect(() => {
    // Start a new conversation when the component mounts
    dispatch(startConversation())
  }, [dispatch])

  const handleSendMessage = () => {
    if (message.trim() === '') return // Sanitize input, prevent empty messages
    dispatch(addMessage({ text: message, ai: false }))
    // Mock AI response
    setTimeout(() => {
      dispatch(addMessage({ text: 'AI Response', ai: true }))
    }, 500)
    setMessage('')
  }

  const handleKeyPress = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault()
      handleSendMessage()
    }
  }

  const handleEndConversation = () => {
    setModalOpen(true)
  }

  const handleFeedbackSubmit = () => {
    if (feedback.rating === 0) {
      alert('Please provide a star rating.')
      return
    }
    dispatch(endConversation(feedback))
    setModalOpen(false)
  }

  return (
    <Box className="flex size-full flex-col">
      {/* Header */}
      <Box className="flex h-[10vh] items-center justify-between border-b border-gray-200 p-4">
        <Select defaultValue="chatbot1" variant="outlined" size="small">
          <MenuItem value="chatbot1">Chatbot 1</MenuItem>
          <MenuItem value="chatbot2">Chatbot 2</MenuItem>
        </Select>
        <Avatar alt="User Avatar" src="/path-to-avatar.jpg" />
      </Box>

      {/* Chat Messages */}
      <Box className="h-[70vh] grow overflow-y-auto p-4">
        {chat ? (
          chat.messages.map((msg, index) => (
            <StyledBox
              key={index}
              className={`my-2 max-w-[40%] rounded-lg p-2 ${
                msg.ai
                  ? 'bg-gray-200 text-left'
                  : 'ml-auto bg-blue-200 text-right'
              }`}
            >
              <p>{msg.text}</p>
              {msg.ai && (
                <FeedbackIcons className="feedback-icons">
                  <IconButton size="small">
                    <HandThumbUpIcon className="size-5" />
                  </IconButton>
                  <IconButton size="small">
                    <HandThumbDownIcon className="size-5" />
                  </IconButton>
                </FeedbackIcons>
              )}
            </StyledBox>
          ))
        ) : (
          <p>No conversation started.</p>
        )}
      </Box>

      {/* Chat Form */}
      <Stack spacing={0.8} justifyContent="end" className="h-[20vh]  px-4 py-2">
        <TextField
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyPress}
          variant="outlined"
          fullWidth
          multiline
          maxRows={3}
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
          <Button
            variant="outlined"
            color="secondary"
            onClick={handleEndConversation}
          >
            End
          </Button>
        </Stack>
      </Stack>

      {/* Feedback Modal */}
      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        <Box className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-4 shadow-lg">
          <Typography variant="h6" gutterBottom>
            Provide Feedback
          </Typography>
          <Rating
            value={feedback.rating}
            onChange={(e, newValue) =>
              setFeedback({ ...feedback, rating: newValue ?? 0 })
            }
            size="large"
          />
          <TextField
            label="Feedback"
            variant="outlined"
            multiline
            fullWidth
            rows={4}
            value={feedback.comment}
            onChange={(e) =>
              setFeedback({ ...feedback, comment: e.target.value })
            }
            className="mt-2"
          />
          <Box className="mt-4 flex justify-end">
            <Button
              variant="contained"
              color="primary"
              onClick={handleFeedbackSubmit}
            >
              Submit
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  )
}

export { ChatBox }
