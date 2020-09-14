// /* eslint-disable */
//
// import Vue from 'vue'
//
// /**
// * @feature 修改el-input的word-limit，一个汉字等于两个字符，设置超出不能继续添加
// * @desc 需设置maxLength
// * @remark el-dialog > el-form > el-input 中销毁dialog,是通过key++来销毁,并创建新的,所以在关闭dialog时就调用unbind并执行bind,再次打开dialog时拿不到新的value,此时用v-cutting="modelValue",监听binding.value给input赋值
// * @use v-cutting | v-cutting="modelValue" v-cutting传值,解决编辑赋值时无法计算长度的问题
// */
// Vue.directive('cutting', {
//   // 被绑定元素插入父节点时调用 (仅保证父节点存在，但不一定已被插入文档中)。
//   inserted (el) {
//     const input = el.getElementsByTagName('input')[0] || el.getElementsByTagName('textarea')[0]
//     const num = el.getElementsByClassName('el-input__count-inner')[0] || el.getElementsByClassName('el-input__count')[0]
//     const curTotal = input.maxLength
//     input.oninput = function (e) {
//       let inputNum = 0
//       function getCurInfo (data) {
//         let temp = 0
//         let curIndex = 0
//         data.split('').forEach((item, index) => {
//           /[^\x00-\xff]/.test(item) ? temp += 2 : temp++  /* eslint-disable-line */
//           curIndex = index
//         })
//         return {
//           curNum: temp,
//           curIndex
//         }
//       }
//       if (getCurInfo(input.value).curNum > curTotal) {
//         input.value = input.value.substr(0, getCurInfo(input.value).curIndex)
//         el.dispatchEvent(new Event('input'))
//         // vue源码中,通知v-model需要手动触发input事件,否则修改input的value,v-model也无法更新
//       }
//       inputNum = getCurInfo(input.value).curNum
//       // if判断是否显示统计数字 并获取数据
//       if (num) {
//         num.innerHTML = (!input.value ? 0 : inputNum) + '/' + curTotal
//       }
//     }
//     if (input.value) {
//       input.oninput()
//     }
//   },
//   update (el, binding) {
//     if (binding.value) {
//       const input = el.getElementsByTagName('input')[0] || el.getElementsByTagName('textarea')[0]
//       input.value = binding.value
//       input.oninput()
//     }
//   },
//   unbind (el) {
//     const input = el.getElementsByTagName('input')[0] || el.getElementsByTagName('textarea')[0]
//     input.oninput = null
//   }
// })
//
// /**
//  * @feature 文字超出隐藏鼠标移入展示
//  * @remark 给父容器新建一个子容器，放入要展示的文字，判断新的容器的宽是否超出父容器的宽
//  * @use v-showTips
//  */
//
// Vue.directive('showTips', {
//   inserted (el, bindings, vnode) {
//     const curStyle = window.getComputedStyle(el, '')
//     const textSpan = document.createElement('span')
//     textSpan.style.fontSize = curStyle.fontSize
//     textSpan.style.fontWeight = curStyle.fontWeight
//     textSpan.style.fontFamily = curStyle.fontFamily
//     document.body.appendChild(textSpan)
//     textSpan.innerHTML = el.innerText
//     if (textSpan.offsetWidth > el.offsetWidth) {
//       el.style.overflow = 'hidden'
//       el.style.textOverflow = 'ellipsis'
//       el.style.whiteSpace = 'nowrap'
//       el.style.verticalAlign = 'middle' // 行内元素overflow：hidden有可能会造成塌陷等问题
//       el.onmouseenter = function (e) {
//         const vcTooltipDom = document.createElement('div')
//         vcTooltipDom.style.cssText = `
//           max-width:400px;
//           max-height: 400px;
//           overflow: auto;
//           position:fixed;
//           top:${e.clientY + 5}px;
//           left:${e.clientX}px;
//           background: rgba(0, 0 , 0, .6);
//           color:#fff;
//           border-radius:5px;
//           padding:10px;
//           display:inline-block;
//           font-size:12px;
//           z-index:19999
//         `
//         vcTooltipDom.setAttribute('id', 'vc-tooltip')
//         document.body.appendChild(vcTooltipDom)
//         document.getElementById('vc-tooltip').innerHTML = el.innerText
//       }
//       el.onmouseleave = function () {
//         const vcTooltipDom = document.getElementById('vc-tooltip')
//         vcTooltipDom && document.body.removeChild(vcTooltipDom)
//       }
//     }
//     document.body.removeChild(textSpan)
//   },
//   unbind (el) {
//     const vcTooltipDom = document.getElementById('vc-tooltip')
//     vcTooltipDom && document.body.removeChild(vcTooltipDom)
//   }
// })
