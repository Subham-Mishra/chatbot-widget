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
  Popover,
  Stack
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import { Feedback } from 'types'
import { selectConversation, startConversation } from 'redux/chatSlice'

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

  const createNewConversation = () => {
    console.log('creating new conversation')
    dispatch(startConversation())
  }

  console.log({ conversations })

  return (
    <SidebarContainer>
      <Stack
        direction={'row'}
        alignItems={'center'}
        justifyContent={'space-between'}
      >
        <Typography variant="subtitle1" color="#6f6565" gutterBottom>
          Conversations
        </Typography>
        <IconButton onClick={createNewConversation}>
          <AddIcon />
        </IconButton>
      </Stack>
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
              cursor: 'pointer',
              boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)',
              '&:hover': {
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)'
              }
            }}
          >
            <ListItemText primary={conv.name} />
            <IconButton
              onClick={(event) => {
                event.stopPropagation()
                handlePopoverOpen(event, conv.feedback)
              }}
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
