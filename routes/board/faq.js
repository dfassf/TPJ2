const express = require('express');
const router = express.Router();
const {sequelize,Review, Curriculum, Faq, Category} = require('../../models/index')

//페이지 세팅 필요할지?

router.get('/', async (req,res)=>{
    console.log('FAQ 접근중');

    try{let ctgids = []

        let faq = await Faq.findAll({
            where:{show:1},
            raw:true,
        });
        for(let i=0; i<faq.length; i++){
            ctgids.push(faq[i].category)
        }
        let ctgids2 = ctgids.filter(function(a, i, self){
            return self.indexOf(a) === i;
        }); 

        //FAQ에서 쓰이는 카테고리 ID만 담음
        let category = await Category.findAll({
            where:{show:1},
            raw:true,
        });
        let ctgNames = [];
        for(let i=0; i<ctgids2.length; i++){
            let category = await Category.findOne({
                where:{show:1, id:ctgids2[i]},
                raw:true,
            });
            ctgNames.push(category)
        }
        console.log(ctgNames)
        let faqArr = [];
        //FAQ에서 쓰이는 카테고리 정보
        res.render('../views/user/FAQ.html',{
            faqList:faq,
            categoryList:ctgNames,
    })
    } catch(e){
        console.log(e);
    }
})

router.post('/test', async (req,res)=>{
    console.log('FAQ 접근중');

    try{
        let ctgids = []

        let faq = await Faq.findAll({
            where:{show:1},
            raw:true,
        });
        for(let i=0; i<faq.length; i++){
            ctgids.push(faq[i].category)
        }
        let ctgids2 = ctgids.filter(function(a, i, self){
            return self.indexOf(a) === i;
        }); 
        //FAQ에서 쓰이는 카테고리 ID만 담음
        let category = await Category.findAll({
            where:{show:1,ifdeleted:null},
            raw:true,
        });
        let ctgNames = [];
        for(let i=0; i<ctgids2.length; i++){
            let category = await Category.findAll({
                where:{show:1,ifdeleted:null, id:ctgids2[i]},
                raw:true,
            });
            ctgNames.push(category)
        }
        console.log(ctgNames)
        let faqArr = [];
        //FAQ에서 쓰이는 카테고리 정보

        res.render('../views/user/FAQ.html',{
            faqList:faq,
            categoryList:category,
            ctgNames
        
    })
    } catch(e){
        console.log(e);
    }
})


router.get('/view',async (req,res)=>{
    try{
        let result = await Faq.findAll({
            where:{id:req.query.id}
        }); 
  
        
        // let hit = result[0].dataValues.hit
        //     hit+=1;
        // let addHit = await Review.update({
        //     hit:hit
        // },{where:{id:req.query.id}})
        //view 로드시 조회수 올릴 것인지 판단 필요

        getCurrId = (result[0].dataValues.curr_id)
        // 게시물에서 curr_id 추출

        let [getSub] = await Curriculum.findAll({
            attributes:['id','subject'],
            where:{
                id:getCurrId
            }
        }) 


        // 수강기록에 맞추어 제목을 추출
        // 하여 배열에 담는다
        res.render('./faq/view.html',{
            result,
            getSub: getSub.dataValues.subject,
            signedinId
        });
        } catch(e){console.log(e)}
})

module.exports = router;