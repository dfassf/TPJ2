function init(){
    let pwSubmit = document.querySelector('#pwSubmit');
    let pwInput = document.querySelector('#pwInput');
    let pwd = document.querySelector('#pwd');
    let postId = document.querySelector('#postidbox');

    pwSubmit.addEventListener('click',function(){

        if(pwInput.value.length>=1){
            pwChk();
        } else{
            alert('비밀번호를 입력해주세요.')
        }

    })

    async function pwChk(){
        const modOrDel = document.querySelector('#modOrDel');
        let url = 'http://localhost:3000/review/pwchk'
    
        let options = {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                userpw:pwInput.value,
                postid:postId.value
            })
        }
        console.log(options)
        if(modOrDel.value=="0"){
            console.log('수정')
            let response = await fetch(url,options);
            let json = await response.json();
            let {result} = json;
        
            console.log(result)
            if(result){
                location.href=`http://localhost:3000/review/modify?id=${postId.value}&usercode=0`
            } else{
                pwInput.value = '';
                pwInput.focus();
                alert('비밀번호가 일치하지 않습니다')
            }
            return;
        } else if(modOrDel.value=="1"){
            console.log('삭제')
            let response = await fetch(url,options);
            let json = await response.json();
            let {result} = json;
        
            console.log(result)
            if(result){
                console.log(postId.value)
                location.href=`http://localhost:3000/review/delete?id=${postId.value}&submit=true`
                return;
            } else{
                pwInput.value = '';
                pwInput.focus();
                alert('비밀번호가 일치하지 않습니다')
            }
            return;

    }
    }

}

document.addEventListener('DOMContentLoaded',init);

