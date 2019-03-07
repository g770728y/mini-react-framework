import { IAppStoreData, IUser } from './type';
import { curry } from 'rambda';

////////////////////////////////////////////////////////////////////  用于  读取 的 helper 方法 ////////////////////////////////////////////////////////////

// helper 写法1:
export function findDeskById(deskId: number) {
  return function(store: IAppStoreData) {
    return (store.desks || []).find(d => d.id === deskId);
  };
}

// helper 写法2:
// 这种写法依赖curry, 可读性可能更强, 但需要理解curry
export const findDeskByIdCurry = curry(function(
  deskId: number,
  store: IAppStoreData
) {
  return (store.desks || []).find(d => d.id === deskId);
});

////////////////////////////////////////////////////////////////////  用于 修改 的 helper 方法 ////////////////////////////////////////////////////////////
export const setLoginUser = curry(function(user: IUser, store: IAppStoreData) {
  store.user = user;
});
