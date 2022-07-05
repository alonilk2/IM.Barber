import {useEffect, useState} from 'react'
import useOrders from '../../Hooks/useOrders'
export default function OrdersSummery(props) {
    const [orders, counter] = useOrders()
    return ( 
        <div className="row orders-container">
            <div className="new-orders">
                <h2>הזמנות חדשות</h2>
                <h1 id='order-counter'>{counter}</h1>
            </div>
        </div>
    )
}