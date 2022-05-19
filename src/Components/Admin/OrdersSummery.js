import {useEffect, useState} from 'react'
export default function OrdersSummery(props) {

    return ( 
        <div className="row orders-container">
            <div className="new-orders">
                <h2>הזמנות חדשות</h2>
                <h1 id='order-counter'>{props.newOrdersCounter}</h1>
            </div>
        </div>
    )
}