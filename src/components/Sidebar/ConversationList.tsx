import { List, Stack, Typography } from '@mui/material'
import { Conversation, ConversationListProps } from 'types'
import ConversationListItem from './ConversationListItem'
import { theme } from 'constants/theme'

const ConversationList = ({
  conversations,
  handleSidebarConversationClick,
  handleShareConversation,
  handleDeleteConversation,
  handlePopoverOpen,
  currentId
}: ConversationListProps) => (
  <>
    {conversations.length === 0 ? (
      <Stack
        alignItems={'center'}
        justifyContent={'center'}
        height={'calc(100% - 4rem)'}
      >
        <Typography
          variant="subtitle1"
          color={theme.sidebarEmptyListColor}
          gutterBottom
        >
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
            handleDeleteConversation={handleDeleteConversation}
            handlePopoverOpen={handlePopoverOpen}
            isSelected={conv.id === currentId}
          />
        ))}
      </List>
    )}
  </>
)

export default ConversationList
