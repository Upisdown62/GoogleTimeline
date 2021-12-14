process.env.NODE_TLS_REJECT_UNAUTHORIZED = 1;
const express = require('express');
const router = express.Router();
const { User } = require("../models/User");
const { auth } = require("../middleware/auth");
const { OAuth2Client } = require('google-auth-library')
const async = require('async')

const client = new OAuth2Client(process.env.REACT_APP_GOOGLE_API_KEY)
//=================================
//             Google
//=================================


router.post("/login", (req, res) => {
    //console.log('google router:: ', req.body)
    const { tokenId } = req.body.data
    //console.log('google router:: ', tokenId)

    client.verifyIdToken({idToken: tokenId, audience: process.env.REACT_APP_GOOGLE_API_KEY})
    .then(response => {
        const { email_verified, email, picture } = response.payload
        //console.log('==========\n',response.payload)

        if(email_verified){
            User.findOne({email: email}, (err, user) => {
                //console.log('user::', user)
                if (err) return res.status(400).json({ success: false, err })

                // 1. email로 User를 찾는데, 있으면 로그인시키기
                if(user){
                    user.generateToken((err, user) => {
                        if (err) return res.status(400).send(err);
                        console.log(`[google.login] userId:${user.email}`)
                        res.cookie("w_authExp", user.tokenExp);
                        res
                        .cookie("w_auth", user.token)
                        .status(200)
                        .json({
                            loginSuccess: true, userId: user._id
                        });
                    });
                }
                // 2. email로 User를 찾는데, 없으면 신규회원이니까
                // 새로 가입시키는 화면으로
                else {
                    console.log(`[google.register] userId:${user.email}`)
                    return res.status(200).json({
                        loginSuccess: false,
                        email: email,
                        social: 'google'
                    })
                }
            })
        }
    })
})

module.exports = router;