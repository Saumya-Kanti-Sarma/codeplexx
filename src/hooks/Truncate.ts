export const truncateTxt = (text: String, length: number, followUp: string) => {
  return text.length > length ? `${text.substring(0, length)}${followUp}` : text;
}