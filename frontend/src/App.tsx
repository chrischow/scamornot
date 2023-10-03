import './App.css'
import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import WithNav from './components/WithNav'
import CheckPage from './pages/Check'
import LearnPage from './pages/Learn'
import CheckProvider from './context/checkContext'

function App() {
  return (
    <ChakraProvider>
      <CheckProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<WithNav />}>
              <Route path="/" element={<CheckPage />} />
              <Route path="/learn" element={<LearnPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </CheckProvider>
    </ChakraProvider>
  )
}

export default App
