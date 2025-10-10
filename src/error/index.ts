import { jsLoadError } from "./jsError.ts";
import { promiseError } from "./promiseError.ts";
import { resourceLoadError } from "./resourceError.ts";
export default function error() {
  // 捕获资源加载失败的错误： js css  img
  resourceLoadError();
  // 捕获js错误
  jsLoadError();
  // 捕获promise错误  asyn await
  promiseError();
}
