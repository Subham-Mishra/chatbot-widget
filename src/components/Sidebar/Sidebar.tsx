import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from 'redux/store'
import { Box, styled } from '@mui/material'
import { startConversation } from 'redux/chatSlice'
import toast from 'react-hot-toast'
import { useNavigate, useParams } from 'react-router-dom'
import { nanoid } from 'nanoid'
import SidebarHeader from './SidebarHeader'
import ConversationList from './ConversationList'
import FeedbackPopover from './FeedbackPopover'
import { Feedback } from 'types'

const SidebarContainer = styled(Box)({
  height: '100vh',
  width: '30%',
  padding: '0.8rem 1.2rem',
  backgroundColor: '#f5f5f5',
  borderRight: '1px solid #e0e0e0',
  overflowY: 'auto'
})

const Sidebar: React.FC = () => {
  const { id } = useParams<{ id?: string }>()
  const dispatch = useDispatch()
  const conversations = useSelector(
    (state: RootState) => state.chat.conversations
  )
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
  const [currentFeedback, setCurrentFeedback] = useState<Feedback | null>(null)

  const handlePopoverOpen = (
    event: React.MouseEvent<HTMLElement>,
    feedback: Feedback | null
  ) => {
    setAnchorEl(event.currentTarget)
    setCurrentFeedback(feedback)
  }

  const handlePopoverClose = () => {
    setAnchorEl(null)
    setCurrentFeedback(null)
  }

  const open = Boolean(anchorEl)
  const navigate = useNavigate()

  const handleSidebarConversationClick = (id: string) => () => {
    navigate(`/chat/${id}`)
  }

  const createNewConversation = () => {
    const newConversationId = nanoid(6)
    navigate(`/chat/${newConversationId}`)
    dispatch(startConversation(newConversationId))
  }

  const handleShareConversation = (id: string) => {
    const shareableLink = `${window.location.origin}/chat/${id}`
    navigator.clipboard.writeText(shareableLink).then(() => {
      toast.success('Shareable link copied to clipboard!')
    })
  }

  return (
    <SidebarContainer>
      <SidebarHeader createNewConversation={createNewConversation} />
      <ConversationList
        conversations={conversations}
        handleSidebarConversationClick={handleSidebarConversationClick}
        handleShareConversation={handleShareConversation}
        handlePopoverOpen={handlePopoverOpen}
        currentId={id}
      />
      <FeedbackPopover
        anchorEl={anchorEl}
        open={open}
        handlePopoverClose={handlePopoverClose}
        currentFeedback={currentFeedback}
      />
    </SidebarContainer>
  )
}

export { Sidebar }
