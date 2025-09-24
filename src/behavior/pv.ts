import { lazyReportBatch } from "../report.js";
import { generateUniqueId } from "../utils.js";
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
