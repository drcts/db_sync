import biz from './js/biz.js'


// 30초마다 수행
setInterval(() => {
    
    // 동기화처리
    biz.fn_syn()

}, 30*1000);



