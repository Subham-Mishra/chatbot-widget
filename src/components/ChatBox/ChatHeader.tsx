import { Avatar, Box } from '@mui/material'
import { theme } from 'constants/theme'

const ChatHeader = () => {
  return (
    <Box className="flex h-[10vh] items-center justify-end border-b border-gray-200 p-4">
      <Avatar
        alt="Subham Mishra"
        src="/path-to-avatar.jpg"
        sx={{ color: '#fff', backgroundColor: theme.avatarBackgroundColor }}
      />
    </Box>
  )
}

export default ChatHeader
