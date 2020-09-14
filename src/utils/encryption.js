import CryptoJS from 'crypto-js'

// default ase key
const AES_KEY = 'UPMSAESKEY!@#123'

// 加密
export function encrypt (word, keyStr) {
  keyStr = keyStr || AES_KEY
  const key = CryptoJS.enc.Utf8.parse(keyStr)
  const srcs = CryptoJS.enc.Utf8.parse(word)
  const encrypted = CryptoJS.AES.encrypt(srcs, key, { mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7 })
  // return CryptoJS.enc.Base64.stringify(encrypted.ciphertext) base64
  return encrypted.ciphertext.toString().toUpperCase() // hex
}

// 解密
export function decrypt (word, keyStr) {
  keyStr = keyStr || AES_KEY
  const key = CryptoJS.enc.Utf8.parse(keyStr)
  const encryptedHexStr = CryptoJS.enc.Hex.parse(word)
  const srcs = CryptoJS.enc.Base64.stringify(encryptedHexStr)
  const decrypt = CryptoJS.AES.decrypt(srcs, key, { mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7 })
  const decryptedStr = decrypt.toString(CryptoJS.enc.Utf8)
  return decryptedStr.toString()
}
