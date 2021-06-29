// async function init() {

//     let loadCurrDiv = document.querySelector('#loadCurrDiv')
//     let postid = document.querySelector('#postid')
//     let dropBox = document.querySelector('#dropBox')
//     let addCurr = document.querySelector('#addCurr')
//     let currCntArr = [];
//     let currOptArr = [];


//     initCurrData();

//     async function initCurrData(){
//         let delOptArr = []; 
//         let frameArr = [];
//         let selectedCurr = await axios.post('http://localhost:3000/admin/user/view/addcurr', {
//             postid: postid.value
//         })
//         while (dropBox.hasChildNodes()) { dropBox.removeChild(dropBox.firstChild); }
//         while (loadCurrDiv.hasChildNodes()) { loadCurrDiv.removeChild(loadCurrDiv.firstChild); }
//         let defaultValue = document.createElement('option')
//         defaultValue.innerHTML = '<option value="">선택</option>'
//         dropBox.appendChild(defaultValue)

//         // 사용자 커리큘럼 로드. 사용자 커리큘럼 렝스만큼
//         for(let i=0;i<selectedCurr.data.selectedCurr.length; i++){
//             let currFrame = document.createElement('div')
//             let currCnt = document.createElement('p')
//             let delBtn = document.createElement('button')
//             currCnt.innerHTML = `· ${selectedCurr.data.selectedCurr[i].subject}`
//             currFrame.className = selectedCurr.data.selectedCurr[i].id
//             currCnt.className = `currCnt ${selectedCurr.data.selectedCurr[i].id}`
//             delBtn.innerHTML = '삭제'
//             delBtn.className = `delBtn ${selectedCurr.data.selectedCurr[i].id}`
//             currFrame.appendChild(currCnt)
//             currFrame.appendChild(delBtn)
//             loadCurrDiv.appendChild(currFrame)
//             currCntArr.push(currCnt)
//             delOptArr.push(delBtn)
//             frameArr.push(currFrame)
//         }

//         // 전체 커리큘럼 로드. 전체에서 사용자 커리큘럼 없는 렝스만큼
//         for(i=0;i<selectedCurr.data.loadCurr.length;i++){
//             let currOpt = document.createElement('option')
//             currOpt.innerHTML = `${selectedCurr.data.loadCurr[i].subject}`
//             currOpt.setAttribute('value',`${selectedCurr.data.loadCurr[i].id}`)
//             currOpt.className = `currOpt ${selectedCurr.data.loadCurr[i].id}`
//             dropBox.appendChild(currOpt)
//             currOptArr.push(currOpt)
//         }

//         event.target.addEventListener('click',function(){
//             console.log(aa)
//             let getClass = event.target.className
//             if(getClass.split(' ')[0] == 'delBtn'){
//                 console.log('ho ho ho')
//             }
//         })


//         delOptArr.forEach((v)=>{
//             v.addEventListener('click',async function(){
//                 let valueArr = v.className.split(' ')

//                 for(let i=0; i<frameArr.length; i++){
//                     if(frameArr[i].className == valueArr[1]){
//                         console.log(frameArr[i],'삭제')
//                         frameArr[i].remove()
//                     }
//                 }
//                 let delData = await axios.post('http://localhost:3000/admin/user/view/delcurrtoserver', {
//                     delid:valueArr[1],
//                     postid: postid.value
//                 })
 
//                 initCurrData();
//             })
//         })
//     }
//     addCurr.addEventListener('click',addData)

//     async function addData(){
//         for(i=0;i<currOptArr.length;i++){
//             if(dropBox.options[i].selected==true && dropBox.options[0].selected!==true){
//                 let addCurr = await axios.post('http://localhost:3000/admin/user/view/addcurrtoserver', {
//                     optid:dropBox.options[i].value,
//                     postid: postid.value
//                 })

//                 initCurrData()
//                 return 0;
//             }
//         }
//     }    
// }

// document.addEventListener('DOMContentLoaded',init)

async function init() {

    let loadCurrDiv = document.querySelector('#loadCurrDiv')
    let postid = document.querySelector('#postid')
    let dropBox = document.querySelector('#dropBox')
    let addCurr = document.querySelector('#addCurr')
    let delCurr = document.querySelector('#addCurr')
    let currCntArr = [];
    let currOptArr = [];
    let delOptArr = [];
    dropBox.addEventListener('focusout',()=>{
        console.log(dropBox.value)
    })
    initCurrData();

    async function initCurrData(n,obj,data){
        let selectedCurr = await axios.post('http://localhost:3000/admin/user/view/addcurr', {
            postid: postid.value
        })
        while (dropBox.hasChildNodes()) { dropBox.removeChild(dropBox.firstChild); }
        while (loadCurrDiv.hasChildNodes()) { loadCurrDiv.removeChild(loadCurrDiv.firstChild); }
        // while (delOptArr.hasChildNodes()) { delOptArr.removeChild(delOptArr.firstChild); }
        let defaultValue = document.createElement('option')
        defaultValue.innerHTML = '선택'
        defaultValue.value=""
        dropBox.appendChild(defaultValue)

        if(n == 'insert') {
            console.log('추가버튼 눌렀을때만 실행')
            let currFrame = document.createElement('div')
            let currCnt = document.createElement('p')
            let delBtn = document.createElement('button')
            let [newEle] = data.loadCurr.filter(v=>{
                return v.id == obj.subjecttxt
            })
            console.log('newEle',newEle.id,newEle.subject)
            currCnt.innerHTML = `· ${newEle.subject}` 
            currCnt.className = `currCnt ${newEle.id}`  
            delBtn.innerHTML = '삭제'
            delBtn.className = `delBtn ${newEle.id}` 
            currFrame.appendChild(currCnt)
            currFrame.appendChild(delBtn)
            
            delOptArr.push(delBtn)
            console.log('test : ',delOptArr)

        } else if(n == 'delete') {
            console.log('삭제할떄?')
            console.log(obj.subjecttxt,data)
            delOptArr = []
        }

        // 사용자 커리큘럼 로드. 사용자 커리큘럼 렝스만큼
        for(let i=0;i<selectedCurr.data.selectedCurr.length; i++){
            let currFrame = document.createElement('div')
            let currCnt = document.createElement('p')
            let delBtn = document.createElement('button')
            currCnt.innerHTML = `· ${selectedCurr.data.selectedCurr[i].subject}`
            currCnt.className = `currCnt ${selectedCurr.data.selectedCurr[i].id}`
            delBtn.innerHTML = '삭제'
            delBtn.className = `delBtn ${selectedCurr.data.selectedCurr[i].id}`
            currFrame.appendChild(currCnt)
            currFrame.appendChild(delBtn)
            loadCurrDiv.appendChild(currFrame)
            currCntArr.push(currCnt)    
            
            if(n != 'insert' ){delOptArr.push(delBtn)}
        }
    

        // 전체 커리큘럼 로드. 전체에서 사용자 커리큘럼 없는 렝스만큼
        for(i=0;i<selectedCurr.data.loadCurr.length;i++){
            let currOpt = document.createElement('option')
            currOpt.innerHTML = `${selectedCurr.data.loadCurr[i].subject}`
            currOpt.setAttribute('value',`${selectedCurr.data.loadCurr[i].id}`)
            currOpt.className = `currOpt ${selectedCurr.data.loadCurr[i].id}`
            dropBox.appendChild(currOpt)
            currOptArr.push(currOpt)
        }
        console.log('test',delOptArr);

    }
    addCurr.addEventListener('click',addData)

    async function addData(){
        console.log('check1')

        for(i=1;i<=currOptArr.length;i++){
            if(dropBox.options[i].selected==true){
                console.log('check2')
                let addCurr = await axios.post('http://localhost:3000/admin/user/view/addcurrtoserver', {
                    optid:dropBox.options[i].value,
                    postid: postid.value
                })
                
                let obj = {subjecttxt:dropBox.options[i].value}
                console.log(addCurr)
                initCurrData('insert',obj,addCurr.data)
               
            }
        }
        console.log('check3')
    }

    loadCurrDiv.addEventListener('click',test)

    async function test(e){
        let v = e.target
        let vClass= v.className.split(' ')[0]
        if(vClass == 'delBtn'){
            let valueArr = v.className.split(' ')
            let delData = await axios.post('http://localhost:3000/admin/user/view/delcurrtoserver', {
                delid:valueArr[1],
                postid: postid.value
            })

            let obj = {subjecttxt:valueArr[1]}
            initCurrData('delete',obj,delData.data);
        }
    }


    
}

document.addEventListener('DOMContentLoaded',init)