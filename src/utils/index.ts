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
