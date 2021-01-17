/**
 * ブラウザやデバイスが対応しているイベントに合わせタッチスクロールもしくはマウススクロールを操作します
 */

// 禁止するスクロールイベントを判定する
const mouseWheel = "onwheel" in document ? "wheel" : "mousewheel";
const scrollEvent = "ontouchmove" in window ? "touchmove" : mouseWheel;

const invalidation = (e) => {
  e.preventDefault();
};

const useCapture = false;

// スクロールを禁止する
export function preventScroll() {
  window.addEventListener(scrollEvent, invalidation, useCapture);
}

// スクロール禁止を解除する
export function allowScroll() {
  window.removeEventListener(scrollEvent, invalidation, useCapture);
}
