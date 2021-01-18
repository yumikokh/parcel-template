import p from "platform";

export const isPc = p.product === null;
export const isMobile = !!isPc;

export const isAndroid = p.os.family === "Android";
export const isIOs = p.os.family === "iOS";
