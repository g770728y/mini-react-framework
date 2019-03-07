import { AppContext } from '.';
import { useContext } from 'react';
import { useAtom } from '@dbeining/react-atom';
import { IAppStoreData, IUser, IDesk } from './type';
import * as h from './helper';

// 对于小应用, 完全可以在 hooks.ts 里只保留 这个公共方法
// 以下示例中的其它方法, 可借助 helper.ts , 直接内联到组件里
export function useApp<T>(f: (store: IAppStoreData) => T) {
  const store = useContext(AppContext)!.store;
  return useAtom(store, { select: f });
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////// 以下是示例, 在使用前可以学习, 之后可以删除 ////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// 获取登录用户
// 这种简单情况, 完全可以内联到 组件 内部( 不用写在 hooks.ts )
export function useLoginUser() {
  return useApp<IUser>(s => s.user);
}

// 稍微复杂一点的, 可以写到这里
export function useDesk(id: number) {
  return useApp<IDesk | undefined>(s => (s.desks || []).find(d => d.id === id));
}

// 同上, 换用 helper 方法
// 因为简单, 所以有了 helper 方法后, 也可以 直接内联到 组件内部( 不用写在 hooks.ts )
export function useDeskWithHelper(id: number) {
  return useApp<IDesk | undefined>(h.findDeskById(id));
}

// 同上, 换用 helper 里的 curry 方法
export function useDeskWithHelperCurry(id: number) {
  return useApp<IDesk | undefined>(h.findDeskByIdCurry(id));
}
