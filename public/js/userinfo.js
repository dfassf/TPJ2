const userInfo_init = () =>{
    const userid = document.querySelector('#userid');
    const userpw = document.querySelector('#userpw');
    const userpw_check = document.querySelector('#userpw_check');
    const username = document.querySelector('#username');
    const userphone = document.querySelector('#userphone');
    const useremail = document.querySelector('#useremail');

    const userpw_msg = document.querySelector('#userpw_msg');
    const userpw_check_msg = document.querySelector('#userpw_check_msg');
    const username_msg = document.querySelector('#username_msg');
    const userphone_msg = document.querySelector('#userphone_msg');
    const useremail_msg = document.querySelector('#useremail_msg');

    function password_check(){
        return userpw.value == userpw_check.value;
    }

    // 비밀번호 사용 가능 여부 확인
    userpw.addEventListener('focusout',()=>{
        // 공란 확인
        if (userpw.value == ''){
            userpw_msg.style.color = '#999';
            userpw_msg.innerHTML = '비밀번호를 입력해주세요.';
        }
        // 유효성 검사
        else{
            console.log('비밀번호 검사 중');

            // 8~16글자, 영문 대소문자, 최소 1개의 숫자와 특수문자 포함
            let pattern1 = /^(?=.*[a-zA-Z])((?=.*\d)(?=.*[-_`~!@#$%^&*])).{8,20}$/
            let id = userid.value;
            let pw = userpw.value;

            // 1차 조건 확인
            if (!pattern1.test(pw)){
                console.log('aaa');
                userpw.value = '';
                userpw_msg.style.color = 'red';
                userpw_msg.innerHTML = '8~16 글자, 영문 대소문자, 최소 1개의 숫자와 특수문자가 포함되어야 합니다.';
            }  else{
                // 2차 조건 확인
                if (pw.indexOf(id) > -1){   
                    userpw.value = '';
                    userpw_msg.style.color = 'red';
                    userpw_msg.innerHTML = '아이디는 비밀번호에 포함 될 수 없습니다.';
                } else{
                    // 비밀번호 길이에 따른 결과 출력
                    if (pw.length <= 9){
                        userpw_msg.style.color = 'pink';
                        userpw_msg.innerHTML = '사용 가능한 비밀번호입니다! (안전도:낮음)';
                    } else{
                        userpw_msg.style.color = 'green';
                        userpw_msg.innerHTML = '사용 가능한 비밀번호입니다! (안전도:적정)';
                    } if (pw.length > 14){
                        userpw_msg.style.color = 'blue';
                        userpw_msg.innerHTML = '사용 가능한 비밀번호입니다! (안전도:높음)';
                    }
                }
            }
        }
    });

    // 비밀번호 2차 입력 일치 여부 검사
    userpw_check.addEventListener('focusout',()=>{
        let result = password_check();

        // 공란 확인        
        if (userpw.value == '' || userpw_check.value == ''){
            userpw_check_msg.innerHTML = '';
            return false;
        }
        if (result){
            userpw_check_msg.style.color = 'green';
            userpw_check_msg.innerHTML = '일치합니다.';
        } else{
            userpw_check_msg.innerHTML = '일치하지 않습니다.';
            userpw_check_msg.style.color = 'red';
            userpw.value = '';
            userpw_check.value = '';
            userpw.focus();
        }
    });

    // 이름 사용 가능 여부 확인
    username.addEventListener('focusout',()=>{
        // 공란 확인
        if (username.value == ''){
            username_msg.style.color = '#999';
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
            userphone_msg.style.color = '#999';
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
            useremail_msg.style.color = '#999';
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
}
document.addEventListener('DOMContentLoaded', userInfo_init);