const cryptoJS = require('crypto-js')

const encryptData = (encryptionText, secretKey) => {
  var encryptionKey = cryptoJS.AES.encrypt(encryptionText, secretKey).toString()
  return encryptionKey
}

const decryptData = (encryptedText, secretKey) => {
  console.log(encryptedText)
  console.log(secretKey)
  var decryptText = cryptoJS.AES.decrypt(encryptedText, secretKey).toString(cryptoJS.enc.Utf8)
  return decryptText
}

const hashPassword = (mail, password) => {
  const salt = mail + 'lastPass'
  var hash = cryptoJS.PBKDF2(password, salt, {keySize: 128 / 32, iteration: 10})
  return hash.toString()
}

module.exports = {
  encryptData,
  decryptData,
  hashPassword
}
