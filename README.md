# vue3.0-template

# 项目运行指南

- 安装/更新依赖包：`npm install`
  - 说明：进入正式开发前需要提交 package-lock.json，正式开发后慎用 npm update
- 运行：
  - 启动为 dev 环境：`npm run serve` 或 `npm start`
  - 打包为 prod 环境：`npm run build`
  - 检查并修复源码：`npm run lint`

# 开发规范

### 【组件名称】

- 名称大小写

  ```html
  <script>
    import MyComponent from '@/components/MyComponent.vue' // 文件名使用 PascalCase 命名法
    export default {
      name: 'ComponentName', // 必须有 name
      components: { MyComponent },
    }
  </script>

  <template>
    <div>
      <!-- 在 template 中一律使用 kebab-case 方式调用 -->
      <my-component />
      <el-input />
    </div>
  </template>
  ```

- 使用前缀
  - 非业务通用组件使用 Base 前缀
  - <a href="#hash_Ex">扩展/包装第三方开源组件或内部公共库组件 (不建议使用高阶组件)</a> 使用 Ex 前缀
  - 单例组件使用 The 前缀


### 【统一标签顺序】

- template --> script  --> style，并使用空行分隔

### 【其它注意事项】

- **组件中的 data 及 vuex 中的 state 应该可序列化，即不要存 undefined、function 等**
- 慎用 this\.\$refs、this\.\$parent、this\.\$root、provide/inject
  - this\.\$refs 一般用在第三方开源组件或内部公共库组件或非常稳定的组件，以调用显式声明的方法
  - 在万不得已的情况下需要暴露方法给外部调用时需要加 pub 前缀，如：this\.\$refs.pubFocus()
- 尽量不要在 watch 中直接变更数据，易造成死循环。数据变更应该交给用户交互事件或初始化的异步回调

### 【 <a target="_blank" href="https://cn.vuejs.org/v2/style-guide/">!!!其它则严格遵守 vue 官方风格指南</a>】

---



## 其它杂项

- js 变量声明尽量使用 const
- js 变量或对象属性使用驼峰命名法
- js 私有变量或对象私有属性使用 \_ 前缀 (注意: <a target="_blank" href="https://cn.vuejs.org/v2/style-guide">vue 组件属性不要使用 \_ 前缀</a>)

  ```js
  // 表明该变量仅在 createId 方法中使用 (与 createId 方法紧挨着)
  let _count = 0
  const createId = () => `${Date.now()}_${++_count}`

  // 适时使用立即执行函数可以简洁作用域及保护私有变量
  const createId = (() => {
    let count = 0
    return () => `${Date.now()}_${++count}`
  })()
  ```

- 导入模块时不要省略后缀（js 除外），利于 IDE 感知
- 导入当前目录以外的模块时，建议使用'@'别名

  ```js
  // js
  import XxxXxx from '@/components/XxxXxx.vue'
  ```

  ```html
  <!-- template -->
  <img src="@/assets/logo.png" />
  ```

  ```css
  /* style */
  @import '~@/styles/vars.less';
  .xxx {
    background: url('~@/assets/logo.png');
  }
  ```

- **严格遵守 ESLint 语法校验**，警告级别的也要处理 (暂时用不到的代码可以先注释掉)

---

## 代码注释

- 文件头部注释

  - 脚本文件、样式文件

    ```js
    /**
     * 说明
     * @author 作者
     */
    ```

- js 注释，如复杂功能函数等 (结合 <a target="_blank" href="https://jsdoc.app/">JSDoc 注释标准</a>，帮助 IDE 智能感知)

  - 注释格式

    ```js
    /**
     * 文件头部、大的区块、JSDoc
     */

    /* 一般的区块 */

    // 小的区块、行
    ```

  - <a target="_blank" href="https://jsdoc.app/howto-es2015-modules.html">ES 2015 Modules</a>
    ```js
    /**
     * 使用 param 表示函数形参
     * 使用 returns 表示函数返回值
     * @param {类型} data
     * @param {object} [options] 可选参数
     * @param {类型} options.xxx
     * @param {类型 =} options.yyy 可选属性
     * @returns {类型}
     */
    export function myMethod(data, options) {}

    /**
     * 使用 type 进行类型断言
     * @type {import('vue-router').RouteConfig[]}
     */
    const routes = []

    /**
     * 使用 typedef 定义类型，方便多处使用（命名时需要首字母大写）
     * @typedef {routes[0]} RouteConfig
     * @param {(meta: object, route: RouteConfig) => boolean} filterCallback
     * @returns {RouteConfig[]}
     */
    export const filterMapRoutes = function(filterCallback) {}

    /**
     * 类型参考：https://www.tslang.cn/docs/handbook/basic-types.html
     *
     * 基本
     * @type {boolean}
     * @type {number}
     * @type {string}
     * @type {1 | 2 | 3}
     * @type {'a' | 'b' | 'c'}
     *
     * 数组
     * @type {Array}
     * @type {string[]}
     *
     * 函数
     * @type {Function}
     * @type {(data) => void}
     * @type {(data: Array) => void | boolean}
     *
     * 对象
     * @type {object}
     *
     * 联合
     * @type {number | string}
     * @type {boolean | (() => boolean)}
     *
     * 导入 ts 类型
     * @type {import('xxx').yyy}
     *
     * 从现有的 js 变量或 ts 类型进行推导
     * @type {Parameters<fn>} 取函数形参的类型
     * @type {Parameters<fn>[0]} 取函数第一个形参的类型
     * @type {ReturnType<fn>} 取函数返回值的类型
     * @type {obj['xxx']} 取指定属性值的类型（不能使用点语法）
     * ...
     */
    ```

  - <a target="_blank" href="https://jsdoc.app/howto-es2015-classes.html">ES 2015 Classes</a>

    ```


- vue template 注释

  - 适当使用注释与空行

    ```html
    <!-- 说明 -->
    <div>block1</div>

    <!-- 说明 -->
    <div>block2</div>
    ```

---

## 工程目录结构
### 注：
> * 所有的接口请求全部放到同一的apis中同一维护。（当后端出现批量更换接口等情况时，方便操作）
> * 每个page维护自己的接口请求。（当业务页面增加时文件过多时，方便处理）
> * eslint配置文件，请勿随意修改。

```
├── dist/                          # 构建产物目录
├── public/
│   ├── index.html                 # 应用入口 HTML
│   └── favicon.png                # Favicon
├── src/                           # 源码
│   ├── api/                       # 接口请求相关
│   │   ├──  apis                    # 全部的后端api接口
│   │   └──  commonServices.js       # 公用的接口请求，例如user等
│   ├── asset/                     # 资源文件，图片字体等
│   ├── components/                # 自定义业务组件
│   ├── filters/                   # vue全局filters
│   ├── Icons/                     # svgIcon
│   ├── lang/                      # 国际化配置
│   ├── layouts/                   # 布局组件
│   ├── pages/                     # 所有的页面
│   │   ├── example_page/            # 示例page
│   │   │   ├── components             # 当前page公用的组件
│   │   │   ├── services.js            # 当前page所有的接口请求
│   │   │   └── index.vue              # 当前page入口文件
│   ├── store/                     # 应用级数据状态
│   ├── utils/                     # 全局公用方法
│   ├── styles/                    # 重新的组件样式and公用样式
│   ├── app.vue                    # 应用入口
│   └── main.js                    # 应用入口
│
├── eslintrc.json                  #lint配置文件
├── package.json
└── vue.config.json
```
