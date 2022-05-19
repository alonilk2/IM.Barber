import '../../CSS/HomePageCSS.css'
import '../../CSS/Store.css'
import useWindowSize from '../../Hooks/useWindowSize'
import useCategories from '../../Hooks/useCategories'
import NavDropdown from 'react-bootstrap/NavDropdown'

export default function CategoryBar () {
  const CategoryArr = useCategories()
  const size = useWindowSize()

  function RenderCategories () {
    if (CategoryArr && CategoryArr.length > 0) {
      const CategoryMapper = CategoryArr.map((item,idx) => {
        return (
          <a
            href={`/category/${item.categoryid}`}
            className='category-bar-item'
            key={idx}
          >
            {item.categoryid.trim()}
          </a>
        )
      })
      return CategoryMapper
    }
    return null
  }

  return (
    <>
      {size.width > 768 ? (
        <div className='category-bar-container'>
          <RenderCategories />
        </div>
      ) : (
        <NavDropdown title='קטגוריות' id='offcanvasNavbarDropdown'>
          <a
            href={`/store`}
            className='category-bar-item'
          >
            <b>הצג הכל</b>
          </a>
          <RenderCategories />
        </NavDropdown>
      )}
    </>
  )
}
