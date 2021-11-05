const express = require('express');
const router = express.Router();
const multer = require('multer')
const { Product } = require('../models/Product')

//=================================
//             Product
//=================================


var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
      cb(null, `${Date.now()}_${file.originalname}`)
    }
})
   
var upload = multer({ storage: storage }).single("file")


router.post('/image', (req, res) =>{
    //가져온 이미지 저장
    upload(req, res, err => {
        console.log('======req.files=======\n', req.file)
        if(err){
            return req.json({ success:false, err})
        }
        return res.json({
            success:true, 
            filePath: res.req.file.path, 
            fileName: res.req.file.filename
        })
    })
})


router.post('/', (req, res) =>{
    //받은 정보 DB에 저장

    const product = new Product(req.body);

    console.log('=====', req.body)

    product.save((err) => {
        if (err) return res.status(400).json({ success: false, err });
        return res.status(200).json({
            success: true
        });
    });
})

router.post('/products', (req, res) =>{
    // product 배열에 있는 항목을 모두 리턴
    let limit = req.body.limit ? parseInt(req.body.limit) : 20
    let skip = req.body.skip ? parseInt(req.body.skip) : 0
    let term = req.body.searchTerm

    let findArgs = {}
    for(let key in req.body.filters){
        if(req.body.filters[key].length > 0){
            if(key === "price"){
                findArgs[key] = {
                    //Greater , Less
                    $gte: req.body.filters[key][0],
                    $lte: req.body.filters[key][1]
                }
            } else {
                findArgs[key] = req.body.filters[key]
            }
        }
    }

    if(term){
        Product.find(findArgs)
            .find({title: new RegExp(term)}, {description: new RegExp(term)})
            //.find({$text:{$search:term}}) //"title":{'$regex':term} 으로 하면 like 검색
            .populate("writer") //populate 함수는 writer에 대한 모든 정보를 가져옴,,?
            .skip(skip)
            .limit(limit)
            .exec((err, productInfo) => {
                if(err) return res.status(400).json({success:false, err})
                return res.status(200).json({
                    success:true, 
                    productInfo,
                    postSize:productInfo.length
                })  
        })
    } else {        
        Product.find(findArgs)
            .populate("writer") //populate 함수는 writer에 대한 모든 정보를 가져옴,,?
            .skip(skip)
            .limit(limit)
            .exec((err, productInfo) => {
                if(err) return res.status(400).json({success:false, err})
                return res.status(200).json({
                    success:true, 
                    productInfo,
                    postSize:productInfo.length
                })  
        })
    }    
})

router.get('/products_by_id', (req, res) =>{
    let type = req.query.type
    let productIds = req.query.id

    if(type === "array") {
        let ids = req.query.id.split(',')
        productIds = ids
    }

    Product.find({_id: { $in: productIds}})
        .populate('writer')
        .exec((err, product) => {
            if(err) return res.status(400).send(err)
            return res.status(200).send(product)
        })
})

module.exports = router;
