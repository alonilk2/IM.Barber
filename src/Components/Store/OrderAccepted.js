import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import animationData from '../../Lotties/animatedTick'
import Lottie from 'react-lottie'
import useCart from '../../Hooks/useCart'

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: animationData,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice'
  }
}

export default function SuccessOrder() {
  const cartObject = useCart()
  const orderState = useSelector(state => state.orders)
  const history = useHistory()

  useEffect(() => {
    cartObject.resetCart()
  }, [])

  if (orderState?.length > 0) {
    return (
      <div className='success-order-container'>
        <h1 className='success-title'>Thank You!</h1>
        <p className='order-description'>
          אנחנו שמחים לעדכן כי הזמנתך מס'
          <span> {orderState.orderId
            ? orderState.orderId.data.result.id.toString().padStart(5, '0')
            : null} </span>
          הועברה לטיפול בהצלחה !
          ניתן לעקוב אחר ביצוע ההזמנה בעמוד הפרופיל.
        </p>
        <Lottie options={defaultOptions} height={400} width={400} />
      </div>
    )
  }
  else return history.push('/store')
}
