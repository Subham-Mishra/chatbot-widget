import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from 'redux/store'
import {
  List,
  ListItem,
  ListItemText,
  Typography,
  Box,
  styled,
  IconButton,
  Popover
} from '@mui/material'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import { Feedback } from 'types'
import { selectConversation } from 'redux/chatSlice'

const SidebarContainer = styled(Box)({
  height: '100vh',
  width: '30%',
  padding: '0.8rem 1.2rem',
  backgroundColor: '#f5f5f5',
  borderRight: '1px solid #e0e0e0',
  overflowY: 'auto'
})

const Sidebar: React.FC = () => {
  const dispatch = useDispatch()
  const conversations = useSelector(
    (state: RootState) => state.chat.conversations
  )
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null)
  const [currentFeedback, setCurrentFeedback] = React.useState<Feedback | null>(
    null
  )

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

  const handleSidebarConversationClick = (id: string) => () => {
    console.log('clicked on conversation with id:', id)
    dispatch(selectConversation(id))
  }

  console.log({ conversations })

  return (
    <SidebarContainer>
      <Typography variant="subtitle1" color="#6f6565" gutterBottom>
        Conversations
      </Typography>
      <List>
        {conversations.map((conv) => (
          <ListItem
            key={conv.id}
            onClick={handleSidebarConversationClick(conv.id)}
            sx={{
              marginBottom: '1rem',
              backgroundColor: '#fff',
              borderRadius: '0.5rem',
              padding: '1rem',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
            }}
          >
            <ListItemText primary={conv.name} />
            <IconButton
              onClick={(event) => handlePopoverOpen(event, conv.feedback)}
            >
              <InfoOutlinedIcon />
            </IconButton>
            <Popover
              open={open}
              anchorEl={anchorEl}
              onClose={handlePopoverClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left'
              }}
            >
              <Box sx={{ p: 2 }} maxWidth={'40rem'}>
                <Typography variant="body2" color="textPrimary">
                  Rating: {currentFeedback?.rating}
                </Typography>
                {currentFeedback?.comment && (
                  <>
                    <Typography variant="body2" color="textPrimary">
                      Comment: {currentFeedback.comment}
                    </Typography>
                  </>
                )}
              </Box>
            </Popover>
          </ListItem>
        ))}
      </List>
    </SidebarContainer>
  )
}

export { Sidebar }
