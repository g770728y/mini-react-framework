## 介绍

非常容易使用的`react`应用框架, 全部使用**函数式组件 + hooks** 实现, 适合开发中小规模应用

## 动机

无论公司应用, 还是自己的应用, 每开始一个应用, 都需要一个框架. \
github 上有很多轮子, 为什么要造 `mini-react-framework` 这个新轮子呢?\
原因很简单: 对现有现成的`framework`不满意.

## 技术选型

. 使用 函数式组件 + hooks (而不是 class 组件 )
. 使用 `react-atom` + `immer` ( 而不是 `redux`/`rematch` / `dva` / `mobx` / `unstated` / `apollo client` ...)
. 使用 `jsx-control-statement` 的 <If ...> 模板(而不是 items.map(...))

## 使用

### 开始使用

    git clone https://github.com/g770728y/mini-react-framework your-app-name
    cd your-app-name
    yarn

    // 用到了 .babelrc(这是create-react-app默认禁用的), 要么 yarn eject, 不想 eject 就只有象下面这样改了
    // 打开webpack.config.js文件:
    vi node_modules/react-scripts/config/webpack.config.js
    将 `babelrc: false`  改成  `babelrc: true`

    yarn start

### 建 store

由于使用了`react-atom`, 所以可以建**任意嵌套深度**的 store, 这比`redux`风格的框架方便很多\
不仅可以建立全局 store, 还可以建立分形 store. 对于中后台应用(而非网页应用), 个人觉得更为合理\
TODO: 如何建 store

### 读 store

TODO: 如何读 store(select)

### 写 store

TODO: 如何写 store(配合 immer)

## 附技术选型理由

1. 不喜欢 class, 更偏向 函数式组件 + hooks\
   用习惯了 hooks, 几乎没有任何动力去使用 class 组件了

2. 不满意现在普通使用的的**状态管理方案**
   本框架整合了`react-atom` + `immer` 进行状态管理, 优点是:\
   2.1 基于 hooks, api 非常简单, 一学就会\
   2.2 性能很高, 能够实现精确更新( 类似低配版的 mobx )

没有使用其它框架的理由是: \
`redux`的繁琐就不多说了, `rematch`/`dva`本质上也没跳出这个圈子, 感觉都不直接\
`mobx`非常好用, 但不方便配合 hooks, 这是最大的痛点\
`unstated`及类似方案, 在写小的 store 时感觉不错, 但可能不太适合全局使用\
`apollo client`? 还是做好本职工作: 数据获取及更新 吧. 使用 `grapqhl` 进行本地状态管理 太恶心了.

3. react 内置的模板解决方案太不直观\
   本框架使用了`jsx-control-statements`, 写法如下 (支持 `typescript` !):

    <For each={_item_} index={_index_} of={[items]}>
      < div key={id}>...< /div>
    < /For>

在你嵌套多层标签时, 这种写法优势非常明显.

使用 js+jsx 实现模板, 确实不直观, 这其实一直是 react 相对于 vue 和 angular 的一大痛点:

items.map(({id}) => <div key={id}>...</div>)
