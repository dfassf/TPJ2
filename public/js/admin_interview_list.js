function init(){
    let srcBtn = document.querySelector('#srcBtn');
    let addBtn = document.querySelector('#addBtn');

    let srcId = document.querySelector('#srcId');
    let srcName = document.querySelector('#srcName');
    let srcShow = document.querySelector('#srcShow');

    addBtn.addEventListener('click',function(){
        window.location.href ='http://localhost:3000/admin/interview/add'
    })

    srcBtn.addEventListener('click',function(){
        console.log('srcId : ',srcId.value);
        console.log('srcName : ',srcName.value);
        console.log('srcShow : ',srcShow.value);

        console.log('검색출력');
        window.location.href=`http://localhost:3000/admin/interview/search?curr_id=${srcId.value}&username=${srcName.value}&show=${srcShow.value}`
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
document.addEventListener('DOMContentLoaded',init)