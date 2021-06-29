const apply_init = () =>{
    let curr_id = document.querySelector('#curr_id');
    let username = document.querySelector('#username');
    let gender = document.querySelector('#gender');
    let userage = document.querySelector('#userage');
    let useremail = document.querySelector('#useremail');
    let userphone = document.querySelector('#userphone');
    let motive = document.querySelector('#motive');

    let username_msg = document.querySelector('#username_msg');
    let userage_msg = document.querySelector('#userage_msg');
    let useremail_msg = document.querySelector('#useremail_msg');
    let userphone_msg = document.querySelector('#userphone_msg');

    let agree = document.querySelectorAll('#agree');
    let submit = document.querySelector('#submit');

    // 이름 유효성 검사
    username.addEventListener('focusout',()=>{
        // 공란 확인
        if (username.value == ''){
            username_msg.style.color = '#999';
            username_msg.innerHTML = '이름을 입력해주세요.';
        }
        else{
            // 한글만 가능
            let pattern1 = /^[가-힣]+$/;
            let name = username.value;

            if (!pattern1.test(name)){
                username.value = '';
                username_msg.style.color = 'red';
                username_msg.innerHTML = '완성 된 한글만 사용 가능합니다.';
            }
            else{
                username_msg.innerHTML = '';
            }
        }
    });

    // 나이 유효성 검사
    userage.addEventListener('focusout',()=>{
        // 공란 확인
        if (userage.value == ''){
            userage_msg.style.color = '#999';
            userage_msg.innerHTML = '나이를 입력해주세요.';
        }
        else{
            // 숫자 1~2글자만 가능
            let pattern2 = /^[0-9]{1,3}$/;
            let age = userage.value;

            if (!pattern2.test(age)){
                userage.value = '';
                userage_msg.style.color = 'red';
                userage_msg.innerHTML = '정확한 나이를 입력해주세요.';
            }
            else{
                userage_msg.innerHTML = '';
            }
        }
    });

    // 이메일 유효성 검사
    useremail.addEventListener('focusout',()=>{
        // 공란 확인
        if (useremail.value == ''){
            useremail_msg.style.color = '#999';
            useremail_msg.innerHTML = '';
        }
        // 유효성 검사
        else{
            // @ . 포함한 영문 소문자와 숫자만 사용 가능, .뒤에는 글자수 2~4로 제한
            let pattern3 = /^[a-z0-9]+@([a-z]+\.)+[a-z]{2,4}$/;
            let email = useremail.value;

            if (!pattern3.test(email)){
                useremail.value = '';
                useremail_msg.style.color = 'red';
                useremail_msg.innerHTML = '사용 불가한 이메일 형식입니다.';
            } else{
                useremail_msg.innerHTML = '';
            }
        }
    });

    // 휴대폰 유효성 검사
    userphone.addEventListener('focusout',()=>{
        // 공란 확인
        if (userphone.value == ''){
            userphone_msg.style.color = '#999';
            userphone_msg.innerHTML = '휴대폰 번호를 입력해주세요.';
        }
        // 유효성 검사
        else{
            // - 포함한 숫자만 사용 가능
            let pattern4 = /^\d{2,3}-\d{3,4}-\d{4}$/;
            let phone = userphone.value;

            if (!pattern4.test(phone)){
                userphone.value = '';
                userphone_msg.style.color = 'red';
                userphone_msg.innerHTML = '번호 입력을 다시 확인해주세요.';
            } else{
                userphone_msg.innerHTML = '';
            }
        }
    });

    // 개인정보 취급방침 동의 여부 체크
    submit.addEventListener('click',()=>{
        console.log('submit 클릭');

        if (curr_id.value == '' || username.value == '' || gender.value == '' || userage.value == '' || useremail.value == '' || userphone.value == '' || motive.value == ''){
            console.log('빈 칸 있음');
            return;
        } else{
            console.log('빈 칸 없음');
            if (agree[1].checked == true){
                agree[1].checked = false;
                alert('개인정보 취급방침 동의 후 신청이 가능합니다.');
            }
        }
    });
}
document.addEventListener('DOMContentLoaded', apply_init);