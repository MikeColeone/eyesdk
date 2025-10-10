import { lazyReportBatch } from "../request/report.ts";

export function jsLoadError() {
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
