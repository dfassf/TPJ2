function init(){
    let modifyBtn = document.querySelector('#modifyBtn');
    let submitMod = document.querySelector('#submitMod');

    modifyBtn.addEventListener('click',function(){
            submitMod.submit();

    })

}

document.addEventListener('DOMContentLoaded',init)