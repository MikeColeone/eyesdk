function observerLCP() {
    const entryHandler = (list: { getEntries: () => any; }) => {
        // if (observer) {
        //     observer.disconnect();
        // } 
        for (const entry of list.getEntries()) {
            const json = entry.toJSON();
            console.log(json);
            const reportData = {
                ...json,
                type: 'performance',
                subType: entry.name,
                pageUrl: window.location.href,
            }
            // TODO 上报逻辑
            console.log(reportData)
        }

    }
    // 统计和计算lcp的时间
    const observer = new PerformanceObserver(entryHandler);
    // buffered: true 确保观察到所有paint事件
    observer.observe({type: 'largest-contentful-paint', buffered: true});
}