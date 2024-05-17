import * as CryptoJS from "crypto-js";

export const encrypt = (password, masterPassword) => {
  return CryptoJS.AES.encrypt(
    password,
    CryptoJS.SHA256(masterPassword)
      .toString(CryptoJS.enc.Base64)
      .substring(0, 32)
  ).toString();
};

export const decrypt = (encryptedpassword, masterPassword) => {
  const decrypted = CryptoJS.AES.decrypt(
    encryptedpassword,
    CryptoJS.SHA256(masterPassword)
      .toString(CryptoJS.enc.Base64)
      .substring(0, 32)
  );
  if (decrypted) {
    try {
      const str = decrypted.toString(CryptoJS.enc.Utf8);
      if (str.length > 0) {
        return str;
      } else {
        return "error 1";
      }
    } catch (e) {
      return "error 2";
    }
  }
  return "error 3";
};
