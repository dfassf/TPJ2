function adminLogin_init(){
    const loginBtn = document.querySelector('#loginBtn');
    const adminID = document.querySelector('#adminID');
    const adminPW = document.querySelector('#adminPW');
    const errorMsg = document.querySelector('#errorMsg');

    adminID.addEventListener('focusin',()=>{
        errorMsg.innerHTML = '';
    })
    adminPW.addEventListener('focusin',()=>{
        errorMsg.innerHTML = '';
    })
    loginBtn.addEventListener('click',adminLogin);
    
    async function adminLogin(){
        console.log('관리자 로그인 시도중');

        if (adminID.value == '' || adminPW.value == ''){
            errorMsg.innerHTML = '계정 정보는 필수 입력 사항입니다.';
            return;
        }

        let url = 'http://localhost:3000/admin/auth/local/login'
        let options = {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                userid:adminID.value,
                userpw:adminPW.value,
            })
        }
        
        console.log('입력정보: ',options);

        let response = await fetch(url,options);
        let json = await response.json();
        let {result, id} = json;
        
        console.log('result : ',result);
        console.log('json : ',json);

        if(result){
            console.log('관리자 로그인 성공!');
            window.location.href = 'http://localhost:3000/admin/curr';
        } else{
            console.log('관리자 로그인 실패!');
            adminID.value = '';
            adminPW.value = '';
            adminID.focus();
            errorMsg.innerHTML = '계정 정보가 일치하지 않습니다.';
        }
    }
}
document.addEventListener('DOMContentLoaded', adminLogin_init);