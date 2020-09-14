const filters = {
  /**
   * @feature：将状态字段 0/1 转为 禁用/启用
   * @param {data} data 时间戳
   * @returns {String} 禁用/启用 字符串
   */
  statusTransition: (data) => {
    return Number(data) === 0 ? '禁用' : '启用'
  }
}
export default (Vue) => {
  Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key])
  })
}
