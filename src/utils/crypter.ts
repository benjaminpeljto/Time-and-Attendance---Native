import CryptoES from "crypto-es";

const base64UrlToBase64 = (base64Url: string) => {
    return base64Url
      .replace(/-/g, "+")
      .replace(/_/g, "/")
      .concat("=".repeat((4 - (base64Url.length % 4)) % 4));
};
const privateKey = "ICN5XjTHwT6AtLDbAlAQcsIKUuurkqLe4LoBLeD2j1E="

export default function decryptQRData(data: string) {
    try {
        // Convert the key from Base64 encoded string to WordArray
        const parsedKey = CryptoES.enc.Base64.parse(privateKey);
        // Convert URL-safe Base64 to standard Base64
        const standardBase64 = base64UrlToBase64(data);
        // Decrypt the data
        const decrypted = CryptoES.AES.decrypt(standardBase64, parsedKey, {
          mode: CryptoES.mode.ECB, // ECB mode as used in the Java code
          padding: CryptoES.pad.Pkcs7, // Pkcs7 padding as used in the Java code
        });
  
        // Convert the decrypted bytes back to a UTF-8 string
        return decrypted.toString(CryptoES.enc.Utf8);
      } catch (error) {
        console.error("Decryption error:", error);
        return null;
      }
}
 