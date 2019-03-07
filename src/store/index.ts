import * as React from 'react';
import { Atom, swap } from '@dbeining/react-atom';
import { IAppStoreData } from './type';

// 使用class的目的, 是为了支持服务端渲染
// 原因: 服务端渲染最好不使用全局变量(将AppStore的实例放到Context中)
const initValues = {
  ui: { showHeader: true },
  user: { id: 1, name: 'gtt', role: 'm' },
  // 演示使用helper.ts的场合
  desks: [
    { id: 1, title: 'desk1' },
    { id: 2, title: 'desk2' },
    { id: 3, title: 'desk3' }
  ],
  chairs: [
    { id: 1, title: 'chair1' },
    { id: 2, title: 'chair2' },
    { id: 3, title: 'chair3' }
  ]
};

export class AppStore {
  // data 最好进行初始化
  store = Atom.of<IAppStoreData>(initValues);

  // 构造时, 可传入其它变动部分的参数(比如从后台提取的数据), 然后自动合并
  constructor(patch?: Partial<IAppStoreData>) {
    swap(this.store, s => ({ ...s, ...patch }));
  }
}

export const AppContext = React.createContext<AppStore | null>(null);
