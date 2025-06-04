import './App.css'
import Navbar from './components/Navbar'
import Home from './screens/Home'
import Analyze from './screens/Analyze'
import {Routes,Route} from 'react-router-dom'
import Working from './screens/Working'
import Footer from './components/Footer'
import About from './screens/About'
import Contact from './screens/Contact'
import AnalyzeImage from './screens/AnalyzeImage'
import AnalyzeSelection from './screens/AnalyzeSelection'
import Landing from './screens/Landing'

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/working" element={<Working />} />
        <Route path="/about" element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path="/analyze-text" element={<Analyze />} />
        <Route path='/analyze-image' element={<AnalyzeImage />} />
        <Route path='/analyze' element={<AnalyzeSelection />} />
        <Route path='/landing' element={<Home />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
