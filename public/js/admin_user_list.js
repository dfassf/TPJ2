function init(){
    let srcBtn = document.querySelector('#srcBtn');

    let srcUserid = document.querySelector('#srcUserid');
    let srcUsername = document.querySelector('#srcUsername');
    let srcStartDate = document.querySelector('#srcStartDate');
    let srcEndDate = document.querySelector('#srcEndDate');


    srcBtn.addEventListener('click',function(){
        if(srcStartDate.value > srcEndDate.value && srcEndDate.value !== ''){
            alert('시작일이 종료일보다 클 수 없습니다.')
            srcStartDate.value = '';
            srcEndDate.value = '';
            return;
        }
        else{
            console.log('검색출력');
            window.location.href=`http://localhost:3000/admin/user/search?userid=${srcUserid.value}&username=${srcUsername.value}&start_date=${srcStartDate.value}&end_date=${srcEndDate.value}`
        }
    })
}
document.addEventListener('DOMContentLoaded',init);