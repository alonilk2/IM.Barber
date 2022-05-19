import { useEffect, useState } from 'react'
import Cookie from 'js-cookie'

function useUser () {
  const [userInstance, setUserInstance] = useState(
    Cookie.get('userInstance') ? JSON.parse(Cookie.get('userInstance')) : null
  )

  useEffect(() => {
    let cookie = Cookie.get('userInstance')
    if (cookie) {
      let user = JSON.parse(Cookie.get('userInstance'))
      setUserInstance(user)
    }
  }, [])
  return userInstance
}

export default useUser
