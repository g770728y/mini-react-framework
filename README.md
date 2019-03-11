## 介绍

非常容易使用的`react`应用框架, 全部使用**函数式组件 + hooks** 实现, 适合开发中小规模应用

## 动机

无论公司应用, 还是自己的应用, 每开始一个应用, 都需要一个框架. \
github 上有很多轮子, 为什么要造 `mini-react-framework` 这个新轮子呢?\
原因很简单: 对现有现成的`framework`不满意.

## 技术选型

- 使用 函数式组件 + hooks (而不是 class 组件 )
- 使用 `react-atom` + `immer` ( 而不是 `redux`/`rematch` / `dva` / `mobx` / `unstated` / `apollo client` ...)
- 使用 `jsx-control-statement` 的 <If ...> 模板(而不是 items.map(...))

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

---

### 建 store

由于使用了`react-atom`, 所以可以建**任意嵌套深度**的 store, 这比`redux`风格的框架方便很多\
不仅可以建立全局 store, 还可以建立分形 store. 对于中后台应用(而非网页应用), 个人觉得更为合理

#### 全局 store

建一个 store 非常方便:

    const store = Atom.of({
      ui: {},
      departments: [],
      companies: [];
    });

    // 子组件直接使用, 没有任何其它步骤

这种全局变量的方式未免太过天真, 只适合于个人项目, 关键问题是无法支持 `服务端渲染`

因此改成这样:

    第一步: 改成在类中定义:
    class Store {
      store = Atom.of({
        ui: {},
        departments: [],
        companies: []
      })
    }

    第二步: 定义一个Context
    const StoreContext = React.createContext(null);

    第三步: 注入到 根组件:
    function App() {
      return <StoreContext.Provider value={new Store()}>
        <div...>
      </StoreContext.Provider>
    }

    第四步: 子组件使用store
    function Child() {
      const store = useContext(StoreContext)!.store;
      ...
    }

使用 `mini-react-framework`, 你只需要改 src/store/index.ts 即可( 当然需要同时修改 type.ts 的类型定义)

---

### 读 store

以 `getUsers` 为例, 有两种可能:

#### 响应式读取

在组件内部使用 hooks:

    function Child() {
      const users = useStore(s => s.users);
    }

---

或在 `hooks.ts` 中定义好:

    export function useUsers() {
      return useStore(s=>s.users);
    }

然后在`Child`组件中直接使用:

    function Child() {
      const users = useUsers();
    }

#### 普通读取(非响应式)

在`mini-react-framework`中, 几无用处. (因为需要用到普通读取的场合, 一定会得到`deref`后的 `store` )
将相应方法放到`helper.ts`中即可

---

### 写 store

由于整合了 immer, 因此写 store 真的不要太简单, 我写过的复杂情况, 代码量是传统写法的 1/3 以下.

对于小应用, 可在组件内部直接修改:

    function Child() {
      // 注意我们使用了immer, 因此这里的写法非常简单!
      // 不用怀疑, 这一句等价于 : s => ({...s, users});
      const f = update(s => s.users = users)
      ...
    }

---

或在 `actions.ts` 中定义好:

    export function setUsers(users) {
      update(s => s.users = users);
    }

然后在 `Child` 中调用:

    export function Child() {
      // 其它可以直接使用 setUsers , 不用定义 f
      // 这里只是为了说明问题
      const f = (users) => setUsers(users);
    }

---

### 后台获取数据

随便用什么框架获取均可, 代码可以写在 `effects.ts` 内.\
这与 `rematch` `dva` 好象没有不同, 但 你完全可以直接在 `effects.ts` 里直接写 `action` 语句, 而不需要专门定义一个方法 \
换句话说, 你可以随意使用 async / await, 在一个方法内完全加载 + 更新 store 的全部工作

## 代码规范

### 文件组织

借鉴 `next.js` 的页面 + 步局 进行顶级功能分层\
借鉴`atom设计`原理 进行公共组件 分层\
具体如下: \

- 大块功能按页面`page`进行组织, 每个页面是一个`component`, 并放到`pages`目录下
- 布局放到`layouts`目录下
- 公共对话框 / 页头 / 菜单, 放到 `blocks` 目录下
- 按钮等放到`atoms`目录下

### store

对普通小型应用, 可直接一个全局`store`解决战斗\
对中型应用, 可拆分成 `AppStore` + `PageStore` , 其中 `PageStore` 可有多个 ( 有多少个页面就有多少个 )

## 其它按需导入的库

### 路由

- `React Router4+`
  本准备使用`Reach Router`, 但仔细想想: 一般路由都不会太复杂, 而`React Router4+`是事实上的标准, 技术上更容易保鲜.

### 数据获取

只影响 effect 写法, 对程序其它部分没有影响

- `Apollo Client`
  精确获取数据

- `Axios`
  用于 rest

### 表单

- `formik`
  无限接近`angular`的表单

## 附技术选型理由

### 不喜欢 class, 更偏向 函数式组件 + hooks\

用习惯了 hooks, 几乎没有任何动力去使用 class 组件了

### 不满意现在普通使用的的**状态管理方案**

本框架整合了`react-atom` + `immer` 进行状态管理, 优点是:\

- 基于 hooks, api 非常简单, 一学就会
- 性能很高, 能够实现精确更新( 类似低配版的 mobx )

没有使用其它框架的理由是: \

- `redux`的繁琐就不多说了, `rematch`/`dva`本质上也没跳出这个圈子, 感觉都不直接
- `mobx`非常好用, 但不方便配合 hooks, 这是最大的痛点
- `unstated`及类似方案, 在写小的 store 时感觉不错, 但可能不太适合全局使用
- `apollo client`? 还是做好本职工作: 数据获取及更新 吧. 使用 `grapqhl` 进行本地状态管理 太恶心了

### react 内置的模板解决方案太不直观\

本框架使用了`jsx-control-statements`, 写法如下 (支持 `typescript` !):

    < For each={_item_} index={_index_} of={[items]}>
      < div key={id}>...< /div>
    < /For>

使用 js+jsx 实现模板, 确实不直观, 这其实一直是 react 相对于 vue 和 angular 的一大痛点:

`items.map(({id}) => <div key={id}>...</div>)`

比较上面这两种写法, 可能感觉不明显, 反而觉得下面的写法短一些.\
但在你嵌套多层标签时, 这种写法优势非常明显.
