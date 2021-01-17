import _ from 'lodash'
import { referChatByUuid } from '@/assets/js/models/chatData'

// リセット用
export function resetAll() {
  localStorage.removeItem('ons')
  localStorage.removeItem('hints')
  localStorage.removeItem('gmk')
  localStorage.removeItem('zode')
  localStorage.removeItem('chat')
}

// 解答
export function storeOns(data: Ons) {
  localStorage.setItem('ons', JSON.stringify(data))
}

export function restoreOns(): Ons {
  const ons = localStorage.getItem('ons')
  return ons && JSON.parse(ons)
}

// ヒント開放
export function storeHint(data: Hint) {
  localStorage.setItem('hints', JSON.stringify(data))
}

export function restoreHint(): Hint {
  const hints = localStorage.getItem('hints')
  return hints && JSON.parse(hints)
}

// 横回転ギミック解答
export function storeGmk(clearGmk: string[]) {
  localStorage.setItem('gmk', JSON.stringify(clearGmk))
}

export function restoreGmk(): string[] {
  const gmk = localStorage.getItem('gmk')
  return gmk && JSON.parse(gmk)
}

// 受け取りコード
export function storeZode(zode: string) {
  localStorage.setItem('zode', zode)
}

export function restoreZode(): string {
  return localStorage.getItem('zode') || ''
}

// チャット履歴
export function storeChats(data: Chat[]) {
  // uuidのlistに変換
  const list: number[] = data.map((chat) => chat.uuid)
  localStorage.setItem('chat', JSON.stringify(list))
}

export function restoreChats(): Chat[] {
  const chat = localStorage.getItem('chat')
  const list: number[] = chat && JSON.parse(chat)
  // Chat型に変換
  return _(list)
    .map((uuid: number) => referChatByUuid(uuid))
    .compact()
    .value()
}
