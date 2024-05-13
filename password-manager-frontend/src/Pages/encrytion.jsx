import { createCipheriv, createDecipheriv, randomBytes } from "crypto";

const ALGORITHM = "aes-256-cbc";

export const encrypt = (text, masterPassword) => {
  const key = Buffer.from(masterPassword, "utf-8").slice(0, 32);
  const iv = randomBytes(16);
  const cipher = createCipheriv(ALGORITHM, key, iv);
  let encrypted = cipher.update(text, "utf8", "base64");
  encrypted += cipher.final("base64");
  return encrypted;
};

export const decrypt = (encryptedText, masterPassword) => {
  const key = Buffer.from(masterPassword, "utf-8").slice(0, 32);
  const decipher = createDecipheriv(
    ALGORITHM,
    key,
    Buffer.from(encryptedText, "base64")
  );
  let decrypted = decipher.update(encryptedText, "base64", "utf8");
  decrypted += decipher.final("utf8");
  return decrypted;
};
