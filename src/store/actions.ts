import { swap } from '@libre/atom';
import { useContext } from 'react';
import { GlobalContext } from '.';
import { IGlobalStoreData, IUser } from './type';
import produce from 'immer';
// 为避免命名冲突
import * as h from './helper';

// 与 redux 的 action 不太一样, 更接近 mobx 的 action
// 对于小应用, 完全可以在 hooks.ts 里只保留 这个公共方法
// 以下示例中的其它方法, 可借助 helper.ts , 直接内联到组件里
////////////////////////////////////////////////////////////////////  updator ////////////////////////////////////////////////////////////
export function updateGlobal(updator: (store: IGlobalStoreData) => void) {
  const store = useContext(GlobalContext)!.store;
  swap(store, s => produce(s, draft => updator(draft)));
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////// 以下是示例, 在使用前可以学习, 之后可以删除 ////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// 看见没有, 修改登录用户超级简单, 尝试与redux对比
// 其简单性接近 mobx (但mobx需要掌握更多api)
export function setLoginUser(user: IUser) {
  // s 相当于globalStore
  updateGlobal(s => (s.user = user));
}

// 如果有比较复杂的逻辑, 请将 updator 写到 helper 方法里
export function setLoginUserWithHelper(user: IUser) {
  // s 相当于globalStore
  updateGlobal(h.setLoginUser(user));
}

// 实际上, 我们可以把 s=>s.user = user 改成:
// s => {
//    // 获取 s 中的其它属性, 实现非常复杂的计算
//    s.user = user;
// }
