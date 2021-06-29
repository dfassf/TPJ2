const FAQ_init = () =>{
    console.log('FAQ IN');

    let ctg = document.getElementsByClassName('ctg');
    let faq = document.getElementsByClassName('faq');
    let getQna = document.querySelector('.getQna')

    // let arr = [];

    // for (let i=0; i<faq.length; i++){
    //     arr.push(faq[i]);
    // }


    for (let i=0; i<ctg.length; i++){
        ctg[i].addEventListener('click', async function(){
            let ctgId = ctg[i].className.split('_')[1]
            while (getQna.hasChildNodes()) { getQna.removeChild(getQna.firstChild); }
            console.log(ctgId);
            let ctgSend = await axios.post('http://localhost:3000/faq/load', {
                ctgId    
            })
            let loadFaq = ctgSend.data.test
            
            for(let j=0; j<loadFaq.length; j++){
                
                console.log(loadFaq[j].title)

                let mDiv = document.createElement('div')
                let mUl = document.createElement('ul')
                let mUl2 = document.createElement('ul')
                let mLi = document.createElement('li')
                let mSpan = document.createElement('span')

                mLi.innerHTML = loadFaq[j].content
                mSpan.innerHTML = '▽'
                mUl2.className = 'faqSub'
                mUl.innerHTML = `${loadFaq[j].title}`
                mDiv.className=`faq faq_${loadFaq[j].category}`
                mUl.appendChild(mSpan)
                mUl2.appendChild(mLi)
                mDiv.appendChild(mUl)
                mDiv.appendChild(mUl2)
                getQna.appendChild(mDiv)
                
                let state=true;
                mUl.addEventListener('click',openMenu)
                function openMenu(){
                    if(state){
                            mUl2.style.display='block';
                            mSpan.innerHTML='△'
                    } else{
                            mUl2.style.display='none';
                            mSpan.innerHTML = '▽'
                    }
                    state =! state
                }
            }
        })
    }

    console.log('FAQ OUT');

   
}
document.addEventListener('DOMContentLoaded', FAQ_init)