import { lazyReportBatch } from "../request/report.ts";

/**
 * promise错误追踪
 */
export function promiseError() {
  window.addEventListener(
    "unhandledrejection",
    function (e) {
      const reportData = {
        type: "error",
        subType: "promise",
        reason: e.reason?.stack,
        pageUrl: window.location.href,
        startTime: e.timeStamp,
      };
      lazyReportBatch(reportData);
    },
    true
  );
}
