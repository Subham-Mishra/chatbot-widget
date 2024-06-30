import { List, Stack, Typography } from '@mui/material'
import { Conversation, ConversationListProps } from 'types'
import ConversationListItem from './ConversationListItem'

const ConversationList = ({
  conversations,
  handleSidebarConversationClick,
  handleShareConversation,
  handlePopoverOpen,
  currentId
}: ConversationListProps) => (
  <>
    {conversations.length === 0 ? (
      <Stack
        alignItems={'center'}
        justifyContent={'center'}
        height={'calc(100% - 2rem)'}
      >
        <Typography variant="subtitle1" color="#ffc3c8" gutterBottom>
          No conversations yet
        </Typography>
      </Stack>
    ) : (
      <List>
        {conversations.map((conv: Conversation) => (
          <ConversationListItem
            key={conv.id}
            conversation={conv}
            handleSidebarConversationClick={handleSidebarConversationClick}
            handleShareConversation={handleShareConversation}
            handlePopoverOpen={handlePopoverOpen}
            isSelected={conv.id === currentId}
          />
        ))}
      </List>
    )}
  </>
)

export default ConversationList
