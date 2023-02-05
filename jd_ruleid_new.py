"""
const $ = new Env("发财大赢家多进程异步兑换-InteIJ群组偷撸版");
cron: 59 23 * * *
Date: 2023/2/5 15:00
TG: https://t.me/InteIJ
多进程数，建议和cpu核心数一样
export core_nums=1
单个账号下并发异步线程请求数
export acc_thread_nums=3
是否0点整才开始发送请求
export zero_run_B=True
仅支持单个账号，多个账号还在测试，别急
ck_ruleId = [ck@看red_envelope_id里的红包具体名字]
"""
import multiprocessing
import uuid

import aiohttp
import os
import asyncio
import requests
import time
from USER_AGENTS import get_user_agent
from datetime import datetime
from multiprocessing import Process
from aiohttp import TCPConnector

core_nums = int(os.environ.get('core_nums', 1))
acc_thread_nums = int(os.environ.get('acc_thread_nums', 1))
zero_run_B = os.environ.get('zero_run_B', True)

ck_ruleId = [pt_key=app_openAAJj32TQADAbo8BQMFROYSciwENRarx8IaylOz5wdC2xHA-l3MU9M0klq5LkuUDkm5-ZaFA6Oyw;pt_pin=jd_PAsIrxRIEGCP;@"b141ddd915d20f078d69f6910b02a60a"]

red_envelope_id = {
    "0.5元红包":
        "d71b23a381ada0934039d890ad22ab8d",
    "3元红包":
        "66d9058514891de12e96588697cc3bb3",
    "8元红包":
        "b141ddd915d20f078d69f6910b02a60a",
    "50元红包":
        "8609ec76a8a70db9a5443376d34fa26a",
    "0.3元现金":
        "1848d61655f979f8eac0dd36235586ba",
    "1元现金":
        "dac84c6bf0ed0ea9da2eca4694948440",
    "现金奖励3元":
        "53515f286c491d66de3e01f64e3810b2",
    "8元现金":
        "da3fc8218d2d1386d3b25242e563acb8",
    "20元现金":
        "7ea791839f7fe3168150396e51e30917",
    "100元现金":
        "02b48428177a44a4110034497668f808",
}


def get_id(cookie):
    ti = int(time.time())
    url = 'https://api.m.jd.com/api?functionId=makemoneyshop_exchangequery&appid=jdlt_h5&channel=jxh5&cv=1.2.5' \
          '&clientVersion=1.2.5&client=jxh5&uuid=7296248594457&cthr=1&body={"activeId":"63526d8f5fe613a6adb48f03",' \
          '"sceneval":2,"buid":325,"appCode":"msc588d6d5",' + f'"time":{ti},"signStr":""' + '}&t=' + f'{ti}&loginType=2'
    headers = {
        'Accept': '*/*',
        'Accept-Encoding': 'gzip, deflate, br',
        'Accept-Language': 'zh-CN,zh-Hans;q=0.9',
        'Cookie': cookie,
        'Referer': 'https://wqs.jd.com/',
        "User-Agent": f"jdapp;iPhone;9.5.4;13.6;{uuid.uuid4()};network/wifi;ADID/{uuid.uuid4()};model/iPhone10,3;addressid/0;appBuild/167668;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 13_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1"
    }
    js = requests.get(url=url, headers=headers).json()
    if js["code"] == 0:
        for ids in js['data']['hbExchangeRuleList']:
            red_envelope_id[ids['id']] = ids['name']
        for ids in js['data']['cashExchangeRuleList']:
            red_envelope_id[ids['id']] = ids['name']


async def fetch(seesion, cookie, ruleId):
    if zero_run_B:
        print("准备零点行动，Rush B！")
    while zero_run_B:
        if '00:00:00' == time.strftime('%X'):
            break
    async with seesion.get(
            f'https://wq.jd.com/prmt_exchange/client/exchange?appCode=ms2362fc9e&bizCode=makemoneyshop&ruleId={ruleId}') as resp:
        if resp.status == 200:
            print(f"{cookie.split(';')[1]}-状态码 : {resp.status} 返回数据 {await resp.json()}")
        else:
            return


async def start_task(ck):
    ck = ck.split('@')
    cookie = ck[0]
    get_id(cookie)
    headers = {
        "referer": "https://wqs.jd.com/",
        "cookie": cookie,
        "User-Agent": get_user_agent(),
    }
    async with aiohttp.ClientSession(connector=TCPConnector(verify_ssl=False), headers=headers) as seesion:
        tasks = []
        for _ in range(acc_thread_nums):
            tasks.append(asyncio.create_task(fetch(seesion, cookie, red_envelope_id.get(ck[1]))))
        await asyncio.wait(tasks)


def p_start(_lock, _ck: list):
    if _ck is None:
        return
    loop = asyncio.get_event_loop()
    start = datetime.now()
    for ck in _ck:
        loop.run_until_complete(start_task(ck))
    end = datetime.now()
    print(f"异步线程耗时:{end - start}")


if __name__ == '__main__':
    lock = multiprocessing.Lock()
    if type(ck_ruleId) == list and len(ck_ruleId) == 0:
        print("请在ck_ruleId 填写 pt_pin=xxx;pt_key=xxx@要抢的红包名字")
        exit(0)
    for i in range(core_nums):
        Process(target=p_start, args=(lock, ck_ruleId,)).start()
