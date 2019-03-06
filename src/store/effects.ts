export async function login() {
  // TODO : 实现 登录, 写入 localStorage
  // 注意副作用最好通过 actions 修改数据库 (非必须)
  return Promise.resolve({ id: 1, name: 'gtt' })
    .then(user => user)
    .catch(e => {
      console.log(e);
      throw e;
    });
}
