import { lazyReportBatch } from "../request/report.ts";

/**
 * 资源加载的错误
 */
export function resourceLoadError() {
  window.addEventListener(
    "error",
    function (e) {
      const target = e.target;
      if (target?.src || target.href) {
        const url = target.src || target.href;
        const reportData = {
          type: "error",
          subType: "resource",
          url,
          html: target.outerHTML,
          pageUrl: window.location.href,
          pahts: e.path,
        };
        lazyReportBatch(reportData);
      }
    },
    true
  );
}
