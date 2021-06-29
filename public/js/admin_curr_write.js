function init(){
    let srcStartDate = document.querySelector('.srcStartDate');
    let srcEndDate = document.querySelector('.srcEndDate');

    srcStartDate.addEventListener('focusout',function(){
        if(srcStartDate.value > srcEndDate.value && srcEndDate.value !== ''){
            alert('시작일이 종료일보다 클 수 없습니다.');
            srcStartDate.value = '';
            srcEndDate.value = '';
        }
    })
    srcEndDate.addEventListener('focusout',function(){
        if(srcStartDate.value > srcEndDate.value && srcStartDate.value !== ''){
            alert('시작일이 종료일보다 클 수 없습니다.');
            srcStartDate.value = '';
            srcEndDate.value = '';
        }
    })
}

document.addEventListener('DOMContentLoaded',init);