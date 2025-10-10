import { lazyReportBatch } from "../request/report.ts";
import { type ClickReport } from "../type/onClick.ts";

let isInit = false;

export default function onClick(): void {
  if (isInit) return;
  isInit = true;

  const eventTypes: Array<"mousedown" | "touchstart"> = [
    "mousedown",
    "touchstart",
  ];

  eventTypes.forEach((eventType) => {
    window.addEventListener(eventType, (e: Event) => {
      const target = e.target as HTMLElement;
      if (!target || !target.tagName) return;

      const reportData: ClickReport = {
        scrollTop: document.documentElement.scrollTop,
        type: "behavior",
        subType: "click",
        target: target.tagName,
        startTime: e.timeStamp,
        innerHtml: target.innerHTML,
        outerHtml: target.outerHTML,
        width: target.offsetWidth,
        height: target.offsetHeight,
        eventType,
        path: (e as any).composedPath ? (e as any).composedPath() : undefined,
      };

      lazyReportBatch(reportData);
    });
  });
}
