import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import Team from './components/Team'
import Events from './components/Events'
import Footer from './components/Footer'
import Newsletter from './components/Newsletter'
// import Contact from './components/Contact'
import Gallery from './components/Gallery'
import Login from './components/admin/Login'
import Navbar from './components/Navbar'
import Admin from './components/admin/Admin'
import Edit from './components/admin/Edit'

function App() {

  return (
    <>

      <Router>
        <Navbar />
        <div style={{ margin: '0px auto', backgroundImage: '/images/background.jpg' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            {/* <Route path="/contact" element={<Contact />} /> */}
            <Route path="/events" element={<Events />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/newsletter" element={<Newsletter />} />
            <Route path="/team" element={<Team />} />
            <Route path="/login" element={<Login />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/edit/:section/:id" element={<Edit />} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </>
  )
}

export default App
