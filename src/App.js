import HomePageView from './Views/HomePageView'
import useScrollToTop from './ScrollToTop'

function App () {
  const scroll = useScrollToTop()
  
  return <HomePageView />
}

export default App
