import { describe, it, expect, vi, beforeEach } from "vitest";
import onClick from "../src/onClick";
import { lazyReportBatch } from "../src/report.js";

vi.mock("../src/report.js", () => ({
  lazyReportBatch: vi.fn(),
}));

describe("onClick SDK", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    document.body.innerHTML = '<button id="btn">Click</button>';
    const newBody = document.body.cloneNode(true) as HTMLElement;
    document.body.replaceWith(newBody);
  });

  it("should bind event listener and call lazyReportBatch on click", () => {
    onClick();

    const button = document.getElementById("btn")!;
    const clickEvent = new MouseEvent("mousedown", { bubbles: true });

    button.dispatchEvent(clickEvent);

    expect(lazyReportBatch).toHaveBeenCalledTimes(1);
    const reportData = (lazyReportBatch as any).mock.calls[0][0];
    expect(reportData.type).toBe("behavior");
    expect(reportData.subType).toBe("click");
    expect(reportData.target).toBe("BUTTON");
    expect(reportData.eventType).toBe("mousedown");
  });

  it("should only bind events once", () => {
    onClick();
    onClick(); // 第二次调用不应重复绑定

    const button = document.getElementById("btn")!;
    const clickEvent = new MouseEvent("mousedown", { bubbles: true });

    button.dispatchEvent(clickEvent);

    // 确保只调用一次
    expect(lazyReportBatch).toHaveBeenCalledTimes(1);
  });
});
