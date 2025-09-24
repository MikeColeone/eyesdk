export interface pvReport {
  scrollTop: number;
  type: "behavior";
  subType: "click";
  target: string;
  startTime: number;
  innerHtml?: string;
  outerHtml?: string;
  width: number;
  height: number;
  eventType: string;
  path?: EventTarget[];
}
