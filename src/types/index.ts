export type Message = {
  text: string
  ai: boolean
}

export type Feedback = {
  rating: number
  comment: string
}

export type Conversation = {
  id: string
  messages: Message[]
  feedback: Feedback | null
}

export type ChatState = {
  conversations: Conversation[]
  currentConversation: Conversation | null
}
