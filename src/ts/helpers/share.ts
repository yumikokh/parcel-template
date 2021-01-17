import qs from 'querystring'

/**
 * Twitterシェア用のリンクをつくる
 * @param {String} opts.url シェアしたいURL
 * @param {String} opts.text シェア文言
 * @param {String} opts.hashtags ハッシュタグ
 * @return {String}
 */
export function createTwitterIntent(opts = {}): string {
  return `http://twitter.com/intent/tweet?${qs.stringify(opts)}`
}
/**
 * Facebookシェア用のリンクをつくる
 * @param {String} u シェアしたいURL
 * @return {String}
 */
export function createFacebookIntent(u: string): string {
  return `http://www.facebook.com/share.php?${qs.stringify({ u })}`
}
/**
 * LINEシェア用のリンクをつくる
 * @param {String} opts.url シェアしたいURL
 * @return {String}
 */

export function createLineIntent(url: string): string {
  return `https://social-plugins.line.me/lineit/share?${qs.stringify({ url })}`
}
