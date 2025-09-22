import {Routes, Route} from 'react-router-dom'
import './App.css'
import HomePage from "./pages/HomePage.tsx";
import FavouritesPages from "./pages/FavouritesPages.tsx";
import Navigation from "./components/Navigation.tsx";

function App() {


  return (
    <>
        <Navigation/>

        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/favourites" element={<FavouritesPages />} />
        </Routes>

    </>
  )
}

export default App
