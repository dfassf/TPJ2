function init(){
    let revSrc = document.querySelector('#revSrc')
    let srcallSel = document.querySelector('#srcallSel')
    let srctitle = document.querySelector('#srctitle')
    let srcUserid = document.querySelector('#srcUserid')
    let srcContent = document.querySelector('#srcContent')
    let srcForm = document.querySelector('#srcForm')
    let srcTxt = document.querySelector('#srcTxt')
    let srcBtn = document.querySelector('#srcBtn')

    srcBtn.addEventListener('click',()=>{
        if(srcTxt.value==''){
            alert('검색어를 입력하세요.')
            return 0;
        }else{
            if(srcallSel.selected){
                console.log('srcallSel')
                window.location.href=`http://localhost:3000/review/search?srcCtg=${revSrc.value}&keyword=${srcTxt.value}`
            } else if(srctitle.selected){
                console.log('srctitle')
                window.location.href=`http://localhost:3000/review/search?srcCtg=${revSrc.value}&keyword=${srcTxt.value}`
            } else if(srcUserid.selected){
                console.log('srcUserid')
                window.location.href=`http://localhost:3000/review/search?srcCtg=${revSrc.value}&keyword=${srcTxt.value}`
            } else if(srcContent.selected){
                console.log('srcContent')
                window.location.href=`http://localhost:3000/review/search?srcCtg=${revSrc.value}&keyword=${srcTxt.value}`
            }
        }
    })
}
document.addEventListener('DOMContentLoaded',init)