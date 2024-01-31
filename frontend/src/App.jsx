import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Home from './components/Home'
import Team from './components/Team'
import Events from './components/Events'
import Newsletter from './components/Newsletter'
import Contact from './components/Contact'
import Gallery from './components/Gallery'

function App() {

  return (
    <>
      <Router>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/events" element={<Events />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/newsletter" element={<Newsletter />} />
            <Route path="/team" element={<Team />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
