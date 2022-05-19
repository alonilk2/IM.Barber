import { useState } from 'react'
import '../../CSS/HomePageCSS.css'
import Accordion from 'react-bootstrap/Accordion'
import Axios from 'axios'
import Table from 'react-bootstrap/Table'
import Alert from 'react-bootstrap/Alert'
import Zoom from 'react-reveal/Zoom'
import { SERVER_ADDRESS } from '../../Constants/generalConstants'
import useOrders from '../../Hooks/useOrders'

export default function OrdersManagement (props) {
  const [success, setSuccess] = useState(false)
  const [searchOrder, setSearchOrder] = useState(null)
  const [ordersList, newOrdersCounter] = useOrders()

  const triggerSuccess = async () => {
    setSuccess(true)
    await new Promise(r => setTimeout(r, 7000))
    setSuccess(false)
  }

  const handleShipped = async (e, orderid) => {
    e.preventDefault()
    try {
      let result = await Axios.post(SERVER_ADDRESS + '/shiporder', {
        order: orderid
      })
      if (result.data.success) triggerSuccess()
    } catch (error) {
      console.log(error)
    }
  }

  const mapper = () => {
    if (ordersList) {
      return ordersList.orders?.data?.result?.map((order, index) => {
        if (order.shipped === false) {
          let jsonObj = JSON.parse(order.address)
          let cartJson = JSON.parse(order.cart)
          const map = cartJson.map(product => {
            return (
              <p id='cart-admin' key={index}>
                {product.producttitle + ' - ' + product.brand}
              </p>
            )
          })
          return (
            <tr key={index}>
              <td>{index}</td>
              <td>{order.id}</td>
              <td>
                {jsonObj.street +
                  ' ' +
                  jsonObj.house +
                  ' ' +
                  jsonObj.city +
                  ' ' +
                  jsonObj.zip}
              </td>
              <td>{order.owner.firstname + ' ' + order.owner.lastname}</td>
              <td>{order.phone}</td>
              <td>{map}</td>
              <td>
                <button
                  type='button'
                  class='upbtn'
                  onClick={e => handleShipped(e, order.id)}
                >
                  משלוח בוצע
                </button>
              </td>
            </tr>
          )
        } else return null
      })
    } else return null
  }

  const completedMapper = () => {
    if (ordersList) {
      return ordersList.orders?.data?.result?.map((order, idx) => {
        if (order.shipped === true) {
          if (
            searchOrder &&
            order.id.toString() !== searchOrder &&
            !order.phone.startsWith(searchOrder)
          )
            return null
          let jsonObj = JSON.parse(order.address)
          let cartJson = JSON.parse(order.cart)
          const cart = cartJson.map((product, index) => {
            return (
              <p id='cart-admin' key={index}>
                {product.producttitle + ' - ' + product.brand}
                <span>
                  <b>
                    <br />
                    {'כמות: ' + product.quantity}
                  </b>
                </span>
              </p>
            )
          })
          return (
            <tr key={idx}>
              <td>{idx}</td>
              <td>{order.id}</td>
              <td>
                {jsonObj.street +
                  ' ' +
                  jsonObj.house +
                  ' ' +
                  jsonObj.city +
                  ' ' +
                  jsonObj.zip}
              </td>
              <td>{order.owner.firstname + ' ' + order.owner.lastname}</td>
              <td>{order.phone}</td>
              <td>{cart}</td>
            </tr>
          )
        } else return null
      })
    } else return null
  }

  const successAlert = () => {
    return (
      <Zoom>
        <Alert variant='success'>
          <Alert.Heading>הפעולה בוצעה בהצלחה !</Alert.Heading>
        </Alert>
      </Zoom>
    )
  }

  return (
    <Accordion.Item eventKey={props.eKey}>
      <Accordion.Header>ניהול הזמנות</Accordion.Header>
      <Accordion.Body>
        <div className='row'>
          {success ? successAlert() : null}

          <div className='row order-manage'>
            <div className='col delete-category-row'>
              <h5 className='sub-title'>הזמנות שממתינות למשלוח</h5>

              <div
                className='rightcol'
                style={{ height: '500px', overflowY: 'scroll', width: '100%' }}
              >
                <Table striped bordered hover style={{ width: '100%' }}>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>מספר הזמנה</th>
                      <th>כתובת למשלוח</th>
                      <th>שם המזמין</th>
                      <th>פלאפון המזמין</th>
                      <th>מוצרים</th>
                      <th>סימון ביצוע משלוח</th>
                    </tr>
                  </thead>
                  <tbody style={{ fontSize: '14px' }}>{mapper()}</tbody>
                </Table>
              </div>
            </div>
            <div className='col delete-category-row'>
              <h5 className='sub-title'>הזמנות שהושלמו</h5>

              <div className='search-order-row'>
                <input
                  className='search-order'
                  type='text'
                  placeholder='מספר הזמנה\מספר פלאפון'
                  onChange={e => setSearchOrder(e.target.value)}
                ></input>
                <span style={{ marginLeft: '10px' }}>חיפוש לפי:</span>
              </div>
              <div
                className='rightcol'
                style={{ height: '500px', overflowY: 'scroll' }}
              >
                <Table striped bordered hover size='sm'>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>מספר הזמנה</th>
                      <th>כתובת למשלוח</th>
                      <th>שם המזמין</th>
                      <th>פלאפון המזמין</th>
                      <th>מוצרים</th>
                    </tr>
                  </thead>
                  <tbody style={{ fontSize: '14px' }}>
                    {completedMapper()}
                  </tbody>
                </Table>
              </div>
            </div>
          </div>
        </div>
      </Accordion.Body>
    </Accordion.Item>
  )
}
