import crypto from "crypto";

export default (str = ""): string => {
  const md5 = crypto.createHash("md5");
  return md5.update(str, "binary").digest("hex");
};
