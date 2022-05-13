import React, { useState } from 'react';
import { DeleteForever } from "@mui/icons-material";
import { Checkbox } from '@mui/material';
import { memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { checkCartItem, deleteCartItem, getAllCart, updateRemoteItemQty } from '../../../services/features/slices/CartSlice';
import CartService from '../../../services/CartService';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import { discountCalculator } from '../../../utils/BusinessLogic';
//

const CartListItem = ({ img, item_name, qtyValue, unitPrice, itemIdx, isCheck, itemKey, discount }) => {
    const dispatch = useDispatch();
    const cartKey = useSelector(state => state.cr.cartKey)
    function changeQty({ target }) {
        if (Number(target.value) < 0) {
            target.value = 1
        }
        if (target.value[0] == '0') {
            target.value = target.value.substring(1, target.value.length)
        }
        // dispatch(updateItemQty({ data: target.value, idx: itemIdx }));
        dispatch(updateRemoteItemQty({ cartKey, qty: target.value, item: itemKey }));
    }
    function prvntE(evt) {
        if (evt.which != 8 && evt.which != 0 && evt.which < 48 || evt.which > 57) {
            evt.preventDefault();
        }
    }
    function removeItem(onClose) {
        CartService.removeProductToCart({
            cartkey: cartKey, item: itemKey
        }).then(() => {
            dispatch(deleteCartItem(itemIdx))
            onClose()
        });
    }
    function checkThisCartItem() {
        dispatch(checkCartItem(itemIdx))
    }

    const confirmSubmit = () => {
        confirmAlert({
            title: 'Confirm to submit',
            message: 'Are you sure to do this.',
            customUI: ({ onClose }) => {
                return (
                    <div className='custom-ui' >
                        <h1>Are you sure?</h1>
                        <p>You want to delete {item_name}</p>
                        <div>
                            <button onClick={onClose}>No</button>
                            <button
                                onClick={() => {
                                    removeItem(onClose)
                                }}
                            >
                                Yes, Delete it!
                            </button>
                        </div>
                    </div>
                );
            },
        });
    };



    return (
        <>
            <div className='cart-list-item-wrapper'>
                <div className="cart-list-item-content">
                    <div className='item-detail'>
                        <Checkbox
                            checked={isCheck}
                            onClick={checkThisCartItem}
                            size='small'
                            style={{
                                color: "rgb(10, 151, 245)",
                            }} />
                        <img src={img} />
                        <p>{item_name}</p>
                    </div>
                    <div className='item-qty-input'>
                        <input type="number"
                            value={qtyValue} onChange={changeQty} onKeyDown={prvntE} />
                    </div>
                    <div className='item-price-container'>
                        <p>Gh₵{discountCalculator(unitPrice,discount)}</p>
                    </div>
                    <div className='item-total'>
                        <p>Gh₵{(discountCalculator(unitPrice,discount) * qtyValue).toFixed(2)}</p>
                    </div>
                    <div className='item-action-container'>
                        <DeleteForever onClick={confirmSubmit}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

export default memo(CartListItem);
