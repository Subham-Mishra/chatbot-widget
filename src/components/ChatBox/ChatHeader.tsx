import { Select, MenuItem, Avatar, Box } from '@mui/material'

const ChatHeader = () => {
  return (
    <Box className="flex h-[10vh] items-center justify-between border-b border-gray-200 p-4">
      <Select defaultValue="chatbot-upgraded" variant="outlined" size="small">
        <MenuItem value="chatbot">Chatbot Standard</MenuItem>
        <MenuItem value="chatbot-upgraded">Chatbot Upgraded</MenuItem>
      </Select>
      <Avatar
        alt="Subham Mishra"
        src="/path-to-avatar.jpg"
        sx={{ color: '#fff', backgroundColor: '#e43c4a' }}
      />
    </Box>
  )
}

export default ChatHeader
