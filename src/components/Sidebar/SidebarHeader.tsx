import { Stack, Typography, IconButton } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import { SidebarHeaderProps } from 'types'
import { theme } from 'constants/theme'

const SidebarHeader = ({ createNewConversation }: SidebarHeaderProps) => (
  <Stack
    direction={'row'}
    alignItems={'center'}
    justifyContent={'space-between'}
    height={'4rem'}
  >
    <Typography variant="subtitle1" color={theme.sidebarTextColor} gutterBottom>
      Conversations
    </Typography>
    <IconButton
      onClick={createNewConversation}
      sx={{ color: theme.sidebarTextColor }}
    >
      <AddIcon />
    </IconButton>
  </Stack>
)

export default SidebarHeader
