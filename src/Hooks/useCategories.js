import { useEffect, useState } from 'react'
import Axios from 'axios'
import { SERVER_ADDRESS } from '../Constants/generalConstants'
export default function useCategories () {
  const [categoryArr, setCategoryArr] = useState([])

  const fetchCategories = async () => {
    let resultArray = await Axios.get(
      SERVER_ADDRESS + '/category/getcategories'
    )
    setCategoryArr(resultArray.data)
  }

  useEffect(() => {
    fetchCategories()
  }, [])

  return categoryArr
}
