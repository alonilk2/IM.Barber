import {useEffect, useState} from 'react'
import {HIDE_PRODUCT} from '../Constants/generalConstants'
import {useDispatch} from 'react-redux'
export default function useBackButton () {
  const dispatch = useDispatch()
  const [isBack, setIsBack] = useState(false)
  const handleEvent = () => {
    setIsBack(true)
    console.log("ABC")
    dispatch({type: HIDE_PRODUCT})
  }

  useEffect(() => {
    window.addEventListener('popstate', handleEvent)
    return () => window.removeEventListener('popstate', handleEvent)
  })

  return isBack
}
