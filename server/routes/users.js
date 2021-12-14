const express = require('express');
const router = express.Router();
const { User } = require("../models/User");

const { auth } = require("../middleware/auth");
const { Product } = require('../models/Product');
const { Payment } = require('../models/Payment');
const async = require('async')

//=================================
//             User
//=================================

router.get("/auth", auth, (req, res) => {
    res.status(200).json({
        _id: req.user._id,
        isAdmin: req.user.role === 0 ? false : true,
        isAuth: true,
        email: req.user.email,
        name: req.user.name,
        lastname: req.user.lastname,
        role: req.user.role,
        image: req.user.image,
        cart: req.user.cart,
        history: req.user.history
    });
});

router.post("/register", (req, res) => {

    const user = new User(req.body);

    user.save((err, doc) => {
        if (err) return res.json({ success: false, err });
        console.log(`[users.register] user:${user}`)
        return res.status(200).json({
            success: true
        });
    });
});

router.post("/login", (req, res) => {
    User.findOne({ email: req.body.email }, (err, user) => {
        if (!user)
            return res.json({
                loginSuccess: false,
                message: "Auth failed, email not found"
            });

        user.comparePassword(req.body.password, (err, isMatch) => {
            if (!isMatch)
                return res.json({ loginSuccess: false, message: "Wrong password" });

            user.generateToken((err, user) => {
                if (err) return res.status(400).send(err);
                res.cookie("w_authExp", user.tokenExp);
                console.log(`[users.login] userId:${req.body.email}`)
                res
                    .cookie("w_auth", user.token)
                    .status(200)
                    .json({
                        loginSuccess: true, userId: user._id
                    });
            });
        });
    });
});

router.get("/logout", auth, (req, res) => {
    User.findOneAndUpdate({ _id: req.user._id }, { token: "", tokenExp: "" }, (err, doc) => {
        if (err) return res.json({ success: false, err });
        console.log(`[users.logout] userId:${req.user.email}`)
        return res.status(200).send({
            success: true
        });
    });
});

router.post("/addToCart", auth, (req, res) => {
    
    //User를 찾아서 거기의 cart를 가져와야함
    //넣으려는 productID가 있으면 수량만 올리고, 없으면 아예 항목을 새로 짜줘야함
    User.findOne({_id: req.user._id}, (err, userInfo) =>{
        let duplicate = false
        userInfo.cart.forEach((item) => {
            if(item.id === req.body.productId) duplicate = true
        })
        
        //이미 상품이 있으면, 그 숫자만 올려줌
        if(duplicate){
            User.findOneAndUpdate(
                { _id: req.user._id, "cart.id": req.body.productId},
                { $inc: {"cart.$.quantity": 1}},
                { new : true}, //업데이트된 정보를 다시 받을때 필요
                ( err, userInfo) => {
                    if(err) return res.status(400).json({success:false, err})
                    return res.status(200).send(userInfo.cart)
                }
            )
        }
        //상품을 새로 짜줌
        else{
            User.findOneAndUpdate(
                {_id:req.user._id },
                {
                    $push: {
                        cart: {
                            id: req.body.productId,
                            quantity: 1,
                            date: Date.now()
                        }
                    }
                },
                { new : true}, //업데이트된 정보를 다시 받을때 필요
                ( err, userInfo) => {
                    if(err) return res.status(400).json({success:false, err})
                    return res.status(200).send(userInfo.cart)
                }
            )
        }
    })    
});

router.get('/removeFromCart', auth, (req, res) => {
    //cart 안에 상품 지워주고
    User.findOneAndUpdate(
        {_id:req.user._id},
        {
            "$pull":{
                "cart":{ "id":req.query.id}
            }
        },
        { new : true}, //업데이트된 정보를 다시 받을때 필요
        (err, userInfo) => {
            //product collection에서 남은 상품들의 정보를 가져와야함
            let cart = userInfo.cart
            let array = cart.map(item => {
                return item.id
            })

            Product.find({_id: { $in:array}})
            .populate('writer')
            .exec((err, productInfo) => {
                return res.status(200).json({
                    productInfo,
                    cart
                })
            })
        }
    )
})

router.post('/successBuy', auth, (req, res) => {
    //User Collection안에 History 에 간단 결재 정보 넣기
    let history = []
    let transcationData = {}

    req.body.cartDetail.forEach((item) => {
        history.push({
            dateOfPurchase: Date.now(),
            name: item.title,
            id: item._id,
            price: item.price,
            quantity: item.quantity,
            paymentId: req.body.paymentData.paymentID
        })
    })

    // payment collection 안에 자세한 결재 정보 넣기
    transcationData.user = {
        id: req.user._id,
        name: req.user.name,
        email: req.user.email
    }
    transcationData.data = req.body.paymentData
    transcationData.product = history

    //history 정보 저장
    User.findOneAndUpdate(
        { _id: req.user._id },
        { $push: { history: history}, $set: { cart: [] }},
        { new: true},
        (err, user) => {
            if(err) return res.status(400).json({success:false, err})
            
            // payment에다가 transactionData정보 저장
            const payment = new Payment(transcationData)
            payment.save((err, doc) => {
                if(err) return req.status(400).json({success:false, err})
                
                
                // product collection 안에 sold 정보 업데이트
                let products = []
                doc.product.forEach(item => {
                    products.push({ id: item.id, quantity: item.quantity})
                })

                async.eachSeries(products, (item, callback) => {
                    Product.update(
                        {_id:item.id},
                        {
                            $inc: {
                                "sold":item.quantity
                            }
                        },
                        { new: false},
                        callback
                    )
                },(err) => {
                    if(err) return res.status(400).json({success: false, err})
                    return res.status(200).json({
                        success: true, 
                        cart:user.cart,
                        cartDetail: []
                    })
                })
            })
        }
    )
})

module.exports = router;
