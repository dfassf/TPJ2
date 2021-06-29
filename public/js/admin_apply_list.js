function init(){
    let srcBtn = document.querySelector('#srcBtn');

    let srcId = document.querySelector('#srcId');
    let srcName = document.querySelector('#srcName');
    let srcStartDate = document.querySelector('#srcStartDate');
    let srcEndDate = document.querySelector('#srcEndDate');
    let delEach = document.querySelectorAll('.delEach')

    srcBtn.addEventListener('click',function(){
        console.log('srcId : ',srcId.value);
        console.log('srcName : ',srcName.value);
        console.log('srcStartDate : ',srcStartDate.value);
        console.log('srcEndDate : ',srcEndDate.value);

        if(srcStartDate.value > srcEndDate.value && srcEndDate.value !== ''){
            alert('시작일이 종료일보다 클 수 없습니다.')
            srcStartDate.value = '';
            srcEndDate.value = '';
            return;
        }
        else{
            console.log('검색출력');
        window.location.href=`http://localhost:3000/admin/apply/search?curr_id=${srcId.value}&username=${srcName.value}&start_date=${srcStartDate.value}&end_date=${srcEndDate.value}`
        }
    })

    
    for(let i=0; i<delEach.length; i++){
        delEach[i].addEventListener('click',function(){
            if(confirm("정말 삭제하시겠습니까?")==true){
                console.log(selOpt[i].value,'번')
                location.href=`http://localhost:3000/admin/apply/delete?id=${selOpt[i].value}`
            } else{
                return;
            }
        })
    }

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
            if (confirm("정말 삭제하시겠습니까?") == true) {
                for (let i = 0; i < selOpt.length; i++) {
                    if (selOpt[i].checked == false) {
                        selOpt[i].disabled = true;
                    }
                }
                selDel.submit();
                for (let i = 0; i < selOpt.length; i++) {
                    selOpt[i].disabled = false;
                }
                console.log('submit done')
                selAll.checked = false;
            } else {
                return;
            }
        }
    }
}
document.addEventListener('DOMContentLoaded',init)