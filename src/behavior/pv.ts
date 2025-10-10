import { lazyReportBatch } from "../request/report.ts";
import { generateUniqueId } from "../utils/utils.ts";
export default function pv() {
  const reportData = {
    type: "behavior",
    subType: "pv",
    startTime: performance.now(),
    pageUrl: window.location.href,
    referror: document.referrer,
    uuid: generateUniqueId(),
  };
  lazyReportBatch(reportData);
}
