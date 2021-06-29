const join_init = () =>{
    const infoOpenBtn0 = document.querySelector('.infoOpenBtn0');
    const infoCloseBtn0 = document.querySelector('.infoCloseBtn0');
    const infoLayer0 = document.querySelector('.infoBox0');

    infoOpenBtn0.addEventListener('click',infoPopupOpen0);
    infoCloseBtn0.addEventListener('click',infoPopupClose0);

    // 느낌표0 클릭 시 팝업
    function infoPopupOpen0(){
        infoLayer0.classList.add('fade');
    }
    function infoPopupClose0(){
        infoLayer0.classList.remove('fade');
    }

    const infoOpenBtn1 = document.querySelector('.infoOpenBtn1');
    const infoCloseBtn1 = document.querySelector('.infoCloseBtn1');
    const infoLayer1 = document.querySelector('.infoBox1');

    infoOpenBtn1.addEventListener('click',infoPopupOpen1);
    infoCloseBtn1.addEventListener('click',infoPopupClose1);

    // 느낌표1 클릭 시 팝업
    function infoPopupOpen1(){
        infoLayer1.classList.add('fade');
        infoLayer2.classList.remove('fade');
    }
    function infoPopupClose1(){
        infoLayer1.classList.remove('fade');
    }

    const infoOpenBtn2 = document.querySelector('.infoOpenBtn2');
    const infoCloseBtn2 = document.querySelector('.infoCloseBtn2');
    const infoLayer2 = document.querySelector('.infoBox2');

    infoOpenBtn2.addEventListener('click',infoPopupOpen2);
    infoCloseBtn2.addEventListener('click',infoPopupClose2);

    // 느낌표2 클릭 시 팝업
    function infoPopupOpen2(){
        infoLayer2.classList.add('fade');
        infoLayer1.classList.remove('fade');
    }
    function infoPopupClose2(){
        infoLayer2.classList.remove('fade');
    }

    const signup_userid = document.querySelector('#signup_userid');
    const signup_userpw = document.querySelector('#signup_userpw');
    const signup_userpw_check = document.querySelector('#signup_userpw_check');
    const username = document.querySelector('#username');
    const userphone = document.querySelector('#userphone');
    const useremail = document.querySelector('#useremail');

    const userid_msg1 = document.querySelector('#userid_msg1');
    const userpw_msg2 = document.querySelector('#userpw_msg2');
    const userpw_msg3 = document.querySelector('#userpw_msg3');
    const username_msg = document.querySelector('#username_msg');
    const userphone_msg = document.querySelector('#userphone_msg');
    const useremail_msg = document.querySelector('#useremail_msg');

    function password_check(){
        return signup_userpw.value == signup_userpw_check.value;
    }

    // 아이디 사용 가능 여부 확인
    signup_userid.addEventListener('focusout',async function(){
        // 공란 확인
        if (signup_userid.value == ''){
            userid_msg1.style.color = '#000';
            userid_msg1.innerHTML = '아이디를 입력해주세요.';
        }
        // 유효성 검사
        else{
            console.log('아이디 검사 중');

            // 5~20글자, 영어 소문자와 숫자 사용 가능
            let result = await fetch(`http://localhost:3000/user/check?userid=${signup_userid.value}`)
            let {check}= await result.json()
            let pattern1 = /^[a-z0-9]{5,20}$/;
            let id = signup_userid.value;

            if (!pattern1.test(id)){
                signup_userid.value = '';
                userid_msg1.style.color = 'red';
                userid_msg1.innerHTML = '5~20자의 영문 소문자, 숫자만 사용 가능합니다.';
            }        
            else if(check==false){
                userid_msg1.style.color = 'red';
                userid_msg1.innerHTML = '중복된 아이디입니다.'
                signup_userid.value = '';
            }
            else{
                userid_msg1.style.color = 'green';
                userid_msg1.innerHTML = '사용 가능한 아이디입니다!';
            }

        }
    });

    // 비밀번호 사용 가능 여부 확인
    signup_userpw.addEventListener('focusout',()=>{
        // 공란 확인
        if (signup_userpw.value == ''){
            userpw_msg2.style.color = '#000';
            userpw_msg2.innerHTML = '비밀번호를 입력해주세요.';
        }
        // 유효성 검사
        else{
            console.log('비밀번호 검사 중');

            // 8~16글자, 영문 대소문자, 최소 1개의 숫자와 특수문자 포함
            let pattern2 = /^(?=.*[a-zA-Z])((?=.*\d)(?=.*[-_`~!@#$%^&*])).{8,20}$/
            let id = signup_userid.value;
            let pw = signup_userpw.value;

            // 아이디 입력 여부 확인
            if (id == ''){
                signup_userpw.value = '';
                userpw_msg2.innerHTML = '아이디 먼저 입력해주세요!';
                signup_userid.focus();
            } else{
                // 1차 조건 확인
                if (!pattern2.test(pw)){
                    console.log('aaa');
                    signup_userpw.value = '';
                    userpw_msg2.style.color = 'red';
                    userpw_msg2.innerHTML = '8~16 글자, 영문 대소문자, 최소 1개의 숫자와 특수문자가 포함되어야 합니다.';
                }  else{
                    // 2차 조건 확인
                    if (pw.indexOf(id) > -1){   
                        signup_userpw.value = '';
                        userpw_msg2.style.color = 'red';
                        userpw_msg2.innerHTML = '아이디는 비밀번호에 포함 될 수 없습니다.';
                    } else{
                        // 비밀번호 길이에 따른 결과 출력
                        if (pw.length <= 9){
                            userpw_msg2.style.color = 'pink';
                            userpw_msg2.innerHTML = '사용 가능한 비밀번호입니다! (안전도:낮음)';
                        } else{
                            userpw_msg2.style.color = 'green';
                            userpw_msg2.innerHTML = '사용 가능한 비밀번호입니다! (안전도:적정)';
                        } if (pw.length > 14){
                            userpw_msg2.style.color = 'blue';
                            userpw_msg2.innerHTML = '사용 가능한 비밀번호입니다! (안전도:높음)';
                        }
                    }
                }
            }
        }
    });

    // 이름 사용 가능 여부 확인
    username.addEventListener('focusout',()=>{
        // 공란 확인
        if (username.value == ''){
            username_msg.style.color = '#000';
            username_msg.innerHTML = '이름을 입력해주세요.';
        }
        // 유효성 검사
        else{
            console.log('이름 검사 중');

            // 2~5글자, 한글만 사용 가능
            let pattern3 = /^[가-힣]{2,5}$/;
            let name = username.value;

            if (!pattern3.test(name)){
                username.value = '';
                username_msg.style.color = 'red';
                username_msg.innerHTML = '2~5글자의 한글만 사용이 가능합니다.';
            } else{
                username_msg.style.color = 'green';
                username_msg.innerHTML = '사용 가능한 이름 형식입니다.';
            }
        }
    });

    // 휴대폰 번호 사용 가능 여부 확인
    userphone.addEventListener('focusout',()=>{
        // 공란 확인
        if (userphone.value == ''){
            userphone_msg.style.color = '#000';
            userphone_msg.innerHTML = '휴대폰 번호를 입력해주세요.';
        }
        // 유효성 검사
        else{
            console.log('휴대폰 번호 검사 중');

            // - 포함한 숫자만 사용 가능
            let pattern4 = /^\d{2,3}-\d{3,4}-\d{4}$/;
            let phone = userphone.value;

            if (!pattern4.test(phone)){
                userphone.value = '';
                userphone_msg.style.color = 'red';
                userphone_msg.innerHTML = '번호 입력을 다시 확인해주세요.';
            } else{
                userphone_msg.style.color = 'green';
                userphone_msg.innerHTML = '사용 가능한 휴대폰 번호입니다.';
            }
        }
    });

    // 이메일 사용 가능 여부 확인
    useremail.addEventListener('focusout',()=>{
        // 공란 확인
        if (useremail.value == ''){
            useremail_msg.style.color = '#000';
            useremail_msg.innerHTML = '';
        }
        // 유효성 검사
        else{
            console.log('이메일 검사 중');

            // @ . 포함한 영문 소문자와 숫자만 사용 가능, .뒤에는 글자수 2~4로 제한
            let pattern5 = /^[a-z0-9]+@([a-z]+\.)+[a-z]{2,4}$/;
            let email = useremail.value;

            if (!pattern5.test(email)){
                useremail.value = '';
                useremail_msg.style.color = 'red';
                useremail_msg.innerHTML = '사용 불가한 이메일 형식입니다.';
            } else{
                useremail_msg.style.color = 'green';
                useremail_msg.innerHTML = '사용 가능한 이메일 형식입니다.';
            }
        }
    });

    // 비밀번호 2차 입력 일치 여부 검사
    signup_userpw_check.addEventListener('focusout',()=>{
        let result = password_check();

        // 공란 확인        
        if (signup_userpw.value == '' || signup_userpw_check.value == ''){
            userpw_msg3.innerHTML = '';
            return false;
        }
        if (result){
            userpw_msg3.style.color = 'green';
            userpw_msg3.innerHTML = '일치합니다.';
        } else{
            userpw_msg3.innerHTML = '일치하지 않습니다.';
            userpw_msg3.style.color = 'red';
            signup_userpw.value = '';
            signup_userpw_check.value = '';
            signup_userpw.focus();
        }
    });
}
document.addEventListener('DOMContentLoaded', join_init);