import fetch from "./fetch.ts";
import observerEntries from "./observerEntries.ts";
import observerLCP from "./observeLCP.ts";
import observerFCP from "./observerFCP.ts";
import observerLoad from "./observerLoad.ts";
import observerPaint from "./observerPaint.ts";
import xhr from "./xhr.ts";

export default function performance() {
  fetch();
  observerEntries();
  observerLCP();
  observerFCP();
  observerLoad();
  observerPaint();
  xhr();
}
