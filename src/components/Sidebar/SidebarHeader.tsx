import { Stack, Typography, IconButton } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import { SidebarHeaderProps } from 'types'

const SidebarHeader = ({ createNewConversation }: SidebarHeaderProps) => (
  <Stack
    direction={'row'}
    alignItems={'center'}
    justifyContent={'space-between'}
    height={'2rem'}
  >
    <Typography variant="subtitle1" color="#cb2432" gutterBottom>
      Conversations
    </Typography>
    <IconButton onClick={createNewConversation} sx={{ color: '#e43c4a' }}>
      <AddIcon />
    </IconButton>
  </Stack>
)

export default SidebarHeader
