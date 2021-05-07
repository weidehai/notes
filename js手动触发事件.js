var oA = document.getElementById('clickme');
var DownloadEvt = null;
if (document.createEvent) {
    if (DownloadEvt === null) {
        DownloadEvt = document.createEvent('MouseEvents');
    }
    DownloadEvt.initEvent('click', true, false);
    oA.dispatchEvent(DownloadEvt);
}

    //创建事件
    //使用dispatchEvent触发事件