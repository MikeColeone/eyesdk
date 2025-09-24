import { lazyReportBatch } from '../report';

export default function observerLCP() {
    const entryHandler = (list) => {
        if (observer) {
            observer.disconnect(); // 断开观察器，避免重复触发
        } 
        for (const entry of list.getEntries()) {
            const json = entry.toJSON(); // 转为可序列化对象
            console.log(json);

            const reportData = {
                ...json,
                type: 'performance',   // 上报类型：性能数据
                subType: entry.name,   // 具体子类型，比如 'largest-contentful-paint'
                pageUrl: window.location.href, // 当前页面 URL
            }

            // 发送到日志/监控系统（批量上报）
            lazyReportBatch(reportData);
        }
    }

    // 创建 PerformanceObserver 监听 LCP
    const observer = new PerformanceObserver(entryHandler);

    // 开启监听
    // buffered: true 表示还能获取到在监听之前已经发生的 LCP 事件（历史缓冲）
    observer.observe({ type: 'largest-contentful-paint', buffered: true });
}
