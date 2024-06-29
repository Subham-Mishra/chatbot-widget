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
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined'
import ThumbDownOutlinedIcon from '@mui/icons-material/ThumbDownOutlined'
import { Conversation } from 'types'
import { nanoid } from 'nanoid'

const StyledBox = styled(Box)(() => ({
  position: 'relative',
  '&:hover .feedback-icons': {
    display: 'flex'
  }
}))

const FeedbackIcons = styled(Box)(({ theme }) => ({
  display: 'none',
  position: 'absolute',
  left: '0%',
  gap: theme.spacing(0.2)
}))

const ChatBox = () => {
  const dispatch = useDispatch()
  const chat = useSelector((state: RootState) => state.chat.currentConversation)
  const [currentConversation, setCurrentConversation] = useState<Conversation>({
    id: nanoid(6),
    name: '',
    messages: [],
    feedback: null
  })

  useEffect(() => {
    if (chat) setCurrentConversation(chat)
  }, [chat])

  console.log({ chat, currentConversation })
  const [message, setMessage] = useState('')

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
    // Prefill the conversation name
    const conversationNumber = chat ? chat.id : nanoid(6)
    setModalOpen(true)
    setCurrentConversation({
      ...currentConversation,
      name: `Chat #${conversationNumber}: ${
        chat?.messages?.[0]?.text?.length &&
        chat?.messages?.[0]?.text?.length > 20
          ? chat?.messages?.[0]?.text.substring(0, 20) + '...'
          : chat?.messages?.[0]?.text
      }`
    })
  }

  const handleFeedbackSubmit = () => {
    if (
      currentConversation.feedback?.rating === 0 ||
      !currentConversation.feedback?.rating
    ) {
      alert('Please provide a star rating.')
      return
    }
    if (currentConversation.name?.trim() === '') {
      alert('Please provide a name for the conversation.')
      return
    }
    if (currentConversation) {
      console.log({ currentConversation })
      dispatch(endConversation(currentConversation))
    }
    dispatch(startConversation())
    setModalOpen(false)
  }

  return (
    <Box className="flex size-full flex-col">
      {/* Header */}
      <Box className="flex h-[10vh] items-center justify-between border-b border-gray-200 p-4">
        <Select defaultValue="chatbot-upgraded" variant="outlined" size="small">
          <MenuItem value="chatbot">Chatbot Standard</MenuItem>
          <MenuItem value="chatbot-upgraded">Chatbot Upgraded</MenuItem>
        </Select>
        <Avatar alt="Subham Mishra" src="/path-to-avatar.jpg" />
      </Box>

      {/* Chat Messages */}
      <Box className="h-[70vh] grow overflow-y-auto px-4 py-2">
        {chat ? (
          chat.messages.map((msg, index) => (
            <StyledBox
              key={index}
              className={`my-2 w-fit max-w-[40%] rounded-lg  px-2 py-1 ${
                msg.ai
                  ? 'bg-gray-200 text-left'
                  : 'ml-auto bg-blue-200 text-right'
              }`}
            >
              <p>{msg.text}</p>
              {msg.ai && (
                <FeedbackIcons className="feedback-icons">
                  <IconButton size="small">
                    <ThumbUpAltOutlinedIcon />
                  </IconButton>
                  <IconButton size="small">
                    <ThumbDownOutlinedIcon />
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
          {currentConversation.messages.length > 0 && (
            <Button
              variant="outlined"
              color="secondary"
              onClick={handleEndConversation}
            >
              End
            </Button>
          )}
        </Stack>
      </Stack>

      {/* Feedback Modal */}
      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        <Box className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-4 shadow-lg">
          <Typography variant="h6" gutterBottom>
            Provide Feedback
          </Typography>
          <TextField
            label="Conversation Name"
            variant="outlined"
            fullWidth
            value={currentConversation.name}
            onChange={(e) =>
              setCurrentConversation({
                ...currentConversation,
                name: e.target.value
              })
            }
            className="mt-2"
          />
          <Rating
            value={currentConversation.feedback?.rating}
            onChange={(e, newValue) =>
              setCurrentConversation({
                ...currentConversation,
                feedback: {
                  ...currentConversation.feedback,
                  rating: newValue ?? 0
                }
              })
            }
            size="large"
            className="mt-2"
          />
          <TextField
            label="Feedback"
            variant="outlined"
            multiline
            fullWidth
            rows={4}
            value={currentConversation.feedback?.comment}
            onChange={(e) =>
              setCurrentConversation({
                ...currentConversation,
                feedback: {
                  rating: currentConversation.feedback?.rating ?? 0,
                  comment: e.target.value
                }
              })
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
