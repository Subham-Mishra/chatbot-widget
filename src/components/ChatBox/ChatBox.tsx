import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { RootState } from '../../redux/store'
import { startConversation, selectConversation } from '../../redux/chatSlice'
import { Box } from '@mui/material'
import { nanoid } from 'nanoid'
import ChatHeader from './ChatHeader'
import ChatMessages from './ChatMessages'
import ChatInput from './ChatInput'
import FeedbackModal from './FeedbackModal'
import { Conversation } from 'types'

const ChatBox = () => {
  const { id } = useParams<{ id?: string }>()
  const dispatch = useDispatch()
  const chat = useSelector((state: RootState) => state.chat.currentConversation)
  const conversations = useSelector(
    (state: RootState) => state.chat.conversations
  )
  const [currentConversation, setCurrentConversation] = useState<Conversation>({
    id: nanoid(6),
    name: '',
    messages: [],
    feedback: null
  })

  useEffect(() => {
    if (id) {
      const conversation = conversations.find((conv) => conv.id === id)
      if (conversation) {
        dispatch(selectConversation(id))
      } else {
        const newConversationId = nanoid(6)
        // If the conversation doesn't exist, start a new one
        dispatch(startConversation(newConversationId))
      }
    } else {
      const newConversationId = nanoid(6)
      dispatch(startConversation(newConversationId))
    }
  }, [id, conversations, dispatch])

  useEffect(() => {
    if (chat) setCurrentConversation(chat)
  }, [chat])

  const [modalOpen, setModalOpen] = useState(false)

  const handleEndConversation = () => {
    const conversationNumber = chat ? chat.id : id
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

  return (
    <Box className="flex size-full flex-col">
      <ChatHeader />
      <ChatMessages />
      <ChatInput
        currentConversation={currentConversation}
        handleEndConversation={handleEndConversation}
      />
      <FeedbackModal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        currentConversation={currentConversation}
        setCurrentConversation={setCurrentConversation}
      />
    </Box>
  )
}

export { ChatBox }
