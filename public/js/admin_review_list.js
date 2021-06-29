function init(){
    let revSrc = document.querySelector('#revSrc')
    let srcallSel = document.querySelector('#srcallSel')
    let srcTitle = document.querySelector('#srcTitle')
    let srcUserid = document.querySelector('#srcUserid')
    let srcContent = document.querySelector('#srcContent')
    let srcCurriculum = document.querySelector('#srcCurriculum')
    let srcForm = document.querySelector('#srcForm')
    let srcTxt = document.querySelector('#srcTxt')
    let srcBtn = document.querySelector('#srcBtn')
    let delEach = document.querySelectorAll('.delEach')

    for(let i=0; i<delEach.length; i++){
        delEach[i].addEventListener('click',function(){
            if(confirm("정말 삭제하시겠습니까?")==true){
                console.log(selOpt[i].value,'번')
                location.href=`http://localhost:3000/admin/faq/delete?id=${selOpt[i].value}`
            } else{
                return;
            }
        })
    }

    srcBtn.addEventListener('click',()=>{
        console.log('클릭')
        if(srcTxt.value==''){
            alert('검색어를 입력하세요.')
            return 0;
        }else{
            if(srcallSel.selected){
                console.log('srcallSel')
                window.location.href=`http://localhost:3000/admin/review/search?srcCtg=${revSrc.value}&keyword=${srcTxt.value}`
            } else if(srcTitle.selected){
                console.log('srcTitle')
                window.location.href=`http://localhost:3000/admin/review/search?srcCtg=${revSrc.value}&keyword=${srcTxt.value}`
            } else if(srcUserid.selected){
                console.log('srcUserid')
                window.location.href=`http://localhost:3000/admin/review/search?srcCtg=${revSrc.value}&keyword=${srcTxt.value}`
            } else if(srcContent.selected){
                console.log('srcContent')
                window.location.href=`http://localhost:3000/admin/review/search?srcCtg=${revSrc.value}&keyword=${srcTxt.value}`
            }
        }
    })
}
document.addEventListener('DOMContentLoaded',init)