const reviewWrite_init = () =>{
    const usertitle_input = document.querySelector('#usertitle_input');
    const useruserid_input = document.querySelector('#useruserid_input');
    const userpw_input = document.querySelector('#userpw_input');

    const usertitle_msg = document.querySelector('#usertitle_msg');
    const userid_msg = document.querySelector('#userid_msg');
    const userpw_msg = document.querySelector('#userpw_msg');

    usertitle_input.addEventListener('focusout',()=>{
        // 공란 확인
        if (usertitle_input.value == ''){
            usertitle_msg.style.color = '#999';
            usertitle_msg.innerHTML = '제목을 입력해주세요.';
        }
        else{
            usertitle_msg.innerHTML = '';
        }
    });

    useruserid_input.addEventListener('focusout',()=>{
        // 공란 확인
        if(useruserid_input.readOnly!==true){
            if (useruserid_input.value == ''){
                userid_msg.style.color = '#999';
                userid_msg.innerHTML = '작성자명을 입력해주세요.';
            }
            else{
                // 한글만 가능
                let pattern1 = /^[가-힣]+$/;
                let id = useruserid_input.value;

                if (!pattern1.test(id)){
                    useruserid_input.value = '';
                    userid_msg.style.color = 'red';
                    userid_msg.innerHTML = '완성 된 한글만 사용 가능합니다.';
                }
                else{
                    userid_msg.innerHTML = '';
                }
            }
        }
    });

    userpw_input.addEventListener('focusout',()=>{
        // 공란 확인
        if (userpw_input.value == ''){
            userpw_msg.style.color = '#999';
            userpw_msg.innerHTML = '글 비밀번호를 입력해주세요.';
        }
        else{
            // 숫자와 영어 대소문자만 가능
            let pattern2 = /^[0-9a-zA-Z]+$/;
            let pw = userpw_input.value;

            if (!pattern2.test(pw)){
                userpw_input.value = '';
                userpw_msg.style.color = 'red';
                userpw_msg.innerHTML = '숫자와 영어 대소문자만 사용 가능합니다.';
            }
            else{
                userpw_msg.innerHTML = '';
            }
        }
    });

}
document.addEventListener('DOMContentLoaded', reviewWrite_init);