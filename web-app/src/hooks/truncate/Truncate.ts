export const truncateTxt = (text: string, length: number, followUp: string) => {
  return text.length > length ? `${text.substring(0, length)}${followUp}` : text;
}