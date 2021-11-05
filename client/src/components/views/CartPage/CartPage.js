import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { getCartItems, removeCartItem, onSuccessBuy } from '../../../_actions/user_actions'
import UserCardBlock from './Sections/UserCardBlock'
import { Empty, Result } from 'antd'
import Paypal from '../../utils/Paypal'

function CartPage(props) {
    const dispath = useDispatch()

    const [Total, setTotal] = useState(0)
    const [ShowTotal, setShowTotal] = useState(false)
    const [ShowSuccess, setShowSuccess] = useState(false)

    useEffect(() => {
        let cartItems = []

        //리덕스 User.cart안에 상품이 있는지 확인
        //=> 그냥 불러오고, cart.legnth === 0 으로 구분하는게 낫지않나
        if(props.user.userData && props.user.userData.cart){
            if(props.user.userData.cart.length > 0){
                props.user.userData.cart.forEach((item) => {
                    cartItems.push(item.id)
                })
                dispath(getCartItems(cartItems, props.user.userData.cart))
                .then(response => {calculateTotal(response.payload)})
            }
        }

    }, [props.user.userData])

    let calculateTotal = (cartDetail) => {
        let total = 0

        cartDetail.map((item) => {
            total += parseInt(item.quantity) * parseInt(item.price, 10)
        })

        setTotal(total)
        setShowTotal(true)
    }

    let removeFromCart = (productId) => {
        dispath(removeCartItem(productId))
        .then(response => {
            if(response.payload.productInfo.length === 0){
                setShowTotal(false)
            }
        })
    }

    const transcationSuccess = (data) => {
        dispath(onSuccessBuy({
            paymentData: data,
            cartDetail: props.user.cartDetail
        }))
        .then(response => {
            if(response.payload.success){
                setShowTotal(false)
                setShowSuccess(true)
            }
        })
    }

    return (
        <div style={{width:'85%', margin:'3rem auto'}}>
            <h1>My Cart</h1>
            
            <div>
                <UserCardBlock 
                    products={props.user.cartDetail}
                    removeItem={removeFromCart}/>
            </div>

            {ShowTotal ? 
                <div style={{ marginTop: '3rem'}}>
                    <h2>Total Amount: ${Total}</h2>
                </div>
                : ShowSuccess ?
                    <Result
                        status="success"
                        title="Successfully Purchased Items!"
                    />
                    :
                    <div style={{ margin:'3rem auto'}}>
                        <Empty description={false}/>
                    </div>
            }
            { ShowTotal && 
                <Paypal
                    total={Total}   
                    onSuccess={transcationSuccess}
                />
            }
        </div>
    )
}

export default CartPage