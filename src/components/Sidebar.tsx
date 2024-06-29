import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../redux/store'
import {
  List,
  ListItem,
  ListItemText,
  Typography,
  Box,
  styled
} from '@mui/material'

const SidebarContainer = styled(Box)({
  height: '100vh',
  width: '30%',
  padding: '0.8rem 1.2rem',
  backgroundColor: '#f5f5f5',
  borderRight: '1px solid #e0e0e0',
  overflowY: 'auto'
})

const Sidebar: React.FC = () => {
  const conversations = useSelector(
    (state: RootState) => state.chat.conversations
  )

  return (
    <SidebarContainer>
      <Typography variant="h6" gutterBottom>
        Conversations
      </Typography>
      <List>
        {conversations.map((conv) => (
          <ListItem
            key={conv.id}
            sx={{
              marginBottom: '1rem',
              backgroundColor: '#fff',
              borderRadius: '0.5rem',
              padding: '1rem',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
            }}
          >
            <ListItemText
              primary={conv.messages.map((msg) => msg.text).join(' ')}
              secondary={
                <>
                  <Typography
                    component="span"
                    variant="body2"
                    color="textPrimary"
                  >
                    Rating: {conv.feedback?.rating}
                  </Typography>
                  <br />
                  <Typography
                    component="span"
                    variant="body2"
                    color="textPrimary"
                  >
                    Comment: {conv.feedback?.comment}
                  </Typography>
                </>
              }
            />
          </ListItem>
        ))}
      </List>
    </SidebarContainer>
  )
}

export { Sidebar }
