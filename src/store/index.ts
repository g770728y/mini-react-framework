import * as React from 'react';
import { Atom, swap } from '@dbeining/react-atom';
import { IGlobalStoreData } from './type';

// 使用class的目的, 是为了支持服务端渲染
// 原因: 服务端渲染最好不使用全局变量(将GlobalStore的实例放到Context中)
const initValues = {
  ui: {
    showHeader: true
  },
  user: {
    id: 1,
    name: 'gtt',
    role: 'm'
  },
  // 演示使用helper.ts的场合
  desks: [
    {
      id: 1,
      title: 'desk1'
    },
    {
      id: 2,
      title: 'desk2'
    },
    {
      id: 3,
      title: 'desk3'
    }
  ]
};
export class GlobalStore {
  // data 最好进行初始化
  store = Atom.of<IGlobalStoreData>(initValues);

  // 构造时, 可传入其它变动部分的参数(比如从后台提取的数据), 然后自动合并
  constructor(storePatch?: Partial<IGlobalStoreData>) {
    swap(this.store, s => ({ ...s, ...storePatch }));
  }
}

export const GlobalContext = React.createContext<GlobalStore | null>(null);
