export default function scrollBottom(element: Element) {
  if (!element) return
  const bottom = element.scrollHeight - element.clientHeight
  element.scroll(0, bottom)
}
