export function loadImage(url: string) {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.src = require(`@img/${url}`);
  });
}

export function loadImages(urls: string | string[]) {
  const isArray: boolean = Array.isArray(urls);
  const ary: string[] = isArray ? [...urls] : Object.values(urls);

  return Promise.all(ary.map((url) => loadImage(url))).then((result) => {
    const obj = Object.assign({}, urls);

    Object.keys(obj).forEach((key, index) => {
      obj[key] = result[index];
    });

    return obj;
  });
}
