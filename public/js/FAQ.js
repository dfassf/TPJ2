// const FAQ_init = () =>{
//     // 카테고리 클릭 시 그에 맞는 내용으로 QNA 변경
//     const ctg = document.querySelectorAll(".ctgBtn_0, .ctgBtn_1, .ctgBtn_2, .ctgBtn_3, .ctgBtn_4, .ctgBtn_5, .ctgBtn_6");
//     const ctg_all_btn = document.querySelector('#category_all');
//     const ctg_1_btn = document.querySelector('#category_1');
//     const ctg_2_btn = document.querySelector('#category_2');
//     const ctg_3_btn = document.querySelector('#category_3');
//     const ctg_4_btn = document.querySelector('#category_4');
//     const ctg_5_btn = document.querySelector('#category_5');
//     const ctg_6_btn = document.querySelector('#category_6');

//     const QNA = document.querySelectorAll(".QNA_all, .QNA_1, .QNA_2, .QNA_3, .QNA_4, .QNA_5, .QNA_6");
//     const QNA_all = document.querySelector('.QNA_all');
//     const QNA_1 = document.querySelector('.QNA_1');
//     const QNA_2 = document.querySelector('.QNA_2');
//     const QNA_3 = document.querySelector('.QNA_3');
//     const QNA_4 = document.querySelector('.QNA_4');
//     const QNA_5 = document.querySelector('.QNA_5');
//     const QNA_6 = document.querySelector('.QNA_6');

//     ctg_all_btn.addEventListener('click',getQNA_all);
//     ctg_1_btn.addEventListener('click',getQNA_1);
//     ctg_2_btn.addEventListener('click',getQNA_2);
//     ctg_3_btn.addEventListener('click',getQNA_3);
//     ctg_4_btn.addEventListener('click',getQNA_4);
//     ctg_5_btn.addEventListener('click',getQNA_5);
//     ctg_6_btn.addEventListener('click',getQNA_6);

//     function getQNA_all(){
//         for (var i=0; i<QNA.length; i++){
//             var item1 = ctg.item(i);
//             var item2 = QNA.item(i);
//             item1.style.color = '';
//             item1.style.background = '';
//             item2.style.display = '';
//         }
//         ctg_all_btn.style.color = '#000';
//         ctg_all_btn.style.background = '#fff';
//         QNA_all.style.display = 'block';
//     }
//     function getQNA_1(){
//         for (var i=0; i<QNA.length; i++){
//             var item1 = ctg.item(i);
//             var item2 = QNA.item(i);
//             item1.style = '';
//             item1.style = '';
//             item2.style = '';
//         }
//         ctg_1_btn.style.color = '#000';
//         ctg_1_btn.style.background = '#fff';
//         QNA_1.style.display = 'block';
//     }
//     function getQNA_2(){
//         for (var i=0; i<QNA.length; i++){
//             var item1 = ctg.item(i);
//             var item2 = QNA.item(i);
//             item1.style = '';
//             item1.style = '';
//             item2.style = '';
//         }
//         ctg_2_btn.style.color = '#000';
//         ctg_2_btn.style.background = '#fff';
//         QNA_2.style.display = 'block';
//     }
//     function getQNA_3(){
//         for (var i=0; i<QNA.length; i++){
//             var item1 = ctg.item(i);
//             var item2 = QNA.item(i);
//             item1.style = '';
//             item1.style = '';
//             item2.style = '';
//         }
//         ctg_3_btn.style.color = '#000';
//         ctg_3_btn.style.background = '#fff';
//         QNA_3.style.display = 'block';
//     }
//     function getQNA_4(){
//         for (var i=0; i<QNA.length; i++){
//             var item1 = ctg.item(i);
//             var item2 = QNA.item(i);
//             item1.style = '';
//             item1.style = '';
//             item2.style = '';
//         }
//         ctg_4_btn.style.color = '#000';
//         ctg_4_btn.style.background = '#fff';
//         QNA_4.style.display = 'block';
//     }
//     function getQNA_5(){
//         for (var i=0; i<QNA.length; i++){
//             var item1 = ctg.item(i);
//             var item2 = QNA.item(i);
//             item1.style = '';
//             item1.style = '';
//             item2.style = '';
//         }
//         ctg_5_btn.style.color = '#000';
//         ctg_5_btn.style.background = '#fff';
//         QNA_5.style.display = 'block';
//     }
//     function getQNA_6(){
//         for (var i=0; i<QNA.length; i++){
//             var item1 = ctg.item(i);
//             var item2 = QNA.item(i);
//             item1.style = '';
//             item1.style = '';
//             item2.style = '';
//         }
//         ctg_6_btn.style.color = '';
//         ctg_6_btn.style.background = '';
//         QNA_6.style.display = 'block';
//     }

//     // QNA 클릭 시 해당 QNA의 상세내용 출력

// }
// document.addEventListener('DOMContentLoaded', FAQ_init);