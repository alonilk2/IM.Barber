import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import useUser from '../../Hooks/useUser'
import useCart from '../../Hooks/useCart'
import {
  SHIPPING_PRICE,
  SERVER_ADDRESS
} from '../../Constants/generalConstants'

const QuantitiesArray = Array.from({ length: 8 }, (_, i) => i + 1)

export default function Cart (props) {
  const history = useHistory()
  const user = useUser()
  const [
    cartObject,
    count,
    totalSum,
    addToCart,
    deleteFromCart,
    changeQuantity
  ] = useCart()
  const [quantities, setQuantities] = useState(Array(8).fill(1))

  function handleChangeQuantity (e, index, item) {
    let quantityArr = [...quantities],
      value = parseInt(e.target.value)
    if (quantityArr && quantityArr[index]) quantityArr[index] = parseInt(value)
    let currentTotalSum = changeQuantity(item, value)
    setQuantities(quantityArr)
  }

  function handleDelete (e, item) {
    e.preventDefault()
    deleteFromCart(item)
  }

  const handleSubmitOrder = () => {
    if (user) {
      history.push('/delivery', {
        cart: cartObject ? cartObject : null,
        totalSum: totalSum
      })
    } else {
      history.push('/signin', {
        cartFlag: true,
        cart: cartObject, //for auto redirect after signin
        totalSum: totalSum
      })
    }
  }

  const ItemsRowMapper = cartObject.map((item, index) => {
    return (
      <div className='item'>
        <div className='title-column'>
          <img
            src={SERVER_ADDRESS + '/uploads/' + item.imgname}
            alt={item.producttitle}
            width='100px'
          ></img>
          <p className='title'>{item.producttitle}</p>
        </div>

        <div className='price-column'>
          <h5 className='price'>₪{item.price.toFixed(2)}</h5>
          <Form.Select
            aria-label='Default select example'
            value={item.quantity}
            onChange={e => handleChangeQuantity(e, index, item)}
          >
            {QuantitiesArray.map(item => {
              return (
                <option value={item} key={item}>
                  {item}
                </option>
              )
            })}
          </Form.Select>
          <button className='edit' onClick={e => handleDelete(e, item)}>
            מחיקה
          </button>
        </div>
      </div>
    )
  })

  return (
    <div className='cart-container'>
      <h3 className='title'>סל הקניות שלך</h3>
      <div className='box-row'>
        <div className='list-box'>
          {ItemsRowMapper.length > 0 ? (
            ItemsRowMapper
          ) : (
            <h4 className='empty-title'> הסל שלך ריק </h4>
          )}
        </div>
        <div className='summery-box'>
          <h4 className='title'>סיכום הזמנה</h4>
          <div className='spaced-line'>
            <p>עלות המוצרים: </p>
            <p>₪{(totalSum - SHIPPING_PRICE).toFixed(2)}</p>
          </div>
          <div className='spaced-line'>
            <p>עלות המשלוח: </p>
            <p>₪{SHIPPING_PRICE}</p>
          </div>
          <div className='spaced-line sum'>
            <p>סה"כ לתשלום: </p>
            <h2>₪{totalSum.toFixed(2)}</h2>
          </div>
          <button className='buy-btn' onClick={() => handleSubmitOrder()}>
            בצע הזמנה
          </button>
        </div>
      </div>
    </div>
  )
}
