/**
 * @description: this is all the validator rules for the current project, if u need to add new rules, pls add this in the file and write note
 * @author: shr
 * @date 2020-02-20
 */

/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal (path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * @methods: 校验手机号规则
 * @param: {val string}
 * @return {boolean}
 */
export function regexMobile (val) {
  const mobileRegex = /^1[3456789]\d{7,11}$/
  return mobileRegex.test(val)
}

/**
 * @methods: 校验密码规则 (必须含数字字母，长度6-100位之间）/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[~!@#$%^&*()_+`\-={}:";'<>?,.\/]).{6,100}$/
 * @param: {val string}
 * @return {boolean}
 */
export function regexPassword (val) {
  const mobileRegex = /^[\w]{6,100}$/
  return mobileRegex.test(val)
}

/**
 * @methods: 校验email
 * @param: {val string}
 * @return {boolean}
 */
export function validEmail (email) {
  const reg = /^([0-9A-Za-z\-_\.]+)@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/ /* eslint-disable-line */
  return reg.test(email)
}

/**
 * @methods: 校验用户名 不能有汉字
 * @param: {val string}
 * @return {boolean}
 */
export function validUserName (val) {
  const reg = /^[0-9a-zA-Z]+$/ /* eslint-disable-line */
  return reg.test(val)
}
