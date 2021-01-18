import DeviceDetector from "device-detector-js";
// See: https://www.npmjs.com/package/device-detector-js

const d = new DeviceDetector().parse(navigator.userAgent);

export const isPc = d.device.type === "desktop";
export const isMobile = d.device.type === "smartphone";
export const isTablet = d.device.type === "tablet";

export const isAndroid = d.os.name === "Android";
export const isIOs = d.os.name === "iOS";
