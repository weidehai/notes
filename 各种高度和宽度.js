//各种宽高的获取
//1.获取除了任务栏之外的屏幕的宽高,
screen.availHeight; //这个是除了任务栏之外的高度，就是windows底部的那一栏任务栏（默认是在底部，也可以设置到侧边）
screen.availWidth;  //这个是除了任务栏之外的宽度，默认在底部，此时screen.availWidth==screen.width，若在侧边，则要减去
//2.获取屏幕的宽高，是整个屏幕的宽高，这个属性永远不会变，因为屏幕大小是固定的
screen.height;
screen.width;
//取得浏览器页面可视区域的宽高(包含margin+width+padding+border),会包括滚动条
window.innerHeight;
window.innerWidth;
//取得浏览器页面可视区域的宽高(包含margin+width+padding+border),会包括浏览器控制台、菜单栏、工具栏、滚动条
window.outerWidth;
window.outerHeight;
//取得元素的可见区域的实际宽高（不包含滚动条），也就是被撑开的（！！！可见区域的）宽高
document.body.offsetHeight;
document.body.offsetWidth;
//取得元素的可见区域的实际宽高（不包含滚动条），也就是被撑开的宽高，无论可见不可见
document.body.scrollHeight;
document.body.scrollWidth;
//元素被卷去的高度，只有当元素的高度小于其内部内容的高度时才有用
document.body.scrollTop;
//3.取得浏览器页面可视区域的宽高(包含margin+width+padding+border)，不包括浏览器控制台、菜单栏、工具栏、滚动条,-----纯净版（chrome滚动条默认17个px）也是被撑开的
//媒体查询的宽高是纯净版
document.documentElement.clientWidth;
document.documentElement.clientHeight;
//4.取得html元素可视区域的宽高(包含width+padding+border)，不包括浏览器控制台、菜单栏、工具栏、滚动条,-----纯净版（chrome滚动条默认17个px）也是被撑开的
document.documentElement.offsetWidth;
document.documentElement.offsetHeight;


//offset 包含padding+width+border
//client 包含padding+width
//scroll 包含padding+width