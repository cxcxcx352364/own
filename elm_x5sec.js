/**
 * @title 饿坏啦
 * @create_at 2023-11-18 09:18:49
 * @description 🐒这个人很懒什么都没有留下
 * @author 超级无敌大兔子
 * @version v1.0.0
 * @rule raw ^x5sec=*
 */
const serverAddress = ''; //青龙地址
const clientId = '';                   //client_id
const clientSecret = '';   //client_secret
const authPath = '/open/auth/token';
const envsPath = '/open/envs';
const cronsRunPath = '/open/crons/run';
const enablePath = '/open/envs/enable';
const disablePath = '/open/envs/disable';
const serverUrl = `${serverAddress}`;
const authUrl = `${serverUrl}${authPath}?client_id=${clientId}&client_secret=${clientSecret}`;
const envUrl = `${serverUrl}${envsPath}`;
const cronurl = `${serverUrl}${cronsRunPath}`;
const enableurl = `${serverUrl}${enablePath}`;
const disableurl = `${serverUrl}${disablePath}`;
let message = s.getContent();
const parts = message.split(';');
const sec = parts[0].trim(); // 获取分割后的第一部分并去除首尾空格
s.reply("识别到x5sec！");
s.reply(sec);
async function main() {
  await refreshEnv();
  s.reply("更新环境变量完成");
  time.sleep(1000);
  await enableEnv();
  s.reply("启用环境变量完成");
  time.sleep(1000);
  await startcron3(); 
  s.reply("特级厨师启动完成");
  time.sleep(1000);
  await startcron6(); 
  s.reply("福尔魔方启动完成");
  time.sleep(1000);
  await disableEnv();
  s.reply("禁用环境变量完成");
}
main();
// 获取 Token 的函数
async function getToken() {
  try {
    const response = await fetch(authUrl);
    const data = await response.json();
    const token = data.data.token;
    return token;
  } catch (error) {
    console.error('Error getting token:', error);
    throw error;
  }
}
// 更新环境变量
async function refreshEnv() {
  try {
    const token = await getToken();
    const response = await fetch(envUrl, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`, // 在这里添加Bearer Token
      },
      body: JSON.stringify({
        value: sec,
        name: 'x5sec',
        remarks: '更新',
        id: '1'
      }),
    });
    const responseData = await response.json();
    console.log('POST Response:', responseData); // 根据需要处理响应数据
  } catch (error) {
    console.error('Error making request:', error);
  }
}
// 启用环境变量
async function enableEnv() {
  try {
    const token = await getToken();
    const response = await fetch(enableurl, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`, // 在这里添加Bearer Token
      },
      body: JSON.stringify([1]),
    });
    const responseData = await response.json();
    console.log('POST Response:', responseData); // 根据需要处理响应数据
  } catch (error) {
    console.error('Error making request:', error);
  }
}
//启动特级厨师定时任务
async function startcron3() 
{
  try {
    const token = await getToken();
    const response = await fetch(cronurl, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`, // 在这里添加Bearer Token
      },
      body: JSON.stringify([3]),
    });
    const responseData = await response.json();
    console.log('POST Response:', responseData); // 根据需要处理响应数据
  } catch (error) {
    console.error('Error making request:', error);
  }
}
//启动福尔魔方定时任务
async function startcron6() 
{
  try {
    const token = await getToken();
    const response = await fetch(cronurl, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`, // 在这里添加Bearer Token
      },
      body: JSON.stringify([6]),
    });
    const responseData = await response.json();
    console.log('POST Response:', responseData); // 根据需要处理响应数据
  } catch (error) {
    console.error('Error making request:', error);
  }
}
// 禁用环境变量
async function disableEnv() {
  try {
    const token = await getToken();
    const response = await fetch(disableurl, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`, // 在这里添加Bearer Token
      },
      body: JSON.stringify([1]),
    });
    const responseData = await response.json();
    console.log('POST Response:', responseData); // 根据需要处理响应数据
  } catch (error) {
    console.error('Error making request:', error);
  }
}
