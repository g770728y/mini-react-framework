// 在这里写义公共store
// 以下是示范数据, 可定义任意深嵌套数据
// 对于简单系统, 可以在这里建立全部
export interface IGlobalStoreData {
  ui: {
    showHeader: boolean;
  };
  user: IUser;
  desks: IDesk[];
}

export interface IDesk {
  id: number;
  title: string;
}

export interface IUser {
  id: number;
  name: string;
  role: string;
}
