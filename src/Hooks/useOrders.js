import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FetchAllOrders } from '../Actions/ordersActions'
export default function useOrders () {
  const dispatch = useDispatch()
  const orders = useSelector(state => state.orders)
  const counter = useRef(0)

  useEffect(() => {
    dispatch(FetchAllOrders())
  }, [])

  useEffect(() => {
    counter.current = 0

    orders?.data?.result?.forEach(order => {
      if (order.shipped === false) {
        counter.current = counter.current + 1
      }
    })

  }, [orders])

  return [orders, counter.current]
}
