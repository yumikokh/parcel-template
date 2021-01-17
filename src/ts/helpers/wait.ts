/**
 * @param {Number} ms 待機させたいms時間
 */

export default function wait(ms: number) {
  return (): Promise<null> =>
    new Promise((resolve) => {
      setTimeout(resolve, ms)
    })
}
