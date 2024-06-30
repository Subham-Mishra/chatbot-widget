import { useSelector } from 'react-redux'
import { Box, Typography, Stack, IconButton, styled } from '@mui/material'
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined'
import ThumbDownOutlinedIcon from '@mui/icons-material/ThumbDownOutlined'
import { RootState } from '../../redux/store'
import { useRef, useEffect } from 'react'

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

const ChatMessages = () => {
  const chat = useSelector((state: RootState) => state.chat.currentConversation)

  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    scrollToBottom()
  }, [chat])

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <Box className="h-[70vh] grow overflow-y-auto px-4 py-2">
      {chat && chat.messages.length > 0 ? (
        chat.messages.map((msg, index) => (
          <StyledBox
            key={index}
            className={`my-2 w-fit max-w-[40%] break-words rounded-lg px-2  py-1 text-left ${
              msg.ai ? 'bg-gray-200 text-left' : 'ml-auto bg-blue-200'
            }`}
          >
            <Typography variant="body2">{msg.text}</Typography>
            {msg.ai && (
              <FeedbackIcons className="feedback-icons">
                <IconButton>
                  <ThumbUpAltOutlinedIcon sx={{ fontSize: 18 }} />
                </IconButton>
                <IconButton>
                  <ThumbDownOutlinedIcon sx={{ fontSize: 18 }} />
                </IconButton>
              </FeedbackIcons>
            )}
            <div ref={messagesEndRef} />
          </StyledBox>
        ))
      ) : (
        <Stack justifyContent={'center'} alignItems={'center'} height={'100%'}>
          <Typography variant="subtitle1" color="#6f6565" gutterBottom>
            Start new conversation by sending a message
          </Typography>
        </Stack>
      )}
    </Box>
  )
}

export default ChatMessages
