function observerEvent() {
    const entryHandler = (list: { getEntries: () => any; }) => {
        const data = list.getEntries();
        for (let entry of data) {
            if (observer) {
                observer.disconnect();
            }
            const reportData = {
                name: entry.name, 
                type: 'performance', 
                subType: entry.entryType, 
                sourceType: entry.initiatorType,
                duration: entry.duration,
                dns: entry.domainLookupEnd - entry.domainLookupStart,
                tcp: entry.connectEnd - entry.connectStart,
                redirect: entry.redirectEnd - entry.redirectStart,
                ttfb: entry.responseStart,
                protocol: entry.nextHopProtocol, 
                responseBodySize: entry.encodedBodySize,
                responseHeaderSize: entry.transferSize - entry.encodedBodySize,
                transferSize: entry.transferSize, 
                resourceSize: entry.decodedBodySize, 
                startTime: performance.now(),
            };
            // TODO 上报
            console.log(reportData)
        }
    };

    let observer = new PerformanceObserver(entryHandler);
    observer.observe({ type: ['resource'], buffered: true });
}