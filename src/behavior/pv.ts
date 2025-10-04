import { lazyReportBatch } from "../request/report.js";
import { generateUniqueId } from "../utils/utils.js";
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
