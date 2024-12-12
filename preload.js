// 覆盖控制台的警告函数
window.addEventListener('load', () => {
  console.warn = (...args) => {
    return
  }
}) 