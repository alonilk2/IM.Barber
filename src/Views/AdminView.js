import '../CSS/HomePageCSS.css'
import AdminComponent from '../Components/Admin'
import MenuComponent from '../Components/MenuComponent'
import Footer from '../Components/Footer'

function AdminView (props) {
  return (
    <>
      <MenuComponent />
      <AdminComponent />
      <Footer />
    </>
  )
}
export default AdminView
