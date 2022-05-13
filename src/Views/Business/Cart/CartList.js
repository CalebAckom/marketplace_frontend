import { Cancel } from '@mui/icons-material'
import { CircularProgress } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { clearCart, createCartKey, getAllCart } from '../../../services/features/slices/CartSlice'
import CartService from '../../../services/CartService'
import { discountCalculator } from '../../../utils/BusinessLogic'
import Prompt from '../Prompt'
import CartListItem from './CartListItem'
import './CartListStyle.scss'

const CartList = () => {
    //eiei
    const cartState = useSelector(state => state.cr.items);
    const [trigger, setTrigger] = useState(false);
    const [openPrompt, setopenPrompt] = useState(false);
    const [targetDelete, setTargetDelete] = useState();
    //calculate total
    function deleteItem() {

    }

    useEffect(() => {
    }, [cartState])

    return (
        <div className='cart-list-wrapper'>
            <div className='cart-list-content'>
                <div className="cart-list-top">
                    <p className='title'>Item(s)</p>
                    <p className='qty'>Quantity</p>
                    <p className='uprice'>Unit Price</p>
                    <p className='tprice'>Price</p>
                    <p className='action'>Action</p>
                </div>
                {cartState.length > 0 ?
                    cartState.map((item, idx) => <CartListItem
                        key={idx}
                        img={item.img}
                        item_name={item.name}
                        unitPrice={item.price}
                        discount={item.discount}
                        qtyValue={item.quantity}
                        itemIdx={item.product}
                        itemKey={item.key}
                        isCheck={item.check}
                        openPrompt={setopenPrompt}
                        targetDelete={setTargetDelete}
                    />
                    ) : <div style={{
                        width: '100%', height: '15vh',
                        borderTop: '1px solid gray',
                        display: 'grid', placeItems: 'center',
                        paddingTop: '30px'
                    }}>
                        <img src='/images/list.png' />
                        <p>Sorry you don't have item in your cart</p>
                    </div>}
                <div className="cart-list-bottom">
                    <div className='spaceholder'></div>
                    {cartState.length > 0 && <div className='bottom-contenter'>
                        <button onClick={() => {
                            setTrigger(!trigger)
                        }}>
                            Place order
                        </button>
                        <p className='title'>
                            Total: Gh₵{
                                cartState.length > 0 ?
                                    cartState.map(item => {
                                        if (item.check) {
                                            return discountCalculator(item.price, item.discount) * item.quantity
                                        } else {
                                            return 0
                                        }
                                    }).reduce((a, b) => (a + b)) : 0
                            }</p>
                    </div>}
                </div>
            </div>
            {trigger && (cartState.filter((item) => item.check).length > 0) && <PlaceOrder data={cartState} close={setTrigger} />}
            {openPrompt && <Prompt close={setopenPrompt} target={targetDelete} />}
        </div>
    )
}

export default CartList

const PlaceOrder = ({ data, close }) => {
    const cartky = useSelector(state => state.cr.cartKey);
    const [showSuccess, setshowSuccess] = useState(false);
    const [workn, setWorkn] = useState(false);
    const history = useHistory();
    const dispatch = useDispatch();

    function _(dataList) {
        let arr = dataList.filter((item) => item.check);
        console.log('wait.. placing order', arr);

        setWorkn(true);
        CartService.placeOrder({ "ordered_items": arr })
            .then((res) => {
                console.log("res => ", res)
                if (res === 201) {
                    setshowSuccess(true);
                    setWorkn(false)
                    dispatch(clearCart());
                    dispatch(createCartKey());
                    //trigger
                    close(false);
                    dispatch(getAllCart(cartky));
                }
            }).catch((err) => {
                console.log("err", err)
            })
    }

    return <div className='place-order-wrapper'>
        <div className='message-display' style={{ justifyContent: workn ? 'center' : 'inherit' }}>
            <div className='cancel' >
                {!workn && <Cancel onClick={
                    !showSuccess
                        ? () => close(false)
                        : () => history.push('/')} />}
            </div>
            {!showSuccess ?
                <>
                    {!workn ? <>
                        <p>Are you sure you want to place an order for</p>
                        <div className="confirmed-purchase-list">
                            {data.filter((item) => item.check).map((e, idx) => {
                                if (e['check'] === true) {
                                    return <div key={idx} className='cpl-check'>{e.name}</div>
                                }
                            })}
                        </div>
                    </> : <p>Please standby</p>}
                    {!workn ? <button onClick={() => { _(data) }}>YES</button> : <CircularProgress color='inherit' />}

                </> : <div>
                    <p style={{ textAlign: 'center', marginTop: "50px" }}>Thank you for placing your order, we will contact you soon!</p>
                </div>}
        </div>
    </div>
}
