import { lazyReportBatch } from "../request/report.js";

export default function observerLCP() {
  const entryHandler = (list: { getEntries: () => any }) => {
    if (observer) {
      observer.disconnect();
    }
    for (const entry of list.getEntries()) {
      const json = entry.toJSON();
      const reportData = {
        ...json,
        type: "performance",
        subType: entry.name,
        pageUrl: window.location.href,
      };
      lazyReportBatch(reportData);
    }
  };
  const observer = new PerformanceObserver(entryHandler);
  observer.observe({ type: "largest-contentful-paint", buffered: true });
}
