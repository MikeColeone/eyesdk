import { jsLoadError } from "./jsError.js";
import { promiseError } from "./promiseError.js";
import { resourceLoadError } from "./resourceError.js";
export default function error() {
  // 捕获资源加载失败的错误： js css  img
  resourceLoadError();
  // 捕获js错误
  jsLoadError();
  // 捕获promise错误  asyn await
  promiseError();
}
