import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from "./pages/home/Home"
import About from "./pages/about/About"
import { Sidebar } from "./components/layout"
import DogPortraits from './pages/dog-portraits/DogPortraits'
import ChristmasAnimals from './pages/christmas-animals/ChristmasAnimals'
import Store from './pages/store/Store'

function App() {

  return (
    <div className="min-h-screen bg-base-200">
      <Routes>
        <Route element={<Sidebar />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/dog-portraits" element={<DogPortraits />} />
          <Route path="/christmas-animals" element={<ChristmasAnimals />} />
          <Route path="/store" element={<Store />} />
        </Route>
      </Routes>
    </div>
  )

}

export default App
