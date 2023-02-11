/*
巨量代理签到
cron:34 1 1 * * *
15 1 1 * * * jlipqd.js

 */
const request = require('request');

(async () => {
  const phone = '15834488316';   //手机号
  const password = '123456';  //密码
  const ck = await login(phone, password);
  const result = await sign(ck);
  console.log(result);
})();

async function login(phone, password) {
  const options = {
    url: 'https://www.juliangip.com/login/go',
    headers: {
      'Host': 'www.juliangip.com',
      'Accept': 'application/json, text/javascript, /; q=0.01',
      'X-Requested-With': 'XMLHttpRequest',
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
       'Connection': 'keep-alive',
      'Origin': 'https://www.juliangip.com',
      'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/108.0.5359.112 Mobile/15E148 Safari/604.1',
      'Referer': 'https://www.juliangip.com/user/login'
    },
    form: {
      'type':'password',
      'username': phone,
      'password': password,
      'sms_code':'',
    }
  };
  let ck = "";
await new Promise((resolve, reject) => {
  request.post(options, (err, res, body) => {
    if (err) {
        reject(err);
    } else {
        ck = res.headers["set-cookie"];
        if (body.includes("message")) {
            resolve('登陆'+body.message);
        } else {
            resolve("登录失败");
        }
    }
  });
});
return ck;
}

async function sign(ck) {
  const options = {
    url: 'https://www.juliangip.com/users/getFree',
    headers: {
      'Host': 'www.juliangip.com',
      'Accept': '*/*',
      'Connection': 'keep-alive',
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      'Origin': 'https://www.juliangip.com',
      'X-Requested-With': 'XMLHttpRequest',
      'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/108.0.5359.112 Mobile/15E148 Safari/604.1',
      'Referer': 'https://www.juliangip.com/users/',
      'Cookie': ck
    }
  };
  let result = '';
  await new Promise((resolve, reject) => {
  request.get(options, (err, res, body) => {
  if (err) {
  reject(err);
  } else {
  result = body;
  resolve(result);
  }
  });
  });
  let parsedBody = JSON.parse(result);
  if (parsedBody.hasOwnProperty("message")) {
  return parsedBody.message;
  } else {
  return "签到失败：" + parsedBody.message;
  };
    }
