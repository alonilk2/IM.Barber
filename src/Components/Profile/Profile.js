import './Profile.css'
import useUser from '../../Hooks/useUser'
import Avatar from '@mui/material/Avatar'
import Accordion from 'react-bootstrap/Accordion'
import Table from 'react-bootstrap/Table'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { FetchOrdersPerUser } from '../../Actions/ordersActions'
import { SERVER_ADDRESS, SHIPPING_PRICE } from '../../Constants/generalConstants'
import { signout, updatePass } from '../../Actions/authActions'
import { deepOrange } from '@mui/material/colors'
import { format } from 'date-fns'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'

function Profile (props) {
  const dispatch = useDispatch()
  const OrdersState = useSelector(state => state.orders)
  const user = useUser()
  const [showOrder, setShowOrder] = useState()
  const [OldPass, setOldPass] = useState()
  const [NewPass, setNewPass] = useState()
  const [NewPass1, setNewPass1] = useState()

  const handleChangePass = () => {
    if (OldPass && NewPass && NewPass1 && NewPass === NewPass1) {
      dispatch(updatePass(user.data.user.email, OldPass, NewPass))
    }
  }

  const ItemsRowMapper = cartObject => {
    return cartObject.map((item, index) => {
      return (
        <tr>
          <td>
            <img
              src={SERVER_ADDRESS + '/uploads/' + item.imgname}
              alt={item.producttitle}
              width='150px'
            ></img>
          </td>
          <td>
            <p className='title'>{item.producttitle}</p>
          </td>
          <td>
            <h5 className='price'>₪{item.price}</h5>
          </td>
          <td>
            <h5 className='price'>{item.quantity}</h5>
          </td>
          <td>
            <h5 className='price'>
              ₪{(item.quantity * item.price).toFixed(2)}
            </h5>
          </td>
        </tr>
      )
    })
  }

  useEffect(() => {
    if (user) dispatch(FetchOrdersPerUser(user.data.user.email))
  }, [])

  const ordersMapper = () => {
    if (OrdersState && OrdersState.orders) {
      return OrdersState.orders.data.result.map(order => {
        return (
          <tr>
            <td>{order.id.toString().padStart(5, '0')}</td>
            <td>{format(new Date(order.createdAt), 'dd/MM/yyyy')}</td>
            <td>₪{order.price}</td>
            <td>{order.shipped ? 'הזמנה הושלמה' : 'הזמנה ממתינה למשלוח'}</td>
            <td>
              <button
                type='button'
                class='order-btn'
                onClick={e => setShowOrder(order)}
              >
                לפרטי הזמנה
              </button>
            </td>
          </tr>
        )
      })
    } else return null
  }
  
  const addressParser = () => {
    let address = JSON.parse(showOrder?.address)
    return (
      <p>
        רחוב:{address.street}, בית: {address.house}, עיר: {address.city}, מיקוד:
        {address.zip}
      </p>
    )
  }
  return (
    <div>
      <div className='container'>
        <div className='row'>
          <div className='col avatarcontainer'>
            <Avatar
              sx={{
                bgcolor: deepOrange[500],
                width: '200px',
                height: '200px',
                fontSize: '60px'
              }}
              alt={user ? user.data.user.firstname : null}
              src='/broken-image.jpg'
            ></Avatar>
          </div>
        </div>
        <div className='row'>
          <h1 className='profile-title'>
            {user.data.user.firstname} {user.data.user.lastname} שלום
          </h1>
        </div>
        <div className='row'>
          <button className='signout-btn' onClick={() => dispatch(signout())}>
            התנתק
          </button>
        </div>
        <Accordion>
          {OrdersSection()}
          {ManageSection()}
        </Accordion>
      </div>
    </div>
  )

  function ManageSection() {
    return <Accordion.Item eventKey={1}>
      <Accordion.Header>ניהול פרטים</Accordion.Header>
      <Accordion.Body>
        <Row className='details-container'>
          <Col className='title-col'>
            <p> שינוי סיסמה:</p>
          </Col>
          <Col>
            <Row>
              <input
                type='password'
                className='input-pass'
                placeholder='סיסמה ישנה'
                onChange={e => setOldPass(e.target.value)}
              ></input>
            </Row>
            <Row>
              <input
                type='password'
                className='input-pass'
                placeholder='סיסמה חדשה'
                onChange={e => setNewPass(e.target.value)}
              ></input>
            </Row>
            <Row>
              <input
                type='password'
                className='input-pass'
                placeholder='שוב סיסמה חדשה'
                onChange={e => setNewPass1(e.target.value)}
              ></input>
            </Row>
            <button
              type='button'
              class='order-btn'
              onClick={handleChangePass}
            >
              שינוי סיסמה
            </button>
          </Col>
        </Row>
      </Accordion.Body>
    </Accordion.Item>
  }

  const handleBack = () => {
    setShowOrder(null)
  }

  function OrdersSection() {
    return <Accordion.Item eventKey={0}>
      <Accordion.Header>הזמנות קודמות</Accordion.Header>
      <Accordion.Body style={{ padding: 0 }}>
        {showOrder ? (
          <div className='order-desc'>
            <p className='order-body'>
              מספר הזמנה: {showOrder.id}
              <br />
              תאריך הזמנה:{' '}
              {format(new Date(showOrder.createdAt), 'dd/MM/yyyy')}
              <br />
              סטאטוס הזמנה:{' '}
              {showOrder.shipped ? 'הזמנה הושלמה' : 'הזמנה ממתינה למשלוח'}
              <br />
              כתובת למשלוח: {addressParser()}
              <br />
              פירוט הזמנה:
            </p>
            <div style={{ margin: 'auto', width: '70%' }}>
              <Table striped bordered hover size='sm'>
                <thead>
                  <tr>
                    <th>תמונה להמחשה</th>
                    <th>שם המוצר</th>
                    <th>עלות המוצר</th>
                    <th>כמות</th>
                    <th>סה"כ</th>
                  </tr>
                </thead>
                <tbody>
                  {ItemsRowMapper(JSON.parse(showOrder.cart))}
                </tbody>
              </Table>
              <div className='total'>
                <h5> משלוח: ₪{SHIPPING_PRICE}</h5>
                <h5> סה"כ כולל מע"מ: ₪{showOrder.price}</h5>
              </div>
            </div>

            <button
              class='upbtn back'

              onClick={handleBack}
            >
              חזרה
            </button>
          </div>
        ) : (
          <div className='row past-orders-container'>
            <div className='rightcol' style={{ padding: 0 }}>
              <Table striped bordered hover size='sm'>
                <thead>
                  <tr>
                    <th>מספר הזמנה</th>
                    <th>תאריך הזמנה</th>
                    <th>עלות כוללת</th>
                    <th>סטטוס הזמנה</th>
                    <th>פירוט</th>
                  </tr>
                </thead>
                <tbody>{ordersMapper()}</tbody>
              </Table>
            </div>
          </div>
        )}
      </Accordion.Body>
    </Accordion.Item>
  }
}
export default Profile
