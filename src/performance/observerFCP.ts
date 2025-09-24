
// 首次渲染时间
function observerFCP() {
    const entryHandler = (list) => {
        for (let entry of list.getEntries()){
            // console.log(entry);
        }
    }
    const observer = new PerformanceObserver(entryHandler);
    observer.observe({type: 'paint', buffered: true});
}


observerFCP()