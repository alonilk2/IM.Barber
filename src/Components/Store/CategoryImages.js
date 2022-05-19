import '../../CSS/HomePageCSS.css'
import '../../CSS/Store.css'
import {
  SERVER_ADDRESS
} from '../../Constants/generalConstants'
import useCategories from '../../Hooks/useCategories'

export default function CategoryImages () {
  const CategoryArr = useCategories()

  function RenderCategories () {
    const CategoryMapper = CategoryArr?.map((item,idx) => {
      return (
        <a
          href={`/category/${item.categoryid}`}
          className='category-image-item'
          key={idx}
          style={{
            backgroundImage: `url("${SERVER_ADDRESS}/categories/${item.imgname}"),linear-gradient(338deg, rgba(18,18,18,0.1) 0%, rgba(223,181,75,0.8) 100%)`,
            backgroundSize: 'cover'
          }}
        >
          <div className='darken'>
            <h1 className='category-image-title'>{item.categoryid}</h1>
          </div>
        </a>
      )
    })
    return CategoryMapper || null
  }

  return (
    <>
      <div className='category-image-container'>
        <RenderCategories />
      </div>
    </>
  )
}
