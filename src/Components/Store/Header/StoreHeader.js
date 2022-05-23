import '../../../CSS/Store.css'
import useWindowSize from '../../../Hooks/useWindowSize'
import CartImage from '../../../Images/cart.png'
import { useHistory } from 'react-router-dom'
import { UserAvatar } from './UserAvatar'
import { SearchBar } from './SearchBar'

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
          <UserAvatar />
        </>
      ) : (
        <>
          <UserAvatar />
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
