import { ListItem, IconButton, Tooltip, Typography, Stack } from '@mui/material'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined'
import { ConversationListItemProps } from 'types'
import { theme } from 'constants/theme'
import { DeleteOutline } from '@mui/icons-material'

const ConversationListItem = ({
  conversation,
  handleSidebarConversationClick,
  handleShareConversation,
  handleDeleteConversation,
  handlePopoverOpen,
  isSelected
}: ConversationListItemProps) => (
  <ListItem
    onClick={handleSidebarConversationClick(conversation.id)}
    sx={listItemStyles(isSelected)}
  >
    <Typography variant="subtitle2" color={theme.sidebarTextColor}>
      {conversation.name}
    </Typography>
    <Stack direction={'row'}>
      <Tooltip title="Share">
        <IconButton
          onClick={(event) => {
            event.stopPropagation()
            handleShareConversation(conversation.id)
          }}
        >
          <ShareOutlinedIcon sx={{ fontSize: 18 }} />
        </IconButton>
      </Tooltip>
      <IconButton
        onClick={(event) => {
          event.stopPropagation()
          handlePopoverOpen(event, conversation.feedback)
        }}
      >
        <InfoOutlinedIcon sx={{ fontSize: 18 }} />
      </IconButton>
      <IconButton
        onClick={(e) => {
          e.stopPropagation()
          handleDeleteConversation(conversation.id)
        }}
      >
        <DeleteOutline sx={{ fontSize: 20 }} />
      </IconButton>
    </Stack>
  </ListItem>
)

const listItemStyles = (isSelected: boolean) => ({
  marginBottom: '1rem',
  borderRadius: '0.5rem',
  backgroundColor: theme.listItemBackgroundColor,
  border: isSelected
    ? `1px solid ${theme.selectedListItemBorderColor}`
    : `1px solid ${theme.listItemBackgroundColor}`,
  padding: '1rem',
  display: 'flex',
  justifyContent: 'space-between',
  cursor: 'pointer',
  boxShadow: isSelected
    ? '0 2px 4px rgba(0, 0, 0, 0.2)'
    : '0 1px 2px rgba(0, 0, 0, 0.1)',
  '&:hover': {
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)'
  }
})

export default ConversationListItem
