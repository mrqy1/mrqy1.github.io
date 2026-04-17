/**
 * Happy New Year 组件 - 自动版
 * 自动计算下一个春节日期，全年可用
 */
let newYearTimer = null;

var newYear = () => {
    clearTimeout(newYearTimer);
    if (!document.querySelector('#newYear')) return;
    
    const now = new Date();
    const currentYear = now.getFullYear();
    
    // 春节日期表 (公历)
    const festivals = [
        { y: 2025, m: 1, d: 29 },
        { y: 2026, m: 1, d: 29 },
        { y: 2027, m: 2, d: 17 },
        { y: 2028, m: 2, d: 6 },
        { y: 2029, m: 1, d: 26 },
        { y: 2030, m: 2, d: 13 },
        { y: 2031, m: 2, d: 2 },
        { y: 2032, m: 1, d: 22 },
        { y: 2033, m: 2, d: 10 },
        { y: 2034, m: 1, d: 30 },
        { y: 2035, m: 2, d: 17 }
    ];
    
    // 找下一个春节
    let target = festivals.find(f => {
        const d = new Date(f.y + '-' + f.m + '-' + f.d + ' 00:00:00');
        return d > now;
    }) || { y: currentYear + 1, m: 1, d: 29 };
    
    const targetDate = new Date(target.y + '-' + target.m + '-' + target.d + ' 00:00:00');
    const targetYear = target.y;
    const festivalTime = targetDate.getTime() / 1000;
    
    const week = {0: '周日', 1: '周一', 2: '周二', 3: '周三', 4: '周四', 5: '周五', 6: '周六'};
    
    const titleEl = document.querySelector('#newYear .title');
    const timeEl = document.querySelector('#newYear .newYear-time');
    const todayEl = document.querySelector('#newYear .today');
    
    if (todayEl) {
        todayEl.innerHTML = now.getFullYear() + '-' + (now.getMonth() + 1) + '-' + now.getDate() + ' ' + week[now.getDay()];
    }
    
    if (!titleEl || !timeEl) return;

    function nol(h) { return h > 9 ? h : '0' + h; }

    function update() {
        const now = new Date();
        const second = Math.floor(festivalTime - now.getTime() / 1000);
        
        if (second < 0) {
            // 已过春节，重新计算
            newYear();
            return;
        }
        
        if (second > 86400 * 30) {
            // 超过30天只显示天数
            titleEl.innerHTML = '距离春节：';
            timeEl.innerHTML = `<span class="day">${Math.ceil(second / 86400)}<span class="unit">天</span></span>`;
        } else if (second > 0) {
            titleEl.innerHTML = '距离春节：';
            let h = nol(Math.floor(second / 3600));
            let remain = second % 3600;
            let m = nol(Math.floor(remain / 60));
            let s = nol(remain % 60);
            timeEl.innerHTML = `<span class="time">${h}:${m}:${s}</span></span>`;
            newYearTimer = setTimeout(update, 1000);
        } else {
            // 过年了!
            titleEl.innerHTML = '🎊 Happy New Year!';
            timeEl.innerHTML = '<span class="happyNewYear">🎉 新年快乐! 🎉</span>';
        }
    }
    
    update();
};

// Pjax 适配
document.addEventListener('pjax:complete', newYear);
document.addEventListener('DOMContentLoaded', newYear);



