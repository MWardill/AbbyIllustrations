import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from "./pages/home/Home"
import About from "./pages/about/About"
import { Layout } from "./components/layout"
import DogPortraits from './pages/dog-portraits/DogPortraits'
import ChristmasAnimals from './pages/christmas-animals/ChristmasAnimals'
import Store from './pages/store/Store'
import BabyPortraits from './pages/baby-portraits/BabyPortraits'
import FashionImages from './pages/fashion-images/FashionImages'
import AnimalImages from './pages/animal-images/AnimalImages'
import Portraits from './pages/portraits/Portraits'
import PetPortraits from './pages/pet-portraits/PetPortraits'

function App() {

  return (
    <div className="min-h-screen bg-base-200">
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/dog-portraits" element={<DogPortraits />} />
          <Route path="/christmas-animals" element={<ChristmasAnimals />} />
          <Route path="/baby-portraits" element={<BabyPortraits />} />
          <Route path="/fashion-images" element={<FashionImages />} />
          <Route path="/animal-images" element={<AnimalImages />} />
          <Route path="/portraits" element={<Portraits />} />
          <Route path="/pet-portraits" element={<PetPortraits />} />
          <Route path="/store" element={<Store />} />
        </Route>
      </Routes>      
    </div>
  )

}

export default App
