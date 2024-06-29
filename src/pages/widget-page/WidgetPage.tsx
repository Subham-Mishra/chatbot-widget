import React from 'react'
import { Stack } from '@mui/material'
import { ChatBox, Sidebar } from 'components'

const WidgetPage: React.FC = () => {
  return (
    <Stack direction="row">
      <Sidebar />
      <ChatBox />
    </Stack>
  )
}

export { WidgetPage }
