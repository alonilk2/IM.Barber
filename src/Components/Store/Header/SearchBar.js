import { IoArrowBack } from 'react-icons/io5';
import { useDispatch } from 'react-redux';
import { FILTER_RESULTS } from '../../../Constants/generalConstants';

export function SearchBar() {
  const dispatch = useDispatch();

  return (
    <div className='store-search-container'>
      <input
        className='search-input'
        type='text'
        placeholder='מה אפשר להציע לך?'
        style={{ direction: 'rtl' }}
        onChange={e => dispatch({
          type: FILTER_RESULTS,
          filterBy: e.target.value
        })}
        required
      ></input>
      <button className='search-btn'>
        <IoArrowBack />
      </button>
    </div>
  );
}
