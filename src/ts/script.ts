switch (location.pathname) {
  case "/":
  case "/index.html":
    // TOP画面
    document
      .getElementById("top-select-button")
      .addEventListener("click", () => {
        // 動画選択画面が入ります
        location.href = "./preview.html";
      });

    // データがなかったとき（ダミー用）
    document.getElementById("video-list").setAttribute("data-notfound", "true");
    break;

  case "/preview.html":
    // PREVIEW画面

    // モーダル表示時に背景スクロールのロックを切り替える関数
    const toggleScrollLock = (lock) => {
      console.log(lock, "lock");
      if (lock) {
        // 背景スクロールロック
        document.body.style.overflow = "hidden";
        return;
      }
      // 背景スクロールロック解除
      document.body.style.overflow = "";
    };

    // ステータス変更関数
    // ステータス: "upload" | "loading" | "error"
    const changePreviewStatus = (status: "upload" | "loading" | "error") => {
      const previewElm = document.getElementById("preview");
      const ATTR = "data-status";
      previewElm.setAttribute(ATTR, status);
      toggleScrollLock(status === "error");
    };

    // ダミープログレス処理関数
    const barElm = document.getElementById("progress-bar");
    const numElm = document.getElementById("progress-number");

    let progress = 0;
    barElm.style.transform = `scaleX(${progress})`;
    numElm.textContent = String(Math.floor(progress * 100));

    const loop = () => {
      if (progress > 1) {
        // アップロード完了
        setTimeout(() => {
          location.href = "./completed.html";
          progress = 0;
        }, 800);
        return;
      }
      progress += 0.02;
      barElm.style.transform = `scaleX(${progress})`;
      numElm.textContent = String(Math.floor(progress * 100));
      setTimeout(loop, 100);
    };

    document
      .getElementById("preview-upload-button")
      .addEventListener("click", () => {
        // プログレス画面へ切り替え
        changePreviewStatus("loading");
        setTimeout(loop, 100);
      });

    // 表示確認のためにエラー画面をだす
    document
      .getElementById("preview-retry-button")
      .addEventListener("click", () => {
        changePreviewStatus("error");
      });

    document
      .getElementById("error-upload-button")
      .addEventListener("click", () => {
        changePreviewStatus("loading");
        loop();
      });

    document
      .getElementById("error-select-button")
      .addEventListener("click", () => {
        changePreviewStatus("upload");
      });
    break;

  case "/completed.html":
    // COMPLETED画面
    document
      .getElementById("completed-select-button")
      .addEventListener("click", () => {
        // 動画選択画面が入ります
        location.href = "./index.html";
      });
    break;

  default:
    break;
}
