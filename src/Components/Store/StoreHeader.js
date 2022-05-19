import '../../CSS/Store.css'
import { IoArrowBack } from 'react-icons/io5'
import Avatar from '@mui/material/Avatar'
import { deepOrange } from '@mui/material/colors'
import useUser from '../../Hooks/useUser'
import useWindowSize from '../../Hooks/useWindowSize'
import CartImage from '../../Images/cart.png'
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { FILTER_RESULTS } from '../../Constants/generalConstants'

function SearchBar () {
  const dispatch = useDispatch()

  return (
    <div className='store-search-container'>
      <input
        className='search-input'
        type='text'
        placeholder='מה אפשר להציע לך?'
        style={{ direction: 'rtl' }}
        onChange={e =>
          dispatch({
            type: FILTER_RESULTS,
            filterBy: e.target.value
          })
        }
        required
      ></input>
      <button className='search-btn'>
        <IoArrowBack />
      </button>
    </div>
  )
}

function UserPanel () {
  const user = useUser()
  const size = useWindowSize()
  return (
    <div className='categories-btn-col'>
      <a href={user ? '/profile' : '/signin'} id='profile-link'>
        <Avatar
          sx={
            size.width > 768
              ? { bgcolor: deepOrange[500], width: '40px', height: '40px' }
              : { bgcolor: deepOrange[500], width: '25px', height: '25px' }
          }
          alt={user ? user.data.user.firstname : null}
          src='/broken-image.jpg'
        ></Avatar>
        <p>{user ? 'שלום ' + user.data.user.firstname : `שלום אורח/ת!`}</p>
      </a>
    </div>
  )
}

function StoreHeader (props) {
  const history = useHistory()
  const size = useWindowSize()
  function handleClick (e) {
    e.preventDefault()
    history.push('/cart', {
      cart: props.cart,
      totalSum: props.totalSum
    })
  }
  return (
    <div className='category-nav-bar-container'>
      {size.width > 768 ? (
        <>
          <SearchBar />
          <UserPanel />
        </>
      ) : (
        <>
          <UserPanel />
          <SearchBar />
        </>
      )}

      <div className='categories-btn-col'>
        <button onClick={handleClick} id='profile-link'>
          <img src={CartImage} className='category-cart-icon' alt="Cart Icon"/>
          {props.count} פריטים
        </button>
      </div>
    </div>
  )
}
export default StoreHeader
