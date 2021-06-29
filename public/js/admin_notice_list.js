function init(){
    
    let srcBtn = document.querySelector('#srcBtn');
    let addBtn = document.querySelector('#addBtn');

    let srcTitle = document.querySelector('#srcTitle');
    let srcShow = document.querySelector('#srcShow');
    let srcStartDate = document.querySelector('#srcStartDate');
    let srcEndDate = document.querySelector('#srcEndDate');

    addBtn.addEventListener('click',function(){
        window.location.href ='http://localhost:3000/admin/notice/add'
    })

    srcBtn.addEventListener('click',function(){
        if(srcStartDate.value > srcEndDate.value && srcEndDate.value !== ''){
            alert('시작일이 종료일보다 클 수 없습니다.')
            srcStartDate.value = '';
            srcEndDate.value = '';
            return;
        } 
        else{
            console.log('검색출력');
            window.location.href=`http://localhost:3000/admin/notice/search?title=${srcTitle.value}&show=${srcShow.value}&start_date=${srcStartDate.value}&end_date=${srcEndDate.value}`
        }
    })

    let selDel = document.querySelector('#selDel')
    let delBtn = document.querySelector('#delBtn')
    let selAll = document.querySelector('#selAll')
    let selOpt = document.querySelectorAll('.selOpt')
   
    delBtn.addEventListener('click',deleteAll);
    selAll.addEventListener('click',()=>{
        if(selAll.checked == true){
            for(let i=0;i<selOpt.length;i++){
                if(selOpt[i].checked==false){
                    selOpt[i].checked = true;
                }
            } return false;
        } else{
            for(let i=0;i<selOpt.length;i++){
                if(selOpt[i].checked==true){
                    selOpt[i].checked = false;
                }
            }
            return true;
        }
    });

    // 선택 삭제 버튼 작동
    async function deleteAll(){
        console.log('선택 삭제 버튼 접근 중');
        let selChk = document.querySelectorAll(".selOpt:checked");
        console.log(selChk)
        if(selChk.length==0){
            alert('최소 하나 이상의 항목을 선택하세요')
            return;
        } else{
            console.log('asd')
        for(let i=0;i<selOpt.length;i++){
            if(selOpt[i].checked==false){
                selOpt[i].disabled = true;
            }
        }
        selDel.submit();
        for(let i=0;i<selOpt.length;i++){
            selOpt[i].disabled = false;
        }
        console.log('submit done')
        selAll.checked = false;
        }
    }
}
document.addEventListener('DOMContentLoaded',init);