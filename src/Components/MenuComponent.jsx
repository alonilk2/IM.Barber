import '../CSS/HomePageCSS.css'
import { useState, forwardRef } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { DISPLAY_CONTACT } from '../Constants/generalConstants'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Logo from '../Images/logo.svg'
import Offcanvas from 'react-bootstrap/Offcanvas'
import Container from 'react-bootstrap/Container'
import useWindowSize from '../Hooks/useWindowSize'
import CategoryBar from './Store/CategoryBar'
import { SocialIcon } from 'react-social-icons'

const sleep = milliseconds => {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}

const MenuComponent = forwardRef((props, ref) => {
  const size = useWindowSize()
  const history = useHistory()
  const dispatch = useDispatch()
  const location = useLocation()
  const [toggle, setToggle] = useState(false)

  async function handleContact () {
    setToggle(false)
    await sleep(500)
    dispatch({ type: DISPLAY_CONTACT })
    if (location.pathname !== '/') history.push('/')
  }

  if (size.width > 768) {
    return (
      <Navbar expand='lg' variant='dark' sticky='top'>
        <Navbar.Toggle aria-controls='responsive-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='mr-auto navbar-container'>
            <div className="social-navbar">
            <span style={{color: '#cfcfcf', margin: 0}}>עקבו אחרינו:</span>
            <SocialIcon
              style={{ width: '25px', height: '25px', margin: '5px' }}
              url='https://www.facebook.com/idan.mavlyev'
            />
            <SocialIcon
              style={{ width: '25px', height: '25px', margin: '5px' }}
              url='https://www.instagram.com/_im.barber_/'
            />
            <SocialIcon
              style={{ width: '25px', height: '25px', margin: '5px' }}
              url='https://www.tiktok.com/@idan_mavlayev?lang=he-IL'
              network='tiktok'
              bgColor='#ff5a01'
            />
            </div>
            <div className='col left-menu'>
              <Nav.Link onClick={handleContact} className='navbar-btn-txt'>
                צור קשר
              </Nav.Link>
              <Nav.Link href='/academy' className='navbar-btn-txt'>
                האקדמיה לספרות
              </Nav.Link>
              <Nav.Link
                href='https://www.instagram.com/_im.barber_/'
                className='navbar-btn-txt'
              >
                תיק עבודות
              </Nav.Link>
            </div>
            <a href={'/'}>
              <img src={Logo} className='col logo' alt='IM.Barber Logo' />
            </a>
            <div className='col right-menu'>
              <Nav.Link href='/store' className='navbar-btn-txt'>
                חנות המוצרים
              </Nav.Link>
              <Nav.Link href='/whatsapp' className='navbar-btn-txt'>
                זימון תור
              </Nav.Link>
              <Nav.Link href='/' className='navbar-btn-txt'>
                דף הבית
              </Nav.Link>
            </div>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
  } else
    return (
      <Navbar
        expanded={toggle}
        sticky='top'
        onToggle={() => setToggle(!toggle)}
        expand='lg'
        variant='dark'
      >
        <Container fluid>
          <Navbar.Toggle aria-controls='offcanvasNavbar' />
          <a href={'/'}>
            <img
              src={Logo}
              className='col logo'
              width='150px'
              alt='IM.Barber Logo'
            />
          </a>
          <Navbar.Offcanvas
            id='offcanvasNavbar'
            aria-labelledby='offcanvasNavbarLabel'
            placement='end'
          >
            <Offcanvas.Header closeButton>
              <a href={'/'}>
                <img
                  src={Logo}
                  className='col logo'
                  width='150px'
                  alt='IM.Barber Logo'
                />
              </a>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className='mr-auto justify-content-end flex-grow-1 pe-3 navbar-container'>
                <div className='col left-menu'>
                  <Nav.Link href='/academy' className='navbar-btn-txt'>
                    האקדמיה לספרות
                  </Nav.Link>
                  <Nav.Link
                    href='https://www.instagram.com/_im.barber_/'
                    className='navbar-btn-txt'
                  >
                    תיק עבודות
                  </Nav.Link>
                  <Nav.Link onClick={handleContact} className='navbar-btn-txt'>
                    צור קשר
                  </Nav.Link>
                </div>
                <div
                  className='col right-menu'
                  style={{ flexDirection: `column-reverse` }}
                >
                  <Nav.Link href='/' className='navbar-btn-txt'>
                    דף הבית
                  </Nav.Link>
                  <Nav.Link href='/whatsapp' className='navbar-btn-txt'>
                    זימון תור
                  </Nav.Link>
                  <Nav.Link href='/store' className='navbar-btn-txt'>
                    חנות המוצרים
                  </Nav.Link>
                </div>
                <CategoryBar />
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    )
})
export default MenuComponent
