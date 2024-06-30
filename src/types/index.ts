export type Message = {
  text: string
  ai: boolean
}

export type Feedback = {
  rating: number
  comment?: string
}

export type Conversation = {
  id: string
  name: string | null
  messages: Message[]
  feedback: Feedback | null
}

export type ChatState = {
  conversations: Conversation[]
  currentConversation: Conversation | null
}

export type ChatInputProps = {
  currentConversation: Conversation
  handleEndConversation: () => void
}

export type FeedbackModalProps = {
  modalOpen: boolean
  setModalOpen: (open: boolean) => void
  currentConversation: Conversation
  setCurrentConversation: React.Dispatch<React.SetStateAction<Conversation>>
}

export type SidebarHeaderProps = {
  createNewConversation: () => void
}

export type ConversationListProps = {
  conversations: Conversation[]
  handleSidebarConversationClick: (id: string) => () => void
  handleShareConversation: (id: string) => void
  handlePopoverOpen: (
    event: React.MouseEvent<HTMLElement>,
    feedback: Feedback | null
  ) => void
  currentId: string | undefined
}

export type ConversationListItemProps = {
  conversation: Conversation
  handleSidebarConversationClick: (id: string) => () => void
  handleShareConversation: (id: string) => void
  handlePopoverOpen: (
    event: React.MouseEvent<HTMLElement>,
    feedback: Feedback | null
  ) => void
  isSelected: boolean
}

export type FeedbackPopoverProps = {
  anchorEl: HTMLElement | null
  open: boolean
  handlePopoverClose: () => void
  currentFeedback: Feedback | null
}
