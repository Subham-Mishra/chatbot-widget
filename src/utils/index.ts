import { BOT_RESPONSES } from 'constants/botResponses'

export function classNames(...classes: unknown[]): string {
  return classes.filter(Boolean).join(' ')
}

export const truncateText = (
  text: string | undefined,
  maxLength: number
): string => {
  if (!text) return ''

  return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text
}

export const getRandomAIResponse = () => {
  const randomIndex = Math.floor(Math.random() * BOT_RESPONSES.length)
  return BOT_RESPONSES[randomIndex]
}
