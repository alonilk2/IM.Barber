import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import DialogTitle from '@mui/material/DialogTitle'
import Dialog from '@mui/material/Dialog'
import animationData from '../../Lotties/add_cart'
import Lottie from 'react-lottie'
import { HIDE_ADD_CART } from '../../Constants/generalConstants'

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: animationData,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice'
  }
}

AddToCartAnimation.propTypes = {
  open: PropTypes.bool.isRequired
}

export function AddToCartAnimation () {
  const [open, setOpen] = useState(false)
  const dispatch = useDispatch()
  const show_add_animation = useSelector(state => state.cart.show_add_animation)
  const initialRender = useRef(true)

  useEffect(() => {
    if (!initialRender.current && show_add_animation) {
      showAdd()
    } else initialRender.current = false
  }, [show_add_animation])

  const showAdd = async () => {
    setOpen(true)
    await new Promise(r => setTimeout(r, 1800))
    dispatch({ type: HIDE_ADD_CART })
    setOpen(false)
  }
  
  return (
    <Dialog open={open}>
      <DialogTitle
        sx={{
          textAlign: 'center',
          direction: 'rtl',
          fontSize: '35px',
          marginTop: '5%'
        }}
      >
        הפריט נוסף לסל!
      </DialogTitle>
      <Lottie options={defaultOptions} height={400} width={'100%'} speed={1} />
    </Dialog>
  )
}
