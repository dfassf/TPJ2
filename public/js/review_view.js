function init(){
    let delBtn = document.querySelector('#delBtn');
    let postId = document.querySelector('#postId')
    delBtn.addEventListener('click',()=>{
        if(confirm('정말 삭제하겠습니까?')==true){
            location.href=`http://localhost:3000/review/delete?id=${postId.value}`
            return;
        } else{
            return 0;
        }
    })


}

document.addEventListener('DOMContentLoaded',init)