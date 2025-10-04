import { lazyReportBatch } from "../request/report.js";

export function jsLoadError(): void {
  window.onerror = function (msg, url, lineNo, columnNo, error) {
    const reportData = {
      type: "error",
      subType: "js",
      msg,
      url,
      lineNo,
      columnNo,
      stack: error?.stack,
      pageUrl: window.location.href,
      startTime: performance.now(),
    };
    lazyReportBatch(reportData);
  };
}
