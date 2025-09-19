# EYESDK

## 描述

前端监控sdk，首先我们讲一下一个sdk的使用方式

1. 全局初始化，将SDK实例挂载到全局；
2. 创建实例的时候传入id，因为埋点监控系统往往是给多个业务使用的，要基于id区分不同的数据来源；

### 数据发送

数据发送是最基础的api，前后端分离可能会采用AJAX，或者axios的方式发送数据，但是这里采用图片src属性：

原因：

1. 没有跨域限制，script标签，img标签多可以直接发送get请求
2. 兼容性很好，有些静态页面会禁用script脚本，这个时候该标签是不可使用的

这里不展示图片，而是发送数据


```js
class webDataSDK {
  constructor(productId){
    this.productId = productId;
  }
  send(baseURL,query={}){
    query.productId = this.productId;
    let queryStr = Object.entries(query).map(([key, value]) => `${key}=${value}`).join('&')
    let img = new Image();
    img.src = `${baseURL}?${queryStr}`
  }
}
```

更好的发送的方式:

- [Navigator.sendBeacon() - Web API | MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/Navigator/sendBeacon)

>  Navigator.sendBeacon(url,data)

相较于图片src，这种凡是更有优势：

* **不会和主要业务代码抢占资源，而是在浏览器空闲时去做发送。**
* **并且在页面卸载时也能保证请求成功发送，不阻塞页面刷新和跳转。**

但是考虑到兼容性，还是要使用src兜底

### 用户行为监控

```js
class webDataSDK {
  constructor(productId){
    this.productId = productId;
  }
  // 数据发送
  send(baseURL,query={}){
    query.productId = this.productId;
    let queryStr = Object.entries(query).map(([key, value]) => `${key}=${value}`).join('&')
    let img = new Image();
    img.src = `${baseURL}?${queryStr}`
  }
   // 自定义事件
  event(key, val={}) {
    let eventURL = 'http://demo/'
    this.send(eventURL,{event:key,...val})
  }
  // pv曝光
  pv() {
    this.event('pv')
  }
}
```

### 页面性能监控

**页面的性能数据可以通过performance.timing这个API获取到，获取的数据是单位为毫秒的时间戳**

通过这个api，我们可以计算比较关键的数据：

1. **页面首次渲染时间：FP(firstPaint)=domLoading-navigationStart。**
2. **DOM加载完成：DCL(DOMContentEventLoad)=domContentLoadedEventEnd-navigationStart。**
3. **图片、样式等外链资源加载完成：L(Load)=loadEventEnd-navigationStart。**

然后封装一个上报性能的SDK即可：

```js
class webDataSDK {
  constructor(productId){
    this.productId = productId;
    // 初始化自动调用性能上报
    this.initPerformance()
  }
  // 数据发送
  send(baseURL,query={}){
    query.productId = this.productId;
    let queryStr = Object.entries(query).map(([key, value]) => `${key}=${value}`).join('&')
    let img = new Image();
    img.src = `${baseURL}?${queryStr}`
  }
   // 自定义事件
  event(key, val={}) {
    let eventURL = 'http://demo/'
    this.send(eventURL,{event:key,...val})
  }
  // pv曝光
  pv() {
    this.event('pv')
  },
   // 性能上报
  initPerformance(){
    let performanceURL = 'http://performance/'
    this.send(performanceURL,performance.timing)
  }
}


```

### 错误告警

#### JS原生错误

## 业界sdk参考

- 神策：[神策埋点 SDK](https://jssdk.debugbox.sensorsdata.cn/)

## 环境

## 工具

- [web-vitals](https://www.npmjs.com/package/web-vitals)

## 更新

- 20250701
- 20250630

创建项目

> mkdir eyesdk
>
> cd eyesdk
>
> npm install -y
>
> code .
