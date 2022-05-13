import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteCartItem } from '../../services/features/slices/CartSlice';
import CartService from '../../services/CartService';
import './prompt.scss';

const Prompt = ({ close, target }) => {
    const cartKey = useSelector(state => state.cr.cartKey)
    const dispatch = useDispatch();
    function deleteTarget() {
        console.log(target)
        CartService.removeProductToCart({
            cartkey: cartKey, item: target
        }).then(() => {
            dispatch(deleteCartItem(target))
            close(false)
        });
    }
    return (
        <div className='prompt-wrapper'>
            <div className='prompt-content'>
                <p className='prompt-message'>Are you sure want to remove this item?</p>
                <div className='prompt-actions'>
                    <button onClick={deleteTarget}>Yes</button>
                    <button onClick={() => close(false)}>No</button>
                </div>
            </div>
        </div>
    )
}

export default Prompt;