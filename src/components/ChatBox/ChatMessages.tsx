import { useDispatch, useSelector } from 'react-redux'
import { Box, Typography, Stack, IconButton, styled } from '@mui/material'
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined'
import ThumbDownOutlinedIcon from '@mui/icons-material/ThumbDownOutlined'
import { persistor, RootState } from 'redux/store'
import { useRef, useEffect } from 'react'
import { dislikeMessage, likeMessage } from 'redux/slices/chatSlice'
import { ThumbDownSharp, ThumbUpSharp } from '@mui/icons-material'

const StyledBox = styled(Box)(() => ({
  position: 'relative',
  '&:hover .feedback-icons': {
    visibility: 'visible'
  }
}))

const FeedbackIcons = styled(Box)(({ theme }) => ({
  visibility: 'hidden',
  position: 'absolute',
  left: '0%',
  gap: theme.spacing(0.2)
}))

const ChatMessages = () => {
  const chat = useSelector((state: RootState) => state.chat.currentConversation)
  const dispatch = useDispatch()
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    scrollToBottom()
  }, [chat])

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleLikeMessage = (index: number) => {
    dispatch(likeMessage(index))
    persistor.persist()
  }

  const handleDislikeMessage = (index: number) => {
    dispatch(dislikeMessage(index))
    persistor.persist()
  }

  return (
    <Box className="h-[70vh] grow overflow-y-auto px-4 py-2">
      {chat && chat.messages.length > 0 ? (
        chat.messages.map((msg, index) => (
          <>
            <StyledBox
              key={index}
              className={`my-2 w-fit max-w-[40%] break-words rounded-lg px-2  py-1 text-left ${
                msg.ai ? 'bg-gray-200 text-left' : 'ml-auto bg-blue-200'
              }`}
            >
              <Typography variant="body2">{msg.text}</Typography>
              {msg.ai && (
                <>
                  {msg.ai && msg.liked && (
                    <ThumbUpSharp sx={{ fontSize: 18 }} />
                  )}
                  {msg.ai && msg.disliked && (
                    <ThumbDownSharp sx={{ fontSize: 18 }} />
                  )}
                  <FeedbackIcons className="feedback-icons">
                    <IconButton onClick={() => handleLikeMessage(index)}>
                      <ThumbUpAltOutlinedIcon sx={{ fontSize: 18 }} />
                    </IconButton>
                    <IconButton onClick={() => handleDislikeMessage(index)}>
                      <ThumbDownOutlinedIcon sx={{ fontSize: 18 }} />
                    </IconButton>
                  </FeedbackIcons>
                </>
              )}
              <div ref={messagesEndRef} />
            </StyledBox>
          </>
        ))
      ) : (
        <Stack justifyContent={'center'} alignItems={'center'} height={'100%'}>
          <Typography variant="subtitle1" color="#6f6565" gutterBottom>
            Send a new message to start chatting with co-pilot
          </Typography>
        </Stack>
      )}
    </Box>
  )
}

export default ChatMessages
